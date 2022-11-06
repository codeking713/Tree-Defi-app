import React, { useEffect, useRef } from 'react'
import { useCountUp } from 'react-countup'
import { Text } from '@pancakeswap-libs/uikit'

export interface CardValueProps {
  value: number
  decimals?: number
  fontSize?: string
  lineHeight?: string
  prefix?: string
  postFix?: string
  bold?: boolean
  color?: string
  paddingRight?: string
}

const CardValue: React.FC<CardValueProps> = ({ value, decimals, fontSize = '40px', prefix, postFix, paddingRight, color }) => {
  const { countUp, update } = useCountUp({
    start: 0,
    end: value,
    duration: 2,
    separator: ',',
    decimals:
      // eslint-disable-next-line no-nested-ternary
      decimals !== undefined ? decimals : value < 0 ? 4 : value > 1e5 ? 0 : 3,
  })

  const updateValue = useRef(update)

  useEffect(() => {
    updateValue.current(value)
  }, [value, updateValue])

  return (
    <Text bold fontSize={fontSize} paddingRight={paddingRight} color={color}>
      {prefix}
      {countUp} {postFix}
    </Text>
  )
}

export default CardValue
