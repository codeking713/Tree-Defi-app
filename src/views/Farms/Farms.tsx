import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { Heading, RowType } from '@pancakeswap-libs/uikit' // Image
import { BLOCKS_PER_YEAR } from 'config' // CAKE_PER_BLOCK, CAKE_POOL_PID
import { FlexMaxLayout } from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useFarms, usePriceBnbBusd, usePriceCakeBusd, usePriceTreeBusd, useFarmFromPid } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import FarmTabButtons from './components/FarmTabButtons'
import Divider from './components/Divider'

import Table from './components/FarmTable/FarmTable'
import { RowProps } from './components/FarmTable/Row'
import { DesktopColumnSchema } from './components/types'

const Footer = styled.div`
  background-image: url(/images/footerbg.svg);
  background-position: bottom;
  background-repeat-x: repeat;
  background-repeat-y: no-repeat;
  padding-bottom: 17%;
  background-size: 50%;
`

export interface FarmsProps {
  tokenMode?: boolean
}

const Farms: React.FC<FarmsProps> = (farmsProps) => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const cakePrice = usePriceCakeBusd()
  const bnbPrice = usePriceBnbBusd()
  const treePrice = usePriceTreeBusd()
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const { tokenMode } = farmsProps

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const [stakedOnly, setStakedOnly] = useState(false)

  const activeFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier === '0X')
  const partnerFarms = farmsLP.filter(
    (farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier !== '0X' && farm.isPartner === true,
  )
  const seedFarms = farmsLP.filter(
    (farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier !== '0X' && farm.lpSymbol.includes('SEED'),
  )
  const treeFarms = farmsLP.filter(
    (farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier !== '0X' && farm.lpSymbol.includes('TREE'),
  )

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )
  const stakedOnlyPartnerFarms = partnerFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )
  const stakedOnlySeedFarms = seedFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )
  const stakedOnlyTreeFarms = treeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const seedcakeFarm = useFarmFromPid(15)
  const seedcakePrice = new BigNumber(seedcakeFarm.tokenPriceVsQuote)
  const cakeTokenPrice = seedcakePrice.times(cakePrice)

  const treeslimeFarm = useFarmFromPid(16)
  const treeslimePrice = new BigNumber(treeslimeFarm.tokenPriceVsQuote)
  const slimetreeTokenPrice = treeslimePrice.times(cakePrice)

  const seedslimeFarm = useFarmFromPid(17)
  const seedslimePrice = new BigNumber(seedslimeFarm.tokenPriceVsQuote)
  const slimeTokenPrice = seedslimePrice.times(cakePrice)

  const treeslimev2Farm = useFarmFromPid(23)
  const treeslimev2Price = new BigNumber(treeslimev2Farm.tokenPriceVsQuote)
  const slimev2treeTokenPrice = treeslimev2Price.times(cakePrice)

  const seedslimev2Farm = useFarmFromPid(22)
  const seedslimev2Price = new BigNumber(seedslimev2Farm.tokenPriceVsQuote)
  const slimev2TokenPrice = seedslimev2Price.times(cakePrice)

  // const seedbunnyFarm = useFarmFromPid(19)
  // const seedbunnyPrice = new BigNumber(seedbunnyFarm.tokenPriceVsQuote)
  // const bunnyTokenPrice = seedbunnyPrice.times(cakePrice)

  // const seedadaFarm = useFarmFromPid(19)
  // const seedadaPrice = new BigNumber(seedadaFarm.tokenPriceVsQuote)
  // const adaTokenPrice = seedadaPrice.times(cakePrice)

  const seedniuFarm = useFarmFromPid(21)
  const seedniuPrice = new BigNumber(seedniuFarm.tokenPriceVsQuote)
  const niuTokenPrice = seedniuPrice.times(cakePrice)

  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const farmsList = useCallback(
    (farmsToDisplay, removed: boolean) => {
      // const cakePriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === CAKE_POOL_PID)?.tokenPriceVsQuote || 0)
      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        // if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
        //   return farm
        // }
        const cakeRewardPerBlock = new BigNumber(farm.getCurrentPerBlock || 1)
          .times(new BigNumber(farm.poolWeight))
          .div(new BigNumber(10).pow(18))
        const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

        let apy = cakePrice.times(cakeRewardPerYear)

        let totalValue = new BigNumber(farm.lpTotalInQuoteToken || 0)

        if (farm.quoteTokenSymbol === QuoteToken.BNB) {
          totalValue = totalValue.times(bnbPrice)
        }

        if (totalValue.comparedTo(0) > 0) {
          apy = apy.div(totalValue)
        }

        if (farm.lpSymbol === 'SEED-TREE LP') {
          totalValue = totalValue.times(treePrice)
          apy = treePrice.times(cakeRewardPerYear).div(totalValue)
        }

        if (farm.lpSymbol === 'SEED-CAKE LP') {
          totalValue = totalValue.times(cakeTokenPrice)
          apy = cakeTokenPrice.times(cakeRewardPerYear).div(totalValue)
        }

        if (farm.lpSymbol === 'SEED-BUNNY LP') {
          totalValue = totalValue.times(cakeTokenPrice)
          apy = cakeTokenPrice.times(cakeRewardPerYear).div(totalValue)
        }

        if (farm.lpSymbol === 'SEED-ADA LP') {
          totalValue = totalValue.times(cakeTokenPrice)
          apy = cakeTokenPrice.times(cakeRewardPerYear).div(totalValue)
        }

        if (farm.lpSymbol === 'TREE-SLIME LP') {
          totalValue = totalValue.times(slimetreeTokenPrice).times(treePrice).div(cakePrice)
          apy = slimetreeTokenPrice.times(cakeRewardPerYear).div(totalValue)
        }

        if (farm.lpSymbol === 'TREE-SLIME V2 LP') {
          totalValue = totalValue.times(slimev2treeTokenPrice).times(treePrice).div(cakePrice)
          apy = slimev2treeTokenPrice.times(cakeRewardPerYear).div(totalValue)
        }

        if (farm.lpSymbol === 'TREE-GREEN LP') {
          totalValue = totalValue.times(slimetreeTokenPrice).times(treePrice).div(cakePrice)
          apy = slimetreeTokenPrice.times(cakeRewardPerYear).div(totalValue)
        }

        if (farm.lpSymbol === 'SEED-SLIME LP') {
          totalValue = totalValue.times(slimeTokenPrice)
          apy = slimeTokenPrice.times(cakeRewardPerYear).div(totalValue)
        }

        if (farm.lpSymbol === 'SEED-SLIME V2 LP') {
          totalValue = totalValue.times(slimev2TokenPrice)
          apy = slimev2TokenPrice.times(cakeRewardPerYear).div(totalValue)
        }

        if (farm.lpSymbol === 'SEED-NIU LP') {
          totalValue = totalValue.times(niuTokenPrice)
          apy = niuTokenPrice.times(cakeRewardPerYear).div(totalValue)
        }

        return { ...farm, apy }
      })

      const rowData = farmsToDisplayWithAPY.map((farm) => {
        const { quoteTokenAdresses, tokenAddresses } = farm

        // const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('CANDY', '')
        const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase()

        const row: RowProps = {
          apr: {
            value:
              farm.apy &&
              farm.apy.times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
            multiplier: farm.multiplier,
            lpLabel,
            tokenAddresses,
            quoteTokenAdresses,
            cakePrice: cakeTokenPrice,
            originalValue: farm.apy,
          },
          farm: {
            image: farm.lpSymbol.split(' ')[0].toLocaleLowerCase(),
            label: lpLabel,
            pid: farm.pid,
          },
          earned: {
            earnings: farm.userData ? getBalanceNumber(new BigNumber(farm.userData.earnings)) : null,
            pid: farm.pid,
            account,
          },
          liquidity: { farm },
          depositFee: {
            depositFee: farm.depositFeeBP,
          },
          multiplier: {
            multiplier: farm.multiplier,
          },
          details: { ...farm, account },
        }

        return row
      })

      if (rowData.length) {
        const columnSchema = DesktopColumnSchema

        const columns = columnSchema.map((column) => ({
          id: column.id,
          name: column.name,
          label: column.label,
          sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
            switch (column.name) {
              case 'farm':
                return b.id - a.id
              case 'apr':
                if (a.original.apr.value && b.original.apr.value) {
                  return Number(a.original.apr.value) - Number(b.original.apr.value)
                }

                return 0
              case 'earned':
                return a.original.earned.earnings - b.original.earned.earnings
              default:
                return 1
            }
          },
          sortable: column.sortable,
        }))

        return <Table data={rowData} columns={columns} />
      }

      return farmsToDisplayWithAPY.map((farm) => (
        <>
          {farm.pid !== 11 && (
            <FarmCard
              key={farm.pid}
              farm={farm}
              removed={removed}
              bnbPrice={bnbPrice}
              cakePrice={cakePrice}
              treePrice={treePrice}
              ethereum={ethereum}
              account={account}
            />
          )}
        </>
      ))
    },
    [
      bnbPrice,
      account,
      cakePrice,
      ethereum,
      treePrice,
      cakeTokenPrice,
      slimeTokenPrice,
      slimetreeTokenPrice,
      slimev2TokenPrice,
      slimev2treeTokenPrice,
      niuTokenPrice,
    ],
  )

  return (
    <div>
      <Page>
        {/*        <Heading as="h1" size="lg" color="primary" mb="50px" style={{ textAlign: 'center' }}>
          {tokenMode
            ? TranslateString(10002, 'Stake tokens to earn SEED')
            : TranslateString(320, 'Stake LP tokens to earn SEED')}
        </Heading>
        <Heading as="h2" color="secondary" mb="50px" style={{ textAlign: 'center' }}>
          {TranslateString(10000, 'Part of deposit fees will be used to plant real trees around the world')}
        </Heading> */}
        {tokenMode ? (
          <Hero>
            <div>
              <Heading as="h1" size="xxl" mb="16px">
                {TranslateString(282, 'Staking Garden')}
              </Heading>
              <ul>
                <li>{TranslateString(580, 'Stake tokens to earn SEED.')}</li>
              </ul>
            </div>
            <img
              src="/images/syrup.png"
              alt="Launch POOL icon"
              style={{ display: 'block', margin: 'auto', textAlign: 'right' }}
              width={200}
              height={111}
            />
          </Hero>
        ) : (
          <Hero>
            <div>
              <Heading as="h1" size="xxl" mb="16px">
                {TranslateString(282, 'Farming Forest')}
              </Heading>
              <ul>
                <li>{TranslateString(580, 'Stake LP tokens to earn SEED')}</li>
              </ul>
            </div>
            <img
              src="/images/syrup.png"
              alt="Launch POOL icon"
              style={{ display: 'block', margin: 'auto', textAlign: 'right' }}
              width={200}
              height={111}
            />
          </Hero>
        )}
        <FarmTabButtons stakedOnly={stakedOnly} setStakedOnly={setStakedOnly} />
        <div>
          <Divider />
          <FlexMaxLayout>
            <Route exact path={`${path}`}>
              {stakedOnly ? farmsList(stakedOnlyFarms, false) : farmsList(activeFarms, false)}
            </Route>
            <Route exact path={`${path}/seed`}>
              {stakedOnly ? farmsList(stakedOnlySeedFarms, false) : farmsList(seedFarms, false)}
            </Route>
            <Route exact path={`${path}/tree`}>
              {stakedOnly ? farmsList(stakedOnlyTreeFarms, false) : farmsList(treeFarms, false)}
            </Route>
            <Route exact path={`${path}/partner`}>
              {stakedOnly ? farmsList(stakedOnlyPartnerFarms, false) : farmsList(partnerFarms, false)}
            </Route>
            <Route exact path={`${path}/history`}>
              {farmsList(inactiveFarms, true)}
            </Route>
          </FlexMaxLayout>
        </div>
        {/* <Image src="/images/egg/8.png" alt="illustration" width={1352} height={587} responsive /> */}
      </Page>
      <Footer />
    </div>
  )
}

const Hero = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  display: grid;
  grid-gap: 32px;
  grid-template-columns: 1fr;
  margin-left: auto;
  margin-right: auto;
  max-width: 250px;
  padding: 48px 0;
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: 16px;
    li {
      margin-bottom: 4px;
    }
  }
  img {
    height: auto;
    max-width: 100%;
  }
  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
    margin: 0;
    max-width: none;
  }
`
export default Farms
