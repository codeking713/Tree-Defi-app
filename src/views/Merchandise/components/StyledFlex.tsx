import styled, { css, keyframes } from 'styled-components'
import { Box, Card } from '@pancakeswap-libs/uikit'
import FlexLayout from 'components/layout/Flex'

export const StyledFlex = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  & > * {
    min-width: 280px;
    max-width: 31.5%;
    width: 100%;
    margin: 0 8px;
    margin-bottom: 32px;
  }

  ${({ theme }) => theme.mediaQueries.xs} {
    & > * {
      margin: 0 15px 30px;
      min-width: 250px;
      max-width: 100%;
    }
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > * {
      margin: 0 8px 46px;
      max-width: calc(50% - 16px);
    }
  }
  
  ${({ theme }) => theme.mediaQueries.lg} {
    & > * {
      margin: 0 8px 46px;
      max-width: calc(33.33% - 16px);
    }
  }
`

export const StyledBanner = styled.div`
  display: flex;
  justify-content: center;
  border-top-right-radius: 32px;
  border-bottom-right-radius: 32px;

  & > * {
    min-width: 250px;
    max-width: 100%;
    width: 100%;
    margin: 0;
  }

  ${({ theme }) => theme.mediaQueries.xs} {
    & > * {
      width: 300px;
    } 
  }

  ${({ theme }) => theme.mediaQueries.md} {
    background-image: url(/images/fruit-banner.jpg);
    background-position: left;
    background-repeat: no-repeat;
    background-size: contain;
    justify-content: flex-end;

    & > * {
      min-width: 280px;
      max-width: 31.5%;  
    }
  }
`

export default StyledFlex
