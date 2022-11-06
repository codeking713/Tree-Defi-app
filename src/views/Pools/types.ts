import BigNumber from 'bignumber.js'

export interface VaultUser {
  shares: BigNumber
  treeAtLastUserAction: BigNumber
  lastDepositedTime: string
  lastUserActionTime: string
}
