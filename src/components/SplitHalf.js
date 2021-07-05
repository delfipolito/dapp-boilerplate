import React from 'react'
import { GU } from '@aragon/ui'

function SplitHalf({ left, right }) {
  return (
    <div
      css={`
        display: flex;
        padding-bottom: ${3 * GU}px;
        width: 100%;
      `}
    >
      <div
        css={`
          width: 100%;
          padding-right: 10px;
        `}
      >
        {left}
      </div>
      <div
        css={`
          width: 100%;
          padding-left: 10px;
        `}
      >
        {right}
      </div>
    </div>
  )
}

export default SplitHalf
