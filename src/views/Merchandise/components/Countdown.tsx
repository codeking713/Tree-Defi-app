import React, { useState, useEffect, useRef, useMemo } from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@pancakeswap-libs/uikit' // Link
import useI18n from 'hooks/useI18n'
import Countdown from 'react-countdown'
import { getWeb3 } from 'utils/web3'
import useBlock from 'hooks/useBlock'

const StyledCountdownMERCHRelease = styled(Card)`
  background: transparent;
  align-items: center;
  display: flex;
  flex: 1;
  text-align: center;
  width: 100%;
  margin-bottom: 45px;
  box-shadow: inherit !important;
  & > div {
    width: 100%;
    background-repeat: no-repeat;
    background-size: 25%;
    background-position: bottom left, bottom right;
    margint-bottom: 0px;
  }
`

const getMERCHRelease = (block) => {
  const MERCHRelease = new Date(new Date().getTime() + (8520180 - block) * 3 * 1000) // MERCH starts from 8520180 block

  MERCHRelease.setHours(
    MERCHRelease.getHours(),
    MERCHRelease.getMinutes(),
    MERCHRelease.getSeconds(),
    MERCHRelease.getMilliseconds(),
  )

  return MERCHRelease
}
const CountdownMERCHRelease = () => {
  const TranslateString = useI18n()
  const block = useBlock()
  const previousBlock = useRef(0)

  if (previousBlock.current === 0 && block > 0) {
    previousBlock.current = block
  }
  const startDate = useMemo(() => {
    return getMERCHRelease(block)
  }, [block])

  return (
    <StyledCountdownMERCHRelease>
      <CardBody>
        <Heading color="" size="lg" mb="24px">
          {TranslateString(762, '🍉🍓 TreeDefi Official Merch is here! 🍍🥥')}
        </Heading>
        <Heading color="" size="xl">
          {block > 0 ? <Countdown date={startDate} /> : <Skeleton height={50} width={220} margin="auto" />}
        </Heading>
        <Text color="">{TranslateString(764, 'Until the start of rewards from FRUIT launchpool')}</Text>
      </CardBody>
    </StyledCountdownMERCHRelease>
  )
}

export default CountdownMERCHRelease
