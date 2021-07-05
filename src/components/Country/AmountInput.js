import React from 'react'
import { TextInput, GU } from '@aragon/ui'
import daiToken from '../../assets/dai.svg'

function AmountInput({ value, onChange, placeholder }) {
  return (
    <TextInput
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      wide
      adornment={
        <>
          <img
            src={daiToken}
            css={`
              height: 27px;
              margin-top: -2px;
            `}
          />
          <p
            css={`
              margin: 0 0px 0 10px;
            `}
          >
            DAI
          </p>
        </>
      }
      adornmentPosition="end"
      adornmentSettings={{
        padding: 2 * GU,
      }}
      css={`
        font-size: 18px;
        height: 56px;
        padding-left: 20px;
        padding-right: 20px;
        border-radius: ${0.75 * GU}px;
      `}
    />
  )
}

export default AmountInput
