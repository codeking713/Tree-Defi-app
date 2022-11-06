import styled, { css, keyframes } from 'styled-components'
import { Box, Card } from '@pancakeswap-libs/uikit'

const PromotedGradient = keyframes`
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
`

export const StyledCard = styled(Card)<{ isAutoVault?: boolean; isStaking?: boolean; isFinished?: boolean }>`
  max-width: 352px;
  margin: 0 8px 24px;
  background: ${(props) => props.theme.card.background};
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  border-radius: 32px;
  display: flex;
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled' : 'secondary']};
  box-shadow: ${({ isStaking }) =>
    isStaking
      ? '0px 0px 0px 2px #53DEE9;'
      : '0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)'};
  flex-direction: column;
  align-self: baseline;
  position: relative;

  ${({ isAutoVault, theme }) =>
  isAutoVault
      ? css`
          background: linear-gradient(180deg, ${theme.colors.primaryBright}, ${theme.colors.secondary});
          padding: 1px 1px 3px 1px;
          background-size: 400% 400%;
          animation: ${PromotedGradient} 3s ease infinite;
        `
      : `background: ${(props) => props.theme.card.background};`}

  ${({ theme }) => theme.mediaQueries.sm} {
    margin: 0 12px 46px;
  }
`

export const StyledCardInner = styled(Box)<{ isAutoVault?: boolean }>`
  background: ${({ theme }) => theme.card.background};
  border-radius: ${({ isAutoVault, theme }) => (isAutoVault ? '31px' : theme.radii.card)};
`

export default StyledCard
