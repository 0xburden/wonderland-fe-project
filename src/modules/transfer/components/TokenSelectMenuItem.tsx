import React from 'react'
import { useReadContracts } from 'wagmi'
import { erc20Abi } from 'viem'
import { selectToken } from '../../redux/slices/token'
import { setTokenInfo } from '../../redux/slices/tokenInfo'
import { MenuItem, Button } from '@chakra-ui/react'
import { type MenuItemProps } from '@chakra-ui/react'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { type Address } from '../../../contstants'

interface TokenSelectMenuItemProps extends MenuItemProps {
  address?: Address
}

export function TokenSelectMenuItem({ address, ...props }: TokenSelectMenuItemProps) {
  const token = useAppSelector((state) => state.token.value)
  const dispatch = useAppDispatch()

  const { data } = useReadContracts({
    contracts: [
      {
        address,
        abi: erc20Abi,
        functionName: 'name',
      },
      {
        address,
        abi: erc20Abi,
        functionName: 'symbol',
      },
      {
        address,
        abi: erc20Abi,
        functionName: 'decimals',
      },
    ],
  })

  const tokenInfo = React.useMemo<
    { name?: string | number; symbol?: string | number; decimals?: string | number } | undefined
  >(() => {
    if (!data) {
      return undefined
    }

    const [name, symbol, decimals] = data.map(({ result }) => result)

    return {
      name,
      symbol,
      decimals,
    }
  }, [data])

  const handleSelect = React.useCallback(() => {
    dispatch(selectToken(address))

    if (tokenInfo) {
      dispatch(setTokenInfo(tokenInfo))
    }
  }, [dispatch, address, tokenInfo])

  return (
    <MenuItem as={Button} {...props} isDisabled={address === token} onClick={handleSelect}>
      {tokenInfo?.symbol && tokenInfo?.name ? `${tokenInfo?.symbol} ${tokenInfo?.name}` : address}
    </MenuItem>
  )
}
