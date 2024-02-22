import React from 'react'
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { clear as clearToken } from '../../redux/slices/token'
import { clear as clearTokenInfo } from '../../redux/slices/tokenInfo'
import { TokenSelectMenuItem } from './TokenSelectMenuItem'
import { TOKEN_ADDRESSES } from '../../../contstants'

export function TokenSelect() {
  const tokenInfo = useAppSelector((state) => state.tokenInfo.value)
  const dispatch = useAppDispatch()

  const handleClearSelection = React.useCallback(() => {
    dispatch(clearToken())
    dispatch(clearTokenInfo())
  }, [dispatch])

  return (
    <Menu matchWidth>
      <MenuButton as={Button} type="button" w="100%">
        {tokenInfo ? `${tokenInfo?.symbol} ${tokenInfo?.name}` : 'Select Token'}
      </MenuButton>
      <MenuList>
        <MenuItem as={Button} onClick={handleClearSelection} w="100%">
          Select Token
        </MenuItem>
        {TOKEN_ADDRESSES.map((address) => (
          <TokenSelectMenuItem key={address} address={address} />
        ))}
      </MenuList>
    </Menu>
  )
}
