import { BigNumber } from 'bignumber.js/bignumber'
import { useFarms } from '../state/hooks'

let getCurrentPerBlock = 0
const useGetCurrentPerBlock = () => {
  const farms = useFarms()

  if (farms && farms[0] && farms[0].getCurrentPerBlock) {
    getCurrentPerBlock = new BigNumber(farms[0].getCurrentPerBlock).div(new BigNumber(10).pow(18)).toNumber()
  }

  return new BigNumber(getCurrentPerBlock)
}

export default useGetCurrentPerBlock
