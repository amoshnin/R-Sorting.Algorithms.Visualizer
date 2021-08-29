import { shallowEqual } from 'react-redux'

export const memoComparison = (prevProps: any, nextProps: any) => {
  return shallowEqual(prevProps, nextProps)
}
