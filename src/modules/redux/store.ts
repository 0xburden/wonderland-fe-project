import { configureStore } from '@reduxjs/toolkit'
import { tokenReducer } from './slices'

export const store = configureStore({
  reducer: {
    token: tokenReducer,
  },
})
