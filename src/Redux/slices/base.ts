import { createSlice } from '@reduxjs/toolkit'
import { AlgorithmType } from 'Redux/types'

export const baseSlice = createSlice({
  name: 'base',
  initialState: {
    // General state
    algorithm: '' as AlgorithmType,
    isRunning: false,
    array: [] as Array<number>,
    sortedArray: [] as Array<number>,
    swappersArray: [] as Array<number>,

    // Individual algorithms state
    bubbleSortArray: [] as Array<number>,
    heapSortArray: [] as Array<number>,
    mergeSortArray: [] as Array<number>,
    quickSortArray: [] as Array<number>,
    quickSortPivot: null,
  },
  reducers: {
    // General reducers
    setAlgorithm: (state, action: { payload: AlgorithmType }) => {
      state.algorithm = action.payload
    },

    setRunning: (state, action: { payload: boolean }) => {
      state.isRunning = action.payload
    },

    setArray: (state, action: { payload: Array<number> }) => {
      state.array = action.payload
    },

    setSortedArray: (state, action: { payload: Array<number> }) => {
      if (action.payload.length) {
        state.sortedArray = state.sortedArray.concat(action.payload)
      } else {
        state.sortedArray = []
      }
    },

    setSwappersArray: (state, action: { payload: Array<number> }) => {
      if (action.payload.length) {
        state.swappersArray = state.swappersArray.concat(action.payload)
      } else {
        state.swappersArray = []
      }
    },

    // Individual algorithms reducers
    setBubbleSortArray: (state, action: { payload: Array<number> }) => {
      state.bubbleSortArray = action.payload
    },

    setHeapSortArray: (state, action: { payload: Array<number> }) => {
      state.heapSortArray = action.payload
    },

    setMergeSortArray: (state, action: { payload: Array<number> }) => {
      state.mergeSortArray = action.payload
    },

    setQuickSortArray: (state, action: { payload: Array<number> }) => {
      state.quickSortArray = action.payload
    },

    setQuickSortPivot: (state, action: { payload: any }) => {
      state.quickSortPivot = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const actions = baseSlice.actions
export default baseSlice.reducer
