// PLUGINS IMPORTS //
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

// COMPONENTS IMPORTS //
import { memoComparison } from 'Shared/Helpers/Functions'

// EXTRA IMPORTS //
import {
  bubbleSort,
  quickSort,
  heapSort,
  mergeSort,
} from 'Shared/Helpers/Algorithms'

// REDUX IMPORTS //
import { actions } from 'Redux/slices/base'
import { RootState, useAppDispatch } from 'Redux/store'
import { AlgorithmType } from 'Redux/types'

/////////////////////////////////////////////////////////////////////////////

type PropsType = {}

const Navbar: React.FC<PropsType> = () => {
  const { array, isRunning, algorithm } = useSelector(
    (state: RootState) => state.base,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    var interval: any
    if (isRunning === true) {
      interval = setInterval(() => {
        dispatch(actions.incrementTimeByOne())
      }, 1000)
    } else {
      dispatch(actions.resetTime())
    }

    return () => clearInterval(interval)
  }, [isRunning, dispatch])

  const generateArray = (length: number) => {
    let array = []
    while (array.length < length) {
      array.push(Math.floor(Math.random() * 200) + 10)
    }
    dispatch(actions.setArray(array))
    dispatch(actions.setSortedArray([]))
  }

  const sort = (
    algorithm: AlgorithmType,
    array: Array<number>,
    speed: number,
  ) => {
    let doSort =
      algorithm === 'Bubble Sort'
        ? bubbleSort
        : algorithm === 'Quick Sort'
        ? quickSort
        : algorithm === 'Heap Sort'
        ? heapSort
        : algorithm === 'Merge Sort'
        ? mergeSort
        : null

    dispatch(actions.setSortedArray([]))
    dispatch(actions.setRunning(true))
    if (doSort !== null) {
      doSort(array, dispatch, speed)
    }
  }

  useEffect(() => {
    generateArray(87)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const speed =
    570 - Math.pow(array.length, 2) > 0 ? 570 - Math.pow(array.length, 2) : 0
  const color = isRunning ? 'rgba(214, 29, 29, 0.8)' : 'white'
  const cursor = isRunning ? 'auto' : 'pointer'

  const handleChangeScroller = (event: React.ChangeEvent<HTMLInputElement>) => {
    generateArray(Math.floor((parseInt(event.target.value) + 3) * 1.65))
  }

  const handleAlgorithmSelect = (algorithm: AlgorithmType) => {
    dispatch(actions.setAlgorithm(algorithm))
  }

  const algorithms: Array<AlgorithmType> = [
    'Merge Sort',
    'Quick Sort',
    'Heap Sort',
    'Bubble Sort',
  ]
  return (
    <WrapperView>
      <div
        style={{ color: color, cursor: cursor }}
        onClick={!isRunning ? () => generateArray(array.length) : () => {}}
      >
        Generate New Array
      </div>
      <DividerView className='separator'></DividerView>
      <div style={{ color: color }}>Change Array Size & Sorting Speed</div>
      <input
        id='changeSize'
        type='range'
        min='0'
        max='100'
        style={{ background: color, cursor: cursor }}
        disabled={isRunning}
        onChange={handleChangeScroller}
      />
      <DividerView className='separator'></DividerView>
      {/* Algorithm Buttons */}
      {algorithms.map((value, idx) => {
        return (
          <AlgorithmButton
            key={idx}
            selectedAlgorithm={algorithm}
            algorithm={value}
            handleSelect={handleAlgorithmSelect}
            disabled={isRunning}
          />
        )
      })}
      <DividerView />
      <Button
        color={algorithm.length > 0 ? color : 'gray'}
        onClick={
          algorithm
            ? !isRunning
              ? () => sort(algorithm, array, speed)
              : () => {}
            : () => {}
        }
      >
        Sort!
      </Button>
    </WrapperView>
  )
}

const AlgorithmButton = (props: {
  selectedAlgorithm: string
  algorithm: AlgorithmType
  handleSelect: (newAlgorithm: AlgorithmType) => void
  disabled: boolean
}) => {
  const isSelected = props.selectedAlgorithm === props.algorithm

  const onClick = () => {
    if (props.disabled) {
      return () => {}
    } else {
      return props.handleSelect(props.algorithm)
    }
  }

  return (
    <Button color={isSelected ? 'blue' : 'red'} onClick={onClick}>
      {props.algorithm}
    </Button>
  )
}

// Styles
const WrapperView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background: black;
`
const DividerView = styled.div`
  width: 2px;
  height: 55px;
  background-color: gray;
  margin-left: 15px;
  margin-right: 15px;
  display: inline-block;
`

const Button = styled.div`
  color: ${(props: { color: string }) => props.color};
  font-size: 16px;
  font-family: monospace;
  display: inline-block;
  margin-left: 25px;
  margin-right: 15px;
  cursor: pointer;
`

export default React.memo(Navbar, memoComparison)
