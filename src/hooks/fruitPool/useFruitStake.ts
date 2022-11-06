import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { sousStake } from 'utils/callHelpers'
import { useFruitPoolContract } from 'hooks/useContract'
import { updateFruitUserBalance, updateFruitUserStakedBalance } from 'state/fruit'

export const useFruitStake = () => {
    const dispatch = useDispatch()
    const { account } = useWallet()
    const fruitPoolContract = useFruitPoolContract()

    const handleStake = useCallback(
        async (amount: string) => {
            await sousStake(fruitPoolContract, amount, account)
            dispatch(updateFruitUserStakedBalance(account))
            dispatch(updateFruitUserBalance(account))
        },
        [account, dispatch, fruitPoolContract],
    )

    return { onStake: handleStake }
}

export default useFruitStake