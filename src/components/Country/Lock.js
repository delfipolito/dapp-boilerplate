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

  const handleRadioChange = useCallback(id => {
    setActiveId(id)
  }, [])

  const intervals = [1, 3, 6, 12]

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
      <RadioGroup
        onChange={handleRadioChange}
        selected={activeId}
        css={`
          display: flex;
          flex-wrap: wrap;
          gap: 25px;
          margin: 10px 0 20px 0;
        `}
      >
        {intervals.map(item => (
          <Item key={item}>
            <Radio id={String(item)} />
            {item} {item === 1 ? 'month' : 'months'}
          </Item>
        ))}
      </RadioGroup>
      <Button label="Lock" mode="strong" href="" target="_blank" />
    </Box>
  )
}

const Item = styled.label`
  display: flex;
  align-items: center;
  height: 40px;
  cursor: pointer;
  color: #000;
  &:active {
    color: #666;
  }
`

export default Lock
