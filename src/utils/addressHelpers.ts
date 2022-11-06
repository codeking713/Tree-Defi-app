import addresses from 'config/constants/contracts'
import { Address } from 'config/constants/types'

const chainId = process.env.REACT_APP_CHAIN_ID

export const getAddress = (address: Address): string => {
  const mainNetChainId = 56
  return address[chainId] ? address[chainId] : address[mainNetChainId]
}

export const getTreeAddress = () => {
  return addresses.tree[chainId]
}
export const getCakeAddress = () => {
  return addresses.cake[chainId]
}
export const getFruitAddress = () => {
  return addresses.fruit[chainId]
}
export const getMasterChefAddress = () => {
  return addresses.masterChef[chainId]
}
export const getForestAddress = () => {
  return addresses.forest[chainId]
}
export const getMulticallAddress = () => {
  return addresses.mulltiCall[chainId]
}
export const getWbnbAddress = () => {
  return addresses.wbnb[chainId]
}
export const getCakeVaultAddress = () => {
  return addresses.cakeVault[chainId]
}
export const getFruitPoolAddress = () => {
  return addresses.fruitPool[chainId]
}
export const getMerchandiseAddress = () => {
  return addresses.merchandise[chainId]
}
export const getLotteryAddress = () => {
  return addresses.lottery[chainId]
}
export const getLotteryTicketAddress = () => {
  return addresses.lotteryNFT[chainId]
}
export const getWheelAddress = () => {
  return addresses.moneyWheel[chainId]
}
