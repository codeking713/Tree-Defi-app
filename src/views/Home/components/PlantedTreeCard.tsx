import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { Link } from 'react-router-dom'
import useGetDonation from 'hooks/useGetDonation'


// it could be great to move this in styling sheet outside this file
const StyledPlantedTreeCard = styled(Card)`
  background: linear-gradient(#0bab64, #3bb78f);
  align-items: center;
  display: flex;
  flex: 1;
  text-align: center;
  width: 100%;
  & > div {
    width: 100%;
    background-image: url('/images/bgtreecard-sx.png'), url('/images/bgtreecard-dx.png');
    background-repeat: no-repeat;
    background-size: 25%;
    background-position: bottom left, bottom right;
    margin-bottom: 0px;
  }
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const PlantedTreeCard = () => {
  const TranslateString = useI18n()
  const donation = useGetDonation()
  // const tvl = data ? data.total_value_locked_all.toLocaleString('en-US', { maximumFractionDigits: 0 }) : null
  const co2 = 21.7

  return (
    <StyledPlantedTreeCard>
      <CardBody>
        <Heading color="invertedContrast" size="lg" mb="24px">
          {TranslateString(762, '🌱 Total Planted Trees (TPT) ')}
        </Heading>
        {donation ? (
          <>
            {/* <Heading color="invertedContrast" size="xl">{`${tvl}`}</Heading> */}
            <Link to="/donation" style={{ marginRight: 'auto', marginLeft: 'auto' }}>
              <Heading color="invertedContrast" size="xl">
                {donation}!
                <Label>{(donation * co2).toFixed(0)} Kg of CO2 absorbed every year</Label>
              </Heading>
            </Link>
            <Text color="invertedContrast">
              {TranslateString(764, 'We use one third of all deposit fees to plant trees around the world')}
            </Text>

          </>
        ) : (
          <>
            <Skeleton height={66} />
          </>
        )}
      </CardBody>
    </StyledPlantedTreeCard>
  )
}

export default PlantedTreeCard
