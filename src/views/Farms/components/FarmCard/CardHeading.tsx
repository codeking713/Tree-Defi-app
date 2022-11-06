import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading, Image } from '@pancakeswap-libs/uikit'
import Question from 'components/QuestionHelper'
import { NoFeeTag } from 'components/Tags' // { CommunityTag, CoreTag, RiskTag}
import useI18n from 'hooks/useI18n'
import Countdown from 'react-countdown'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  risk?: number
  depositFee?: number
  farmImage?: string
  tokenSymbol?: string
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 0.25rem;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`

const getdeactivation = () => {
  const deactivation = new Date(1620057600 * 1000) // add 604800
  deactivation.setHours(
    deactivation.getHours(),
    deactivation.getMinutes(),
    deactivation.getSeconds(),
    deactivation.getMilliseconds(),
  )
  return deactivation
}

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  multiplier,
  // risk,
  farmImage,
  tokenSymbol,
  depositFee,
}) => {
  const TranslateString = useI18n()

  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      <Image src={`/images/farms/${farmImage}.png`} alt={tokenSymbol} width={64} height={64} />
      <Flex flexDirection="column" alignItems="flex-end">
        <Flex>
          <Heading mb="4px">{lpLabel}</Heading>
          {(lpLabel === 'TREE-SLIME LP' ||
            lpLabel === 'SEED-SLIME LP' ||
            lpLabel === 'TREE-SLIME V2 LP' ||
            lpLabel === 'SEED-SLIME V2 LP') && (
            <Question text={TranslateString(9999, 'Please add liquidity directly in slime exchange not pancake.')} />
          )}
        </Flex>
        {lpLabel === 'TREE-SLIME LP' || lpLabel === 'SEED-SLIME LP' ? (
          <Flex justifyContent="center">
            <div className="deactivation-tag">
              Disabled in <Countdown date={getdeactivation()} />
            </div>
          </Flex>
        ) : (
          <Flex justifyContent="center">
            {depositFee === 0 ? <NoFeeTag /> : null}
            {/* {isCommunityFarm ? <CommunityTag /> : <CoreTag />} */}
            {/* <RiskTag risk={risk} /> */}
            <MultiplierTag variant="secondary">{multiplier}</MultiplierTag>
          </Flex>
        )}
      </Flex>
    </Wrapper>
  )
}

export default CardHeading
