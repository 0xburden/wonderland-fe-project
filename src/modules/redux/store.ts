import { configureStore } from '@reduxjs/toolkit'
import { tokenReducer } from './slices/token'
import { targetAddressReducer } from './slices/targetAddress'

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    targetAddress: targetAddressReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
