import { useCallback, useState } from 'react'
import { useWallet } from 'use-wallet'
import { useWallet as useWallet2 } from '../providers/Wallet'
import { Contract as EthersContract } from 'ethers'
import { useMounted } from './useMounted'
import { useContract } from '../web3-contracts'
import { useInterval } from './useInterval'
import { bigNum, formatUnits } from '../lib/math-utils'
import enviromentAddresses from '../environments/addresses'
import environmentCountries from '../environments/countries'

import tokenAbi from '../abi/token.json'
import stakingAbi from '../abi/staking.json'
import iUniswapV2Router01Abi from '../abi/IUniswapV2Router01.json'
import iUniswapV2FactoryAbi from '../abi/IUniswapV2Factory.json'
import iUniswapV2PairAbi from '../abi/IUniswapV2Pair.json'

const SECONDS_IN_A_YEAR = 31556952

export function getCountryAddress(id) {
  const { networkName } = useWallet()
  return enviromentAddresses[networkName.toLowerCase()][id.toLowerCase()]
}

function getAddress() {
  const { networkName } = useWallet()
  return enviromentAddresses[networkName.toLowerCase()]
}

export function useCountryBasicInfo(id, account) {
  return environmentCountries.filter(function(item) {
    return item.id === id
  })[0]
}

export function useCountryDetails(id) {
  const stakingContract = useContract(getCountryAddress(id).staking, stakingAbi)
  const tokenContract = useContract(getCountryAddress(id).token, tokenAbi)
  const [rewardRate, setRewardRate] = useState(null)
  const [totalSupply, setTotalSupply] = useState(null)

  const mounted = useMounted()

  const getRewardRate = useCallback(
    async clear => {
      if (!stakingContract || !tokenContract) {
        // Clear any existing balance
        if (mounted()) {
          setRewardRate(null)
        }
        return
      }

      try {
        const reward = await stakingContract.rewardRate()
        const supply = await tokenContract.totalSupply()
        console.log('ssuply', supply, tokenContract)

        if (mounted() && (!totalSupply || supply.eq(totalSupply))) {
          setTotalSupply(supply)
        }
        // Avoid unnessesary re-renders by only updating value when it has actually changed
        if (mounted() && (!rewardRate || !reward.eq(rewardRate))) {
          console.log('success', id)
          setRewardRate(reward)
        }
      } catch (err) {
        if (mounted()) {
          console.log('error', err)
        }
        clear()
      }
    },
    [mounted, stakingContract, rewardRate]
  )

  useInterval(getRewardRate, 5000)

  if (rewardRate === null) {
    return
  }

  const tokenReward = rewardRate.mul(604800)
  const apy = rewardRate.mul(SECONDS_IN_A_YEAR)

  return {
    tokenReward: formatUnits(tokenReward),
    apy: 'X%', //TODO: change this value to real one
    fees: '0.3%',
    totalLiquidity: formatUnits(totalSupply), // multiplicar totalSupply por tokenValue.
  }
}

export function useNumTokenPrice() {
  const { account, ethers } = useWallet2()

  const num = getAddress().num
  const dai = getAddress().dai
  const uniswap = getAddress().uniswap

  const uniswapContract = ethers
    ? new EthersContract(uniswap, iUniswapV2Router01Abi, ethers.getSigner())
    : null

  const [numTokenPrice, setNumTokenPrice] = useState(null)

  const mounted = useMounted()

  const getNum = useCallback(
    async clear => {
      if (!uniswapContract) {
        if (mounted()) {
          setNumTokenPrice(null)
        }
        return
      }

      try {
        const factoryAddress = await uniswapContract.factory()
        const factoryContract = await new EthersContract(
          factoryAddress,
          iUniswapV2FactoryAbi,
          ethers.getSigner()
        )
        const poolAddress = await factoryContract.getPair(num, dai)
        const poolContract = await new EthersContract(
          poolAddress,
          iUniswapV2PairAbi,
          ethers.getSigner()
        )

        const [reserve0, reserve1] = await poolContract.getReserves()
        if (reserve0 === bigNum(0) || reserve1 === bigNum(0)) {
          setNumTokenPrice(bigNum(0))
        } else {
          const [numReserve, daiReserve] =
            num < dai ? [reserve0, reserve1] : [reserve1, reserve0]
          const numPrice = numReserve.div(daiReserve)

          if (mounted() && (!numTokenPrice || !numPrice.eq(numTokenPrice))) {
            setNumTokenPrice(numPrice)
          }
        }
      } catch (err) {
        console.log('error', err)
        clear()
      }
    },
    [mounted, uniswapContract, numTokenPrice]
  )

  useInterval(getNum, 5000)

  if (numTokenPrice === null) {
    return
  }

  return numTokenPrice
}

