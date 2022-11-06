import React, { useState } from 'react'
import { Button, AutoRenewIcon, Skeleton } from '@pancakeswap-libs/uikit'
import { ethers } from 'ethers'
import { useCake, useCakeVaultContract } from 'hooks/useContract'
import { Pool } from 'state/types'
import { useWallet } from '@binance-chain/bsc-use-wallet'

interface ApprovalActionProps {
  pool: Pool
  setLastUpdated: () => void
  isLoading?: boolean
}

const ApprovalAction: React.FC<ApprovalActionProps> = ({ /*pool, */isLoading = false, setLastUpdated }) => {
  const { account } = useWallet()
  // const { stakingTokenName } = pool
  const cakeVaultContract = useCakeVaultContract()
  const cakeContract = useCake()
  const [requestedApproval, setRequestedApproval] = useState(false)
  
  const handleApprove = () => {
    cakeContract.methods
      .approve(cakeVaultContract.options.address, ethers.constants.MaxUint256)
      .send({ from: account })
      .on('sending', () => {
        setRequestedApproval(true)
      })
      .on('receipt', () => {
        // console.log("toast success")
        setLastUpdated()
        setRequestedApproval(false)
      })
      .on('error', (error) => {
        console.error(error)
        // console.log("Toast error")
        setRequestedApproval(false)
      })
  }

  return (
    <>
      {isLoading ? (
        <Skeleton width="100%" height="52px" />
      ) : (
        <Button
          isLoading={requestedApproval}
          endIcon={requestedApproval ? <AutoRenewIcon spin color="currentColor" /> : null}
          disabled={requestedApproval}
          onClick={handleApprove}
          fullWidth
        >
          Enable
        </Button>
      )}
    </>
  )
}

export default ApprovalAction
