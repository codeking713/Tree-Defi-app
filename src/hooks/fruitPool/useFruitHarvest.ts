import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { updateFruitUserBalance, updateFruitUserPendingReward } from 'state/actions'
import { soushHarvest } from 'utils/callHelpers'
import { useFruitPoolContract } from 'hooks/useContract'

export const useFruitHarvest = () => {
    const dispatch = useDispatch()
    const { account } = useWallet()
    const fruitPoolContract = useFruitPoolContract()

    const handleHarvest = useCallback(async () => {
        await soushHarvest(fruitPoolContract, account)
        dispatch(updateFruitUserPendingReward(account))
        dispatch(updateFruitUserBalance(account))
    }, [account, dispatch, fruitPoolContract])

    return { onReward: handleHarvest }
}

export default useFruitHarvest