import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, Flex, Text, CardBody, useModal } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { usePurchaseFruitProduct } from 'hooks/fruitPool/usePurchaseFruitProduct'
import { useMerchandiseApprove } from 'hooks/fruitPool/useFruitApprove'
import { useFruit } from 'state/hooks'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Balance from 'components/Balance'
import { StyledProductCard } from './StyledCard'
import OrderDetailModal from './Modals/OrderDetailModal'
import OrderConfirmModal from './Modals/OrderConfirmModal'

export interface ProductProps {
  id: string;
  image: string;
  name: string;
  category: string;
  price: number;
  totalQty: number;
  soldQty: number;
  onUpdate: () => void;
}

const ProductItem: React.FC<ProductProps> = ({
  id,
  image,
  name,
  category,
  price,
  totalQty,
  soldQty,
  onUpdate
}) => {

  const TranslateString = useI18n()
  const { account } = useWallet()
  const fruitPool = useFruit(account)
  const fruitAllowance = fruitPool.userData?.fruitAllowance
  const { onPurchase } = usePurchaseFruitProduct()
  const { onApprove } = useMerchandiseApprove()
  const [requestedApproval, setRequestedApproval] = useState(false)

  const [onPresentPurchase] = useModal(
    <OrderDetailModal name={name} pid={id} price={price.toString()}
      onConfirm={onPurchase} onUpdateAfterConfirm={() => { onUpdate(); onPresentConfirm(); }} />,
  )

  const [onPresentConfirm] = useModal(
    <OrderConfirmModal />,
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
    <StyledProductCard>
      <StyledImage src={image} alt="Proudct Image" />
      <StyledCardBody pt="0">
        <Flex flexDirection="column" alignItems="center" marginTop="10px">
          <Text fontSize="23px" bold lineHeight="23px">{TranslateString(999, name)}</Text>
          <Text fontSize="12px" lineHeight="13px">{TranslateString(999, category)}</Text>
        </Flex>
        <StyledDetails style={{ marginTop: '10px' }}>
          <div style={{ flex: 1 }}>{TranslateString(999, 'PRICE')}:</div>
          <Balance fontSize="14px" value={price} decimals={0} />
          <Text fontSize="14px" style={{ marginLeft: '4px' }}>FRUIT</Text>
        </StyledDetails>
        <StyledDetails>
          <div style={{ flex: 1 }}>{TranslateString(999, 'STOCK')}:</div>
          <Balance fontSize="14px" value={totalQty >= soldQty ? totalQty - soldQty : 0} decimals={0} /> /
          <Balance fontSize="14px" value={totalQty} decimals={0} />
        </StyledDetails>
        <StyledCardActions>
          <div style={{ flex: 1 }}>
            {
              !fruitAllowance || new BigNumber(fruitAllowance).toNumber() === 0
                ? <Button disabled={requestedApproval} onClick={handleApprove} fullWidth>
                  Approve FRUIT
                </Button>
                : <Button disabled={soldQty >= totalQty} onClick={onPresentPurchase} fullWidth>
                  {soldQty >= totalQty ? 'OUT OF STOCK' : `BUY NOW`}
                </Button>
            }
          </div>
        </StyledCardActions>
      </StyledCardBody>
    </StyledProductCard>
  )
}

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin: 25px 0;
  width: 100%;
  box-sizing: border-box;
`

const StyledDetails = styled.div<{ marginTop?: number }>`
  display: flex;
  font-size: 14px;
  align-items: center;
  margin-top: ${({ marginTop }) => marginTop}px;
  color: black;
`

const StyledImage = styled.img`
  position: relative;
  width: 100%;
  top: 0;
  left: 0;
  transition: opacity 1s linear;
  height: 250px;
  object-fit: cover;
  border-radius: 16px 16px 0 0;
`

const StyledCardBody = styled(CardBody)`
  padding-top: 0;
`

export default ProductItem
