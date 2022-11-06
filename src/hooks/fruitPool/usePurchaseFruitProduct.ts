import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useMerchandiseContract } from 'hooks/useContract'
import BigNumber from 'bignumber.js'

const merchantApiUrl = 'https://apimerchandise.treedefi.com'

export const usePurchaseFruitProduct = () => {
    const dispatch = useDispatch()
    const { account } = useWallet()
    const merchandiseContract = useMerchandiseContract()

    const handlePurchase = useCallback(
        async (pid: string, amount: string, detail: any) => {
            const txHash = await merchandiseContract.methods
                .submitTransaction(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
                .send({ from: account })
                .on('transactionHash', (tx) => {
                    return tx.transactionHash
                })

            if (txHash) {
                const lastTransaction = await merchandiseContract.methods.transactionPagination(account, 0, 1).call()
                if (lastTransaction && lastTransaction.length > 0) {
                    const response = await axios.post(`${merchantApiUrl}/product/purchase`, {tx: lastTransaction[0], pid, ...detail})
                    if (response.data.success) {
                        return response.data.data
                    }
                }
            }

            return null
        },
        [account, merchandiseContract],
    )

    return { onPurchase: handlePurchase }
}

export default usePurchaseFruitProduct