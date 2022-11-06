import React, { useContext } from 'react'
import { Card, CardBody, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { NftProviderContext } from '../contexts/NftProvider'
import InfoRow from './InfoRow'

const NftProgressSimple = () => {
  const TranslateString = useI18n()
  const { isInitialized, currentDistributedSupply, totalSupplyDistributed, countBunniesBurnt } =
    useContext(NftProviderContext)

  return (
    <Card>
      <CardBody>
        <InfoRow>
          <Text>{TranslateString(999, 'Total NFTrees created')}:</Text>
          <Text>
            <strong>0/9</strong>
          </Text>
        </InfoRow>
        <InfoRow>
          <Text>{TranslateString(999, 'Total NFTrees selled')}:</Text>
          <Text>
            <strong>0/9</strong>
          </Text>
        </InfoRow>
      </CardBody>
    </Card>
  )
}

export default NftProgressSimple
