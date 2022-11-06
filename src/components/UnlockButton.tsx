import React from 'react'
import { Button, useWalletModal } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import useSound from 'use-sound'

const UnlockButton = (props) => {
  const TranslateString = useI18n()
  const { connect, reset } = useWallet()
  const { onPresentConnectModal } = useWalletModal(connect, reset)
  const [play] = useSound('/sounds/click.mp3')

  return (
    <Button
      onClick={() => {
        onPresentConnectModal()
        play()
      }}
      {...props}
    >
      {TranslateString(292, 'Unlock Wallet')}
    </Button>
  )
}

export default UnlockButton
