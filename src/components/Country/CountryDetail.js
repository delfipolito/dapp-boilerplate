import React from 'react'
import { Header, Button, Box } from '@aragon/ui'
import Chart from './Chart'
import Lock from './Lock'
import Boost from './Boost'
import Stake from './Stake'
import SplitHalf from '../SplitHalf'
import { useCountry, useCountryDetails } from '../../hooks/useCountry'
import { useWallet } from 'use-wallet'

const CountryDetail = React.memo(function CountryDetail({ match }) {
  const { id: countryId } = match.params
  const { account } = useWallet()
  const country = useCountry(countryId, account)

  const countryDetail = useCountryDetails(countryId)
  console.log("useCountryDetails", countryDetail)

  return (
    <>
      <Header
        primary={country.name}
        secondary={
          <div
            css={`
              display: flex;
              align-items: center;
            `}
          >
            <Button
              label="View uni pool"
              mode="strong"
              href=""
              target="_blank"
            />
          </div>
        }
      />
      <SplitHalf
        left={
          <>
            <Chart />
            <Box>Details</Box>
          </>
        }
        right={
          <>
            <SplitHalf
              left={<Box heading="Your liquidity deposits">44.45</Box>}
              right={<Box heading="Your num rewards">234.04</Box>}
            />
            <Boost />
            <Stake />
            <Lock />
          </>
        }
      />
    </>
  )
})

export default CountryDetail
