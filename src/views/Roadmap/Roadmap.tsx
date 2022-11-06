import React from 'react'
import styled from 'styled-components'
import { Heading } from '@pancakeswap-libs/uikit' // Text
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import Iframe from 'react-iframe'

const StyledHero = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 24px;
  padding-bottom: 32px;
`

const Roadmap = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <StyledHero>
        <Heading as="h1" size="xxl" color="secondary" mb="24px">
          Roadmap
        </Heading>
        <Heading as="h2" size="lg" color="secondary">
          {TranslateString(999, 'Enable iframe to view this page')}
        </Heading>
      </StyledHero>
      <div className="video-responsive">
        <Iframe
          url="https://view.monday.com/embed/1257557614-f5e6212b2e260fd44a6623fa9e008075?r=use1"
          display="block"
        />
      </div>
    </Page>
  )
}
export default Roadmap
