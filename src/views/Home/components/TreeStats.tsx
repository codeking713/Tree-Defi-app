import React from 'react'
import { Card, CardBody, Heading, Text, Link } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupplyTree, useBurnedBalanceTree } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getTreeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import { useFarms, usePriceTreeBusd } from '../../../state/hooks'

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const TreeStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupplyTree()
  const burnedBalance = useBurnedBalanceTree(getTreeAddress())
  const farms = useFarms()
  const eggPrice = usePriceTreeBusd()
  const lockedsupply = 1492
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0)
  const cakeSupply = getBalanceNumber(circSupply)
  const remainingSupply = cakeSupply - lockedsupply
  const marketCap = eggPrice.times(circSupply)

  let treePerBlock = 0
  if (farms && farms[0] && farms[0].treePerBlock) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    treePerBlock = new BigNumber(farms[0].treePerBlock).div(new BigNumber(10).pow(18)).toNumber()
  }

  return (
    <StyledCakeStats>
      <CardBody>
        <Heading size="xl" mb="24px">
          <div className="token-tag">CAPPED</div>
          {TranslateString(534, 'TREE Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{TranslateString(10005, 'Market Cap')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(marketCap)} decimals={0} prefix="$" />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(536, 'Total Minted')}</Text>
          {totalSupply && <CardValue fontSize="14px" value={getBalanceNumber(totalSupply)} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(538, 'Total Burned')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(burnedBalance)} decimals={0} />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(999, 'Devs Locked Funds')}</Text>
          <Text bold fontSize="14px">
            <Link
              external
              href="https://deeplock.io/lock/0xf0Fcd737fcE18F95621CC7841EbE0eA6EFCCf77e"
              rel="noreferrer noopener"
              style={{ marginRight: 'auto', marginLeft: 'auto', textDecoration: 'none', color: '#191326' }}
            >
              <CardValue fontSize="14px" value={lockedsupply} decimals={0} />
            </Link>
          </Text>
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(10004, 'Circulating Supply')}</Text>
          {cakeSupply && <CardValue fontSize="14px" value={remainingSupply} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(540, 'New TREE/block')}</Text>
          <Text bold fontSize="14px">
            0
          </Text>
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default TreeStats
