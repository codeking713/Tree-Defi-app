
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, useModal, Text } from '@pancakeswap-libs/uikit'
import { useRouteMatch, Link } from 'react-router-dom'
import { getCakeAddress, getForestAddress } from 'utils/addressHelpers'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import useRefresh from 'hooks/useRefresh'
import { getAllForestData } from 'utils/forestUtils'
import { useForest } from 'hooks/useContract'
import Countdown from 'react-countdown'
import useTokenBalance from 'hooks/useTokenBalance'
import usePastEvents from 'hooks/usePastEvents'
import BuyModal from 'views/Lottery/components/TicketCard/BuyTicketModal'
import getRpcUrl from 'utils/getRpcUrl'
import { claimForest, participateForest } from 'utils/callHelpers'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import CardValue from './CardValue'
import { usePriceCakeBusd } from '../../../state/hooks'


const StyledKingOfForestCard = styled(Card)`
  background-image: true ? url('/images/ticket-bg.svg') : '';
  background-repeat: no-repeat;
  background-position: top right;
  background-size: 50%;
  min-height: 376px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
  position: absolute;
  right: 20px;
  top: 55px;
  height: 400px;
  width: 150px;
  z-index: 1;
  @media (max-width: 480px) {
    height: 400px;
    width: 100px;
  }
`


const KingImage = styled.img`
  margin-bottom: 16px;
  position: absolute;
  right: -10px;
  bottom: 10px;
  height: 200px;
  width: 200px;
  z-index: 1;
  @media (max-width: 480px) {
    height: 150px;
    width: 150px;
    right: 0px;
    bottom: 22px;
  }
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  display: flex;
  margin-top: 24px;
  button {
    flex: 1 0 50%;
  }
`


// const ActionsClaim = styled.div`
//   display: flex;
//   margin-top: 24px;
//   button {
//     flex: 1 0 50%;
//   }
// `

const formatWins = (wins) => {
  return wins.map((win) => {
    return {
      ...win,
      type: 'WIN',
      author: win.returnValues.author,
      amount: win.returnValues.amount,
    }
  })
}

const formatBids = (bids) => {
  return bids.map((bid) => {
    return {
      ...bid,
      type: 'BID',
      author: bid.returnValues.author,
      amount: bid.returnValues.amount,
    }
  })
}

const useLastEvents = () => {
  const forestContract = useForest()
  const [data, setData] = useState([])
  const { fastRefresh } = useRefresh()
  const { fetch: fetchWins } = usePastEvents(forestContract, 'OnWin')
  const { fetch: fetchBids } = usePastEvents(forestContract, 'OnBid')

  // Taking the last 40 events between wins and bids
  const fetchEvents = useCallback(async () => {
    const lastEvents = await Promise.all([fetchWins(), fetchBids()])
      .then(([wins, bids]) => {
        const events = [...formatWins(wins), ...formatBids(bids)].sort((a, b) => b.blockNumber - a.blockNumber)
        return events.slice(0, 40)
      })
      .catch((e) => {
        console.info(e)
        return []
      })

    setData(lastEvents)
  }, [fetchWins, fetchBids])

  useEffect(() => {
    fetchEvents()
  }, [fastRefresh, fetchEvents])

  return {
    winnigIds: data.find((item) => {
      return item.type === 'WIN'
    }),
  }
}

