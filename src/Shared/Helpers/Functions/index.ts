import { shallowEqual } from 'react-redux'

export const memoComparison = (prevProps: any, nextProps: any) => {
  return shallowEqual(prevProps, nextProps)
}

export const randomIntFromInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
