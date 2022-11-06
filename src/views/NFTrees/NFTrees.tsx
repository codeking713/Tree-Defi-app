import React from 'react'
import styled from 'styled-components'
import { Heading } from '@pancakeswap-libs/uikit' // Text
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import HowItWorks from './components/HowItWorks'
import NftList from './components/NftList'
import NftProvider from './contexts/NftProvider'

const StyledHero = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 24px;
  padding-bottom: 32px;
`

const Nftrees = () => {
  const TranslateString = useI18n()

  return (
    <NftProvider>
      <Page>
        <StyledHero>
          <Heading as="h1" size="xxl" color="secondary" mb="24px">
            NFTrees
          </Heading>
          <Heading as="h2" size="lg" color="secondary">
            {TranslateString(999, 'The first NFTs backed by real world Trees')}
          </Heading>
        </StyledHero>
        <NftList />
        <HowItWorks />
      </Page>
    </NftProvider>
  )
}

export default Nftrees
