import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { sousUnstake } from 'utils/callHelpers'
import { useFruitPoolContract } from 'hooks/useContract'
import { updateFruitUserBalance, updateFruitUserPendingReward, updateFruitUserStakedBalance } from 'state/fruit'


export const useFruitUnstake = () => {
    const dispatch = useDispatch()
    const { account } = useWallet()
    const fruitPoolContract = useFruitPoolContract()

    const handleUnstake = useCallback(
        async (amount: string) => {
            const txHash = await sousUnstake(fruitPoolContract, amount, account)
            console.info(txHash)
            dispatch(updateFruitUserStakedBalance(account))
            dispatch(updateFruitUserBalance(account))
            dispatch(updateFruitUserPendingReward(account))
        },
        [account, dispatch, fruitPoolContract],
    )

    return { onUnstake: handleUnstake }
}

export default useFruitUnstake