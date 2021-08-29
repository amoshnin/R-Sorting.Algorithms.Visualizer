// PLUGINS IMPORTS //
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

// COMPONENTS IMPORTS //
import { memoComparison, randomIntFromInterval } from 'Shared/Helpers/Functions'

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {}

const App: React.FC<PropsType> = () => {
  const [array, setArray] = useState<Array<number>>([])
  useEffect(() => {
    resetArray()
  }, [])

  const resetArray = () => {
    const array = []
    for (let i = 0; i < 310; i++) {
      array.push(randomIntFromInterval(5, 870))
    }
    setArray(array)
  }

  return (
    <WrapperView>
      {array.map((value, idx) => {
        return <BarView key={idx} height={value} />
      })}
    </WrapperView>
  )
}

// Styles
const WrapperView = styled.div`
  position: absolute;
  left: 100px;
`
const BarView = styled.div`
  width: 2px;
  background-color: blue;
  display: inline-block;
  margin: 0 1px;
  height: ${(props: { height: number }) => `${props.height}px`};
`

export default React.memo(App, memoComparison)
