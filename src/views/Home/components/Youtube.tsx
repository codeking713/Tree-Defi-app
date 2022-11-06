import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Card, CardBody, Heading, BaseLayout } from '@pancakeswap-libs/uikit'

const YoutubeCard = styled(Card)`
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
    margint-bottom: 0px;
    width: 100%;
  }
`
const VideoEmbed = styled(BaseLayout)`
  align-items: center;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 6;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const YoutubeEmbed = ({ embedId }) => (
  <YoutubeCard>
    <CardBody>
      <Heading size="xl" mb="24px">
        <p>Project Review</p>
      </Heading>
      <VideoEmbed>
        <div className="video-responsive">
          <iframe
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/${embedId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
      </VideoEmbed>
    </CardBody>
  </YoutubeCard>
)


YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
}

export default YoutubeEmbed
