import React from 'react'
import { GU, textStyle, Card, CardLayout } from '@aragon/ui'
import tvlImage from '../../assets/tvl.svg'
import marketCapImage from '../../assets/marketCap.svg'
import tradingVolumeImage from '../../assets/tradingVolume.svg'
import tokenPriceImage from '../../assets/tokenPrice.svg'
import { useNumTokenPrice, useTvl, useTradingVolume, useMarketCap } from '../../hooks/useCountry'

function Welcome() {
  const numTokenPrice = useNumTokenPrice()
  const tvl = useTvl()
  const tradingVolume = useTradingVolume()
  const marketCap = useMarketCap()
  console.log("WELCOME", numTokenPrice, tvl)
  return (
    <div
      css={`
        margin-top: ${3 * GU}px;
      `}
    >
      <CardLayout rowHeight={18 * GU} columnWidthMin={31 * GU}>
        <Card
          css={`
            background-image: linear-gradient(135deg, #00c2ff73, #01e8f775);
          `}
        >
          <img
            alt=""
            src={tvlImage}
            css={`
              height: 40px;
              margin-bottom: 10px;
            `}
          />
          <div
            css={`
              margin-bottom: -5px;
              ${textStyle('title4')}
            `}
          >
            TVL
          </div>
          <div
            css={`
              margin-bottom: -5px;
              ${textStyle('body2')}
            `}
          >
            {tvl ? '$ ' + tvl : '-'}
          </div>
        </Card>
        <Card
          css={`
            background-image: linear-gradient(135deg, #00c2ff73, #01e8f775);
          `}
        >
          <img
            alt=""
            src={tradingVolumeImage}
            css={`
              height: 40px;
              margin-bottom: 10px;
            `}
          />
          <div
            css={`
              margin-bottom: -5px;
              ${textStyle('title4')}
            `}
          >
            Trading volume
          </div>
          <div
            css={`
              margin-bottom: -5px;
              ${textStyle('body2')}
            `}
          >
            {tradingVolume ? '$ ' + tradingVolume : '-'}
          </div>
        </Card>
        <Card
          css={`
            background-image: linear-gradient(135deg, #00c2ff73, #01e8f775);
          `}
        >
          <img
            alt=""
            src={tokenPriceImage}
            css={`
              height: 40px;
              margin-bottom: 10px;
            `}
          />
          <div
            css={`
              margin-bottom: -5px;
              ${textStyle('title4')}
            `}
          >
            Num token price
          </div>
          <div
            css={`
              margin-bottom: -5px;
              ${textStyle('body2')}
            `}
          >
            {numTokenPrice ? '$ ' + numTokenPrice : '-'}
          </div>
        </Card>
        <Card
          css={`
            background-image: linear-gradient(135deg, #00c2ff73, #01e8f775);
          `}
        >
          <img
            alt=""
            src={marketCapImage}
            css={`
              height: 40px;
              margin-bottom: 10px;
            `}
          />
          <div
            css={`
              margin-bottom: -5px;
              ${textStyle('title4')}
            `}
          >
            Market cap
          </div>
          <div
            css={`
              margin-bottom: -5px;
              ${textStyle('body2')}
            `}
          >
            {marketCap ? '$ ' + marketCap : '-'}
          </div>
        </Card>
      </CardLayout>
    </div>
  )
}

export default Welcome
