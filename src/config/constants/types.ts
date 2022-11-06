export type IfoStatus = 'coming_soon' | 'live' | 'finished'

export interface Ifo {
  id: string
  isActive: boolean
  address: string
  name: string
  subTitle?: string
  description?: string
  launchDate: string
  launchTime: string
  saleAmount: string
  raiseAmount: string
  cakeToBurn: string
  projectSiteUrl: string
  currency: string
  currencyAddress: string
  tokenDecimals: number
  releaseBlockNumber: number
}

export enum QuoteToken {
  'BNB' = 'BNB',
  'CAKE' = 'CAKE',
  'SYRUP' = 'SYRUP',
  'BUSD' = 'BUSD',
  'TWT' = 'TWT',
  'UST' = 'UST',
  'TREE' = 'TREE',
  'SEED' = 'SEED',
  'SLIME' = 'SLIME',
  'ADA' = 'ADA',
  'BUNNY' = 'BUNNY',
  'NIU' = 'NIU',
  'NAUT' = 'NAUT',
}

export enum PoolCategory {
  'COMMUNITY' = 'Community',
  'CORE' = 'Core',
  'BINANCE' = 'Binance', // Pools using native BNB behave differently than pools using a token
  'TREE' = 'TREE',
  'SEED' = 'SEED,',
  'AUTO' = 'AUTO',
}

export interface Address {
  97?: string
  56: string
}

export interface FarmConfig {
  pid: number
  lpSymbol: string
  lpAddresses: Address
  tokenSymbol: string
  tokenAddresses: Address
  quoteTokenSymbol: QuoteToken
  quoteTokenAdresses: Address
  multiplier?: string
  isPartner?: boolean
  isTokenOnly?: boolean
  isCommunity?: boolean
  risk: number
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
}

export interface PoolConfig {
  sousId: number
  image?: string
  tokenName: string
  stakingTokenName: QuoteToken
  stakingLimit?: number
  stakingTokenAddress?: string
  contractAddress: Address
  poolCategory: PoolCategory
  projectLink: string
  dexId:string
  withwithdrawFee?: boolean
  withdrawFee?: number
  isLPReward?: boolean
  isLPStake?: boolean
  withwithdrawDepositFee?: boolean
  depositFee?: number
  noApy?: boolean
  tokenPerBlock: string
  sortOrder?: number
  harvest?: boolean
  isFinished?: boolean
  tokenDecimals: number
  startBlock?: number
  endBlock?: number
  slimeRounding?: number
  totalbalance?: number
  treepool?: boolean
}

export type Nft = {
  name: string
  description: string
  originalImage: string
  previewImage: string
  blurImage: string
  sortOrder: number
  bunnyId: number
}

export type Nftree = {
  name: string
  description: string
  originalImage: string
  previewImage: string
  blurImage: string
  ScientificName: string
  Country: string
  PlaceofBirth: string
  PlaceofResidence: string
  DateofBirth: string
  Longitude: string
  Latitude: string
  ID: string
  PriceNFT: number
  Co2: number
  sortOrder: number
  bunnyId: number
}
