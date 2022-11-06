import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Text } from '@pancakeswap-libs/uikit' // Skeleton
import useI18n from 'hooks/useI18n'
// import { useGetStats } from 'hooks/api'
import { useTotalValue } from '../../../state/hooks'
import CardValue from './CardValue'

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  justify-content: center;
  display: flex;
  flex: 1;
`

const StyledCard = styled.div`
  text-align-last: center;
`

const TotalValueLockedCard = () => {
  const TranslateString = useI18n()
  // const data = useGetStats()
  const totalValue = useTotalValue()
  // const tvl = totalValue.toFixed(2);

  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Heading size="lg" mb="24px">
          {TranslateString(999, 'Total Value Locked (TVL)')}
        </Heading>
        <StyledCard>
          {/* <Heading size="xl">{`$${tvl}`}</Heading> */}
          {/* <Heading size="xl"> */}
          <Text className="tvl">
            <CardValue value={totalValue.toNumber()} prefix="$" decimals={2} />
          </Text>
          {/* <CardValue value={0} prefix="$" decimals={2}/> */}
          {/* </Heading> */}
          <Text color="textSubtle">{TranslateString(999, 'Across all Farms and Pools')}</Text>
        </StyledCard>
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
