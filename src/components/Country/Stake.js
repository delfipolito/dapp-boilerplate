import React from 'react'
import { Box, Button } from '@aragon/ui'

function Stake() {
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
        <h1>Normal Stake</h1>
        <div>1,321.00 Avaliable LP Tokens</div>
        <Button mode="strong">Stake</Button>
      </div>
    </Box>
  )
}

export default Stake
