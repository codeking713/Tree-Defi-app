
import React, { useState } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Text } from '@pancakeswap-libs/uikit' // Text
import useI18n from 'hooks/useI18n'
import useGetFruitProducts from 'hooks/fruitPool/useGetFruitProducts'
import Page from 'components/layout/Page'
import  { FlexMaxLayout } from 'components/layout/Flex'
import FruitLaunchPool from './components/LaunchPool'
import ProductItem from './components/ProductItem'
import { StyledFlex, StyledBanner } from './components/StyledFlex'

const StyledHero = styled.div`
  width: 100%;
  height: 100vw;
  margin-bottom: 10px;
  border-radius: 23px;
  background-image: url(/images/fruit-banner-mobile-2.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  ${({ theme }) => theme.mediaQueries.sm} {
    height: 300px;
    background-image: url(/images/fruit-banner-mobile.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`

const BottomCardBody = styled(CardBody)`
  background-image: url(/images/merch/frame.png);
  background-position: top center;
  background-repeat: no-repeat;
  background-size: 100%;
  padding-top: 15%;
  background-size: contain;
`

const Merchandise = () => {
  const TranslateString = useI18n()
  const [updated, setUpdated] = useState(false)
  const marginLeft = '10%'

  const products = useGetFruitProducts(updated)

  return (
    <Page>
      <FlexMaxLayout>
        <StyledHero />
        <StyledBanner>
          <FruitLaunchPool />
        </StyledBanner>
        <StyledFlex style={{ marginTop: '45px' }}>
          {products.map(product => <ProductItem key={product.id} {...product} onUpdate={() => setUpdated(!updated)} />)}
        </StyledFlex>
      </FlexMaxLayout>
      <Card mt="20px">
          <BottomCardBody>
            <Heading mt="50px" ml={marginLeft} mb="24px" size="xl">
              How does it work?
            </Heading>
            <Text ml={marginLeft} bold>
              What is FRUIT token?
            </Text>
            <Text ml={marginLeft} mb="20px">
              This merchandising system is possible thanks to the creation of a new utility token named FRUIT, <br/>
              a BEP20 token with an initial supply of 100,000 FRUIT that will be distributed through a launch pool.  
            </Text>
            <Text ml={marginLeft} bold>
              How to get FRUIT?
            </Text>
            <Text ml={marginLeft} mb="20px">
            Users will be able to join the FRUIT launch pool, stake their SEED and receive FRUIT tokens. <br/>
            Afterwards they can use their FRUIT rewards to order merchandising from our store.
            </Text>
            <Text ml={marginLeft} bold>
              How many items i can get in the shop?
            </Text>
            <Text ml={marginLeft} mb="20px">
            This collection is limited to 6 different items, where each item has a limited supply available for purchase. <br />
            Once the available supply runs out the merchandise drop will end. We will then ship out the products and get to work on the next drop.
            </Text>
            <Text ml={marginLeft} mb="20px" color="red" small>
              Keep in mind that FRUIT will not be a trading or speculation asset, but will only be used for merchandising. <br />
              Therefore it won’t have a daily emission, and the only new tokens available will be the ones minted by our team. <br />
            </Text>
            <Text ml={marginLeft} mb="20px" color="red" small>
             <a href="https://treedefi.com/merchandise-terms-of-service/" target="_blank" rel="noreferrer">Check here our Terms of service</a>
            </Text>
          </BottomCardBody>
        </Card>
    </Page>
  )
}
export default Merchandise
