import React, { useMemo } from 'react'
import styled from 'styled-components'
import { HelpIcon, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { usePriceBnbBusd, usePriceCakeBusd, usePriceTreeBusd } from 'state/hooks'

import BigNumber from 'bignumber.js'
import { QuoteToken } from 'config/constants/types'
import Tooltip from '../Tooltip/Tooltip'
import { FarmWithStakedValue } from '../FarmCard/FarmCard'

export interface LiquidityProps {
  farm: FarmWithStakedValue
}

const LiquidityWrapper = styled.div`
  min-width: 110px;
  font-weight: 600;
  text-align: right;

  ${({ theme }) => theme.mediaQueries.sm} {
    text-align: left;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-left: 14px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    svg {
      margin-left: 0;
    }
  }
`

const Liquidity: React.FunctionComponent<LiquidityProps> = ({ farm }) => {
  const TranslateString = useI18n()

  const cakePrice = usePriceCakeBusd()
  const bnbPrice = usePriceBnbBusd()
  const treePrice = usePriceTreeBusd()

  const totalValue: BigNumber = useMemo(() => {
    if (!farm.lpTotalInQuoteToken) {
      return null
    }
    if (farm.quoteTokenSymbol === QuoteToken.BNB) {
      return bnbPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
      return cakePrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.TREE) {
      return treePrice.times(farm.lpTotalInQuoteToken)
    }
    return farm.lpTotalInQuoteToken
  }, [bnbPrice, cakePrice, treePrice, farm.lpTotalInQuoteToken, farm.quoteTokenSymbol])

  const totalValueFormated = totalValue
    ? `$${Number(totalValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  return (
    <Container>
      <LiquidityWrapper>
        <Text>{totalValueFormated}</Text>
      </LiquidityWrapper>
      <Tooltip content={TranslateString(999, 'The total value of the funds in this farm’s liquidity pool')}>
        <HelpIcon color="textSubtle" />
      </Tooltip>
    </Container>
  )
}

export default Liquidity
