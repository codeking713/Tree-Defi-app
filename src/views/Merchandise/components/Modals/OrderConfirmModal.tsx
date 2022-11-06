import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { LinkExternal, Modal, Heading, Text, LogoIcon } from '@pancakeswap-libs/uikit'
import { ExternalLink } from 'react-feather'
import AnimationCheckIcon from '../CheckIcon'

interface OrderConfirmModalProps {
  onDismiss?: () => void
}

const OrderConfirmModal: React.FC<OrderConfirmModalProps> = ({
  onDismiss
}) => {
  const TranslateString = useI18n()

  return (
    <Modal title="" onDismiss={onDismiss}>
      <ModalContent>
        <AnimationCheckIcon />
        <Heading color="primary" as="h1" bold style={{ textAlign: 'center', fontSize: '32px' }}>{TranslateString(999, "Order Received")}</Heading>
        <Text fontSize="18px" mt="20px" style={{textAlign: 'center'}}>You will get a confirmation email in the next 24/48 hours.</Text>
        <Flex>
          <Text fontSize="18px" mr="6px">For any inquiry write to</Text>
          <LinkExternal fontSize="18px" href="mailto:merch@treedefi.com">merch@treedefi.com</LinkExternal>
        </Flex>
      </ModalContent>
    </Modal>
  )
}

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
  
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
  }
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 2px 20px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 10px 30px 50px;
  }
`

export default OrderConfirmModal
