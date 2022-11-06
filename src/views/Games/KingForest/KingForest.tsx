import React from 'react'
// import styled from 'styled-components'
// // import { Heading } from '@pancakeswap-libs/uikit'
// import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import kingForest from '../../../assets/img/kingForest.jpg'

// const CommingSoon = styled.div`
//   max-inline-size: -webkit-fill-available;
// `

const KingForest: React.FC = () => {
  // const TranslateString = useI18n()

  return (
    <Page style={{ maxInlineSize: '-webkit-fill-available' }}>
      <img src={kingForest} alt="king forset" />
    </Page>
  )
}

export default KingForest
