import { createSlice } from '@reduxjs/toolkit'
import { type Address } from '../../../contstants'

interface TokenState {
  value: null | Address
}

const initialState: TokenState = {
  value: null,
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    clear: (state) => {
      state.value = null
    },
    selectToken: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { clear, selectToken } = tokenSlice.actions

export default tokenSlice.reducer
