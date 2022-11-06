import React from 'react'
import { CardHeader, Heading, Text, Flex, Image } from '@pancakeswap-libs/uikit'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import QuestionHelper from 'components/QuestionHelper'

const Wrapper = styled(CardHeader) <{ isFinished?: boolean; activeBackground?: string; }>`
  background: ${({ isFinished, activeBackground, theme }) =>
    isFinished ? theme.colors.backgroundDisabled : theme.colors.gradients[activeBackground]};
  border-radius: ${({ theme }) => `${theme.radii.card} ${theme.radii.card} 0 0`};
`

const StyledCardHeader: React.FC<{
  isFinished?: boolean
}> = ({
  isFinished = false,
}) => {
    const TranslateString = useI18n()
    const activeBackground = 'cardHeader'

    return (
      <Wrapper isFinished={isFinished} activeBackground={activeBackground}>
        <Flex alignItems="center" justifyContent="space-between">
          <Flex flexDirection="column">
            <Flex alignItems="center">
              <Heading color={isFinished ? 'textDisabled' : 'body'} size="lg">
                FRUIT TOKEN
              </Heading>
              <QuestionHelper
                  text={TranslateString(9999, 'Rewards FRUIT token for purchasing products.')}
                />
            </Flex>
            <Text color={isFinished ? 'textDisabled' : 'textSubtle'}>Stake SEED</Text>
          </Flex>
          <Image src="/images/tokens/fruit.png" width={64} height={64} disabled={isFinished} alt="FRUIT TOKEN" />
        </Flex>
      </Wrapper>
    )
  }

export default StyledCardHeader
