import React, { useCallback, useState } from 'react'
import { AlertCircle as Question } from 'react-feather'
import styled from 'styled-components'
import Tooltip from '../Tooltip'

const AlertWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  border: none;
  background: none;
  outline: none;
  cursor: default;
  border-radius: 36px;
  background-color: ${({ theme }) => theme.colors.invertedContrast};
  color: #ffa80a;

  :hover,
  :focus {
    opacity: 0.7;
  }
`

export default function AlertHelper({ text }: { text: string }) {
  const [show, setShow] = useState<boolean>(false)

  const open = useCallback(() => setShow(true), [setShow])
  const close = useCallback(() => setShow(false), [setShow])

  return (
    <span style={{ marginLeft: 4 }}>
      <Tooltip text={text} show={show}>
        <AlertWrapper onClick={open} onMouseEnter={open} onMouseLeave={close}>
          <Question size={16} />
        </AlertWrapper>
      </Tooltip>
    </span>
  )
}
