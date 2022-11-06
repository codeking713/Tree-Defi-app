import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { LinkExternal, Text } from '@pancakeswap-libs/uikit'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { communityFarms } from 'config/constants'
import { CommunityTag, DualTag, NoFeeTag } from 'components/Tags'

import HarvestAction from './HarvestAction'
import StakedAction from './StakedAction'
import Apr, { AprProps } from '../Apr'
import Multiplier, { MultiplierProps } from '../Multiplier'
import Liquidity, { LiquidityProps } from '../Liquidity'
import DepositFee from '../DepositFee'

export interface ActionPanelProps {
  apr: AprProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  details: FarmWithStakedValue
}

const Container = styled.div`
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  padding: 24px;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    padding: 16px 32px;
  }
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
`

const StakeContainer = styled.div`
  color: ${({ theme }) => theme.colors.text};
  align-items: center;
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
  }
`

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 16px;
  }

  > div {
    height: 24px;
    padding: 0 6px;
    font-size: 14px;
    margin-right: 4px;

    svg {
      width: 14px;
    }
  }
`

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
  }
`

const InfoContainer = styled.div`
  min-width: 200px;
`

const ValueContainer = styled.div`
  display: block;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0px;
`

const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({ details, apr, multiplier, liquidity }) => {
  const farm = details

  const TranslateString = useI18n()
  const isActive = farm.multiplier !== '0X'
  const { dual } = farm
  const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses, tokenSymbol, depositFeeBP } = details
  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')
  const lpAddress = farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const bsc = `https://bscscan.com/address/${lpAddress}`
  // const info = `https://pancakeswap.info/pair/${lpAddress}`
  const isCommunityFarm = communityFarms.includes(tokenSymbol)

  let getLink = ''
  if (farm.isTokenOnly) {
    getLink = `https://exchange.treedefi.com/#/swap?outputCurrency=${tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
  } else if (lpLabel.indexOf('SLIME') >= 0) {
    getLink = `https://dex.slime.finance/#/add/${getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses: { 56: '0x23b06097F8FE2DD9D3dF094D3ee8319Daa8756c1' } })}`
  } else if (lpLabel.indexOf('INDA') >= 0) {
    getLink = `https://exchange.pancakeswap.finance/#/swap?outputCurrency=0xc878a79b63a41a831e469ae1a830a765efd9d468`
  } else {
    getLink = `https://exchange.treedefi.com/#/add/${getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })}`
  }

  return (
    <Container>
      <InfoContainer>
        {isActive && (
          <StakeContainer>
            <StyledLinkExternal href={getLink}>
              {TranslateString(999, `Get ${lpLabel}`)}
            </StyledLinkExternal>
          </StakeContainer>
        )}
        <StyledLinkExternal href={bsc}>{TranslateString(999, 'View on BscScan')}</StyledLinkExternal>
        {/* <StyledLinkExternal href={info}>{TranslateString(999, 'See Pair Info')}</StyledLinkExternal> */}
        <TagsContainer>
          {depositFeeBP === 0 ? <NoFeeTag /> : null}
          {isCommunityFarm ? <CommunityTag /> : null}
          {dual ? <DualTag /> : null}
        </TagsContainer>
      </InfoContainer>
      <ValueContainer>
        <ValueWrapper>
          <Text>{TranslateString(736, 'APR')}</Text>
          <Apr {...apr} />
        </ValueWrapper>
        <ValueWrapper>
          <Text>{TranslateString(999, 'Multiplier')}</Text>
          <Multiplier {...multiplier} />
        </ValueWrapper>
        <ValueWrapper>
          <Text>{TranslateString(999, 'Liquidity')}</Text>
          <Liquidity {...liquidity} />
        </ValueWrapper>
        <ValueWrapper>
          <Text>{TranslateString(999, 'DepositFee')}</Text>
          <DepositFee depositFee={depositFeeBP} />
        </ValueWrapper>
      </ValueContainer>
      <ActionContainer>
        <HarvestAction {...farm} />
        <StakedAction {...farm} />
      </ActionContainer>
    </Container>
  )
}

export default ActionPanel
