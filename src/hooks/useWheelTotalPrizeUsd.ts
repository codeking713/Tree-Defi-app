import { usePriceCakeBusd } from 'state/hooks'
import { useMoneyWheel } from 'hooks/useContract' // { useCake }
import { useGetMaxBet } from 'hooks/useMaxBet'

const useWheelTotalPrizeUsd = () => {
  const totalRewards = useGetMaxBet(useMoneyWheel()).dividedBy(1000000000000000000).multipliedBy(50)
  const cakePriceBusd = usePriceCakeBusd()

  return totalRewards.toNumber() * cakePriceBusd.toNumber()
}

export default useWheelTotalPrizeUsd
