import { configureStore } from '@reduxjs/toolkit'
import baseReducer from 'Redux/slices/base'

export const store = configureStore({
  reducer: {
    base: baseReducer,
  },
})
