import BigNumber from 'bignumber.js'
import { ChainId, Token, Fetcher } from '@pancakeswap-libs/sdk'
import { getDefaultProvider } from '@ethersproject/providers'
import multicall from 'utils/multicall'
import erc20 from 'config/abi/erc20.json'

async function fetchPriceData(_token, _isLp, _tokenDecimals, SEED, BNB, cakebusd) {
  let result = new BigNumber(0)
  const BNB_ADDRESS = '0xBB4CDB9CBD36B01BD1CBAEBF2DE08D9173BC095C'
  if (!_token && _token === '') return result
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

      result = LpPrice
    } else {
      const TOKEN = new Token(ChainId.MAINNET, mytoken, _tokenDecimals)
      const PROVIDER = getDefaultProvider('https://bsc-dataseed.binance.org/')
      Fetcher.fetchPairData(TOKEN, BNB, PROVIDER)
        .then((pairData) => {
          result = new BigNumber(
            parseFloat(pairData.reserve1.toSignificant(4)) / parseFloat(pairData.reserve0.toSignificant(4)),
          )
        })
        .catch(() => {
          console.info('An error occurred on fetch pair data')
        })
    }
  } else if (mytoken === BNB_ADDRESS) {
    result = new BigNumber(1)
  }

  return result
}

export default fetchPriceData;
