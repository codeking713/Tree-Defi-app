import React, { useEffect, Suspense, lazy } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom' // Redirect
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ResetCSS } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { useFetchPublicData } from 'state/hooks'
import GlobalFonts from './fonts/fonts';
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import PageLoader from './components/PageLoader'
import NftGlobalNotification from './views/Nft/components/NftGlobalNotification'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page'
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const Lottery = lazy(() => import('./views/Lottery'))
const Pools = lazy(() => import('./views/Pools'))
const NFTrees = lazy(() => import('./views/NFTrees'))
const Merchandise = lazy(() => import('./views/Merchandise'))
const Roadmap = lazy(() => import('./views/Roadmap'))
const Donation = lazy(() => import('./views/Donation'))
// const Ifos = lazy(() => import('./views/Ifos'))

const KingForest = lazy(() => import('./views/Games/Forest'))
const GreenWheel = lazy(() => import('./views/Games/GreenWheel'))
const NotFound = lazy(() => import('./views/NotFound'))
// const Nft = lazy(() => import('./views/Nft'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  const { account, connect } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
  }, [account, connect])

  useFetchPublicData()

  return (
    <Router>
      <ResetCSS />
      <GlobalFonts />
      <GlobalStyle />
      <Menu>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/farms">
              <Farms />
            </Route>
            <Route path="/staking">
              <Farms tokenMode />
            </Route>
            <Route path="/launch-pools">
              <Pools />
            </Route>
            <Route path="/nftrees">
              <NFTrees />
            </Route>
            <Route path="/roadmap">
              <Roadmap />
            </Route>
            <Route path="/donation">
              <Donation />
            </Route>
            <Route path="/merchandise">
              <Merchandise />
            </Route>
            {/* <Redirect to="/pools" /> */}
            {/* <Route path="/pools"> */}
            {/* <Pools /> */}
            {/* </Route> */}
            <Route path="/lottery">
              <Lottery />
            </Route>
            <Route path="/king">
              <KingForest />
            </Route>
            <Route path="/greenwheel">
              <GreenWheel />
            </Route>
            {/* <Route path="/ifo">
             <Ifos />
            </Route> */}
            {/* <Route path="/nft"> */}
            {/* <Nft /> */}
            {/* </Route> */}
            {/* Redirect */}
            {/* <Route path="/staking"> */}
            {/* <Redirect to="/pools" /> */}
            {/* </Route> */}
            {/* <Route path="/syrup"> */}
            {/* <Redirect to="/pools" /> */}
            {/* </Route> */}
            404
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Menu>
      <NftGlobalNotification />
    </Router>
  )
}

export default React.memo(App)
