
import React from 'react'
import styled from 'styled-components'
import Countdown from 'react-countdown'
import { Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
// import { claimForest } from 'utils/callHelpers'
// import { useForest } from 'hooks/useContract'
import useTokenBalance from 'hooks/useTokenBalance'
// import  IsMute  from 'hooks/useSound'
import { getCakeAddress, getForestAddress } from 'utils/addressHelpers'
import { usePriceCakeBusd } from 'state/hooks'
import CardValue from 'views/Home/components/CardValue'
import { getFullDisplayBalance } from 'utils/formatBalance'
// import useRefresh from 'hooks/useRefresh'
import getRpcUrl from 'utils/getRpcUrl'
import UnlockButton from 'components/UnlockButton'
import QuestionHelper from 'components/QuestionHelper'
// import useSound from 'use-sound'


const StyledCard = styled(Card)`
  min-height: 365px;
  background-image: url(/images/forest/ForestBackground6.gif);
  background-position: center right;
  background-repeat: repeat;
  background-size: cover;
`

const Adventure = styled.div`
    font-family: 'Adventure';
    background: -webkit-linear-gradient(#c91919, #f5ff00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`

const QuesionHelperPositioner = styled.div`
  margin-top: 10px;
  margin-right: 10px;
  float: right;
`

interface TillCollapseCardProps {
  hasWinner,
  nextStartTime,
  lastBidTime,
  endOfAuction,
}

const TillCollapseCard: React.FC<TillCollapseCardProps> = ({ hasWinner, nextStartTime, lastBidTime, endOfAuction }) => {
  // const forestContract = useForest()
  const balance = useTokenBalance(getCakeAddress(), getForestAddress(), getRpcUrl())
  const seedPriceInUsd = usePriceCakeBusd()
  // const mute = IsMute()
  const balanceInUsd = balance.multipliedBy(seedPriceInUsd)
  // const [play,{isPlaying,stop}] = useSound('/sounds/game.mp3',{soundEnabled : mute })
  // const [isClaiming, setIsClaiming] = useState(false)
  const { account } = useWallet()
  // const onClaim = async () => {
  //   setIsClaiming(true)
  //   try {
  //     await claimForest(forestContract, account)  
  //   } catch (e) {
  //     console.error(e)
  //   }
  //   setIsClaiming(false)
  // }

  // Check if is time to start a new game
  const isWaitingForNextGame = nextStartTime * 1000 > Date.now()

  // const isEnding = endData && endData.lastBidTime !== 0
  const isRunning = lastBidTime !== 0

  // play sound when next Round is within 30 sec
  // if(nextStartTime * 1000 - Date.now() < 30000 && !isPlaying) {
  //   play()
  // } else if(nextStartTime * 1000 - Date.now() < 0 && isPlaying) {
  //   stop()
  // }
  
  // DEBUG DATA
  // const obj = { isWaitingForNextGame, isRunning, hasWinner, nextStartTime, lastBidTime, endOfAuction }
  // console.log('DEBUG FOREST DATA =>', obj)

  return (
    <StyledCard>
      <QuesionHelperPositioner>
        <QuestionHelper text="This is the main header of the game, showcasing the current status of the game along with the countdown." />
      </QuesionHelperPositioner>
      <CardBody>
        {isWaitingForNextGame ? (
          <Text fontSize="60px" mb="10px" color="white">
            <Adventure>Next Round</Adventure>
            <Countdown date={nextStartTime * 1000}/>
            <br/>
            <Text fontSize="30px" color="white">Prepare for battle!</Text>
          </Text>
        ) : (
          <>
            <Heading size="xl" mb="10px" color="white">
              Round status
            </Heading>
            {isRunning ? (
              <div>
              <Text fontSize="60px" mb="10px" color="white">
                {hasWinner ? <Adventure>Waiting for claim</Adventure> : <Countdown key={endOfAuction} date={endOfAuction}/>}
              </Text>
              </div>
            ) : (
              <div>
              
              <Text  fontSize="60px" mb="10px" color="white">
                <Adventure>Waiting for Bids</Adventure>
              </Text>
              </div>
            )}
            <Heading size="xl" mb="10px" color="white">
              Pot
              <CardValue value={parseFloat(getFullDisplayBalance(balance))} decimals={2} postFix="SEED" color="white"/>
              <CardValue
                value={parseFloat(getFullDisplayBalance(balanceInUsd))}
                prefix="~$"
                decimals={2}
                fontSize="24px"
                color="white"
              />
            </Heading>
          </>
        )}
        <Text marginTop="20px">
          {!account && <UnlockButton mr="10px" mt="20px" />}
          {/* hasWinner && account && (
            <Button ml="10px" onClick={onClaim} disabled={isClaiming} mt="20px">
              Restart Game
            </Button>
          ) */}
        </Text>
      </CardBody>
    </StyledCard>
  )
}

export default TillCollapseCard
