import React from 'react'
import { GU, textStyle } from '@aragon/ui'

function Welcome() {
  return (
    <div
      css={`
        margin-bottom: ${2 * GU}px;
        border-radius: ${0.5 * GU}px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      `}
    >
      <div
        css={`
          padding: ${4 * GU}px;
          width: 550px;
        `}
      >
        <h1
          css={`
            ${textStyle('title1')}
            font-weight: 200;
            margin-bottom: ${1 * GU}px;
          `}
        >
          Welcome
        </h1>
      </div>
    </div>
  )
}

export default Welcome
