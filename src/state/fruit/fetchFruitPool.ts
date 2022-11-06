import BigNumber from 'bignumber.js'
import fruitPoolABI from 'config/abi/fruitPool.json'
import { getFruitPoolAddress } from 'utils/addressHelpers'
import multicall from 'utils/multicall'

export const fetchFruitPoolBlockLimit = async () => {
  const [startBlock, endBlock] = await multicall(fruitPoolABI, [
    {
      address: getFruitPoolAddress(),
      name: 'startBlock',
    },
    {
      address: getFruitPoolAddress(),
      name: 'bonusEndBlock',
    }
  ])

  return {
    startBlock: new BigNumber(startBlock as string).toJSON(),
    endBlock: new BigNumber(endBlock as string).toJSON(),
  }
}

export default fetchFruitPoolBlockLimit