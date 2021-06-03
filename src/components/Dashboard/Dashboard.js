import React from 'react'
import Welcome from './Welcome'
import { useWallet } from '../../providers/Wallet'

function Dashboard() {
  const wallet = useWallet()

  return (
    <React.Fragment>{wallet.account ? 'delfi' : <Welcome />}</React.Fragment>
  )
}

export default Dashboard
