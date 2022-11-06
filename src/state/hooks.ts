import BigNumber from 'bignumber.js'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import useRefresh from 'hooks/useRefresh'
import imageOfDayABI from 'config/abi/imageOfDay.json'
import { fetchFarmsPublicDataAsync, fetchPoolsPublicDataAsync, fetchPoolsUserDataAsync } from './actions'
import { State, Farm, Pool, FruitPool } from './types'
import { QuoteToken } from '../config/constants/types'
import { fetchFruitPublicDataAsync, fetchFruitUserDataAsync } from './fruit'

const ZERO = new BigNumber(0)

export const useFetchPublicData = () => {
  const dispatch = useDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchFarmsPublicDataAsync())
    dispatch(fetchPoolsPublicDataAsync())
    dispatch(fetchFruitPublicDataAsync())
  }, [dispatch, slowRefresh])
}

// Farms

export const useFarms = (): Farm[] => {
  const farms = useSelector((state: State) => state.farms.data)
  return farms
}

export const useRandomImage = () => {
  const d = new Date() // today
  const days = d.getTime() / (1000 * 60 * 60 * 24)
  const idx = Math.floor(days) % imageOfDayABI.length
  return imageOfDayABI[idx]
}

export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
  return farm
}

export const useFarmFromSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : new BigNumber(0),
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : new BigNumber(0),
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : new BigNumber(0),
  }
}

// Pools

export const usePools = (account): Pool[] => {
  const { fastRefresh } = useRefresh()
  const dispatch = useDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const pools = useSelector((state: State) => state.pools.data)
  return pools
}

export const usePoolFromPid = (sousId): Pool => {
  const pool = useSelector((state: State) => state.pools.data.find((p) => p.sousId === sousId))
  return pool
}

// Fruit
export const useFruit = (account): FruitPool => {
  const { fastRefresh } = useRefresh()
  const dispatch = useDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchFruitUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const fruit = useSelector((state: State) => state.fruit.data)
  return fruit
}

// Prices

export const usePriceTokenUsd = (dexId: string): BigNumber => {
  const [price, setPrice] = useState(new BigNumber(0));
  useEffect(() => {
      axios({
        method: 'get',
        url: 'https://api.dex.guru/v1/tokens/'.concat(dexId),   
        headers: {
            'Content-Type' : 'application/json'
          }
        })
      .then((res: any)=>{
          setPrice(new BigNumber(res.data.priceUSD));
      })
      
  },[dexId])
  return price;
}

export const usePriceBnbBusd = (): BigNumber => {
  const pid = 2 // BUSD-BNB LP
  const farm = useFarmFromPid(pid)
  if (!farm.tokenPriceVsQuote) { return ZERO }
  return new BigNumber(farm.tokenPriceVsQuote)
}

export const usePriceCakeBusd = (): BigNumber => {
  // const pid = 1 // CAKE-BNB LP
  // const bnbPriceUSD = usePriceBnbBusd()
  // const farm = useFarmFromPid(pid)
  // return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
  // const pid = 0; // EGG-BUSD LP
  const pid = 1 // EGG-BUSD LP
  const farm = useFarmFromPid(pid)
  if (!farm.tokenPriceVsQuote) { return ZERO }
  return new BigNumber(farm.tokenPriceVsQuote)
}

export const usePriceSeedBusd = (): number => {
  const [data, setData] = useState<number>(0)

  useEffect(() => {
    const fetchDataCoinGecko = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=treedefi&vs_currencies=usd`)
        const responsedata = await response.json()
        
        setData(responsedata.treedefi.usd)
      } catch (error) {
        // const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=treedefi&vs_currencies=usd`)
        // const responsedata = await response.json()
        console.error('Unable to fetch data:', error)
      } 
    }
    
    const fetchData = async (dexId) => {
      try {
        const response = await fetch('https://api.dex.guru/v1/tokens/'.concat(dexId))
        const responsedata = await response.json()
        setData(responsedata.priceUSD)
      } catch (error) {
        console.error('Unable to fetch data from dex.guru:', error)
        fetchDataCoinGecko();
      }
    }
    

    fetchData('0x40b34cc972908060d6d527276e17c105d224559d-bsc')
  }, [setData])

  return data
}

export const useGetPriceDataTree = (): number => {
  const [data, setData] = useState<number>(0)
  useEffect(() => {
    const fetchDataCoinGecko = async () => {
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=tree-defi&vs_currencies=usd`)
        const responsedata = await response.json()
        
        setData(responsedata['tree-defi'].usd)
      } catch (error) {
        console.error('Unable to fetch data:', error)
      } 
    }

    const fetchData = async (dexId) => {
      try {
        const response = await fetch('https://api.dex.guru/v1/tokens/'.concat(dexId))
        const responsedata = await response.json()
        
        setData(responsedata.priceUSD)
      } catch (error) {
        console.error('Unable to fetch data from dex.guru:', error)
        fetchDataCoinGecko();
      }
    }
    

    fetchData('0xf0fcd737fce18f95621cc7841ebe0ea6efccf77e-bsc')
  }, [setData])

  return data
}

export const usePriceTreeBusd = (): BigNumber => {
  // const pid = 1 // CAKE-BNB LP
  // const bnbPriceUSD = usePriceBnbBusd()
  // const farm = useFarmFromPid(pid)
  // return farm.tokenPriceVsQuote ? bnbPriceUSD.times(farm.tokenPriceVsQuote) : ZERO
  // const pid = 0; // EGG-BUSD LP
  const pid = 11 // EGG-BUSD LP
  const farm = useFarmFromPid(pid)
  if (!farm.tokenPriceVsQuote) { return ZERO }
  return new BigNumber(farm.tokenPriceVsQuote)
}

export const useTotalValue = (): BigNumber => {
  const farms = useFarms()
  const bnbPrice = usePriceBnbBusd()
  const cakePrice = usePriceCakeBusd()
  const treePrice = usePriceTreeBusd()
  let value = new BigNumber(0)
  for (let i = 0; i < farms.length; i++) {
    const farm = farms[i]
    if (farm.lpTotalInQuoteToken) {
      let val
      if (farm.quoteTokenSymbol === QuoteToken.BNB) {
        val = bnbPrice.times(farm.lpTotalInQuoteToken)
      } else if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
        val = cakePrice.times(farm.lpTotalInQuoteToken)
      } else if (farm.quoteTokenSymbol === QuoteToken.TREE) {
        val = treePrice.times(farm.lpTotalInQuoteToken)
      } else {
        val = farm.lpTotalInQuoteToken
      }
      value = value.plus(val)
    }
  }
  return value
}
