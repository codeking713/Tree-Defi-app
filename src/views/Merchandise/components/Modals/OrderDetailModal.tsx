import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, LinkExternal, Modal, Checkbox, Text } from '@pancakeswap-libs/uikit'
import ModalActions from 'components/ModalActions'
import useI18n from 'hooks/useI18n'
import Input from '../Input'

interface OrderDetailModalProps {
  onConfirm: (pid: string, amount: string, details: any) => any
  onUpdateAfterConfirm: () => void
  onDismiss?: () => void
  pid: string
  name: string
  price: string
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  pid,
  name,
  price,
  onConfirm,
  onUpdateAfterConfirm,
  onDismiss
}) => {
  const [inputs, setInputs] = useState<{
    name?: string,
    surename?: string,
    country?: string,
    city?: string,
    zipcode?: string,
    address?: string,
    email?: string,
    additional?: string,
    accepted?: boolean
  }>({})
  const [validated, setValidated] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const targetName = e.currentTarget.name
      setInputs({ ...inputs, [targetName]: e.currentTarget.value })
    },
    [inputs, setInputs],
  )

  const isValidString = (str) => {
    if (str === null || str === undefined || str.trim() === "") {
      return false
    }
    return true
  }

  useEffect(() => {
    if (isValidString(inputs.name) && isValidString(inputs.surename) && isValidString(inputs.country)
      && isValidString(inputs.city) && isValidString(inputs.zipcode) && isValidString(inputs.address) && isValidString(inputs.email)
      && inputs.accepted) {
      setValidated(true)
    } else {
      setValidated(false)
    }
  }, [inputs, setValidated])

  return (
    <Modal title={`${TranslateString(999, 'Confirm Order - ')} ${name}`} onDismiss={onDismiss}>
      <Flex>
        <Input placeholder="Name" name="name" onChange={handleChange} value={inputs.name} />
        <Input placeholder="Surname" name="surename" onChange={handleChange} value={inputs.surename} />
      </Flex>
      <Flex>
        <Input placeholder="Country" name="country" onChange={handleChange} value={inputs.country} />
        <Input placeholder="City" name="city" onChange={handleChange} value={inputs.city} />
        <Input placeholder="Zip Code" name="zipcode" onChange={handleChange} value={inputs.zipcode} />
      </Flex>
      <Flex>
        <Input placeholder="Address" name="address" onChange={handleChange} value={inputs.address} />
      </Flex>
      <Flex>
        <Input placeholder="Email" name="email" onChange={handleChange} value={inputs.email} />
      </Flex>
      <Flex>
        <Input placeholder="Item Additional Details (Size / Color)"
          name="additional" onChange={handleChange} value={inputs.additional} />
      </Flex>
      <Flex>
        <Checkbox checked={inputs.accepted} scale="sm" onChange={(e) => { setInputs({ ...inputs, accepted: !inputs.accepted }) }} />
        <PolicyWrapper>
          <PolicyTypo>I accept the</PolicyTypo>
          <PolicyLink target="_blank" href="https://treedefi.com/merchandise-terms-of-service/">Terms of Service</PolicyLink>
          <PolicyTypo>by making this order</PolicyTypo>
        </PolicyWrapper>
      </Flex>
      <ModalActions>
        <Button fullWidth variant="secondary" onClick={onDismiss}>
          {TranslateString(999, 'CANCEL')}
        </Button>
        <Button
          fullWidth
          disabled={pendingTx || !validated}
          onClick={async () => {
            setPendingTx(true)
            const order = await onConfirm(pid, price, inputs)
            setPendingTx(false)
            if (order) {
              onUpdateAfterConfirm()
            } else {
              onDismiss()
            }
          }}
        >
          {pendingTx ? TranslateString(999, 'Pending...') : TranslateString(999, `PAY NOW ${price} FRUIT`)}
        </Button>
      </ModalActions>
    </Modal>
  )
}

export const PolicyWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0 !important;
`

export const PolicyTypo = styled.span`
  margin-right: 8px;
`;

export const PolicyLink = styled.a`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  margin-right: 8px;
  text-decoration: underline;
`

export const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  & > div {
    margin-bottom: 10px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;

    & > div {
      margin-left: 10px;
      margin-right: 10px; 
      flex: 1;
    }
  
    & > div:first-child {
      margin-left: 0;
    }
  
    & > div:last-child {
      margin-right: 0;
    }
  }
`

export default OrderDetailModal
