// PLUGINS IMPORTS //
import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

// COMPONENTS IMPORTS //
import { memoComparison } from 'Shared/Helpers/Functions'

// EXTRA IMPORTS //
import { RootState } from 'Redux/store'

/////////////////////////////////////////////////////////////////////////////

type PropsType = {}

const App: React.FC<PropsType> = () => {
  const localState = useSelector((state: RootState) => state.base)

  return <WrapperView>Counter: {localState.time} seconds</WrapperView>
}

// Styles
const WrapperView = styled.div`
  font-size: 20px;
  padding: 20px;
`

export default React.memo(App, memoComparison)
