import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Box, Button, Radio, RadioGroup, textStyle } from '@aragon/ui'
import AmountInput from './AmountInput'

const FLOAT_REGEX = /^\d*[.]?\d*$/

function Lock() {
  const [amount, setAmount] = useState('')
  const [activeId, setActiveId] = useState('1')

  const handleAmountChange = useCallback(event => {
    const value = event.target.value
    const floatRegex = FLOAT_REGEX

    if (floatRegex.test(value)) {
      setAmount(value)
    }
  }, [])

  return (
    <Box>
      <div
        css={`
          ${textStyle('body1')}
          margin-bottom: 20px;
        `}
      >
        Lock
      </div>
      <AmountInput
        value={amount}
        onChange={handleAmountChange}
        placeholder="Enter amount to lock"
      />

      <Button
        label="Lock"
        mode="strong"
        href=""
        target="_blank"
        css={`
          margin-top: 20px;
        `}
      />
    </Box>
  )
}

export default Lock
