// PLUGINS IMPORTS //
import React from 'react'

// COMPONENTS IMPORTS //
import Navbar from 'Shared/Layout/Navbar'
import Body from 'Screens/Body'
import { memoComparison } from 'Shared/Helpers/Functions'

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {}

const App: React.FC<PropsType> = () => {
  const play = () => {}

  return (
    <>
      <Navbar />
      <button onClick={play}>ss</button>
      <Body />
    </>
  )
}

export default React.memo(App, memoComparison)
