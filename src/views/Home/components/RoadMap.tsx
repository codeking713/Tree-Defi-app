import React from 'react'
import { stubFalse } from 'lodash' // stubTrue
import { Card, CardBody, Heading, ArrowForwardIcon, Flex, Text } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import { Chrono } from 'react-chrono'
import { TranslateString } from 'utils/translateTextHelpers'
// import Title from 'views/Ifos/components/Title'
import { NavLink } from 'react-router-dom'

const StyledRoadMapCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 100%;
  text-align: center;
  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`

const RoadMap = () => {
  const TIMELINE = {
    en: [
      {
        title: 'RELEASED',
        cardTitle: 'Released Features',
        cardSubtitle: 'The fruits of our labour 🍉',
        cardDetailedText: [
          'TechRate Audit Passed - Listed on CoinMarketcap - Listed on DappRadar - Listed on Coingecko - GreenWheel Game - BSC News Article - Youtube Marketing - Meme of the day - Crypto Governance - NFTrees Alpha Release - API DefiStation - UI v 1.5 - AutoCompound - Automatic TPT - New SEED Token Design - AutoCompound',
        ],
      },
      {
        title: 'IN PROGRESS',
        cardTitle: 'Features On Going',
        cardSubtitle: 'We are taking care of our trees to make them flourish 🌳',
        cardDetailedText: [
          'Proprietary AMM - NFTrees Improvements - ESP/CN Communities - NFTrees Marketplace - IFO - Whitepaper V2.0 - Website V2.0',
        ],
      },
      {
        title: 'MEDIUM TERM',
        cardTitle: 'Planned for next month',
        cardSubtitle: 'What you will find in our garden 👨‍🌾',
        cardDetailedText: [
          'Referreal Programm - UI V2.0 ( SEED/TREE dashboard, LP Realtime Value, Custom UI) - Price Predition Game - CoinFlip Game - 50.000 Planted Tree - Harvest Guard',
        ],
      },
      {
        title: 'LONG TERM',
        cardTitle: 'Planned for next 3 months',
        cardSubtitle: 'Every forest needs time to grow 🦁',
        cardDetailedText: [
          'NFTrees Creator Online ( Create your custom tree and link it to a real planted tree ) - IEO ( Initial Eco Offering - To pledge ecofriendly initiatives ) - EcoMarketplace ( To exchange initiative based NFT ) - Certik Audit - (when) Binance Listing',
        ],
      },
    ],
  }
  return (
    <StyledRoadMapCard>
      <CardBody>
        <div className="update-tag">UPDATED</div>
        <Heading size="lg" mb="36px">
          {TranslateString(999, 'Road Map')}
        </Heading>
        <Chrono
          cardHeight={10}
          // cardWidth={300}
          items={TIMELINE.en}
          mode="HORIZONTAL"
          hideControls={stubFalse()}
          useReadMore={stubFalse()}
          scrollable={{ scrollbar: true }}
          theme={{
            primary: '#3bb78f',
            secondary: 'transparent',
            cardBgColor: 'transparent',
            cardForeColor: '#3C4858',
          }}
        >
          <div className="chrono-icons">
            <div className="dot red">
              <span>
                <span> </span>
              </span>
            </div>
            <div className="dot green">
              <span>
                <span> </span>
              </span>
            </div>
            <div className="dot red">
              <span>
                <span> </span>
              </span>
            </div>
            <div className="dot red">
              <span>
                <span> </span>
              </span>
            </div>
            <div className="dot yellow">
              <span>
                <span> </span>
              </span>
            </div>
          </div>
        </Chrono>
        <Flex style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <Text>Discover the roadmap status</Text>
          <NavLink
            exact
            activeClassName="active"
            to="/roadmap"
            id="roadmap-cta"
            style={{ marginLeft: '5px', marginBottom: '-2.5px' }}
          >
            <ArrowForwardIcon mt={30} color="primary" />
          </NavLink>
        </Flex>
      </CardBody>
    </StyledRoadMapCard>
  )
}

export default RoadMap
