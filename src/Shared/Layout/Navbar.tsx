// PLUGINS IMPORTS //
import React from 'react'
import styled from 'styled-components'

// COMPONENTS IMPORTS //
import { memoComparison } from 'Shared/Helpers/Functions'

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {}

const Navbar: React.FC<PropsType> = () => {
  const isRunning = false
  var algorithm = ''

  const array: [number] = [2]

  const sort = (algorithm: string, array: Array<number>, speed: number) => {}

  const speed =
    570 - Math.pow(array.length, 2) > 0 ? 570 - Math.pow(array.length, 2) : 0
  const color = isRunning ? 'rgba(214, 29, 29, 0.8)' : 'white'
  const cursor = isRunning ? 'auto' : 'pointer'

  const generateArray = (i: number) => {}

  const handleChangeScroller = () => {}
  const handleAlgorithmSelect = (algorithm: string) => {}
  const algorithms = ['Merge Sort', 'Quick Sort', 'Heap Sort', 'Bubble Sort']
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
      {algorithm ? (
        <div
          style={{ color: color }}
          onClick={!isRunning ? () => sort(algorithm, array, speed) : () => {}}
        >
          Sort!
        </div>
      ) : null}
    </WrapperView>
  )
}

const AlgorithmButton = (props: {
  selectedAlgorithm: string
  algorithm: string
  handleSelect: (newAlgorithm: string) => void
  disabled: boolean
}) => {
  const trimmed = props.algorithm.split(' ').join('')
  const isSelected = props.selectedAlgorithm === trimmed

  const onClick = () => {
    if (props.disabled) {
      return () => {}
    } else {
      return props.handleSelect(trimmed)
    }
  }

  return (
    <Button selected={isSelected} onClick={onClick}>
      {props.algorithm}
    </Button>
  )
}

// Styles

const WrapperView = styled.div``
const DividerView = styled.div``

const Button = styled.div`
  color: ${(props: { selected: boolean }) => (props.selected ? 'blue' : 'red')};
`

export default React.memo(Navbar, memoComparison)
