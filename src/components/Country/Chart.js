import React from 'react'
import { Box, LineChart, Button } from '@aragon/ui'

class Chart extends React.Component {
  _cachedLines = [[], [], []]

  getLines(count) {
    let lines = this._cachedLines
    if (lines[0].length < count) {
      while (lines[0].length < count) {
        lines = lines.map(values => [...values, Math.random()])
      }
    }
    this._cachedLines = lines
    return lines.map(values => values.slice(0, count))
  }

  render() {
    const lines = this.getLines(10)
    return (
      <Box>
        <LineChart lines={lines} total={10} captionsHeight={20} />
        <br />
        <div
          css={`
            display: flex;
            flex-wrap: wrap;
            gap: 35px;
            margin-bottom: 20px;
          `}
        >
          <p>Num Arg price</p>
          <p>1 dai = 160 numars</p>
        </div>
        <div
          css={`
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
          `}
        >
          <Button mode="strong">Liquidity</Button>
          <Button>Volume</Button>
        </div>
      </Box>
    )
  }
}

export default Chart
