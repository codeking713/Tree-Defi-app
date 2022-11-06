import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import { updateFruitUserAllowance } from 'state/actions'
import { updateMerchandiseUserAllowance } from 'state/fruit'
import { approve } from 'utils/callHelpers'
import { useCake, useFruitPoolContract, useMerchandiseContract, useFruit } from '../useContract'

// Approve a fruit pool
export const useFruitPoolApprove = () => {
    const dispatch = useDispatch()
    const { account }: { account: string } = useWallet()
    const fruitPoolContract = useFruitPoolContract()
    const stakingContract = useCake()

    const handleApprove = useCallback(async () => {
        try {
            const tx = await approve(stakingContract, fruitPoolContract, account)
            dispatch(updateFruitUserAllowance(account))
            return tx
        } catch (e) {
            return false
        }
    }, [account, dispatch, stakingContract, fruitPoolContract])

    return { onApprove: handleApprove }
}

// Approve merchandise payment gateway
export const useMerchandiseApprove = () => {
    const dispatch = useDispatch()
    const { account }: { account: string } = useWallet()
    const merchandiseContract = useMerchandiseContract()
    const fruitContract = useFruit()

    const handleApprove = useCallback(async () => {
        try {
            const tx = await approve(fruitContract, merchandiseContract, account)
            dispatch(updateMerchandiseUserAllowance(account))
            return tx
        } catch (e) {
            return false
        }
    }, [account, dispatch, fruitContract, merchandiseContract])

    return { onApprove: handleApprove }
}
