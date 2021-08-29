// PLUGINS IMPORTS //
import React from 'react'

// COMPONENTS IMPORTS //
import Navbar from 'Shared/Layout/Navbar'
import Body from 'Screens/Body'

// EXTRA IMPORTS //
import { memoComparison } from 'Shared/Helpers/Functions'

/////////////////////////////////////////////////////////////////////////////

type PropsType = {}

const App: React.FC<PropsType> = () => {
  return (
    <>
      <Navbar />
      <Body />
    </>
  )
}

export default React.memo(App, memoComparison)
