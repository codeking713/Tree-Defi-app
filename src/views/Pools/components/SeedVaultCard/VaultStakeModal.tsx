import React, { useCallback, useState } from 'react'
import { Modal, Text, Flex, Image, Button, AutoRenewIcon } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useCakeVaultContract } from 'hooks/useContract'
import useWithdrawalFeeTimer from 'hooks/cakeVault/useWithdrawalFeeTimer'
import { VaultFees } from 'hooks/cakeVault/useGetVaultFees'
import BigNumber from 'bignumber.js'
import { getFullDisplayBalance, formatNumber, getDecimalAmount } from 'utils/formatBalance'
import { Pool } from 'state/types'
import { VaultUser } from 'views/Pools/types'
import ModalActions from 'components/ModalActions'
import TokenInput from 'components/TokenInput'
import { convertCakeToShares } from '../../helpers'
import FeeSummary from './FeeSummary'

interface VaultStakeModalProps {
  pool: Pool
  stakingMax: BigNumber
  stakingTokenPrice: BigNumber
  userInfo: VaultUser
  isRemovingStake?: boolean
  pricePerFullShare?: BigNumber
  vaultFees?: VaultFees
  setLastUpdated: () => void
  onDismiss?: () => void
}

const VaultStakeModal: React.FC<VaultStakeModalProps> = ({
  pool,
  stakingMax,
  stakingTokenPrice,
  pricePerFullShare,
  userInfo,
  isRemovingStake = false,
  vaultFees,
  onDismiss,
  setLastUpdated,
}) => {
  const { account } = useWallet()
  const { stakingTokenName, tokenDecimals: stakingTokenDecimals } = pool
  const cakeVaultContract = useCakeVaultContract()
  const [pendingTx, setPendingTx] = useState(false)
  const [stakeAmount, setStakeAmount] = useState('')
  const { hasUnstakingFee } = useWithdrawalFeeTimer(parseInt(userInfo.lastDepositedTime))
  const fullBalance = getFullDisplayBalance(stakingMax, stakingTokenDecimals)

  const handleStakeInputChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setStakeAmount(e.currentTarget.value)
    },
    [setStakeAmount],
  )

  const handleSelectMax = useCallback(() => {
    setStakeAmount(fullBalance)
  }, [fullBalance, setStakeAmount])

  const handleWithdrawal = async (convertedStakeAmount: BigNumber) => {
    setPendingTx(true)
    const shareStakeToWithdraw = convertCakeToShares(convertedStakeAmount, pricePerFullShare)
    // trigger withdrawAll function if the withdrawal will leave 0.000001 CAKE or less
    const triggerWithdrawAllThreshold = new BigNumber(1000000000000)
    const sharesRemaining = userInfo.shares.minus(shareStakeToWithdraw.sharesAsBigNumber)
    const isWithdrawingAll = sharesRemaining.lte(triggerWithdrawAllThreshold)

    if (isWithdrawingAll) {
      cakeVaultContract.methods
        .withdrawAll()
        .send({ from: account })
        .on('sending', () => {
          setPendingTx(true)
        })
        .on('receipt', () => {
          setPendingTx(false)
          onDismiss()
          setLastUpdated()
        })
        .on('error', (error) => {
          console.error(error)
          // Remove message from toast before prod
          setPendingTx(false)
        })
    } else {
      cakeVaultContract.methods
        .withdraw(shareStakeToWithdraw.sharesAsBigNumber.toString())
        // .toString() being called to fix a BigNumber error in prod
        // as suggested here https://github.com/ChainSafe/web3.js/issues/2077
        .send({ from: account })
        .on('sending', () => {
          setPendingTx(true)
        })
        .on('receipt', () => {
          // console.log('success')
          setPendingTx(false)
          onDismiss()
          setLastUpdated()
        })
        .on('error', (error) => {
          console.error(error)
          // Remove message from toast before prod
          setPendingTx(false)
        })
    }
  }

  const handleDeposit = async (convertedStakeAmount: BigNumber) => {
    cakeVaultContract.methods
      .deposit(convertedStakeAmount.toString())
      // .toString() being called to fix a BigNumber error in prod
      // as suggested here https://github.com/ChainSafe/web3.js/issues/2077
      .send({ from: account })
      .on('sending', () => {
        setPendingTx(true)
      })
      .on('receipt', () => {
        // console.log('success')
        setPendingTx(false)
        onDismiss()
        setLastUpdated()
      })
      .on('error', (error) => {
        console.error(error)
        // Remove message from toast before prod
        setPendingTx(false)
      })
  }

  const handleConfirmClick = async () => {
    const convertedStakeAmount = getDecimalAmount(new BigNumber(stakeAmount), stakingTokenDecimals)
    setPendingTx(true)
    // unstaking
    if (isRemovingStake) {
      handleWithdrawal(convertedStakeAmount)
      // staking
    } else {
      handleDeposit(convertedStakeAmount)
    }
  }

  return (
    <Modal
      title={isRemovingStake ? 'Unstake' : 'Stake in Pool'}
      onDismiss={onDismiss}
    >
      <Flex alignItems="center" justifyContent="space-between" mb="8px">
        <Text bold>{isRemovingStake ? 'Unstake' : 'Stake'}:</Text>
        <Flex alignItems="center" minWidth="70px">
          <Image src="/images/tokens/seed.png" width={24} height={24} alt={stakingTokenName} />
          <Text ml="4px" bold>
            {stakingTokenName}
          </Text>
        </Flex>
      </Flex>
      <TokenInput
        value={stakeAmount}
        onSelectMax={handleSelectMax}
        onChange={handleStakeInputChange}
        max={fullBalance}
        symbol={stakingTokenName}
      />
      {isRemovingStake && hasUnstakingFee && (
        <FeeSummary
          stakingTokenSymbol={stakingTokenName}
          lastDepositedTime={userInfo.lastDepositedTime}
          vaultFees={vaultFees}
          stakeAmount={stakeAmount}
        />
      )}
      <ModalActions>
        <Button fullWidth variant="secondary" onClick={onDismiss}>
          Cancel
        </Button>
        <Button
          isLoading={pendingTx}
          endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
          onClick={handleConfirmClick}
          disabled={!stakeAmount || parseFloat(stakeAmount) === 0}
        >
          {pendingTx ? 'Confirming' : 'Confirm'}
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default VaultStakeModal
