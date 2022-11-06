import React from 'react'
import orderBy from 'lodash/orderBy'
import nftrees from 'config/constants/nftrees'
import NftCard from './NftCard'
import NftGrid from './NftGrid'

const NftList = () => {
  return (
    <NftGrid>
      {orderBy(nftrees, 'sortOrder').map((nft) => (
        <div key={nft.name}>
          <NftCard nft={nft} />
        </div>
      ))}
    </NftGrid>
  )
}

export default NftList
