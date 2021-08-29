// PLUGINS IMPORTS //
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

// COMPONENTS IMPORTS //
import { memoComparison } from 'Shared/Helpers/Functions'

// EXTRA IMPORTS //
import { RootState } from 'Redux/store'
import { getWindowDimensions } from 'Shared/Helpers/Functions/window'

/////////////////////////////////////////////////////////////////////////////

type PropsType = {}

const App: React.FC<PropsType> = () => {
  const localState = useSelector((state: RootState) => state.base)

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const numWidth = Math.floor(
    windowDimensions.width / (localState.array.length * 3),
  )
  const width = `${numWidth}px`
  const numMargin =
    localState.array.length < 5
      ? 10
      : localState.array.length < 8
      ? 8
      : localState.array.length < 11
      ? 6
      : localState.array.length < 20
      ? 4
      : localState.array.length < 50
      ? 3.5
      : localState.array.length < 100
      ? 3
      : localState.array.length < 130
      ? 2.5
      : 2
  const margin = `${numMargin}px`
  const color = numWidth > 20 ? 'white' : 'transparent'
  const numFont =
    numWidth > 70
      ? 20
      : numWidth > 60
      ? 18
      : numWidth > 50
      ? 16
      : numWidth > 40
      ? 14
      : numWidth > 30
      ? 12
      : numWidth > 20
      ? 10
      : 8
  const fontSize = `${numFont}px`

  return (
    <WrapperView>
      {localState.array.length
        ? localState.array.map((number, index) => {
            const backgroundColor = localState.swappersArray.includes(index)
              ? 'rgba(219, 57, 57, 0.8)'
              : localState.bubbleSortArray.includes(index) ||
                localState.quickSortArray.includes(index) ||
                localState.heapSortArray.includes(index) ||
                localState.mergeSortArray.includes(index)
              ? 'rgba(78, 216, 96, 0.8)'
              : localState.quickSortPivot === index
              ? 'rgba(237, 234, 59, 0.8)'
              : localState.sortedArray.includes(index)
              ? 'rgba(169, 92, 232, 0.8)'
              : 'rgba(66, 134, 244, 0.8)'
            return (
              <BarView
                key={index}
                style={{
                  height: `${number * 3}px`,
                  width: width,
                  marginLeft: margin,
                  marginRight: margin,
                  backgroundColor: backgroundColor,
                  color: color,
                  fontSize: fontSize,
                }}
              >
                {number}
              </BarView>
            )
          })
        : null}
    </WrapperView>
  )
}

// Styles
const WrapperView = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(230, 230, 230);
  text-align: center;
`
const BarView = styled.div`
  padding-top: 7px;
  font-family: sans-serif;
  font-weight: 700;
  display: inline-block;
`

export default React.memo(App, memoComparison)
