import React, { useEffect, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import { ChainId, Token, Fetcher } from '@pancakeswap-libs/sdk' // WETH
import { getDefaultProvider } from '@ethersproject/providers'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Heading } from '@pancakeswap-libs/uikit'
import { BLOCKS_PER_YEAR } from 'config'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import multicall from 'utils/multicall'
import { getBalanceNumber } from 'utils/formatBalance'
import erc20 from 'config/abi/erc20.json'
import { useFarms, usePriceBnbBusd, usePools, usePriceCakeBusd, usePriceTokenUsd } from 'state/hooks' // old import: usePriceTreeBusd
import { isArray } from 'lodash'
import { QuoteToken } from 'config/constants/types' // PoolCategory
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { getMasterChefAddress } from 'utils/addressHelpers'
import masterchefABI from 'config/abi/masterchef.json'
import Coming from './components/Coming'
import PoolCard from './components/PoolCard'
import SeedVaultCard from './components/SeedVaultCard'
import PoolTabButtons from './components/PoolTabButtons'
import Divider from './components/Divider'
import FetchPriceData from './FetchPriceData'

import { Hero } from './styles'
import BountyCard from './components/BountyCard'

const SEED_ADDRESS = '0x40B34cC972908060D6d527276e17c105d224559d'
const BNB_ADDRESS = '0xBB4CDB9CBD36B01BD1CBAEBF2DE08D9173BC095C'
const SEED = new Token(ChainId.MAINNET, SEED_ADDRESS, 18) // always stake SEED
const BNB = new Token(ChainId.MAINNET, BNB_ADDRESS, 18)

const TokenPriceInUSD = (cgURL: string) => {
  const price = usePriceTokenUsd(cgURL)
  return price
}

