import React from 'react'
// import { SyncIndicator } from '@aragon/ui'

function AppLoader({ children }) {
  // if (nodata) {
  //   return <SyncIndicator visible label="Loading…" />
  // }

  return <React.Fragment>{children}</React.Fragment>
}

export default AppLoader
