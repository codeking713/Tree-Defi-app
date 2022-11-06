import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Card, Text } from '@pancakeswap-libs/uikit' // Skeleton
import useI18n from 'hooks/useI18n'
import Slider from 'react-slick'
// import { useGetStats } from 'hooks/api'
import axios from 'axios'
import { add } from 'date-fns'
import { isEqual } from 'lodash'
import { getPaymentName } from 'utils/getPaymentType'
import { useTotalValue } from '../../../state/hooks'

const DefCard = styled(Card)`
  border-radius: 0;
  border: 2px solid transparent;
  position: relative;
  box-shadow: 10px 10px 20px -17px rgb(0 154 80 / 24%);
  margin-right: 10px;
  border-radius: 10px;
`

const StyledCard = styled.div`
  text-align-last: center;
`
const CardBox = styled.div`
  position: relative;
`
const CardAuction = styled.div`
  top: 10px;
  left: 10px;
  color: rgb(255, 255, 255);
  border: 2px solid rgb(16, 172, 104);
  display: flex;
  padding: 3px 4px;
  position: absolute;
  font-size: 11px;
  box-shadow: rgb(16 172 104 / 45%) 0px 0px 15px;
  align-items: center;
  font-family: Montserrat, sans-serif;
  font-weight: bold;
  border-radius: 8px;
  background-color: rgb(16, 172, 104);
`
const Blob = styled.div`
  width: 8px;
  height: 8px;
  margin: 6px;
  animation: pulse-black 2s infinite;
  transform: scale(1);
  border-radius: 50%;
  animation: pulse-green 2s infinite;
  background: rgb(102 241 208);
  box-shadow: 0 0 0 0 rgb(102 241 208);
  @keyframes pulse-green {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(102, 241, 208, 0.7);
    }
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(102, 241, 208, 0);
    }
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(102, 241, 208, 0);
    }
  }
`
const CardImage = styled.img`
  max-width: 100%;
  height: auto;
  background: #ebf8f4;
  padding: 15px;
  border-radius: 10px;
  @media (max-width: 480px) {
  }
`

const CardVideo = styled.video`
  max-width: 100%;
  height: auto;
  background: #ebf8f4;
  padding: 15px;
  border-radius: 10px;
  @media (max-width: 480px) {
  }
`

const CardBody = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
`
const BodyTopInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`
const Button = styled.div`
  background-color: transparent;
  border: 1px solid rgba(59, 183, 143, 0.7);
  color: #3bb78f;
  font-size: 0.8125rem;
  height: 32px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  padding: 3px 8px;
  border-color: #3bb78f;
`
const SubTitle = styled.div`
  font-size: 1 rem;
  font-weight: 300;
  color: #3bb78f;
  margin-top: 7px;
`

const MarketPlaceCard = () => {
  const TranslateString = useI18n()
  // const data = useGetStats()
  const totalValue = useTotalValue()
  const [auctionData, setAuctionData] = useState([])
  // const tvl = totalValue.toFixed(2);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesPerRow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesPerRow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 411,
        settings: {
          slidesPerRow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  useEffect(() => {
    console.log(auctionData)
  }, [auctionData])

  useEffect(() => {
    const getAuctionTree = async () => {
      const response = await axios({
        method: 'get',
        url: 'https://apinft-live.treedefi.com/nft/getAuctionTree',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const trees = response.data.data.trees
      setAuctionData([])
      trees.forEach((tree) => {
        if (
          (isEqual(1, tree.auctionData.auctionType) &&
            add(new Date(tree.auctionData.startedAt * 1000), {
              seconds: tree.auctionData.duration,
            }) > new Date()) ||
          isEqual(0, tree.auctionData.auctionType)
        ) {
          setAuctionData((a) => [...a, tree])
        }
      })
    }

    getAuctionTree()
  }, [])
  return (
    <>
      {auctionData && auctionData.length > 0 && (
        <Slider {...settings}>
          {auctionData.map((tree) => (
            <a
              key={tree.toString()}
              href={`https://nft.treedefi.com/tree/${tree.tokenId}`}
              rel="noreferrer"
              target="_blank"
              style={{ paddingRight: 20 }}
            >
              <DefCard>
                <CardBox>
                  <CardAuction>
                    Live Auction
                    <Blob />
                  </CardAuction>
                  {tree.imageURL.split('.').pop() === 'mp4' ? (
                    <CardVideo src={tree.imageURL} autoPlay loop />
                  ) : (
                    <CardImage src={tree.imageURL} alt="" />
                  )}
                </CardBox>
                <CardBody>
                  <BodyTopInfo>
                    <Text
                      style={{ whiteSpace: 'nowrap', width: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      {tree.treeName}
                    </Text>
                    <Button>{tree.treeId}</Button>
                  </BodyTopInfo>
                  {tree.auctionData.auctionType === 1 ? (
                    <SubTitle>
                      {tree.auctionData.currentlastBidValue ? 'Last Bid:' : 'Base Price:'}:{' '}
                      {tree.auctionData &&
                      tree.auctionData.currentlastBidValue &&
                      tree.auctionData.currentlastBidValue !== ''
                        ? parseFloat((tree.auctionData.currentlastBidValue / 1e18).toString()).toFixed(2)
                        : parseFloat((tree.auctionData.basePrice / 1e18).toString()).toFixed(2)}{' '}
                      {getPaymentName(tree.auctionData.paymentType.toString())}
                    </SubTitle>
                  ) : (
                    <SubTitle>
                      Current Price:: {parseFloat((tree.auctionData.currenetBid / 1e18).toString()).toFixed(2)}{' '}
                      {getPaymentName(tree.auctionData.paymentType.toString())}
                    </SubTitle>
                  )}
                </CardBody>
              </DefCard>
            </a>
          ))}
        </Slider>
      )}
    </>
  )
}

export default MarketPlaceCard
