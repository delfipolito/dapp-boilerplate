import React from 'react'
import { GU, textStyle, Card, CardLayout } from '@aragon/ui'
import tvl from '../../assets/tvl.svg'
import marketCap from '../../assets/marketCap.svg'
import tradingVolume from '../../assets/tradingVolume.svg'
import tokenPrice from '../../assets/tokenPrice.svg'
import { useNumTokenPrice } from '../../hooks/useCountry'

function Welcome() {
  const numTokenPrice = useNumTokenPrice()
  console.log("NUM", numTokenPrice)
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
            src={tvl}
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
            $905.028.756
          </div>
        </Card>
        <Card
          css={`
            background-image: linear-gradient(135deg, #00c2ff73, #01e8f775);
          `}
        >
          <img
            alt=""
            src={tradingVolume}
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
            $150.555.094
          </div>
        </Card>
        <Card
          css={`
            background-image: linear-gradient(135deg, #00c2ff73, #01e8f775);
          `}
        >
          <img
            alt=""
            src={tokenPrice}
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
            $0.91
          </div>
        </Card>
        <Card
          css={`
            background-image: linear-gradient(135deg, #00c2ff73, #01e8f775);
          `}
        >
          <img
            alt=""
            src={marketCap}
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
            $910.080.990
          </div>
        </Card>
      </CardLayout>
    </div>
  )
}

export default Welcome
