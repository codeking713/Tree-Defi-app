import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
// import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import { Modal, Text, Flex, Button, HelpIcon, AutoRenewIcon, useTooltip } from '@pancakeswap-libs/uikit'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { useCakeVaultContract } from 'hooks/useContract'
// import useTheme from 'hooks/useTheme'
// import useToast from 'hooks/useToast'
import UnlockButton from 'components/UnlockButton'
import { useWallet } from '@binance-chain/bsc-use-wallet'

interface BountyModalProps {
  cakeBountyToDisplay: string
  dollarBountyToDisplay: string
  totalPendingCakeHarvest: BigNumber
  callFee: number
  onDismiss?: () => void
  TooltipComponent: React.ElementType
}

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundDisabled};
  height: 1px;
  margin: 16px auto;
  width: 100%;
`

const BountyModal: React.FC<BountyModalProps> = ({
  cakeBountyToDisplay,
  dollarBountyToDisplay,
  totalPendingCakeHarvest,
  callFee,
  onDismiss,
  TooltipComponent,
}) => {
  const { account } = useWallet()
    
  const cakeVaultContract = useCakeVaultContract()
  const [pendingTx, setPendingTx] = useState(false)
  const callFeeAsDecimal = callFee / 100
  const totalYieldToDisplay = getFullDisplayBalance(totalPendingCakeHarvest, 18, 3)
  const { targetRef, tooltip, tooltipVisible } = useTooltip(<TooltipComponent />, {
    placement: 'bottom',
    tooltipPadding: { right: 15 },
  })

  const handleConfirmClick = async () => {
    cakeVaultContract.methods
      .harvest()
      .send({ from: account })
      .on('sending', () => {
        setPendingTx(true)
      })
      .on('receipt', () => {
        setPendingTx(false)
        onDismiss()
      })
      .on('error', (error) => {
        console.error(error)
        setPendingTx(false)
      })
  }

  return (
    <Modal title='Claim Bounty' onDismiss={onDismiss}>
      {tooltipVisible && tooltip}
      <Flex alignItems="flex-start" justifyContent="space-between">
        <Text>You&apos;ll claim</Text>
        <Flex flexDirection="column">
          <Text bold>{cakeBountyToDisplay} SEED</Text>
          <Text fontSize="12px" color="textSubtle">
            ~ {dollarBountyToDisplay} USD
          </Text>
        </Flex>
      </Flex>
      <Divider />
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="14px" color="textSubtle">
          Pool total pending yield
        </Text>
        <Text fontSize="14px" color="textSubtle">
          {totalYieldToDisplay} SEED
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb="24px">
        <Text fontSize="14px" color="textSubtle">
          Bounty
        </Text>
        <Text fontSize="14px" color="textSubtle">
          {callFeeAsDecimal}%
        </Text>
      </Flex>
      {account ? (
        <Button
          fullWidth
          isLoading={pendingTx}
          endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
          onClick={handleConfirmClick}
          mb="28px"
        >
          Confirm
        </Button>
      ) : (
        <UnlockButton mb="28px" />
      )}
      <Flex justifyContent="center" alignItems="center">
        <Text fontSize="16px" bold color="textSubtle" mr="4px">
          What&apos;s this?
        </Text>
        <span ref={targetRef}>
          <HelpIcon color="textSubtle" />
        </span>
      </Flex>
    </Modal>
  )
}

export default BountyModal
