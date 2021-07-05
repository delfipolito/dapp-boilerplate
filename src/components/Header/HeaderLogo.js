import React, { useCallback } from 'react'
import { GU } from '@aragon/ui'
import headerLogoSvg from '../../assets/HeaderLogo.svg'
import { useHistory } from 'react-router-dom'

function HeaderLogo() {
  const history = useHistory()
  const handleClick = useCallback(
    id => {
      history.push(`/`)
    },
    [history]
  )
  return (
    <div
      css={`
        display: flex;
        align-items: center;
        cursor: pointer;
      `}
      onClick={handleClick}
    >
      <img
        alt=""
        src={headerLogoSvg}
        width={128}
        css={`
          margin-right: ${1 * GU}px;
        `}
      />
    </div>
  )
}

export default HeaderLogo
