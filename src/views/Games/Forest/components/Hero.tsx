import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from '@pancakeswap-libs/uikit'
// import { useGetMaxBet } from 'hooks/useMaxBet'
// import { useMoneyWheel, useCake } from 'hooks/useContract'
import useI18n from 'hooks/useI18n'
import Container from 'components/layout/Container'
import king from '../../../../assets/img/king.png'

const Title = styled(Heading).attrs({ as: 'h1', size: 'xl' })`
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 24px;
`

const Blurb = styled(Text)`
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
`

const StyledHero = styled.div`
  background: linear-gradient(rgb(142 199 97) 0%, rgb(59 183 143) 76.22%);
  padding-bottom: 40px;
  padding-top: 40px;
  margin-bottom: 2em;
`

const StyledContainer = styled(Container)`
  display: flex;

  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
  }
`

const LeftWrapper = styled.div`
  flex: 1;
  padding-right: 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-right: 32px;
  }
`

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding-left: 0;
  margin-top: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 0;
    padding-left: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 32px;
  }
`

const Hero = () => {
  const TranslateString = useI18n()

  return (
    <StyledHero>
      <StyledContainer>
        <LeftWrapper>
          <Title style={{ color: 'white' }}>{TranslateString(999, 'KING of the Forest 🦁')}</Title>
          <Blurb>{TranslateString(999, 'Battle other users to become the new king !')}</Blurb>
          <h4 style={{ color: 'white' }}>{TranslateString(999, 'Win 60% of the pot, next pot 20%, burn 15%, treasury address 5%')}</h4>
        </LeftWrapper>
        <RightWrapper>
        <img src={king} alt="greenwheel" style={{ width: '35%', marginTop: '-20px', display: 'block' }} />
        </RightWrapper>
      </StyledContainer>
    </StyledHero>
  )
}

export default Hero
