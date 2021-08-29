// PLUGINS IMPORTS //
import React from 'react'

// COMPONENTS IMPORTS //
import { memoComparison } from 'Shared/Helpers/Functions'

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {}

const Navbar: React.FC<PropsType> = () => {
  return <div>Navbar</div>
}

export default React.memo(Navbar, memoComparison)
