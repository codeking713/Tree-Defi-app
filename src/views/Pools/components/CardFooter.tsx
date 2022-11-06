import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
// import { Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { ChevronDown, ChevronUp } from 'react-feather'
import Balance from 'components/Balance'
import { CommunityTag, CoreTag, BinanceTag, AutoTag } from 'components/Tags'
import { PoolCategory } from 'config/constants/types'
import useSound from 'use-sound'

const tags = {
  [PoolCategory.BINANCE]: BinanceTag,
  [PoolCategory.CORE]: CoreTag,
  [PoolCategory.COMMUNITY]: CommunityTag,
  [PoolCategory.AUTO]: AutoTag,
}

interface Props {
  projectLink: string
  totalStaked: BigNumber
  blocksRemaining: number
  isFinished: boolean
  blocksUntilStart: number
  poolCategory: PoolCategory
  totalBalance: number
  tokenName: string
  isAutoVault?: boolean
  performanceFee?: number
}

const StyledFooter = styled.div<{ isFinished: boolean }>`
  border-top: 1px solid ${({ theme }) => (theme.isDark ? '#524B63' : '#E9EAEB')};
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled2' : 'primary2']};
  padding: 24px;
`

const StyledDetailsButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: 0;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  display: inline-flex;
  font-size: 16px;
  font-weight: 600;
  height: 32px;
  justify-content: center;
  outline: 0;
  padding: 0;
  &:hover {
    opacity: 0.9;
  }

  & > svg {
    margin-left: 4px;
  }
`

const Details = styled.div`
  margin-top: 24px;
`

const Row = styled.div`
  align-items: center;
  display: flex;
`

const FlexFull = styled.div`
  flex: 1;
`
const Label = styled.div`
  font-size: 14px;
`
const TokenLink = styled.a`
  font-size: 14px;
  text-decoration: none;
  color: #12aab5;
`

const CardFooter: React.FC<Props> = ({
  projectLink,
  totalStaked,
  blocksRemaining,
  isFinished,
  blocksUntilStart,
  poolCategory,
  totalBalance,
  tokenName,
  isAutoVault = false,
  performanceFee
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const TranslateString = useI18n()
  const Icon = isOpen ? ChevronUp : ChevronDown

  const handleClick = () => {
    setIsOpen(!isOpen)
    play()
  }
  const Tag = tags[poolCategory]
  const [play] = useSound('/sounds/click.mp3')

  return (
    <StyledFooter isFinished={isFinished}>
      <Row>
        <FlexFull>
          <Tag />
        </FlexFull>
        <StyledDetailsButton onClick={handleClick}>
          {isOpen ? 'Hide' : 'Details'} <Icon />
        </StyledDetailsButton>
      </Row>
      {isOpen && (
        <Details>
          <Row style={{ marginBottom: '4px' }}>
            <FlexFull>
              <Label>
                <span role="img" aria-label="syrup">
                  🌱{' '}
                </span>
                {TranslateString(999, 'Total Staked:')}
              </Label>
            </FlexFull>
            <Balance fontSize="14px" isDisabled={isFinished} value={getBalanceNumber(totalStaked)} />
          </Row>
          {isAutoVault
            ? (
              <Row>
                <FlexFull>
                  <Label>
                    {TranslateString(9999, 'Performance Fee')}:
              </Label>
                </FlexFull>
                <Balance fontSize="14px" value={performanceFee || 0} decimals={0} unit="%" />
              </Row>
            ) : (
              <>
                <Row>
                  <FlexFull>
                    <Label>
                      {TranslateString(9999, 'Total ')}
                      {tokenName}:
              </Label>
                  </FlexFull>
                  <Balance fontSize="14px" isDisabled={isFinished} value={totalBalance} decimals={0} />
                </Row>
                {blocksUntilStart > 0 && (
                  <Row>
                    <FlexFull>
                      <Label>{TranslateString(9999, 'Start')}:</Label>
                    </FlexFull>
                    <Balance fontSize="14px" isDisabled={isFinished} value={blocksUntilStart} decimals={0} />
                  </Row>
                )}
                {blocksUntilStart === 0 && blocksRemaining > 0 && (
                  <Row>
                    <FlexFull>
                      <Label>{TranslateString(410, 'End')}:</Label>
                    </FlexFull>
                    <Balance fontSize="14px" isDisabled={isFinished} value={blocksRemaining} decimals={0} />
                  </Row>
                )}
              </>
            )
          }

          <TokenLink href={projectLink} target="_blank">
            {TranslateString(412, 'View project site')}
          </TokenLink>
        </Details>
      )}
    </StyledFooter>
  )
}

export default React.memo(CardFooter)