export function useTvl() {
  const { account, ethers } = useWallet2()
  const mounted = useMounted()

  const countriesIds = ['argentina', 'brazil', 'mexico']
  const stakingAddresses = countriesIds.map(countryId => {
    return getCountryAddress(countryId).staking
  })

  console.log('st', stakingAddresses)

  const [tvl, setTvl] = useState(null)

  const getTvl = useCallback(
    async clear => {
      if (!account && !ethers) {
        if (mounted()) {
          setTvl(null)
        }
        return
      }

      try {
        const totalSupplies = await Promise.all(
          stakingAddresses.map(async address => {
            const staking = new EthersContract(
              address,
              stakingAbi,
              ethers.getSigner()
            )
            return staking.totalSupply()
          })
        )

        const locked = formatUnits(
          totalSupplies.reduce((total, supply) => total.add(supply), bigNum(0))
        )

        if (mounted() && (!tvl || locked !== tvl)) {
          setTvl(locked)
        }
      } catch (err) {
        console.log('error', err)
        clear()
      }
    },
    [mounted, stakingAddresses, tvl]
  )

  useInterval(getTvl, 5000)

  if (tvl === null) {
    return
  }

  return tvl
}

//TODO: Calculate real one
export function useTradingVolume() {
  return 'X'
}

//TODO: Calculate real one
// sumar los total liquidity de todos los paises
export function useMarketCap() {
  return 'X'
}
// 
// function useLiquidityDeposits(managerAddress, daiAddress, tokenAddress, userAddress) {
//   const manager = useContract('LockManager', managerAddress)
//   const { foreignLocked } = manager.getDeposit(daiAddress, tokenAddress, userAddress);
//   return foreignLocked
// }
//
// async function numRewards(managerAddress, daiAddress, tokenAddress, userAddress, numPrice) {
//   const manager = useContract('LockManager', managerAddress)
//   const rewards = manager.getEarned(daiAddress, tokenAddress, userAddress);
//   return rewards.mul(numPrice).div(1e18);
// }
//
// async function availableDAI(daiAddress, userAddress) {
//   const dai = useContract('ERC20', daiAddress)
//   return dai.balanceOf(userAddress)
// }
//
// async function availableLPT(poolAddress, userAddress) {
//   const pool = useContract('ERC20', poolAddress)
//   return pool.balanceOf(userAddress)
// }

// token reward: //staking abi, multiplicar por 604800, rewardRate() y dsp dividir por 1e18

// //Token price
//
// function tokenPrice(uniswapAddress, tokenAddress, daiAddress) {
//   const uniswap = useContract('IUniswapV2Router01', uniswapAddress)
//   const factory = useContract('IUniswapV2Factory', await uniswap.factory())
//   const pool = useContract('IUniswapV2Pair.sol', await factory.getPair(tokenAddress, daiAddress))
//
//   const [reserve0, reserve1] = await pool.getReserves()
//   const [tokenAddress, daiReserve] = tokenAddress < daiAddress ? [reserve0, reserve1] : [reserve1, reserve0]
//   return tokenAddress.div(daiReserve)
// }
//
//
