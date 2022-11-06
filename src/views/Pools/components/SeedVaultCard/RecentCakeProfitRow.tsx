import React from 'react'
import BigNumber from 'bignumber.js'
import { Flex, Text } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import RecentCakeProfitBalance from './RecentCakeProfitBalance'


interface RecentCakeProfitRowProps {
  treeAtLastUserAction: BigNumber
  userShares: BigNumber
  pricePerFullShare: BigNumber
}

const RecentCakeProfitCountdownRow: React.FC<RecentCakeProfitRowProps> = ({
  treeAtLastUserAction,
  userShares,
  pricePerFullShare,
}) => {
  const { account } = useWallet()
  const shouldDisplayCakeProfit =
    account && treeAtLastUserAction && treeAtLastUserAction.gt(0) && userShares && userShares.gt(0)

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text fontSize="14px">Recent SEED profit:</Text>
      {shouldDisplayCakeProfit && (
        <RecentCakeProfitBalance
          treeAtLastUserAction={treeAtLastUserAction}
          userShares={userShares}
          pricePerFullShare={pricePerFullShare}
        />
      )}
    </Flex>
  )
}

export default RecentCakeProfitCountdownRow
