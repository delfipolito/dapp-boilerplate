import React from 'react'
import { Box, Button } from '@aragon/ui'

function Boost() {
  return (
    <Box>
      <div
        css={`
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        `}
      >
        <h1>FarmBoost</h1>
        <div>1,321.00 Avaliable DAI</div>
        <Button mode="strong">Boost</Button>
      </div>
    </Box>
  )
}

export default Boost
