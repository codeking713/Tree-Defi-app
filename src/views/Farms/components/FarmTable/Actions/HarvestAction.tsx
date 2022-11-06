import React, { useState, useRef, useEffect } from 'react'
import { Button } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { getBalanceNumber } from 'utils/formatBalance'
import { useHarvest } from 'hooks/useHarvest'
import useI18n from 'hooks/useI18n'
import { usePriceCakeBusd } from 'state/hooks'
import useStake from 'hooks/useStake'
import { useCountUp } from 'react-countup'
import styled from 'styled-components'

import { ActionContainer, ActionTitles, Title, Subtle, ActionContent, Earned, Staked } from './styles'


const BalanceAndCompound = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`

const HarvestAction: React.FunctionComponent<FarmWithStakedValue> = ({ pid, userData, account }) => {
  const earningsBigNumber = userData && account ? new BigNumber(userData.earnings) : null
  const cakePrice = usePriceCakeBusd()
  let earnings = null
  let earningsBusd = 0
  let displayBalance = '?'

  if (earningsBigNumber) {
    earnings = getBalanceNumber(earningsBigNumber)
    earningsBusd = new BigNumber(earnings).multipliedBy(cakePrice).toNumber()
    displayBalance = earnings.toLocaleString()
  }

  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const { onStake } = useStake(pid)
  const TranslateString = useI18n()

  const { countUp, update } = useCountUp({
    start: 0,
    end: earningsBusd,
    duration: 1,
    separator: ',',
    decimals: 3,
  })
  const updateValue = useRef(update)

  useEffect(() => {
    updateValue.current(earningsBusd)
  }, [earningsBusd, updateValue])

  return (
    <ActionContainer>
      <ActionTitles>
        <Title>SEED </Title>
        <Subtle>{TranslateString(999, 'EARNED')}</Subtle>
      </ActionTitles>
      <ActionContent>
        <div>
          <Earned style={{marginBottom: '5px'}}>{displayBalance}</Earned>
          <Staked>~{countUp}USD</Staked>
        </div>
        <BalanceAndCompound>
          {pid === 5 ? (
            <Button
              disabled={earnings === 0 || pendingTx}
              fullWidth
              // size="sm"
              // variant="secondary"
              marginBottom="15px"
              onClick={async () => {
                setPendingTx(true)
                await onStake(earnings.toString())
                setPendingTx(false)
              }}
            >
              {TranslateString(999, 'Compound')}
            </Button>
          ) : null}
          <Button
            disabled={!earnings || pendingTx || !account}
            fullWidth
            onClick={async () => {
              setPendingTx(true)
              await onReward()
              setPendingTx(false)
            }}
            ml="4px"
          >
            {TranslateString(562, 'Harvest')}
          </Button>
        </BalanceAndCompound>

      </ActionContent>
    </ActionContainer>
  )
}

export default HarvestAction
