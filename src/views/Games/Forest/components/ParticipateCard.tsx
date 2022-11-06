import React, { useState, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { Button, Card, CardBody, Flex, Heading, Text } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useForest } from 'hooks/useContract'
import { getFullDisplayBalance, getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import { useForestApprove } from 'hooks/useApprove'
import { useForestAllowance } from 'hooks/useAllowance'
import UnlockButton from 'components/UnlockButton'
import useTokenBalance from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import { participateForest } from 'utils/callHelpers'
import QuestionHelper from 'components/QuestionHelper'
import WoodButton from './WoodButton'

const StyledTokenViewer = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.colors.input};
  border-radius: ${(props) => props.theme.radii.default};
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 72px;
  padding: 0 ${(props) => props.theme.spacing[3]}px;
`

const StyledCard = styled(Card)``
interface ParticipateCardProps {
  hasWinner: boolean
  nextStartTime: number
  bidAmount: string
  lastWinner: string
  isBanned: boolean
}

const QuesionHelperPositioner = styled.div`
  margin-top: 10px;
  margin-right: 10px;
  float: right;
`
const ParticipateCard: React.FC<ParticipateCardProps> = ({
  hasWinner,
  nextStartTime,
  bidAmount,
  lastWinner,
  isBanned,
}) => {
  const forestContract = useForest()
  const max = useTokenBalance(getCakeAddress())
  const allowance = useForestAllowance()
  const { onApprove } = useForestApprove()
  const { account } = useWallet()
  const [pendingTx, setPendingTx] = useState(false)

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const bid = getBalanceNumber(new BigNumber(bidAmount)).toFixed(10)

  const onSubmit = async () => {
    try {
      setPendingTx(true)
      await participateForest(forestContract, bid, account)
      setPendingTx(false)
    } catch (e) {
      console.error(e)
      setPendingTx(false)
    }
  }

  const handleApprove = useCallback(async () => {
    try {
      setPendingTx(true)
      await onApprove()
      setPendingTx(false)
    } catch (e) {
      console.error(e)
      setPendingTx(false)
    }
  }, [onApprove])

  const isWaitingForNextGame = nextStartTime * 1000 > Date.now()

  const BidButton = () => {
    if (isBanned)
      return (
        <Text color="red" fontSize="24px">
          Your account is banned.
        </Text>
      )

    if (lastWinner === account)
      return (
        <Text color="red" fontSize="24px">
          Last round winner can not bid.
        </Text>
      )

    if (hasWinner) return <WoodButton onBid={onSubmit} disabled text="Waiting for Claim" />

    return <WoodButton onBid={onSubmit} disabled={pendingTx || isWaitingForNextGame} text="Bid Now" />
  }

  return (
    <StyledCard>
      <QuesionHelperPositioner>
        <QuestionHelper text="This is the bidding card, where you can enter your seed to partecipate in the current match. Remember to prepare your bid before hand, taking into account about 10 seconds of BSC lag." />
      </QuesionHelperPositioner>
      <CardBody>
        <Heading size="xl" mb="24px">
          Bid Now!
        </Heading>

        {!account ? (
          <UnlockButton />
        ) : (
          <>
            <StyledTokenViewer>
              <Text color="primary" fontSize="24px">
                {parseFloat(bid).toFixed(1)} SEED
              </Text>
              <Text color="primary" bold fontSize="16px">
                your balance {parseFloat(fullBalance).toFixed(2)} SEED
              </Text>
            </StyledTokenViewer>
            <Flex mt="20px">
              {!allowance.toNumber() ? (
                <Button onClick={handleApprove} variant="secondary" fullWidth disabled={pendingTx}>
                  Approve contract
                </Button>
              ) : (
                <BidButton />
              )}
            </Flex>
          </>
        )}
      </CardBody>
    </StyledCard>
  )
}

export default ParticipateCard
