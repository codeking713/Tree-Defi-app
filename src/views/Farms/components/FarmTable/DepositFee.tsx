import React from 'react'
import styled from 'styled-components'

export interface DepositFeeProps {
  depositFee: number
}

const Amount = styled.span`
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
`

const DepositFee: React.FunctionComponent<DepositFeeProps> = ({ depositFee }) => {
  return <Amount>{depositFee ? depositFee / 100 : '0'}%</Amount>
}

export default DepositFee
