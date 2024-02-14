import { createSlice } from '@reduxjs/toolkit'
import { isAddress } from 'viem'
import { type Address } from '../../../../contstants'

interface TargetAddressState {
  value: string | Address
  isValid: boolean
}

const initialState: TargetAddressState = {
  value: '',
  isValid: false,
}

export const targetAddressSlice = createSlice({
  name: 'targetAddress',
  initialState,
  reducers: {
    setTargetAddress: (state, action) => ({
      ...state,
      value: action.payload,
      isValid: isAddress(action.payload),
    }),
  },
})

export const { setTargetAddress } = targetAddressSlice.actions

export default targetAddressSlice.reducer
