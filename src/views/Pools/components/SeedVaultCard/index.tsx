import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { Box, HelpIcon, Text, CardBody, useTooltip } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import Balance from 'components/Balance'
import { PoolCategory } from 'config/constants/types'
import { Pool } from 'state/types'
import useGetVaultFees from 'hooks/cakeVault/useGetVaultFees'
import useLastUpdated from 'hooks/useLastUpdated'
import useGetVaultUserInfo from 'hooks/cakeVault/useGetVaultUserInfo'
import useGetVaultSharesInfo from 'hooks/cakeVault/useGetVaultSharesInfo'
import { getPoolApr } from 'utils/apr'
import { calculateCakeEarnedPerThousandDollars, getRoi } from 'utils/compoundApyHelpers'
import { convertSharesToCake } from 'views/Pools/helpers'
import useWithdrawalFeeTimer from 'hooks/cakeVault/useWithdrawalFeeTimer'

import { usePriceCakeBusd } from 'state/hooks'
import StyledCardHeader from '../StyledCardHeader'
import { StyledCard, StyledCardInner } from '../StyledCard'
import CardFooter from '../CardFooter'
import WithdrawalFeeTimer from './WithdrawalFeeTimer'
import VaultCardActions from './VaultCardActions'

interface PoolWithApy extends Pool {
  apy: BigNumber
}

interface HarvestProps {
  pool: PoolWithApy
  poolWeight: BigNumber
}

