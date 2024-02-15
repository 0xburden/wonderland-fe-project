import { configureStore } from '@reduxjs/toolkit'
import { tokenReducer } from './slices/token'
import { targetAddressReducer } from './slices/targetAddress'
import { tokenInfoReducer } from './slices/tokenInfo'

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    targetAddress: targetAddressReducer,
    tokenInfo: tokenInfoReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
