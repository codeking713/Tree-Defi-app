import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { BIG_ZERO } from 'utils/bigNumber'
import { useCakeVaultContract } from 'hooks/useContract'
import { useWallet } from '@binance-chain/bsc-use-wallet'

const useGetVaultUserInfo = (lastUpdated?: number) => {
  const { account } = useWallet()
  const cakeVaultContract = useCakeVaultContract()
  const [userInfo, setUserInfo] = useState({
    shares: BIG_ZERO,
    treeAtLastUserAction: BIG_ZERO,
    lastDepositedTime: '',
    lastUserActionTime: '',
  })

  useEffect(() => {
    //   user-specific vault contract fetches
    const fetchUserVaultInfo = async () => {
      const userContractInfo = await cakeVaultContract.methods.userInfo(account).call()

      setUserInfo({
        shares: new BigNumber(userContractInfo.shares),
        treeAtLastUserAction: new BigNumber(userContractInfo.treeAtLastUserAction),
        lastDepositedTime: userContractInfo.lastDepositedTime,
        lastUserActionTime: userContractInfo.lastUserActionTime,
      })
    }

    if (account) {
      fetchUserVaultInfo()
    }
  }, [account, cakeVaultContract, lastUpdated])
  
  return userInfo
}

export default useGetVaultUserInfo