const PoolCard: React.FC<HarvestProps> = ({ pool, poolWeight }) => {
  const {
    sousId,
    tokenName,
    // stakingTokenName,
    projectLink,
    startBlock,
    endBlock,
    isFinished,
    userData,
    totalbalance,
  } = pool
  // Pools using native BNB behave differently than pools using a token
  const TranslateString = useI18n()
  const { account } = useWallet()
  const block = useBlock()
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)

  const blocksUntilStart = Math.max(startBlock - block, 0)
  const blocksRemaining = Math.max(endBlock - block, 0)
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0

  const { lastUpdated, setLastUpdated } = useLastUpdated()
  const userInfo = useGetVaultUserInfo(lastUpdated)

  const vaultFees = useGetVaultFees()
  const { totalCakeInVault, pricePerFullShare } = useGetVaultSharesInfo()

  // ************************ APY of this pool **************************** //
  //  compoundFrequency: Estimate & manual for now. 288 = once every 5 mins. We can change once we have a better sense of this
  // observation: we divided by three because those are computed by observing the compounding behaviour
  const compoundFrequency = 288
  const accountHasSharesStaked = userInfo.shares && userInfo.shares.gt(0)
  const stakingTokenPrice = usePriceCakeBusd()
  const earningTokenPrice = stakingTokenPrice

  const isLoading = !pool.userData || !userInfo.shares

  const performanceFee = vaultFees.performanceFee && parseInt(vaultFees.performanceFee, 10) / 100
  // special handling for tokens like tBTC or BIFI where the daily token rewards for $1000 dollars will be less than 0.001 of that token
  const isHighValueToken = Math.round(earningTokenPrice.toNumber() / 1000) > 0
  const roundingDecimals = isHighValueToken ? 4 : 2
  
  const vaultPerBlock = totalCakeInVault && pool.totalStaked ? (totalCakeInVault.div(pool.totalStaked)).toNumber() : 1

  const farmApy = getPoolApr(
    stakingTokenPrice.toNumber(),
    earningTokenPrice.toNumber(),
    getBalanceNumber(totalCakeInVault, pool.tokenDecimals),
    poolWeight.toNumber() * vaultPerBlock * parseFloat(pool.tokenPerBlock)
  )
  
  const oneThousandDollarsWorthOfToken = 1000 / earningTokenPrice.toNumber()

  const tokenEarnedPerThousand365D = calculateCakeEarnedPerThousandDollars({
    numberOfDays: 365,
    farmApy,
    cakePrice: earningTokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })

  const earningsPercentageToDisplay = getRoi({
    amountEarned: tokenEarnedPerThousand365D,
    amountInvested: oneThousandDollarsWorthOfToken,
  })

  // ************************ Recent Profit **************************** //
  const { treeAtLastUserAction } = userInfo
  const userShares = userInfo.shares
  // const shouldDisplayCakeProfit =
  //   account && treeAtLastUserAction && treeAtLastUserAction.gt(0) && userShares && userShares.gt(0)
  const currentSharesAsCake = convertSharesToCake(userShares, pricePerFullShare)
  const cakeProfit = currentSharesAsCake.cakeAsBigNumber.minus(treeAtLastUserAction)
  const cakeToDisplay = cakeProfit.gte(0) ? getFullDisplayBalance(cakeProfit, 18, 5) : '0'

  // ************************ Unstaking Fee **************************** //
  const { withdrawalFee, withdrawalFeePeriod } = vaultFees
  const feeAsDecimal = parseInt(withdrawalFee) / 100 || '-'
  const lastDepositedTime = accountHasSharesStaked && userInfo.lastDepositedTime

  const { secondsRemaining, hasUnstakingFee } = useWithdrawalFeeTimer(
    parseInt(lastDepositedTime, 10),
    parseInt(withdrawalFeePeriod, 10),
  )

  // The user has made a deposit, but has no fee
  const noFeeToPay = lastDepositedTime && !hasUnstakingFee

  // Show the timer if a user is connected, has deposited, and has an unstaking fee
  const shouldShowTimer = account && lastDepositedTime && hasUnstakingFee
  const getRowText = () => {
    if (noFeeToPay) {
      return TranslateString(999, 'unstaking fee')
    }
    if (shouldShowTimer) {
      return TranslateString(999, 'unstaking fee until')
    }
    return TranslateString(999, 'unstaking fee if withdrawn within 72h')
  }


  /* 
  full text to understand it better: 
  <Text style={{ fontStyle: 'italic', display: 'inline-flex' }}>alloc_point</Text> is the weight assigned to this
  pool used to calculate rewards for liquidity providers{' '}
  <Text style={{ fontStyle: 'italic', display: 'inline-flex' }}>block_reward</Text> refers to the new SEED awarded
  to eligible stakers for each validated block
  */

  const TooltipComponent = () => (
    <>
      <Text mb="12px">
        to compute APY we are estimating a compound every 15 minutes and we calculate token per block using the formula 
        <Text mb="2px" style={{ fontStyle: 'italic', display: 'inline-flex' }}> ( alloc_point / total_alloc_point ) * block_reward </Text> 
      </Text>
    </>
  )

  const { targetRef, tooltip, tooltipVisible } = useTooltip(<TooltipComponent />, {
    placement: 'top-end',
    tooltipOffset: [10, 10],
  })

  return (
    <StyledCard isStaking={accountHasStakedBalance} isAutoVault>
      {tooltipVisible && tooltip}
      <StyledCardInner isAutoVault>
        <StyledCardHeader
          earningTokenSymbol="SEED"
          stakingTokenSymbol="SEED"
          image="AutoSEED"
          sousId={sousId}
          isOldSyrup={false}
          isAutoSeed
        />

        <CardBody>
          <StyledCardActions>
            {!account && (
              <div style={{ flex: 1 }}>
                <UnlockButton fullWidth />
              </div>
            )}
            {account && (
              <VaultCardActions
                pool={pool}
                userInfo={userInfo}
                pricePerFullShare={pricePerFullShare}
                vaultFees={vaultFees}
                stakingTokenPrice={stakingTokenPrice}
                accountHasSharesStaked={accountHasSharesStaked}
                lastUpdated={lastUpdated}
                setLastUpdated={setLastUpdated}
                isLoading={isLoading}
              />
            )}
          </StyledCardActions>
          <StyledDetails>
            <div style={{ flex: 1 }}>{TranslateString(999, 'Stake')}:</div>
              <Text> SEED </Text>
          </StyledDetails>
          <StyledDetails>
            <div style={{ flex: 1 }}>{TranslateString(999, 'Earn')}:</div>
              <Text> {tokenName} </Text>
          </StyledDetails>
          <StyledDetails marginTop={5}>
            <div style={{ flex: 1 }}>
              {TranslateString(736, 'APY')}:
              <Box ref={targetRef} style={{ display: 'inline', marginLeft: 5 }}>
                <HelpIcon color="textSubtle" />
              </Box>
            </div>
            <Balance
              fontSize="14px"
              isDisabled={isFinished}
              value={earningsPercentageToDisplay || 0}
              decimals={2}
              unit="%"
            />
          </StyledDetails>
          <StyledDetails marginTop={5}>
            <div style={{ flex: 1 }}>{TranslateString(999, 'Recent SEED profit')}:</div>
            <Text fontSize="14px">{cakeToDisplay || 0}</Text>
          </StyledDetails>
          <StyledDetails marginTop={5}>
            <div style={{ flex: 1 }}>
              {noFeeToPay ? '0' : feeAsDecimal} % {getRowText()}:
            </div>
            {shouldShowTimer && <WithdrawalFeeTimer secondsRemaining={secondsRemaining} />}
          </StyledDetails>
        </CardBody>

        <CardFooter
          projectLink={projectLink}
          totalStaked={totalCakeInVault}
          blocksRemaining={blocksRemaining}
          isFinished={isFinished}
          blocksUntilStart={blocksUntilStart}
          poolCategory={PoolCategory.AUTO}
          totalBalance={totalbalance}
          tokenName={tokenName}
          isAutoVault
          performanceFee={performanceFee}
        />
      </StyledCardInner>
    </StyledCard>
  )
}

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin: 25px 0;
  width: 100%;
  box-sizing: border-box;
`

// const BalanceAndCompound = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   flex-direction: row;
// `

// const StyledActionSpacer = styled.div`
//   height: ${(props) => props.theme.spacing[4]}px;
//   width: ${(props) => props.theme.spacing[4]}px;
// `

const StyledDetails = styled.div<{ marginTop?: number }>`
  display: flex;
  font-size: 14px;
  align-items: center;
  margin-top: ${({ marginTop }) => marginTop}px;
`

export default PoolCard
