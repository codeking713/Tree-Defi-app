import { getCakeAddress, getFruitAddress, getFruitPoolAddress, getMerchandiseAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'
import cakeABI from 'config/abi/cake.json'
import fruitABI from 'config/abi/fruit.json'
import fruitPoolABI from 'config/abi/fruitPool.json'
import multicall from 'utils/multicall'

/**
 * Fetch user data at once
 * @param account 
 */
export const fetchFruitPoolUserData = async (account) => {
  const [allowance, balance] = await multicall(cakeABI, [
    {
      address: getCakeAddress(),
      name: 'allowance',
      params: [account, getFruitPoolAddress()]
    },
    {
      address: getCakeAddress(),
      name: 'balanceOf',
      params: [account]
    }])

  const [userInfo, pendingReward] = await multicall(fruitPoolABI, [
    {
      address: getFruitPoolAddress(),
      name: 'userInfo',
      params: [account]
    },
    {
      address: getFruitPoolAddress(),
      name: 'pendingReward',
      params: [account]
    }
  ])

  const [fruitAllowance] = await multicall(fruitABI, [
    {
      address: getFruitAddress(),
      name: 'allowance',
      params: [account, getMerchandiseAddress()]
    }
  ])

  return {
    allowance: new BigNumber(allowance as string).toJSON(),
    fruitAllowance: new BigNumber(fruitAllowance as string).toJSON(),
    stakingTokenBalance: new BigNumber(balance as string).toJSON(),
    stakedBalance: new BigNumber((userInfo as any).amount._hex).toJSON(),
    pendingReward: new BigNumber(pendingReward as string).toJSON(),
  }
}

export const fetchFruitPoolAllowance = async (account) => {
  const [allowance] = await multicall(cakeABI, [
    {
      address: getCakeAddress(),
      name: 'allowance',
      params: [account, getFruitPoolAddress()]
    }
  ])
  return new BigNumber(allowance).toJSON()
}

export const fetchMerchandiseAllowance = async (account) => {
  const [allowance] = await multicall(fruitABI, [
    {
      address: getFruitAddress(),
      name: 'allowance',
      params: [account, getMerchandiseAddress()]
    }
  ])
  return new BigNumber(allowance).toJSON()
}

export const fetchFruitUserBalance = async (account) => {
  const [balance] = await multicall(cakeABI, [
    {
      address: getCakeAddress(),
      name: 'balanceOf',
      params: [account]
    }
  ])
  return new BigNumber(balance).toJSON()
}

export const fetchFruitUserStakeBalance = async (account) => {
  const [userInfo] = await multicall(fruitPoolABI, [
    {
      address: getFruitPoolAddress(),
      name: 'userInfo',
      params: [account]
    },
  ])
  return new BigNumber(userInfo.amount._hex).toJSON()
}

export const fetchFruitUserPendingReward = async (account) => {
  const [pendingReward] = await multicall(fruitPoolABI, [
    {
      address: getFruitPoolAddress(),
      name: 'pendingReward',
      params: [account]
    },
  ])
  return new BigNumber(pendingReward).toJSON()
}
