import styled, { css, keyframes } from 'styled-components'
import { Box, Card } from '@pancakeswap-libs/uikit'

export const StyledCard = styled(Card) <{ isStaking?: boolean; isFinished?: boolean }>`
  max-width: 280px;
  margin: 0;
  background: ${(props) => props.theme.card.background};
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

  ${({ theme }) => `background: ${(props) => props.theme.card.background};`}

  ${({ theme }) => theme.mediaQueries.xs} {
    margin: 0 12px 46px;
    max-width: 352px;
  }
`

export const StyledCardInner = styled(Box)`
  background: ${({ theme }) => theme.card.background};
  border-radius: ${({ theme }) => theme.radii.card};
`

export const StyledProductCard = styled(Card)`
  margin: 0;
  background: ${(props) => props.theme.card.background};
  border-radius: 16px;
  display: flex;
  color: ${({ theme }) => theme.colors.secondary};
  box-shadow: '0px 2px 12px -8px rgb(59 183 143), 0px 1px 1px rgb(194 206 153)';
  flex-direction: column;
  align-self: baseline;
  position: relative;
  align-self: start;

  ${({ theme }) => `background: ${(props) => props.theme.card.background};`} 
`

export default StyledCard
