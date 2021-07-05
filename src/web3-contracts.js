import { useMemo } from 'react'
import { Contract as EthersContract } from 'ethers'
import { useWallet } from './providers/Wallet'

export function useContract(address, abi, signer = true) {
  const { account, ethers } = useWallet()

  return useMemo(() => {
    if (!address || !ethers || !account) {
      return null
    }

    return new EthersContract(
      address,
      abi,
      signer ? ethers.getSigner() : ethers
    )
  }, [abi, account, address, ethers, signer])
}
