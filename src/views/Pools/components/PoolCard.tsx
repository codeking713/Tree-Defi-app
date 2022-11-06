import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, IconButton, useModal, AddIcon, CardRibbon, Flex, Progress, Text, CardBody } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import Label from 'components/Label'
import AlertHelper from 'components/AlertHelper'
import { useERC20 } from 'hooks/useContract'
import { useSousApprove } from 'hooks/useApprove'
import useI18n from 'hooks/useI18n'
import { useSousStake } from 'hooks/useStake'
import { useSousUnstake } from 'hooks/useUnstake'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { useSousHarvest } from 'hooks/useHarvest'
import Balance from 'components/Balance'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import { Pool } from 'state/types'
import DepositModal from './Modals/DepositModal'
import WithdrawModal from './Modals/WithdrawModal'
import CompoundModal from './Modals/CompoundModal'
import StyledCardHeader from './StyledCardHeader'
import { StyledCard } from './StyledCard'
import OldSyrupTitle from './OldSyrupTitle'
import HarvestButton from './HarvestButton'
import CardFooter from './CardFooter'

interface PoolWithApy extends Pool {
  apy: BigNumber
}

interface HarvestProps {
  pool: PoolWithApy
}

const PoolCard: React.FC<HarvestProps> = ({ pool }) => {
  const {
    sousId,
    image,
    tokenName,
    stakingTokenName,
    stakingTokenAddress,
    projectLink,
    harvest,
    apy,
    tokenDecimals,
    poolCategory,
    totalStaked,
    startBlock,
    endBlock,
    isFinished,
    userData,
    stakingLimit,
    totalbalance,
  } = pool
  // Pools using native BNB behave differently than pools using a token
  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const TranslateString = useI18n()
  const stakingTokenContract = useERC20(stakingTokenAddress)
  const { account } = useWallet()
  const block = useBlock()
  const { onApprove } = useSousApprove(stakingTokenContract, sousId)
  const { onStake } = useSousStake(sousId, isBnbPool)
  const { onUnstake } = useSousUnstake(sousId)
  const { onReward } = useSousHarvest(sousId, isBnbPool)

  const [requestedApproval, setRequestedApproval] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)

  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const earnings = new BigNumber(userData?.pendingReward || 0)

  const blocksUntilStart = Math.max(startBlock - block, 0)
  const blocksRemaining = Math.max(endBlock - block, 0)
  const isOldSyrup = stakingTokenName === QuoteToken.SYRUP
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const needsApproval = !accountHasStakedBalance && !allowance.toNumber() && !isBnbPool

  const convertedLimit = new BigNumber(stakingLimit).multipliedBy(new BigNumber(10).pow(tokenDecimals))
  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingLimit && stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance}
      onConfirm={onStake}
      tokenName={stakingLimit ? `${stakingTokenName} (${stakingLimit} max)` : stakingTokenName}
    />,
  )

  const [onPresentCompound] = useModal(
    <CompoundModal earnings={earnings} onConfirm={onStake} tokenName={stakingTokenName} />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={stakingTokenName} />,
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, setRequestedApproval])

  // get a progress percentage value for progress bar
  const currentBlock = useBlock()

  const rewardProgress = currentBlock > startBlock ? ((endBlock - currentBlock) / (endBlock - startBlock)) * 100 : 100

  // convert remaining blocks to remaining time (base on 3sec/block, 28800 blocks per day)
  const SpecialReminingTime =
    ((endBlock - currentBlock) * 3) / 60 / 60 / 24 > 1
      ? `${Math.round(((endBlock - currentBlock) * 3) / 60 / 60 / 24)}${TranslateString(999, ' days')}`
      : `${Math.round(((endBlock - currentBlock) * 3) / 60 / 60)}${TranslateString(999, ' hours')}`

  const SpecialStartTime =
    ((startBlock - currentBlock) * 3) / 60 / 60 / 24 > 1
      ? `${Math.round(((startBlock - currentBlock) * 3) / 60 / 60 / 24)}${TranslateString(999, ' days')}`
      : `${Math.round(((startBlock - currentBlock) * 3) / 60 / 60)}${TranslateString(999, ' hours')}`

  // styling shit

  return (
    <StyledCard
      isStaking={!isFinished && accountHasStakedBalance}
      isFinished={isFinished && sousId !== 0}
      ribbon={
        isFinished &&
        sousId !== 0 && <CardRibbon variantColor="textDisabled" text={`${TranslateString(388, 'Finished')}`} />
      }
    >
      <StyledCardHeader
        earningTokenSymbol={tokenName}
        stakingTokenSymbol= {stakingTokenName} 
        image={image}
        isFinished={isFinished && sousId !== 0}
        sousId={sousId}
        isOldSyrup={isOldSyrup}
      />

      <CardBody>
        {currentBlock < startBlock ? (
          <div>
            <Progress primaryStep={rewardProgress} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text fontSize="14px" bold color="contrast" line-height="0.8">
                Starts in:
              </Text>
              <Text fontSize="14px" bold color="contrast" line-height="0.8">
                {SpecialStartTime}
              </Text>
            </div>
          </div>
        ) : (
          <div>
            <Progress primaryStep={rewardProgress} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text fontSize="14px" bold color="contrast" line-height="0.8">
                Ends in:
              </Text>
              <Text fontSize="14px" bold color="contrast" line-height="0.8">
                {SpecialReminingTime}
              </Text>
            </div>
          </div>
        )}

        <Flex alignItems="center" justifyContent="space-between" mt="20px">
          <Flex flexDirection="column">
            {!isOldSyrup ? (
              <BalanceAndCompound>
                <Balance value={getBalanceNumber(earnings, tokenDecimals)} isDisabled={isFinished} />
                {sousId === 0 && account && harvest && (
                  <HarvestButton
                    disabled={!earnings.toNumber() || pendingTx}
                    text={pendingTx ? TranslateString(999, 'Compounding') : TranslateString(999, 'Compound')}
                    onClick={onPresentCompound}
                  />
                )}
              </BalanceAndCompound>
            ) : (
              <OldSyrupTitle hasBalance={accountHasStakedBalance} />
            )}
            <Label isFinished={isFinished && sousId !== 0} text={TranslateString(330, `${tokenName} earned`)} />
          </Flex>

          {account && harvest && !isOldSyrup && (
            <HarvestButton
              disabled={!earnings.toNumber() || pendingTx}
              text={pendingTx ? 'Collecting' : 'Harvest'}
              onClick={async () => {
                setPendingTx(true)
                await onReward()
                setPendingTx(false)
              }}
            />
          )}
        </Flex>

        <StyledCardActions>
          {!account && (
            <div style={{ flex: 1 }}>
              <UnlockButton fullWidth />
            </div>
          )}
          {account &&
            (needsApproval && !isOldSyrup ? (
              <div style={{ flex: 1 }}>
                <Button disabled={isFinished || requestedApproval} onClick={handleApprove} fullWidth>
                  {`Approve ${stakingTokenName}`}
                </Button>
              </div>
            ) : (
              <>
                {sousId === 3 && (
                  <AlertHelper
                    text={TranslateString(
                      9999,
                      'EmergencyWithdraw mode enabled. Now you can withdraw your SEED, but reward will be lost. We are currently investigating on the problem.',
                    )}
                  />
                )}
                <Button
                  disabled={stakedBalance.eq(new BigNumber(0)) || pendingTx}
                  onClick={
                    isOldSyrup
                      ? async () => {
                          setPendingTx(true)
                          await onUnstake('0')
                          setPendingTx(false)
                        }
                      : onPresentWithdraw
                  }
                >
                  {`Unstake ${stakingTokenName}`}
                </Button>
                <StyledActionSpacer />
                {sousId === 3 && (
                  <AlertHelper
                    text={TranslateString(
                      9999,
                      'Deposits are temporary disabled. We are investigating on a issue that prevent contract to distribuite rewards.',
                    )}
                  />
                )}
                {!isOldSyrup && (
                  <IconButton disabled={isFinished && sousId !== 0} onClick={onPresentDeposit}>
                    <AddIcon color="background" />
                  </IconButton>
                )}
              </>
            ))}
        </StyledCardActions>
        <StyledDetails>
          <div style={{ flex: 1 }}>{TranslateString(999, 'Stake')}:</div>
          {(stakingTokenName === QuoteToken.TREE ) ? 
                <Text> TREE </Text>
                :
                <Text> SEED </Text>
                }
        </StyledDetails>
        <StyledDetails>
          <div style={{ flex: 1 }}>{TranslateString(999, 'Earn')}:</div>
          {(sousId === 23) ? // here should be improved , is a quick fix
                <Text> ADA </Text>
                :
                <Text> {tokenName} </Text>
              }
        </StyledDetails>
        <StyledDetails marginTop={5}>
          <div style={{ flex: 1 }}>{TranslateString(736, 'APR')}:</div>
          {isFinished || isOldSyrup || !apy || apy?.isNaN() || !apy?.isFinite() ? (
            '-'
          ) : (
            <Balance fontSize="14px" isDisabled={isFinished} value={apy?.toNumber()} decimals={2} unit="%" />
          )}
        </StyledDetails>
        <StyledDetails marginTop={5}>
          <div style={{ flex: 1 }}>
            <span role="img" aria-label={stakingTokenName}>
              🌱{' '}
            </span>
            {TranslateString(384, 'Your Stake')}:
          </div>
          <Balance fontSize="14px" isDisabled={isFinished} value={getBalanceNumber(stakedBalance)} />
        </StyledDetails>
      </CardBody>

      <CardFooter
        projectLink={projectLink}
        totalStaked={totalStaked}
        blocksRemaining={blocksRemaining}
        isFinished={isFinished}
        blocksUntilStart={blocksUntilStart}
        poolCategory={poolCategory}
        totalBalance={totalbalance}
        tokenName={tokenName}
      />
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

const BalanceAndCompound = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div<{ marginTop?: number }>`
  display: flex;
  font-size: 14px;
  align-items: center;
  margin-top: ${({ marginTop }) => marginTop}px;
`

export default PoolCard
