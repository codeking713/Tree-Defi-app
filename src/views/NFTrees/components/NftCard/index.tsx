import React, { useState, useContext, useCallback } from 'react'
import styled from 'styled-components'
import {
  Card,
  CardBody,
  Heading,
  // Tag,
  Button,
  ChevronUpIcon,
  ChevronDownIcon,
  Text,
  CardFooter,
  // useModal,
  Link,
} from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { Nftree } from 'config/constants/types'
import InfoRow from '../InfoRow'
import Image from '../Image'
import { NftProviderContext } from '../../contexts/NftProvider'
import { getPancakeRabbitContract } from '../../utils/contracts'
// import ClaimNftModal from '../ClaimNftModal'
// import BurnNftModal from '../BurnNftModal'
// import TransferNftModal from '../TransferNftModal'

interface NftCardProps {
  nft: Nftree
}

const Header = styled(InfoRow)`
  min-height: 28px;
`

const DetailsButton = styled(Button).attrs({ variant: 'text', fullWidth: true })`
  height: auto;
  padding: 16px 24px;

  &:hover:not(:disabled):not(:active) {
    background-color: transparent;
  }

  &:focus:not(:active) {
    box-shadow: none;
  }
`

const InfoBlock = styled.div`
  padding: 0 24px 24px;
`

const Value = styled(Text)`
  font-weight: 600;
`

const NftreeCard: React.FC<NftCardProps> = ({ nft }) => {
  const [state, setState] = useState({
    isLoading: false,
    isOpen: false,
    bunnyCount: 0,
    bunnyBurnCount: 0,
  })
  const TranslateString = useI18n()
  const {
    // isInitialized,
    // canClaim,
    // hasClaimed,
    // canBurnNft,
    // totalSupplyDistributed,
    // currentDistributedSupply,
    getTokenIds,
    // reInitialize,
  } = useContext(NftProviderContext)
  // const walletCanClaim = canClaim && !hasClaimed
  const {
    bunnyId,
    name,
    previewImage,
    originalImage,
    description,
    ScientificName,
    Country,
    PlaceofBirth,
    PlaceofResidence,
    DateofBirth,
    Longitude,
    Latitude,
    ID,
    PriceNFT,
    Co2,
  } = nft
  const tokenIds = getTokenIds(bunnyId)
  // const isSupplyAvailable = currentDistributedSupply < totalSupplyDistributed
  const walletOwnsNft = tokenIds && tokenIds.length > 0
  const Icon = state.isOpen ? ChevronUpIcon : ChevronDownIcon

  const fetchDetails = useCallback(async () => {
    setState((prevState) => ({ ...prevState, isLoading: true }))
    try {
      const { methods } = getPancakeRabbitContract()
      const bunnyCount = await methods.bunnyCount(bunnyId).call()
      const bunnyBurnCount = await methods.bunnyBurnCount(bunnyId).call()

      setState((prevState) => ({
        ...prevState,
        isLoading: false,
        isDataFetched: true,
        bunnyCount: parseInt(bunnyCount, 10),
        bunnyBurnCount: parseInt(bunnyBurnCount, 10),
      }))
    } catch (error) {
      console.error(error)
    }
  }, [bunnyId])

  const handleClick = async () => {
    if (state.isOpen) {
      setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }))
    } else {
      try {
        await fetchDetails()
      } catch (error) {
        console.error(error)
      } finally {
        setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }))
      }
    }
  }

  // const handleSuccess = () => {
  //   fetchDetails()
  //   reInitialize()
  // }

  const baseurl = 'https://www.treedom.net/en/user/treedefi.com/trees/'
  const treeurl = baseurl + ID

  // const [onPresentClaimModal] = useModal(<ClaimNftModal nft={nft} onSuccess={handleSuccess} />)
  // const [onPresentBurnModal] = useModal(<BurnNftModal nft={nft} tokenIds={tokenIds} onSuccess={handleSuccess} />)
  // const [onPresentTransferModal] = useModal(
  //   <TransferNftModal nft={nft} tokenIds={tokenIds} onSuccess={handleSuccess} />,
  // )

  return (
    <Card isActive={walletOwnsNft}>
      <Image src={`/images/nfts/${previewImage}`} alt={name} originalLink={walletOwnsNft ? originalImage : null} />
      <CardBody>
        <Header>
          <Heading>{name}</Heading>
        </Header>
      </CardBody>
      <CardFooter p="0">
        <DetailsButton endIcon={<Icon width="24px" color="primary" />} onClick={handleClick}>
          {state.isLoading ? TranslateString(999, 'Loading...') : TranslateString(999, 'Details')}
        </DetailsButton>
        {state.isOpen && (
          <InfoBlock>
            <Text as="p" color="textSubtle" mb="16px" style={{ textAlign: 'center', minHeight: '100px' }}>
              {description}
            </Text>
            <InfoRow>
              <Text>{TranslateString(999, 'Own this tree')}:</Text>
              <Value>{PriceNFT} SEED</Value>
            </InfoRow>
            <InfoRow>
              <Text>{TranslateString(999, 'Scientific Name')}:</Text>
              <Value>{ScientificName}</Value>
            </InfoRow>
            <InfoRow>
              <Text>{TranslateString(999, 'Country')}:</Text>
              <Value>{Country}</Value>
            </InfoRow>
            <InfoRow>
              <Text>{TranslateString(999, 'Place of Birth')}:</Text>
              <Value>{PlaceofBirth}</Value>
            </InfoRow>
            <InfoRow>
              <Text>{TranslateString(999, 'Place of Residence')}:</Text>
              <Value>{PlaceofResidence}</Value>
            </InfoRow>
            <InfoRow>
              <Text>{TranslateString(999, 'Date of Birth')}:</Text>
              <Value>{DateofBirth}</Value>
            </InfoRow>
            <InfoRow>
              <Text>{TranslateString(999, 'Longitude')}:</Text>
              <Value>{Longitude}</Value>
            </InfoRow>
            <InfoRow>
              <Text>{TranslateString(999, 'Latitude')}:</Text>
              <Value>{Latitude}</Value>
            </InfoRow>
            <InfoRow>
              <Text>{TranslateString(999, 'Certification')}:</Text>
              <Link external href={treeurl}>
                Treedom
              </Link>
            </InfoRow>
            <InfoRow>
              <Text>{TranslateString(999, 'CO2 Absorbed')}:</Text>
              <Value>{Co2} kg</Value>
            </InfoRow>
            <Button
              as="a"
              href="#"
              target="_blank"
              disabled
              rel="noopener noreferrer"
              style={{ width: '100%', marginTop: '20px', backgroundColor: '#cecece' }}
            >
              {TranslateString(999, 'Buy NFT')}
            </Button>
            {/* 
            <InfoRow>
              <Text>{TranslateString(999, 'Number minted')}:</Text>
              <Value>{state.bunnyCount + state.bunnyBurnCount}</Value>
            </InfoRow>
            <InfoRow>
              <Text>{TranslateString(999, 'Number burned')}:</Text>
              <Value>{state.bunnyBurnCount}</Value>
            </InfoRow> 
            */}
          </InfoBlock>
        )}
      </CardFooter>
    </Card>
  )
}

export default NftreeCard
