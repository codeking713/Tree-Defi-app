import { useEffect, useState } from 'react'
import { Contract } from 'web3-eth-contract'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
// import { useMoneyWheel, useCake } from 'hooks/useContract'

export const getMaxBetValue = async (moneyWheelContract: Contract) => {
  return moneyWheelContract.methods.maxBet().call()
}

export const useGetMaxBet = (moneyWheelContract: Contract) => {
  const [maxBet, setMaxBet] = useState(new BigNumber(0))
  const { account } = useWallet()

  useEffect(() => {
    if (moneyWheelContract) {
      const fetchMaxBet = async () => {
        const state = await getMaxBetValue(moneyWheelContract)
        setMaxBet(new BigNumber(state))
      }

      fetchMaxBet()
    }
  }, [account, moneyWheelContract])

  return maxBet
}

export default useGetMaxBet