const Farm: React.FC = () => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const { account } = useWallet()

  const farms = useFarms()
  const pools = usePools(account)
  const bnbPriceUSD = usePriceBnbBusd()
  const cakebusd = usePriceCakeBusd() // SEEDPriceInBusd
  //const treebusd = usePriceTreeBusd() // TREEPriceInBusd
  const seedusd = usePriceTokenUsd('0x40b34cc972908060d6d527276e17c105d224559d-bsc') // SEEDPriceInusd
  const treeusd = usePriceTokenUsd('0xf0fcd737fce18f95621cc7841ebe0ea6efccf77e-bsc') // TREEPriceInusd
  const [weight, setWeight] = useState(new BigNumber(0))
  let bbprice = new BigNumber(1)

  const block = useBlock()

  const priceToBnb = (tokenName: string, tokenPrice: BigNumber, quoteToken: QuoteToken): BigNumber => {
    const tokenPriceBN = new BigNumber(tokenPrice)
    if (tokenName === 'BNB') {
      return new BigNumber(1)
    }
    if (tokenPrice && quoteToken === QuoteToken.BUSD) {
      return tokenPriceBN.div(bnbPriceUSD)
    }
    return tokenPriceBN
  }

  const priceList = {}

  const TokenPriceBNB = (token: string, tokenDecimals: number, isLpReward: boolean): BigNumber => {
    const price = React.useRef(new BigNumber(0))
    React.useCallback(() => {
      FetchPriceData(token, isLpReward, tokenDecimals, SEED, BNB, cakebusd).then((response) => {
        price.current = response
      })
    }, [token, tokenDecimals, isLpReward])

    priceList[token] = price.current
    return price.current
  }

  const StakeTokenPriceBNB = (token: string, tokenDecimals: number, isLpReward: boolean): BigNumber => {
    const [price, setPrice] = React.useState(new BigNumber(0))

    React.useEffect(() => {
      async function fetchdata(_token, _isLp, _tokenDecimals) {
        if (_token !== '') {
          const mytoken = `0x${_token.substring(2).toUpperCase()}`

          if (mytoken !== BNB_ADDRESS) {
            if (_isLp === true) {
              const calls = [
                // Balance of quote token on LP contract
                {
                  address: SEED.address,
                  name: 'balanceOf',
                  params: [mytoken],
                },

                // Total supply of LP tokens
                {
                  address: mytoken,
                  name: 'totalSupply',
                },
                // Token decimals
                {
                  address: SEED.address,
                  name: 'decimals',
                },
              ]

              const [quoteTokenBlanceLP, lpTotalSupply, qtokenDecimals] = await multicall(erc20, calls)
              const tokenAmount = new BigNumber(quoteTokenBlanceLP).div(new BigNumber(10).pow(qtokenDecimals))

              const LpAmount = new BigNumber(lpTotalSupply).div(new BigNumber(10).pow(18))

              const LpPrice = tokenAmount.multipliedBy(cakebusd).multipliedBy(new BigNumber(2)).div(LpAmount)

              setPrice(LpPrice)
            } else {
              const TOKEN = new Token(ChainId.MAINNET, mytoken, _tokenDecimals)
              Fetcher.fetchPairData(TOKEN, BNB, getDefaultProvider('https://bsc-dataseed.binance.org/')).then(
                (pairData) =>
                  setPrice(
                    new BigNumber(
                      parseFloat(pairData.reserve1.toSignificant(4)) / parseFloat(pairData.reserve0.toSignificant(4)),
                    ),
                  ),
              )
            }
          } else if (mytoken === BNB_ADDRESS) {
            setPrice(new BigNumber(1))
          }
        }
      }

      fetchdata(token, isLpReward, tokenDecimals)
    }, [token, isLpReward, tokenDecimals])

    priceList[token] = price
    return price
  }

  let stakepriceBUSD = new BigNumber(1)
  const poolsWithApy = pools.map((pool) => {
    bbprice = new BigNumber(0)
    let stakePrice = new BigNumber(0)
    // const isBnbPool = pool.poolCategory === PoolCategory.BINANCE
    const rewardTokenFarm = farms.find((f) => f.tokenSymbol === pool.tokenName)
    // const stakingTokenFarm = farms.find((s) => s.tokenSymbol === pool.stakingTokenName)

    const TokenRewardAddress = pool.userData

    let address = ''

    if (TokenRewardAddress) {
      address = TokenRewardAddress.rewardAddress

      if (isArray(address)) {
        address = address[0]
      }
    }

    // bnb
    if (pool.tokenName === 'BNB' || pool.tokenName === 'WBNB') {
      // eslint-disable-next-line prefer-destructuring
      address = BNB.address
    }

    const price = TokenPriceBNB(address, pool.tokenDecimals, pool.isLPReward)
    stakePrice = StakeTokenPriceBNB(pool.stakingTokenAddress, 18, pool.isLPStake)

    if (pool.isLPStake) {
      stakepriceBUSD = stakePrice
    } else {
      stakepriceBUSD = bnbPriceUSD.multipliedBy(stakePrice)
    }
    if (pool.userData) {
      if (pool.isLPReward) {
        bbprice = price
      } else {
        bbprice = bnbPriceUSD.multipliedBy(price)
      }

      if (bbprice === new BigNumber(0)) {
        const rewardTokenPriceInBNB = priceToBnb(
          pool.tokenName,
          rewardTokenFarm?.tokenPriceVsQuote,
          rewardTokenFarm?.quoteTokenSymbol,
        )
        bbprice = bnbPriceUSD.multipliedBy(rewardTokenPriceInBNB)
      }
    }
    // /!\ Assume that the farm quote price is BNB
    // const stakingTokenPriceInBNB = isBnbPool ? new BigNumber(1) : new BigNumber(stakingTokenFarm?.tokenPriceVsQuote)
    const stakingTokenInUSD = pool.stakingTokenName === 'SEED' ? seedusd : treeusd

    const totalRewardPricePerYear = TokenPriceInUSD(pool.dexId).times(pool.tokenPerBlock).times(BLOCKS_PER_YEAR)
    const totalStakingTokenInPool = stakingTokenInUSD.times(getBalanceNumber(pool.totalStaked))
    const apy = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100) // set back to 100 after apy fixing

    return {
      ...pool,
      isFinished: pool.sousId === 0 ? false : pool.isFinished || block > pool.endBlock,
      apy,
      bbprice,
      stakepriceBUSD,
    }
  })

  const [finishedPools, openPools] = partition(poolsWithApy, (pool) => pool.isFinished)

  // const [stakedOnly, setStakedOnly] = useState(false)

  const [seedValutPool, openPoolsExceptVault] = partition(openPools, (pool) => pool.sousId === 0)

  const seedPools = openPoolsExceptVault.filter((pool) => pool.stakingTokenName.includes('SEED'))
  const treePools = openPoolsExceptVault.filter((pool) => pool.stakingTokenName.includes('TREE'))

  useEffect(() => {
    const getPoolWeightValue = async () => {
      const [info, totalAllocPoint] = await multicall(masterchefABI, [
        {
          address: getMasterChefAddress(),
          name: 'poolInfo',
          params: [24],
        },
        {
          address: getMasterChefAddress(),
          name: 'totalAllocPoint',
        },
      ])
      const allocPoint = await new BigNumber(info.allocPoint._hex)

      const poolWeight = await allocPoint.div(new BigNumber(totalAllocPoint))
      // console.log('alloc---', new BigNumber(totalAllocPoint).toNumber()) debug
      setWeight(poolWeight)
    }
    getPoolWeightValue()
  }, [])

  return (
    <Page style={{ maxWidth: '1200px' }}>
      <Hero>
        <div>
          <Heading as="h1" size="xxl" mb="16px">
            {TranslateString(282, 'Launch Pool')}
          </Heading>
          <ul>
            <li>{TranslateString(580, 'Stake SEED or TREE to earn new tokens.')}</li>
          </ul>
        </div>
        <img src="/images/syrup.png" alt="Launch POOL icon" width={200} height={111} />
        <BountyCard />
      </Hero>
      <PoolTabButtons />
      <Divider />
      <FlexLayout>
        <Route exact path={`${path}`}>
          <>
            {seedValutPool.length > 0 && <SeedVaultCard pool={seedValutPool[0]} poolWeight={weight} />}

            {orderBy(openPoolsExceptVault, ['sortOrder']).map((pool) => (
              <PoolCard key={pool.sousId} pool={pool} />
            ))}
            <Coming />
          </>
        </Route>
        <Route path={`${path}/seedpool`}>
          {orderBy(seedPools, ['sortOrder']).map((pool) => (
            <PoolCard key={pool.sousId} pool={pool} />
          ))}
        </Route>
        <Route path={`${path}/treepool`}>
          {orderBy(treePools, ['sortOrder']).map((pool) => (
            <PoolCard key={pool.sousId} pool={pool} />
          ))}
        </Route>
        <Route path={`${path}/history`}>
          {orderBy(finishedPools, ['sortOrder']).map((pool) => (
            <PoolCard key={pool.sousId} pool={pool} />
          ))}
        </Route>
      </FlexLayout>
    </Page>
  )
}

export default Farm
