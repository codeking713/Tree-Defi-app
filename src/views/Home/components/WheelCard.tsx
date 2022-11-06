import React from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon } from '@pancakeswap-libs/uikit'
import { NavLink } from 'react-router-dom'
import useWheelTotalPrizeUsd from 'hooks/useWheelTotalPrizeUsd'

const StyledFarmStakingCard = styled(Card)`
  background-image: url(/images/greenwheel.png);
  background-repeat: no-repeat;
  background-position: top right;
  background-size: 35%;
  min-height: 80px;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
`
const WheelCard = () => {
  const WheelPrize = Math.round(useWheelTotalPrizeUsd()).toLocaleString()

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading color="contrast" size="lg">
          Spin the GreenWheel 🎡
        </Heading>
        <CardMidContent color="#0bab64" style={{ lineHeight: '4.5rem' }}>
          ${WheelPrize}
        </CardMidContent>
        <Flex justifyContent="space-between">
          <Heading color="contrast" size="lg">
            ready to be won as jackpot!
          </Heading>
          <NavLink exact activeClassName="active" to="/greenwheel" id="green-wheel-cta">
            <ArrowForwardIcon mt={30} color="primary" />
          </NavLink>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default WheelCard
