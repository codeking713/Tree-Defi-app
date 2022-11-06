import React from 'react'
import styled from 'styled-components'
import { Modal, Text, Button, OpenNewIcon, Link } from '@pancakeswap-libs/uikit'
// import useTheme from 'hooks/useTheme'

interface NotEnoughTokensModalProps {
  tokenSymbol: string
  onDismiss?: () => void
}

const StyledLink = styled(Link)`
  width: 100%;
`

const NotEnoughTokensModal: React.FC<NotEnoughTokensModalProps> = ({ tokenSymbol, onDismiss }) => {
  // const { theme } = useTheme()
  const BASE_EXCHANGE_URL = 'https://exchange.treedefi.com'
  return (
    <Modal
      title={`${tokenSymbol} required`}
      onDismiss={onDismiss}
    >
      <Text color="failure" bold>
        {`Insufficient ${tokenSymbol} balance` }
      </Text>
      <Text mt="24px">{`You’ll need ${tokenSymbol} to stake in this pool!`}</Text>
      <Text>
        {`Buy some ${tokenSymbol}, or make sure your ${tokenSymbol} isn’t in another pool or LP.`}
      </Text>
      <Button fullWidth mt="24px" as="a" external href={BASE_EXCHANGE_URL}>
        Buy {tokenSymbol}
      </Button>
      <StyledLink href="https://apeboard.finance/dashboard" external>
        <Button variant="secondary" mt="8px" fullWidth>
          Locate Assets
          <OpenNewIcon color="primary" ml="4px" />
        </Button>
      </StyledLink>
      <Button fullWidth variant="text" onClick={onDismiss}>
        Close window
      </Button>
    </Modal>
  )
}

export default NotEnoughTokensModal
