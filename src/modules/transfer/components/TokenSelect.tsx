import React from 'react'
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { clear } from '../../redux/slices/token'
import { TokenSelectMenuItem } from './TokenSelectMenuItem'
import { TOKEN_ADDRESSES } from '../../../contstants'

export function TokenSelect() {
  const token = useAppSelector((state) => state.token.value)
  const dispatch = useAppDispatch()

  const handleClearSelection = React.useCallback(() => dispatch(clear()), [dispatch])

  return (
    <Menu>
      <MenuButton as={Button} type="button" w="100%">
        {token ? 'token name' : 'Select Token'}
      </MenuButton>
      <MenuList w="100%">
        <MenuItem as={Button} onClick={handleClearSelection}>
          Select Token
        </MenuItem>
        {TOKEN_ADDRESSES.map((address) => (
          <TokenSelectMenuItem key={address} address={address} />
        ))}
      </MenuList>
    </Menu>
  )
}
