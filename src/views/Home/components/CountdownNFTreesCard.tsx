import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@pancakeswap-libs/uikit' // Link
import useI18n from 'hooks/useI18n'
import { useGetStats } from 'hooks/api'
import Countdown from 'react-countdown'

const StyledCountdownNFTreesCard = styled(Card)`
  background: linear-gradient(#0bab64, #3bb78f);
  align-items: center;
  display: flex;
  flex: 1;
  text-align: center;
  width: 100%;
  & > div {
    width: 100%;
    background-image: url('/images/nftree-card-sx.png'), url('/images/nftree-card-dx.png');
    background-repeat: no-repeat;
    background-size: 25%;
    background-position: bottom left, bottom right;
    margint-bottom: 0px;
  }
`

const getNFTreesRelease = () => {
  const NFTreesRelease = new Date(1619802000 * 1000)
  NFTreesRelease.setHours(
    NFTreesRelease.getHours(),
    NFTreesRelease.getMinutes(),
    NFTreesRelease.getSeconds(),
    NFTreesRelease.getMilliseconds(),
  )
  return NFTreesRelease
}

const CountdownNFTreesCard = () => {
  const TranslateString = useI18n()
  const data = useGetStats()
  // const tvl = data ? data.total_value_locked_all.toLocaleString('en-US', { maximumFractionDigits: 0 }) : null

  return (
    <StyledCountdownNFTreesCard>
      <CardBody>
        <Heading color="invertedContrast" size="lg" mb="24px">
          {TranslateString(762, '🌱 NFT Release - Arbor Day 2021, April the 30th ')}
        </Heading>
        {data ? (
          <>
            {/* <Heading color="invertedContrast" size="xl">{`${tvl}`}</Heading> */}
            <Heading color="invertedContrast" size="xl">
              <Countdown date={getNFTreesRelease()} />
            </Heading>

            <Text color="invertedContrast">{TranslateString(764, 'Time to release the first 9 NFTrees')}</Text>
          </>
        ) : (
          <>
            <Skeleton height={66} />
          </>
        )}
      </CardBody>
    </StyledCountdownNFTreesCard>
  )
}

export default CountdownNFTreesCard
