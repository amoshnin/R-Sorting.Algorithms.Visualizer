// PLUGINS IMPORTS //
import React from 'react'

// COMPONENTS IMPORTS //
import Navbar from 'Components/Navbar'
import Body from 'Components/Body'
import Footer from 'Components/Footer'

// EXTRA IMPORTS //
import { memoComparison } from 'Shared/Helpers/Functions'

/////////////////////////////////////////////////////////////////////////////

type PropsType = {}

const App: React.FC<PropsType> = () => {
  return (
    <>
      <Navbar />
      <Body />
      <Footer />
    </>
  )
}

export default React.memo(App, memoComparison)
