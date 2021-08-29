import { actions } from 'Redux/slices/base'
import { AppDispatch } from 'Redux/store'

type LocalCustom2DArrayOfNumbersOrBooleans = Array<
  Array<boolean | number> | number
>

function quickSort(
  stateArray: Array<number>,
  dispatch: AppDispatch,
  speed: number,
) {
  let array = stateArray.slice(0),
    toDispatch: LocalCustom2DArrayOfNumbersOrBooleans = []
  quickSortHelper(array, 0, array.length - 1, toDispatch)
  handleDispatch(toDispatch, dispatch, array, speed)
  return array
}

function quickSortHelper(
  array: Array<number>,
  start: number,
  end: number,
  toDispatch: LocalCustom2DArrayOfNumbersOrBooleans,
) {
  if (start >= end) {
    toDispatch.push([true, start])
    return
  }
  let pivot = start,
    left = start + 1,
    right = end
  toDispatch.push(pivot)
  toDispatch.push([left, right])
  while (right >= left) {
    if (array[right] < array[pivot] && array[left] > array[pivot]) {
      toDispatch.push([left, right, true])
      let temp = array[right]
      array[right] = array[left]
      array[left] = temp
      toDispatch.push(array.slice(0))
      toDispatch.push([])
    }
    if (array[right] >= array[pivot]) {
      right--
    }
    if (array[left] <= array[pivot]) {
      left++
    }
    if (right >= left) toDispatch.push([left, right])
  }
  toDispatch.push([pivot, right])
  if (pivot !== right) {
    let temp = array[right]
    array[right] = array[pivot]
    array[pivot] = temp
    toDispatch.push([pivot, right, true])
    toDispatch.push(array.slice(0))
    toDispatch.push([])
    toDispatch.push([true, right])
  }
  quickSortHelper(array, start, right - 1, toDispatch)
  quickSortHelper(array, right + 1, end, toDispatch)
}

function handleDispatch(
  toDispatch: LocalCustom2DArrayOfNumbersOrBooleans,
  dispatch: AppDispatch,
  array: Array<number>,
  speed: number,
) {
  if (!toDispatch.length) {
    dispatch(actions.setQuickSortPivot(null))
    dispatch(actions.setQuickSortArray(array.map((num, index) => index)))
    setTimeout(() => {
      dispatch(actions.setQuickSortArray([]))
      dispatch(actions.setRunning(false))
    }, 900)
    return
  }
  let dispatchFunction = !(toDispatch[0] instanceof Array)
    ? actions.setQuickSortPivot
    : toDispatch[0].length > 3
    ? actions.setArray
    : toDispatch[0].length !== 2
    ? actions.setSwappersArray
    : toDispatch[0].length === 2 && typeof toDispatch[0][0] === 'boolean'
    ? actions.setSortedArray
    : actions.setQuickSortArray
  dispatch(dispatchFunction(toDispatch.shift() as any))
  if (dispatchFunction === actions.setQuickSortPivot)
    dispatch(actions.setQuickSortArray(toDispatch.shift() as any))
  setTimeout(() => {
    handleDispatch(toDispatch, dispatch, array, speed)
  }, speed)
}

export default quickSort
