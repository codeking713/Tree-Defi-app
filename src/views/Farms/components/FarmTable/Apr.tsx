import React from 'react'
import styled from 'styled-components'
import ApyButton from 'views/Farms/components/FarmCard/ApyButton'
import { Address } from 'config/constants/types'
import BigNumber from 'bignumber.js'
// import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import useI18n from 'hooks/useI18n'

export interface AprProps {
  value: string
  multiplier: string
  isTokenOnly?: boolean
  lpLabel: string
  quoteTokenAdresses?: Address
  quoteTokenSymbol?: string
  tokenAddresses: Address
  cakePrice: BigNumber
  originalValue: BigNumber
  hideButton?: boolean
}

const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};

  button {
    width: 20px;
    height: 20px;

    svg {
      path {
        fill: ${({ theme }) => theme.colors.textSubtle};
      }
    }
  }
`

const AprWrapper = styled.div`
  min-width: 60px;
  text-align: left;
`

const Apr: React.FC<AprProps> = ({
  value,
  lpLabel,
  // isTokenOnly,
  quoteTokenAdresses,
  quoteTokenSymbol,
  tokenAddresses,
  cakePrice,
  originalValue,
  hideButton = false,
}) => {
  const TranslateString = useI18n()
  // const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })
  // const addLiquidityUrl = isTokenOnly
  //   ? `https://exchange.treedefi.com/#/swap/${tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
  //   : `https://exchange.treedefi.com/#/add/${liquidityUrlPathParts}`

  return originalValue.comparedTo(0) !== 0 ? (
    <Container>
      {originalValue ? (
        <>
          <AprWrapper>{value}%</AprWrapper>
          {!hideButton && (
            <ApyButton
              lpLabel={lpLabel}
              quoteTokenAdresses={quoteTokenAdresses}
              quoteTokenSymbol={quoteTokenSymbol}
              tokenAddresses={tokenAddresses}
              cakePrice={cakePrice}
              apy={originalValue}
            />
          )}
        </>
      ) : (
        <AprWrapper>{TranslateString(656, 'Loading...')}</AprWrapper>
      )}
    </Container>
  ) : (
    <Container>
      <AprWrapper>{originalValue.toFormat()}%</AprWrapper>
    </Container>
  )
}

export default Apr
