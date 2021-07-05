import { useCallback, useState } from 'react'
import { useWallet } from 'use-wallet'
import { useMounted } from './useMounted'
import { useContract } from '../web3-contracts'
import { useInterval } from './useInterval'
import { bigNum, formatUnits } from '../lib/math-utils'
import enviromentAddresses from '../environments/addresses'


import tokenAbi from '../abi/token.json'
import stakingAbi from '../abi/staking.json'
import iUniswapV2Router01Abi from '../abi/IUniswapV2Router01.json'
import iUniswapV2FactoryAbi from '../abi/IUniswapV2Factory.json'
import iUniswapV2PairAbi from '../abi/IUniswapV2Pair.json'

import argentina from '../assets/argentina.svg'
import brazil from '../assets/brazil.svg'
import mexico from '../assets/mexico.svg'

const SECONDS_IN_A_YEAR = 31556952

const countries = [
  {
    id: 'Argentina',
    name: 'Argentina',
    flag: argentina,
    top: true,
    apy: '154%',
    tokenReward: '40.000 num/week',
    fees: '$230.040/week',
    totalLiquidity: '349.080.555 USD',
  },
  {
    id: 'Brazil',
    name: 'Brazil',
    flag: brazil,
    top: true,
    apy: '120%', //rewardRate() multiplicar por 31556952 (seconds in a year) => pools en un año
    tokenReward: '80.000 num/week', //staking abi, multiplicar por 604800, rewardRate() y dsp dividir por 1e18
    fees: '$200.100/week', // 0.3% en todos
    totalLiquidity: '452.080.555 USD',
  },
  {
    id: 'Mexico',
    name: 'Mexico',
    top: true,
    flag: mexico,
    apy: '34%',
    tokenReward: '20.000 num/week',
    fees: '$30.040/week',
    totalLiquidity: '9.080.555 USD',
  },
]

function getStakingAddress(id) {
  const { networkName } = useWallet()
  return enviromentAddresses[networkName.toLowerCase()][id.toLowerCase()].staking
}

function getNumAddress() {
  const { networkName } = useWallet()
  return enviromentAddresses[networkName.toLowerCase()].manager
}

function getDaiAddress() {
  const { networkName } = useWallet()
  return enviromentAddresses[networkName.toLowerCase()].dai
}

