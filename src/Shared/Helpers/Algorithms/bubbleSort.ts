import { actions } from 'Redux/slices/base'
import { AppDispatch } from 'Redux/store'
import { TwoDArrayOfNumbersOrBooleans } from './index'

function bubbleSort(
  stateArray: Array<number>,
  dispatch: AppDispatch,
  speed: number,
) {
  let array = stateArray.slice(0),
    toDispatch = [],
    sorted = false,
    round = 0
  while (!sorted) {
    sorted = true
    for (let i = 0; i < array.length - 1 - round; i++) {
      toDispatch.push([i, i + 1])
      if (array[i] > array[i + 1]) {
        toDispatch.push([i, i + 1, true])
        let temp = array[i]
        array[i] = array[i + 1]
        array[i + 1] = temp
        sorted = false
        toDispatch.push(array.slice(0))
        toDispatch.push([])
      }
    }
    toDispatch.push([true, array.length - 1 - round])
    round++
  }
  handleDispatch(toDispatch, dispatch, array, speed)
  return array
}

function handleDispatch(
  toDispatch: TwoDArrayOfNumbersOrBooleans,
  dispatch: AppDispatch,
  array: Array<number>,
  speed: number,
) {
  if (!toDispatch.length) {
    dispatch(actions.setBubbleSortArray(array.map((num, index) => index)))
    setTimeout(() => {
      dispatch(actions.setBubbleSortArray([]))
      dispatch(actions.setSortedArray(array.map((num, index) => index)))
      dispatch(actions.setRunning(false))
    }, 900)
    return
  }
  let dispatchFunction =
    toDispatch[0].length > 3
      ? actions.setArray
      : toDispatch[0].length === 3 || toDispatch[0].length === 0
      ? actions.setSwappersArray
      : toDispatch[0].length === 2 && typeof toDispatch[0][0] === 'boolean'
      ? actions.setSortedArray
      : actions.setBubbleSortArray
  dispatch(dispatchFunction(toDispatch.shift() as any))
  setTimeout(() => {
    handleDispatch(toDispatch, dispatch, array, speed)
  }, speed)
}

export default bubbleSort
