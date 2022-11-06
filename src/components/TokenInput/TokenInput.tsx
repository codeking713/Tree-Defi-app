import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js/bignumber'
import { Button, Flex } from '@pancakeswap-libs/uikit'
import { useGetPairsInfo, useGetTokensInfo } from 'hooks/useInfoApi'
import useI18n from '../../hooks/useI18n'
import Input, { InputProps } from '../Input'

interface TokenInputProps extends InputProps {
  max: number | string
  symbol: string
  onSelectMax?: () => void
  depositFeeBP?: number
  isTokenOnly?: boolean
}

const TokenInput: React.FC<TokenInputProps> = ({
  max,
  symbol,
  onChange,
  onSelectMax,
  value,
  depositFeeBP = 0,
  isTokenOnly,
}) => {
  const TranslateString = useI18n()
  let price = 0.0
  const tokensData = useGetTokensInfo()
  const pairsData = useGetPairsInfo()

  if (depositFeeBP > 0) {
    if (isTokenOnly) {
      if (tokensData?.data) {
        const tokenKey = Object.keys(tokensData?.data).find((key) => {
          const tokenData = tokensData.data[key]
          return tokenData.symbol?.toUpperCase() === symbol?.toUpperCase()
        })

        price = tokenKey ? parseFloat(tokensData.data[tokenKey].price) : 0
      }
    } else if (pairsData?.data) {
      const pairKey = Object.keys(pairsData?.data).find((key) => {
        const pairData = pairsData.data[key]
        const lpSymbol = `${pairData.base_symbol === 'WBNB' ? 'BNB' : pairData.base_symbol}-${
          pairData.quote_symbol === 'WBNB' ? 'BNB' : pairData.quote_symbol
        } LP`
        return lpSymbol.toUpperCase() === symbol?.toUpperCase()
      })

      // console.log(pairsData.data[pairKey])
      price = pairKey ? parseFloat(pairsData.data[pairKey].price) : 0
    }
  }

  return (
    <StyledTokenInput>
      <StyledMaxText>
        {max.toLocaleString()} {symbol} {TranslateString(526, 'Available')}
      </StyledMaxText>
      <Input
        endAdornment={
          <StyledTokenAdornmentWrapper>
            <StyledTokenSymbol>{symbol}</StyledTokenSymbol>
            <StyledSpacer />
            <div>
              <Button size="sm" onClick={onSelectMax}>
                {TranslateString(452, 'Max')}
              </Button>
            </div>
          </StyledTokenAdornmentWrapper>
        }
        onChange={onChange}
        placeholder="0"
        value={value}
      />
      {depositFeeBP > 0 ? (
        <Flex justifyContent="space-between">
          <StyledMaxText>
            {TranslateString(10001, 'Deposit Fee')}: {new BigNumber(value || 0).times(depositFeeBP / 10000).toFixed(2)}{' '}
            {symbol}
          </StyledMaxText>
          <StyledMaxText>
            {TranslateString(999, 'You are helping planting')}: {new BigNumber(value || 0).times(depositFeeBP / 10000).times(price).div(6).toFixed(2)} {TranslateString(999, 'tree')}
          </StyledMaxText>
        </Flex>
      ) : null}
    </StyledTokenInput>
  )
}

const StyledTokenInput = styled.div``

const StyledSpacer = styled.div`
  width: ${(props) => props.theme.spacing[3]}px;
`

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`

const StyledMaxText = styled.div`
  align-items: center;
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  font-size: 13px;
  font-weight: 700;
  height: 44px;
  justify-content: flex-end;
  padding-left: 15px;
  padding-right: 15px;
`

const StyledTokenSymbol = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 700;
`

export default TokenInput
