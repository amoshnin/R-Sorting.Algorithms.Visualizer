import { actions } from 'Redux/slices/base'
import { AppDispatch } from 'Redux/store'

import { TwoDArrayOfNumbers } from './index'

type MergeSortObjType = { array: Array<number> }
function mergeSort(
  stateArray: Array<number>,
  dispatch: AppDispatch,
  speed: number,
) {
  let array = stateArray.slice(0),
    toDispatch: TwoDArrayOfNumbers = []
  let finalArray = mergeSortHelper(
    array.map((num, idx) => [num, idx]),
    toDispatch,
    0,
    array.length - 1,
    { array: array.slice(0) },
  )
  handleDispatch(toDispatch, dispatch, finalArray, speed)
}

function mergeSortHelper(
  array: TwoDArrayOfNumbers,
  toDispatch: TwoDArrayOfNumbers,
  start: number,
  end: number,
  obj: MergeSortObjType,
): TwoDArrayOfNumbers {
  if (array.length === 1) {
    return array
  }
  let half = Math.floor(array.length / 2),
    first = array.slice(0, half),
    second = array.slice(half),
    indexHalf = Math.floor((end + 1 + start) / 2),
    actualFirst: TwoDArrayOfNumbers = mergeSortHelper(
      first,
      toDispatch,
      start,
      indexHalf - 1,
      obj,
    ),
    actualSecond: TwoDArrayOfNumbers = mergeSortHelper(
      second,
      toDispatch,
      indexHalf,
      end,
      obj,
    ),
    isFinalMerge = false
  if (actualFirst.length + actualSecond.length === obj.array.length)
    isFinalMerge = true
  return actualSort(
    actualFirst,
    actualSecond,
    toDispatch,
    obj,
    start,
    end,
    isFinalMerge,
  )
}

function actualSort(
  first: Array<Array<number>>,
  second: Array<Array<number>>,
  toDispatch: Array<Array<number | boolean>>,
  obj: MergeSortObjType,
  start: number,
  end: number,
  isFinalMerge: boolean,
): TwoDArrayOfNumbers {
  let sortedArray = []
  let indexToPush = start
  while (first.length && second.length) {
    toDispatch.push([first[0][1], second[0][1]])
    if (first[0][0] <= second[0][0]) {
      indexToPush++
      sortedArray.push(first.shift())
    } else {
      toDispatch.push([first[0][1], second[0][1], true])
      second[0][1] = indexToPush++
      sortedArray.push(second.shift())
      first.forEach((subArr) => subArr[1]++)
      if (start === 0) {
        obj.array = sortedArray
          .map((subArr: any) => subArr[0])
          .concat(first.map((subArr) => subArr[0]))
          .concat(second.map((subArr) => subArr[0]))
          .concat(obj.array.slice(end + 1))
      } else {
        obj.array = obj.array
          .slice(0, start)
          .concat(sortedArray.map((subArr: any) => subArr[0]))
          .concat(first.map((subArr) => subArr[0]))
          .concat(second.map((subArr) => subArr[0]))
          .concat(obj.array.slice(end + 1))
      }
      toDispatch.push(obj.array.concat([indexToPush - 1, indexToPush]))
      toDispatch.push([])
    }
    if (isFinalMerge) toDispatch.push([true, indexToPush - 1])
  }
  return sortedArray.concat(first).concat(second) as TwoDArrayOfNumbers
}

function handleDispatch(
  toDispatch: TwoDArrayOfNumbers,
  dispatch: AppDispatch,
  array: TwoDArrayOfNumbers,
  speed: number,
) {
  if (!toDispatch.length) {
    dispatch(actions.setMergeSortArray(array.map((num, index) => index)))
    setTimeout(() => {
      dispatch(actions.setMergeSortArray([]))
      dispatch(actions.setSortedArray(array.map((num, index) => index)))
      dispatch(actions.setRunning(false))
    }, 900)
    return
  }
  let dispatchFunction =
    toDispatch[0].length > 3
      ? actions.setArray
      : (toDispatch[0].length === 3 && typeof toDispatch[0][2] === 'boolean') ||
        toDispatch[0].length === 0
      ? actions.setSwappersArray
      : toDispatch[0].length === 2 && typeof toDispatch[0][0] === 'boolean'
      ? actions.setSortedArray
      : actions.setMergeSortArray
  if (dispatchFunction === actions.setArray) {
    let currentToDispatch = toDispatch.shift()
    if (currentToDispatch) {
      dispatch(
        dispatchFunction(
          currentToDispatch.slice(0, currentToDispatch.length - 2),
        ),
      )
      dispatch(actions.setSwappersArray([]))
      dispatch(actions.setMergeSortArray([]))
      dispatch(
        actions.setSwappersArray([
          currentToDispatch[currentToDispatch.length - 2],
          currentToDispatch[currentToDispatch.length - 1],
        ]),
      )
      dispatch(
        actions.setMergeSortArray([
          currentToDispatch[currentToDispatch.length - 2],
          currentToDispatch[currentToDispatch.length - 1],
        ]),
      )
    }
  } else {
    dispatch(dispatchFunction(toDispatch.shift() as any))
  }
  setTimeout(() => {
    handleDispatch(toDispatch, dispatch, array, speed)
  }, speed)
}

export default mergeSort
