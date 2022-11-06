import React, { useState } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, Link } from '@pancakeswap-libs/uikit'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import { useRandomImage } from 'state/hooks'
// import { bottom } from '@popperjs/core'

// eslint-disable-next-line react-hooks/rules-of-hooks
const imageOfDay = useRandomImage()

const Memeoftheday = styled(Card)`
    background-image: url(${imageOfDay.imageURL});
    background-size: cover;
    background-color: #cccccc;
    margin-left: auto;
    margin-right: auto;
    height: 100%;
    width: 100%;
    min-height: 217px;

    background-blend-mode: multiply;
    ${({ theme }) => theme.mediaQueries.lg} {
      margin: 0;
      max-width: none;
    }
  `

const MemeCard = () => {
  const [open, setOpen] = useState(false)
 

  
  const closeLightbox = () => {
    setOpen(!open)
  }

  return (
    <>
      <Memeoftheday
        onClick={() => {
          closeLightbox()
        }}
      >
        <CardBody>
          <Heading color="invertedContrast" size="lg">
            Meme of the Day
          </Heading>
          <Flex justifyContent="space-between">
            <Heading color="invertedContrast" size="mg" style={{ position: 'absolute', bottom: '15%' }}>
              <Link external href={`https://twitter.com/${imageOfDay.name}`} style={{ color: 'white' }}>
                {imageOfDay.name}
              </Link>
            </Heading>
          </Flex>
        </CardBody>
      </Memeoftheday>
      {open && <Lightbox mainSrc={imageOfDay.imageURL} onCloseRequest={() => closeLightbox()} />}
    </>
  )
}

export default MemeCard
