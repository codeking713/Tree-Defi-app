import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit' // BaseLayout
import Container from 'components/layout/Container'
import BigNumber from 'bignumber.js'
import MoneyWheelBsc from 'moneywheel-bsc'
// import { useGetMaxBet } from 'hooks/useMaxBet'
import useTokenBalance from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import { useMoneyWheel, useCake } from 'hooks/useContract'
import Hero from './components/Hero'

const wheelsound = 'https://cdn.treedefi.com/files/wheel.mp3'

const Footer = styled.div`
  background-image: url(/images/footerbg.svg);
  background-position: bottom;
  background-repeat-x: repeat;
  background-repeat-y: no-repeat;
  padding-bottom: 17%;
  background-size: 50%;
`

const MoneyWheel: React.FC = () => {
  const tokenBalance = useTokenBalance(getCakeAddress())
  const displayBalance = tokenBalance.dividedBy(new BigNumber(10).pow(18)).toFixed(2)

  return (
    <>
      <Hero />
      <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <MoneyWheelBsc
          contract={useMoneyWheel()}
          token={useCake()}
          tokenBalance={displayBalance.toString()}
          soundUrl={wheelsound}
        />
      </div>
      <Container>
        <Card mt="24px" style={{ borderTop: '10px solid #8cc761', borderRadius: '10px' }}>
          <CardBody>
            <Heading mb="24px" size="xl">
              The Green Wheel Rules:
            </Heading>
            <Text bold>How to Play?</Text>
            <Text mb="20px">
              Bid on the number where you think the wheel will stop after the spin.
              <br />
              The multipliers are 1X, 3X, 5X, 10X, 20X, 50X!
              <br />
              Winners receive the multiplier reward + the initial bet they made.
              <br />
              You can split the bet on different numbers to step up your strategy!
              <br />
              The max allowed bet is dynamically calculated to ensure that your eventual win can be fulfilled by us.
              <br />
              10% of each lost bet will be burned, 90% will be added to the pot.
            </Text>
            <Text mb="20px" color="red" bold>
              Important Note: All bids are final. Your SEED cannot be returned after bidding.
            </Text>
          </CardBody>
        </Card>
      </Container>
      <Footer />
    </>
  )
}

export default MoneyWheel