const KingOfForestCard = () => {
  const { url } = useRouteMatch()
  const TranslateString = useI18n()
  const cakeBalance = useTokenBalance(getCakeAddress())
  const forestContract = useForest()
  const [forestData, setForestData] = useState(null)
  const { ultraRefresh } = useRefresh()
  const balance = useTokenBalance(getCakeAddress(), getForestAddress(), getRpcUrl())
  const [pendingTx, setPendingTx] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)
  const { account } = useWallet()
  const kingpot = parseFloat(getFullDisplayBalance(balance))
  const seedprice = usePriceCakeBusd().toNumber()

  useEffect(() => {
    const allForestData = async () => {
      const data = await getAllForestData(forestContract, account)
      setForestData(data)
    }
    allForestData()
  }, [forestContract, ultraRefresh, account])



  const [onPresentBuy] = useModal(<BuyModal max={cakeBalance} tokenName="TREE" />)
  // Check if is time to start a new game
  const isWaitingForNextGame = forestData?.nextStartTime * 1000 > Date.now()

  // console.log('===>', forestData, 'isWaitingForNextGame', isWaitingForNextGame)

  // const isEnding = endData && endData.lastBidTime !== 0

  // const isRunning = forestData?.lastBidTime !== 0
  const bid = getBalanceNumber(new BigNumber(forestData?.bidAmount)).toFixed(10)
  const enterBattle = async () => {
    try {
      setPendingTx(true)
      await participateForest(forestContract, bid, account)
      setPendingTx(false)
    } catch (e) {
      console.error(e)
      setPendingTx(false)
    }
  }

  const onClaim = async () => {
    setIsClaiming(true)
    try {
      await claimForest(forestContract, account)
    } catch (e) {
      console.error(e)
    }
    setIsClaiming(false)
  }

  const { winnigIds } = useLastEvents()
  return (
    <StyledKingOfForestCard>
      {forestData && (
        <CardBody>
          {isWaitingForNextGame ? (
            <>
              <Heading size="xl">{TranslateString(10009, 'Next Round In')}:</Heading>
              <KingImage src="/images/TreeKing.gif" alt="battle logo" />
              <Text fontSize="60px" mb="10px">
                <Countdown key={forestData?.nextStartTime} date={forestData?.nextStartTime * 1000} />
                <br />
              </Text>
              <Text bold mb="10px">
                {TranslateString(999, "The King's Next Treasure")}
                <CardValue value={parseFloat(getFullDisplayBalance(balance))} decimals={2} postFix="SEED" />
                <Label>~${(seedprice * kingpot).toFixed(2)}</Label>
              </Text>
              <br />
              <Text bold>
                Last King
                <Label>
                  {winnigIds?.address.slice(0, 8)}...{winnigIds?.address.slice(-8)}
                </Label>
              </Text>
              <Actions>
                <Button id="dashboard-buy-tickets" variant="secondary" fullWidth as={Link} to={`${url}king`}>
                  {TranslateString(10008, 'Prepare for the Battle')}
                </Button>
              </Actions>
            </> 
          ) : (
            <>
              <Heading size="xl">{TranslateString(10010, 'Round Ends In')}:</Heading>
              <CardImage src="/images/green_active_battle.svg" alt="cake logo" className="apslt_img_v1" />
              <div className="battledot green">
                <span style={{ height: '100px', width: '100px' }}> </span>
              </div>
              <Text fontSize="60px" mb="10px">
                <Countdown key={forestData?.endOfAuction} date={forestData?.endOfAuction} zeroPadTime={2} daysInHours />
              </Text>
              <Text bold mb="10px">
                {TranslateString(999, "Raid The King's Treasure")}
                <CardValue value={parseFloat(getFullDisplayBalance(balance))} decimals={2} postFix="SEED" />
                <Label>~${(seedprice * kingpot).toFixed(2)}</Label>
              </Text>
              <br />
              <Text bold>
                Current King
                <Label>
                  {forestData?.lastBidder.slice(0, 8)}...{forestData?.lastBidder.slice(-8)}
                </Label>
              </Text>
              {!forestData?.hasWinner && account ? (
                <Actions>
                  <Button id="dashboard-buy-tickets" variant="primary" fullWidth onClick={enterBattle}>
                    {TranslateString(10007, 'Enter the Battle')}
                  </Button>
                </Actions>
              ) : (
                <Actions>
                  <Button
                    id="dashboard-buy-tickets"
                    variant="primary"
                    onClick={enterBattle}
                    style={{ marginRight: '8px' }}
                  >
                    {TranslateString(10007, 'Enter the Battle')}
                  </Button>
                  {forestData?.hasWinner && account && (
                    <Button onClick={onClaim} disabled={isClaiming} style={{ zIndex: 99 }}>
                      Start new game!
                    </Button>
                  )}
                </Actions>
              )}
            </>
          )}
        </CardBody>
      )}{' '}
      {!forestData && <img src="/images/green_active_battle.svg" alt="be the king" width="50%" className="preloader"/> }
    </StyledKingOfForestCard>
  )
}

export default KingOfForestCard
