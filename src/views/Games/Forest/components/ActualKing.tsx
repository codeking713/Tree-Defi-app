import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit'
import { useForest } from 'hooks/useContract'
import { claimForest } from 'utils/callHelpers'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import QuestionHelper from 'components/QuestionHelper'

const StyledCard = styled(Card)`
  background-image: url(/images/forest/last_king2.gif);
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;
`

const QuesionHelperPositioner = styled.div`
  margin-top: 10px;
  margin-right: 10px;
  float: right;
`

const ActualKing = ({ lastBidder, hasWinner }) => {
  const { account } = useWallet()
  const forestContract = useForest()
  const [isClaiming, setIsClaiming] = useState(false)
  const onClaim = async () => {
    setIsClaiming(true)
    try {
      await claimForest(forestContract, account)
    } catch (e) {
      console.error(e)
    }
    setIsClaiming(false)
  }

  return (
    <StyledCard>
      <QuesionHelperPositioner>
        <QuestionHelper text="This section showcases the last bidder in the current match along with the winner of the game. It also allow users to restart the game." />
      </QuesionHelperPositioner>
      <CardBody>
        <Heading size="xl" mt="10px" mb="40px" color="white">
          Current King
        </Heading>
        {lastBidder && (
          <Text ml="30px" color="white" fontSize="24px">
            Last bidder: {lastBidder.slice(0, 8)}...{lastBidder.slice(-8)}
          </Text>
        )}
        <Text marginTop="20px">
          {hasWinner && account && (
            <Button onClick={onClaim} disabled={isClaiming} mt="20px" fullWidth>
              Restart Game
            </Button>
          )}
        </Text>
      </CardBody>
    </StyledCard>
  )
}

export default ActualKing
