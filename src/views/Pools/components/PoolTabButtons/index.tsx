import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link, useLocation } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'

const PoolTabButtons = () => {
  const { url } = useRouteMatch()
  const TranslateString = useI18n()
  const history = useLocation()

  const getIndex = () => {
    switch (history.pathname) {
      case '/launch-pools':
        return 0
      case '/launch-pools/seedpool':
        return 1
      case '/launch-pools/treepool':
        return 2
      case '/launch-pools/history':
        return 3
      default:
        return 0
    }
  }
  return (
    <Wrapper>
      <ButtonMenu activeIndex={getIndex()} size="sm" variant="subtle">
        <ButtonMenuItem as={Link} to={`${url}`}>
          {TranslateString(999, 'Active')}
        </ButtonMenuItem>
        <ButtonMenuItem as={Link} to={`${url}/seedpool`}>
          {TranslateString(999, 'Seed')}
        </ButtonMenuItem>
        <ButtonMenuItem as={Link} to={`${url}/treepool`}>
          {TranslateString(999, 'Tree')}
        </ButtonMenuItem>
        <ButtonMenuItem as={Link} to={`${url}/history`}>
          {TranslateString(999, 'Inactive')}
        </ButtonMenuItem>
      </ButtonMenu>
    </Wrapper>
  )
}

export default PoolTabButtons

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`
