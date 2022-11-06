import { useState, useEffect, useRef } from 'react'
import BigNumber from 'bignumber.js'
import { usePriceCakeBusd } from 'state/hooks'
import { useCakeVaultContract } from 'hooks/useContract'
import useRefresh from 'hooks/useRefresh'
import makeBatchRequest from 'utils/makeBatchRequest'
// import { getCakeAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'

const useGetVaultBountyInfo = () => {
  const { fastRefresh } = useRefresh()
  const cakePriceRef = useRef(BIG_ZERO)
  
  const cakeVaultContract = useCakeVaultContract()
  const [estimatedDollarBountyReward, setEstimatedDollarBountyReward] = useState(null)
  const [estimatedCakeBountyReward, setEstimatedCakeBountyReward] = useState(null)
  const [totalPendingCakeHarvest, setTotalPendingCakeHarvest] = useState(null)

  const returnedCakePrice = usePriceCakeBusd()
  const cakePrice = cakePriceRef.current.isEqualTo(returnedCakePrice) ? cakePriceRef.current : returnedCakePrice
  cakePriceRef.current = cakePrice

  useEffect(() => {
    const fetchRewards = async () => {
      const [estimatedClaimableCakeReward, pendingTotalCakeHarvest] = await makeBatchRequest([
        cakeVaultContract.methods.calculateHarvestTreeRewards().call,
        cakeVaultContract.methods.calculateTotalPendingTreeRewards().call,
      ])
      if (cakePrice) {
        const dollarValueOfClaimableReward = new BigNumber(estimatedClaimableCakeReward as string).multipliedBy(
          cakePrice,
        )
        setEstimatedDollarBountyReward(dollarValueOfClaimableReward)
      }
      setEstimatedCakeBountyReward(new BigNumber(estimatedClaimableCakeReward as string))
      setTotalPendingCakeHarvest(new BigNumber(pendingTotalCakeHarvest as string))
    }
    fetchRewards()
  }, [cakeVaultContract, cakePrice, fastRefresh])

  return { estimatedCakeBountyReward, estimatedDollarBountyReward, totalPendingCakeHarvest }
}

export default useGetVaultBountyInfo
