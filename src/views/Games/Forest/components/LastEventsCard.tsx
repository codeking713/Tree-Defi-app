
import React, { useCallback, useEffect, useState } from 'react'
import { useForest } from 'hooks/useContract'
import useRefresh from 'hooks/useRefresh'
import usePastEvents from 'hooks/usePastEvents'
import styled from 'styled-components'

import { Card, CardBody, Flex, Heading, Link, Text } from '@pancakeswap-libs/uikit'
import { getFullDisplayBalance } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import CardValue from 'views/Home/components/CardValue'
import QuestionHelper from 'components/QuestionHelper'

const StyledCard = styled(Card)``

const QuesionHelperPositioner = styled.div`
  margin-top: 10px;
  margin-right: 10px;
  float: right;
`

const Events = styled.div`
  max-height: 300px;
  overflow-y: auto;
`

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

// const formatCollapses = (collapses) => {
//   return collapses.map((collapse) => {
//     return {
//       ...collapse,
//       type: 'COLLAPSE',
//       author: '0x000000000000000000000000000000000000dEaD',
//       amount: collapse.returnValues.amount,
//     }
//   })
// }

const useLastEvents = () => {
  const forestContract = useForest()
  const [data, setData] = useState([])
  const { fastRefresh } = useRefresh()
  const { loading: loadingWins, fetch: fetchWins } = usePastEvents(forestContract, 'OnWin')
  const { loading: loadingBids, fetch: fetchBids } = usePastEvents(forestContract, 'OnBid')

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

  const loading = loadingWins || loadingBids
  useEffect(() => {
    fetchEvents()
  }, [fastRefresh, fetchEvents])
  
  return {
    loading,
    data,
  }

}

const LastEventsCard = () => {
  const { data } = useLastEvents()
  return (
    <StyledCard>
      <QuesionHelperPositioner>
        <QuestionHelper text="This card showcases all of the previous bid and winners of king of the forest." />
      </QuesionHelperPositioner>
      <CardBody>
        <Heading size="xl" mb="24px">
          Previous events
        </Heading>
        {data.length ? <Events>
          {data.map((event) => {
            return (
              <Flex key={event.transactionHash} alignItems="center" justifyContent="space-between" mb="10px">
                <Flex alignItems="center">
                  <Link marginRight="20px" href={`https://bscscan.com/tx/${event.transactionHash}`} external>
                    Tx: {event.transactionHash.slice(0, 5)}...{event.transactionHash.slice(-5)}
                  </Link>
                  <Text>{event.type}</Text>
                </Flex>
                <CardValue
                  value={parseFloat(getFullDisplayBalance(new BigNumber(event.amount)))}
                  postFix="SEED"
                  decimals={4}
                  fontSize="16px"
                  paddingRight="10px"
                />
              </Flex>
            )
          })}
        </Events> : 'There\'s no recent events'}
        
      </CardBody>
    </StyledCard>
  )
}

export default LastEventsCard
