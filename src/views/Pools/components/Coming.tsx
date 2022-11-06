import React from 'react'
import styled from 'styled-components'
import { CardBody, CardRibbon, Button } from '@pancakeswap-libs/uikit'
import { CommunityTag } from 'components/Tags'
import useI18n from 'hooks/useI18n'
import StyledCardHeader from './StyledCardHeader'
import { StyledCard } from './StyledCard'

const Balance = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 40px;
  font-weight: 600;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  margin-bottom: 16px;
`

const DetailPlaceholder = styled.div`
  display: flex;
  font-size: 14px;
  margin-top: 8px;
`
const Value = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
`

const Footer = styled.div`
  border-top: 1px solid ${({ theme }) => (theme.isDark ? '#524B63' : '#E9EAEB')};
  padding: 24px;
`
const Coming: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <StyledCard
      isStaking={false}
      isFinished={false}
      ribbon={false && <CardRibbon variantColor="textDisabled" text={`${TranslateString(388, 'Finished')}`} />}
    >
      <StyledCardHeader
        earningTokenSymbol=""
        stakingTokenSymbol="SEED"
        image=""
        isFinished={false}
        sousId={100000}
        isOldSyrup={false}
        isComing
      />

      <CardBody>
        <Balance>???</Balance>
        <Label>{TranslateString(416, 'Create a pool for your token')}</Label>
        <Button variant="secondary" as="a" href="https://feedback.treedefi.com/" external fullWidth mb="16px">
          {TranslateString(418, 'Apply Now')}
        </Button>
        <DetailPlaceholder>
          <div style={{ flex: 1 }}>{TranslateString(736, 'APR')}:</div>
          <Value>??</Value>
        </DetailPlaceholder>
        <DetailPlaceholder>
          <div style={{ flex: 1 }}>
            <span role="img" aria-label="syrup">
              🌱{' '}
            </span>
            {TranslateString(384, 'Your Stake')}:
          </div>
          <Value>??? SEED</Value>
        </DetailPlaceholder>
      </CardBody>
      <Footer>
        <CommunityTag />
      </Footer>
    </StyledCard>
  )
}

export default Coming
