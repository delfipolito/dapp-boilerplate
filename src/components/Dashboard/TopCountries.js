import React, { useCallback } from 'react'
import { GU, CardLayout } from '@aragon/ui'
import CountryCard from './CountryCard'
import { useHistory } from 'react-router-dom'
import { useCountries } from '../../hooks/useCountries'

function TopCountries() {
  const history = useHistory()
  const handleSelectCountry = useCallback(
    id => {
      history.push(`/countries/${id}`)
    },
    [history]
  )

  const countries = useCountries()

  return (
    <div
      css={`
        margin-top: ${3 * GU}px;
      `}
    >
      <CardLayout rowHeight={33 * GU} columnWidthMin={40 * GU}>
        {countries.map(country => {
          return (
            <CountryCard
              key={country.id}
              country={country}
              onSelectCountry={handleSelectCountry}
            />
          )
        })}
      </CardLayout>
    </div>
  )
}

export default TopCountries
