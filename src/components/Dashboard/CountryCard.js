import React, { useCallback } from 'react'
import { textStyle, Card } from '@aragon/ui'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { useCountryDetails } from '../../hooks/useCountry'

function CountryCard({ country, onSelectCountry }) {
  const { id, name, flag } = country
  const countryDetail = useCountryDetails(id)

  const handleClick = useCallback(() => {
    onSelectCountry(id)
  }, [id, onSelectCountry])

  return (
    <Card onClick={handleClick}>
      <img
        alt=""
        src={flag}
        css={`
          height: 60px;
          margin-bottom: 10px;
        `}
      />
      <div
        css={`
          margin-bottom: -5px;
          ${textStyle('title3')}
        `}
      >
        {name}
      </div>
      <div
        css={`
          width: 100%;
          margin: 30px 20px 10px;
        `}
      >
        {countryDetail && (
          <>
            <Item>
              <h1>APY:</h1>
              <p>{countryDetail.apy}</p>
            </Item>
            <Item>
              <h1>tokenReward:</h1>
              <p>{countryDetail.tokenReward}</p>
            </Item>
            <Item>
              <h1>fees:</h1>
              <p>{countryDetail.fees}</p>
            </Item>
            <Item>
              <h1>totalLiquidity:</h1>
              <p>{countryDetail.totalLiquidity}</p>
            </Item>
          </>
        )}
      </div>
    </Card>
  )
}

const Item = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin: auto;
`

export default CountryCard
