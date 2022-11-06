// @ts-nocheck
import React from 'react'
import styled from 'styled-components'
import { Heading, Text as UIKitText, ArrowForwardIcon } from '@pancakeswap-libs/uikit' // Button
import useI18n from 'hooks/useI18n'
import Container from 'components/layout/Container'

const StyledHowItWorks = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.textSubtle};
  padding: 24px 0;
`

const Section = styled.div`
  margin-bottom: 24px;
`

const Icon = styled.div`
  text-align: center;
`

const Text = styled(UIKitText)`
  flex: 1;
  padding: 0 8px;
`

const Row = styled.div`
  align-items: start;
  display: flex;
  margin-bottom: 16px;
`

const HowItWorks = () => {
  const TranslateString = useI18n()

  return (
    <Container>
      <StyledHowItWorks>
        <Section>
          <Heading id="how-it-works" color="secondary" size="lg" mb="16px">
            {TranslateString(999, 'What is an NFTrees')}
          </Heading>
          <Row>
            <Icon>
              <ArrowForwardIcon />
            </Icon>
            <Text>
              {TranslateString(
                999,
                'Every NFTree is backed by a digital certificate of a real planted tree, provided and linked by an external NPO or NGO.',
              )}
            </Text>
          </Row>
          <Row>
            <Icon>
              <ArrowForwardIcon />
            </Icon>
            <Text>
              {TranslateString(
                999,
                'Initial sale will automatically burn 90% of the raised SEED, remaining 10% will be sent to the marketing vault.',
              )}
            </Text>
          </Row>
          <Row>
            <Icon>
              <ArrowForwardIcon />
            </Icon>
            <Text>
              {TranslateString(
                999,
                'Future development will let owner to see pictures and CO2 absorbed by his own tree.',
              )}
            </Text>
          </Row>
        </Section>
        <Section>
          <Heading color="secondary" size="lg" mb="16px">
            {TranslateString(999, 'When the trade will start?')}
          </Heading>
          <Row>
            <Icon>
              <ArrowForwardIcon />
            </Icon>
            <Text>
              {TranslateString(999, 'Initial minted NFTrees will be listed here during the 3rd week of April.')}
            </Text>
          </Row>
          <Row>
            <Icon>
              <ArrowForwardIcon />
            </Icon>
            <Text>
              {TranslateString(
                999,
                'Trade will be available on the national Arbor Day, on April the 30th at 17.00 UTC.',
              )}
            </Text>
          </Row>
          <Row>
            <Icon>
              <ArrowForwardIcon />
            </Icon>
            <Text>
              {TranslateString(
                999,
                'Users will be able to buy NFTrees using SEED, and place it for sale again at the desired price.',
              )}
            </Text>
          </Row>
          <Row>
            <Icon>
              <ArrowForwardIcon />
            </Icon>
            <Text>
              {TranslateString(
                999,
                'NFTrees use standard interface ERC721, that means you can sell it also in other platforms like rarible.com and opensea.io',
              )}
            </Text>
          </Row>
        </Section>
        {/* <div>
          <Button
            as="a"
            href="https://docs.google.com/forms/d/e/1FAIpQLSfToBNlovtMvTZFSwOhk0TBiDPMGasLxqG0RB-kJN85HR_avA/viewform"
            target="_blank"
            rel="noopener noreferrer"
          >
            {TranslateString(644, 'Read more on our medium post')}
          </Button>
        </div> */}
      </StyledHowItWorks>
    </Container>
  )
}

export default HowItWorks
