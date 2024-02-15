import { createSlice } from '@reduxjs/toolkit'

interface TokenInfoState {
  value: null | {
    name: string
    symbol: string
    decimals: number
  }
}

const initialState: TokenInfoState = {
  value: null,
}

export const tokenInfoSlice = createSlice({
  name: 'tokenInfo',
  initialState,
  reducers: {
    clear: (state) => {
      state.value = null
    },
    setTokenInfo: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { clear, setTokenInfo } = tokenInfoSlice.actions

export default tokenInfoSlice.reducer
