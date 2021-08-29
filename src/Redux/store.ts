import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import baseReducer from 'Redux/slices/base'

export const store = configureStore({
  reducer: {
    base: baseReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
