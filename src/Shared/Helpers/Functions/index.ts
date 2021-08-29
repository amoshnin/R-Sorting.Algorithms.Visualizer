import { shallowEqual } from 'react-redux'

export const memoComparison = (prevProps: any, nextProps: any) => {
  return shallowEqual(prevProps, nextProps)
}

export const limitNumberWithinRange = (
  num: number,
  min: number,
  max: number,
) => {
  const parsed = parseInt(num as any)
  return Math.min(Math.max(parsed, min), max)
}
