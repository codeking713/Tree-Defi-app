import React from 'react'
import styled from 'styled-components'

export interface EarnedProps {
  earnings: number
  pid: number
  account: string
}

const Amount = styled.span<{ earned: number }>`
  color: ${({ earned, theme }) => (earned ? theme.colors.text : theme.colors.textDisabled)};
  display: flex;
  align-items: center;
`

const Earned: React.FunctionComponent<EarnedProps> = ({ earnings, account }) => {
  const amountEarned = account ? earnings : null
  const displayBalance = amountEarned ? amountEarned.toLocaleString() : '0'
  return <Amount earned={amountEarned}>{displayBalance}</Amount>
}

export default Earned
