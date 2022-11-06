import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, IconButton, useModal, AddIcon, CardRibbon, Flex, Text, CardBody } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import Label from 'components/Label'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import { useFruitPoolApprove } from 'hooks/fruitPool/useFruitApprove'
import { useFruitStake } from 'hooks/fruitPool/useFruitStake'
import { useFruitUnstake } from 'hooks/fruitPool/useFruitUnstake'
import { useFruitHarvest } from 'hooks/fruitPool/useFruitHarvest'
import { getBalanceNumber } from 'utils/formatBalance'
import Balance from 'components/Balance'
import { useFruit } from 'state/hooks'
import DepositModal from './Modals/DepositModal'
import WithdrawModal from './Modals/WithdrawModal'
import StyledCardHeader from './StyledCardHeader'
import { StyledCard } from './StyledCard'
import HarvestButton from './HarvestButton'

const FruitLaunchPool: React.FC = () => {
    
  const tokenDecimals = 18    // token decimal for both staking and earning
  const stakingLimit = 0
  const harvest = true
  const stakingTokenName = 'SEED'
  const tokenName = 'FRUIT'

  const TranslateString = useI18n()
  const { account } = useWallet()
  const block = useBlock()
  const fruitPool = useFruit(account)
  const { onApprove } = useFruitPoolApprove()
  const { onStake } = useFruitStake()
  const { onUnstake } = useFruitUnstake()
  const { onReward } = useFruitHarvest()

  const {
    endBlock,
    userData,
  } = fruitPool
  const isFinished = block > endBlock

  const [requestedApproval, setRequestedApproval] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)

  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const earnings = new BigNumber(userData?.pendingReward || 0)

  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const needsApproval = !accountHasStakedBalance && !allowance.toNumber()

  const convertedLimit = new BigNumber(stakingLimit).multipliedBy(new BigNumber(10).pow(tokenDecimals))
  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingLimit && stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance}
      onConfirm={onStake}
      tokenName={stakingLimit ? `${stakingTokenName} (${stakingLimit} max)` : stakingTokenName}
    />,
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
  
  // styling shit

  return (
    <StyledCard
      isStaking={!isFinished && accountHasStakedBalance}
      isFinished={isFinished}
      ribbon={
        isFinished && <CardRibbon variantColor="textDisabled" text={`${TranslateString(388, 'Finished')}`} />
      }
    >
      <StyledCardHeader isFinished={isFinished} />
      <CardBody>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex flexDirection="column">
            <BalanceAndCompound>
              <Balance value={getBalanceNumber(earnings, tokenDecimals)} isDisabled={isFinished} />
            </BalanceAndCompound>
            <Label isFinished={isFinished} text={TranslateString(330, `${tokenName} earned`)} />
          </Flex>

          {account && harvest && (
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
            (needsApproval ? (
              <div style={{ flex: 1 }}>
                <Button disabled={isFinished || requestedApproval} onClick={handleApprove} fullWidth>
                  {`Approve ${stakingTokenName}`}
                </Button>
              </div>
            ) : (
              <>
                <Button
                  disabled={stakedBalance.eq(new BigNumber(0)) || pendingTx}
                  onClick={onPresentWithdraw}
                >
                  {`Unstake ${stakingTokenName}`}
                </Button>
                <StyledActionSpacer />
                <IconButton disabled={isFinished} onClick={onPresentDeposit}>
                  <AddIcon color="background" />
                </IconButton>
              </>
            ))}
        </StyledCardActions>
        <StyledDetails>
          <div style={{ flex: 1 }}>{TranslateString(999, 'Stake')}:</div>
          <Text> SEED </Text>
        </StyledDetails>
        <StyledDetails>
          <div style={{ flex: 1 }}>{TranslateString(999, 'Earn')}:</div>
          <Text> FRUIT </Text>
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

export default FruitLaunchPool
