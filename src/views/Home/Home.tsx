import React from 'react'
import styled from 'styled-components'
import { BaseLayout, Link } from '@pancakeswap-libs/uikit' // Heading, Text
// import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import useTheme from 'hooks/useTheme'
import FarmStakingCard from './components/FarmStakingCard'
// import LotteryCard from './components/LotteryCard'
import CakeStats from './components/CakeStats'
import TreeStats from './components/TreeStats'
import TotalValueLockedCard from './components/TotalValueLockedCard'
import PlantedTreeCard from './components/PlantedTreeCard'
import EarnAPYCard from './components/EarnAPYCard'
import EarnAssetCard from './components/EarnAssetCard'
// import WinCard from './components/WinCard'
import YoutubeEmbed from './components/Youtube'
import NFTreesCard from './components/NFTreesCard'
import WheelCard from './components/WheelCard'
import MemeCard from './components/MemeCard'
import RoadMap from './components/RoadMap'
import KingOfForestCard from './components/KingOfForestCard'
import NotificationCard from './components/Notification'
import MarketPlaceCard from './components/MarketPlaceCard'

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;
  & > div {
    grid-column: span 6;
    width: 100%;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const CardT = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;
  & > div {
    grid-column: span 12;
    width: 100%;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 12;
    }
  }
`

const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 32px;
  & > div {
    grid-column: span 6;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 4;
    }
  }
`

const FullPageCard = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;
  & > div {
    grid-column: span 12;
    width: 100%;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 12;
    }
  }
`

const YoutubeCard = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 32px;
  & > div {
    grid-column: span 6;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 6;
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const PartnerCard = styled(BaseLayout)`
  align-items: start;
  margin-top: 0em;
  margin-bottom: 1.5em;
`

const NGOCard = styled(BaseLayout)`
  align-items: start;
  margin-top: 0.5em;
  margin-bottom: 2em;
`

const Footer = styled.div`
  background-image: url(/images/footerbg.svg);
  background-position: bottom;
  background-repeat-x: repeat;
  background-repeat-y: no-repeat;
  padding-bottom: 17%;
  background-size: 50%;
`

const Home: React.FC = () => {
  // const TranslateString = useI18n()
  const { isDark } = useTheme()

  return (
    <div>
      <Page>
        <div>
          <NotificationCard />
          <FullPageCard>
            <PlantedTreeCard />
          </FullPageCard>
          <NGOCard>
            <Link
              external
              href="https://onetreeplanted.org/"
              style={{ marginRight: 'auto', marginLeft: 'auto', gridColumn: 'span 3' }}
            >
              <img src="/images/onetreeplanted.png" alt="OneTreePlanted" className="logopartner" />
            </Link>
            <Link
              external
              href="https://www.treedom.net/en/"
              style={{ marginRight: 'auto', marginLeft: 'auto', gridColumn: 'span 3' }}
            >
              <img src="/images/treedom.png" alt="Treedom" className="logopartner" />
            </Link>
            <Link
              external
              href="https://teamtrees.org/search?q=treedefi"
              style={{ marginRight: 'auto', marginLeft: 'auto', gridColumn: 'span 3' }}
            >
              <img src="/images/teamtrees.png" alt="TeamTrees" className="logopartner" />
            </Link>
            <Link
              external
              href="https://trees.org/"
              style={{ marginRight: 'auto', marginLeft: 'auto', gridColumn: 'span 3' }}
            >
              <img src="/images/treesforfuture.png" alt="TreesForFuture" className="logopartner" />
            </Link>
          </NGOCard>
          <Cards>
            <FarmStakingCard />
            <KingOfForestCard />
            {/* <LotteryCard /> */}
          </Cards>
          <CardT>
            <MarketPlaceCard />
          </CardT>
          <Cards>
            <CakeStats />
            <TreeStats />
          </Cards>
          <CardT>
            <TotalValueLockedCard />
          </CardT>
          <PartnerCard>
            <Link
              external
              href="https://coinmarketcap.com/currencies/treedefi/"
              style={{ marginRight: 'auto', marginLeft: 'auto', gridColumn: 'span 2' }}
            >
              <img
                src={isDark ? '/images/partner/logo-coinmarketcap.png' : '/images/partner/coinmarketcap.png'}
                alt="Coinmarketcap"
                className="logopartner"
              />
            </Link>
            <Link
              external
              href="https://www.coingecko.com/en/coins/treedefi"
              style={{ marginRight: 'auto', marginLeft: 'auto', gridColumn: 'span 2' }}
            >
              <img
                src={isDark ? '/images/partner/logo-coingecko.png' : '/images/partner/coingecko.png'}
                alt="Coingecko"
                className="logopartner"
              />
            </Link>
            <Link
              external
              href="https://dappradar.com/binance-smart-chain/defi/treedefi"
              style={{ marginRight: 'auto', marginLeft: 'auto', gridColumn: 'span 2' }}
            >
              <img
                src={isDark ? '/images/partner/logo-dappradar.png' : '/images/partner/dappradar.png'}
                alt="Dappradar"
                className="logopartner"
              />
            </Link>
            <Link
              external
              href="https://www.coinbase.com/price/treedefi"
              style={{ marginRight: 'auto', marginLeft: 'auto', gridColumn: 'span 2' }}
            >
              <img src="/images/partner/coinbase.png" alt="Coinbase" className="logopartner" />
            </Link>
            <Link
              external
              href="https://www.dapp.com/app/treedefi"
              style={{ marginRight: 'auto', marginLeft: 'auto', gridColumn: 'span 2' }}
            >
              <img src="/images/partner/dapp.png" alt="Dapp.com" className="logopartner" />
            </Link>
            <Link
              external
              href="https://blockfolio.com/coin/TREE_2"
              style={{ marginRight: 'auto', marginLeft: 'auto', gridColumn: 'span 2' }}
            >
              <img
                src={isDark ? '/images/partner/logo-blockfolio.png' : '/images/partner/blockfolio.png'}
                alt="Blockfolio"
                className="logopartner"
              />
            </Link>{' '}
            {/*
            <Link
              external
              href="https://ask.getdelta.io/coin-requests/p/treedefi"
              style={{ marginRight: 'auto', marginLeft: 'auto', gridColumn: 'span 2' }}
            >
              <img src="/images/partner/delta.png" alt="DELTA" className="logopartner" />
            </Link> */}
          </PartnerCard>
          <Cards>
            <NFTreesCard />
            <WheelCard />
          </Cards>
          <CardT>
            <RoadMap />
          </CardT>
          <YoutubeCard>
            <YoutubeEmbed embedId="3xPd6pMT0ME" />
            <Link href="#/merchandise" style={{ marginRight: 'auto', marginLeft: 'auto', gridColumn: 'span 6' }}>
              <img src="/images/Merch_Home.jpg" alt="TreeDefiMerch" className="radius" />
            </Link>
          </YoutubeCard>
          <CTACards>
            <EarnAPYCard />
            <EarnAssetCard />
            <MemeCard />
            {/* <WinCard /> */}
          </CTACards>
        </div>
      </Page>
      <Footer />
    </div>
  )
}

export default Home
