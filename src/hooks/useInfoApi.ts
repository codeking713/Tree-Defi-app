import { useEffect, useState } from 'react'

/*
 * Use pancakeswap api for getting token / liquidity information
 * @see https://github.com/pancakeswap/pancake-info-api/blob/develop/v2-documentation.md
 */
export const baseUrl = 'https://api.pancakeswap.info/api/v2'

/* eslint-disable camelcase */

export interface TradePairInfo {
  base_symbol: string
  quote_symbol: string
  price: string
}

export interface ApiPairsInfoResponse {
  update_at: string
  data: {
    [key: string]: TradePairInfo
  }
}

export interface TradeTokenInfo {
  symbol: string
  price: string
}

export interface ApiTokensInfoResponse {
  update_at: string
  data: {
    [key: string]: TradeTokenInfo
  }
}

export const useGetPairsInfo = () => {
  const [data, setData] = useState<ApiPairsInfoResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/pairs`)
        const responsedata: ApiPairsInfoResponse = await response.json()

        setData(responsedata)
      } catch (error) {
        console.error('Unable to fetch data:', error)
      }
    }

    fetchData()
  }, [setData])

  return data
}

export const useGetTokensInfo = () => {
  const [data, setData] = useState<ApiTokensInfoResponse | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/tokens`)
        const responsedata: ApiTokensInfoResponse = await response.json()

        setData(responsedata)
      } catch (error) {
        console.error('Unable to fetch data:', error)
      }
    }

    fetchData()
  }, [setData])

  return data
}