export function useCountryDetails(id) {
  const stakingContract = useContract(
    getStakingAddress(id),
    stakingAbi
  )
  const [rewardRate, setRewardRate] = useState(null)

  const mounted = useMounted()

  const getRewardRate = useCallback(
    async clear => {
      if (!stakingContract) {
        // Clear any existing balance
        if (mounted()) {
          setRewardRate(null)
        }
        return
      }

      try {
        const reward = await stakingContract.rewardRate()
        // Avoid unnessesary re-renders by only updating value when it has actually changed
        if (mounted() && (!rewardRate || !reward.eq(rewardRate))) {
          console.log("success", id)
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
    apy: formatUnits(apy),
    fees: '0.3',
    totalLiquidity: '-',
  }
}

export function useRewardRate(id, account) {
  const stakingContract = useContract(
    '0xC17653432553Ab1199d0e0128E2451e632477b06', //staking address de arg, cambiar por variable de cada pais
    stakingAbi
  )
  const [status, setStatus] = useState('noAccount')
  const [tokenReward, setTokenReward] = useState(null)

  const mounted = useMounted()

  const getTokenReward = useCallback(
    async clear => {
      if (!stakingContract) {
        // Clear any existing balance
        if (mounted()) {
          setTokenReward(null)
        }
        return
      }

      try {
        const reward = await stakingContract.rewardRate()
        console.log('tr', reward)
        setTokenReward(reward)
        // Avoid unnessesary re-renders by only updating value when it has actually changed
        if (mounted() && (!tokenReward || !reward.eq(tokenReward))) {
          setStatus('success')
        }
      } catch (err) {
        if (mounted()) {
          setStatus('error')
          console.log('error', err)
        }
        clear()
      }
    },
    [mounted, stakingContract, tokenReward]
  )

  useInterval(getTokenReward, 5000)

  if (tokenReward === null) {
    return
  }

  return tokenReward
}

export function useCountry(id, account) {
  const poolTokenContract = useContract(
    '0x8c0a4a68DAF8249737eC232328128CE0167e7365',
    tokenAbi
  )
  console.log(account, poolTokenContract)
  const [tokenBalance, setTokenBalance] = useState(null)
  const [status, setStatus] = useState('noAccount')

  console.log('S', status, tokenBalance)

  const mounted = useMounted()

  const getBalance = useCallback(
    async clear => {
      console.log('getBalance function')
      if (!poolTokenContract || !account) {
        // Clear any existing balance
        if (mounted()) {
          setStatus('noAccount')
          setTokenBalance(null)
        }
        return countries.filter(function(item) {
          return item.id === id
        })[0]
      }

      try {
        // if (!tokenBalance && mounted()) {
        //   setStatus('loading')
        // }

        const balance = await poolTokenContract.balanceOf(account)
        console.log('balance', balance)
        setTokenBalance(balance)
        // Avoid unnessesary re-renders by only updating value when it has actually changed
        if (mounted() && (!tokenBalance || !balance.eq(tokenBalance))) {
          setStatus('success')
        }
      } catch (err) {
        if (mounted()) {
          setStatus('error')
          console.log('error', err)
        }
        clear()
      }
    },
    [account, mounted, poolTokenContract, tokenBalance]
  )

  useInterval(getBalance, 5000)
  console.log('fin', status, tokenBalance)
  return countries.filter(function(item) {
    return item.id === id
  })[0]
}

export function useNumTokenPrice() {
  const uniswapContract = useContract(uniswapAddress, iUniswapV2Router01Abi)

  const [numTokenPrice, setNumTokenPrice] = useState(null)

  const mounted = useMounted()

  const getNum = useCallback(
    async clear => {
      if (!uniswapContract) {
        // Clear any existing balance
        if (mounted()) {
          setNumTokenPrice(null)
        }
        return
      }

      try {
        const factoryAddress = await uniswapContract.factory()
        console.log("factory", factoryAddress)
        const factoryContract = await useContract(factoryAddress, iUniswapV2FactoryAbi)
        const poolAddress = await factoryContract.getPair(getNumAddress(), getDaiAddress())
        const poolContract = await useContract(poolAddress, iUniswapV2PairAbi)

        const [reserve0, reserve1] = await poolContract.getReserves()
        const [numReserve, daiReserve] = numAddress < daiAddress ? [reserve0, reserve1] : [reserve1, reserve0]
        const numPrice = numReserve.div(daiReserve)


        // Avoid unnessesary re-renders by only updating value when it has actually changed
        if (mounted() && (!numTokenPrice || !numPrice.eq(numTokenPrice))) {
          setNumTokenPrice(numPrice)
        }
      } catch (err) {
        if (mounted()) {
          console.log('error', err)
        }
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

// //numtokenprice
// function numPrice(uniswapAddress, numAddress, daiAddress) {
//   const uniswap = useContract('IUniswapV2Router01', uniswapAddress)
//   const factory = await useContract('IUniswapV2Factory', await uniswap.factory())
//   const pool = await useContract('IUniswapV2Pair.sol', await factory.getPair(numAddress, daiAddress))
//
//   const [reserve0, reserve1] = await pool.getReserves()
//   const [numReserve, daiReserve] = numAddress < daiAddress ? [reserve0, reserve1] : [reserve1, reserve0]
//   return numReserve.div(daiReserve)
// }
//
// //APY
// function apy(stakingAddress) {
//   const staking = useContract(StakingABI, stakingAddress)
//   const rewardsPerSecond = await staking.rewardsRate()
//   const rewardsPerYear = rewardsPerSecond.mul(31556952)
//
//   const totalSupply = await staking.totalSupply()
//   const rewardsPerYearPerToken = rewardsPerYear.div(totalSupply)
//   return rewardsPerYearPerToken.mul(100)
// }
//
//
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
// //totalLiquidity
// function totalLiquidity(tokenAddress, tokenPrice) {
//   const token = useContract('Token', tokenAddress)
//   const totalSupply = await token.totalSupply()
//   return totalSupply.mul(tokenPrice).div(1e18)
// }
//
//
//
// //market cap sumar los total liquidity de todos los paises
//
//
// //tvl
// function tvl(stakingAddresses) {
//   const totalSupplies = await Promise.all(stakingAddresses.map(stakingAddress => {
//     const staking = useContract(StakingABI, stakingAddress)
//     return staking.totalSupply()
//   }))
//
//   const locked = totalSupplies.reduce((total, supply) => total.add(supply), BigNumber.from(0))
//   return locked.div(1e18)
// }
