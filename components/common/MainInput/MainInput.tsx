import styled from '@emotion/styled'
import { InputHTMLAttributes } from 'react'

const Input = styled.input`
  border: 1px solid #ebebeb;
  border-radius: 100px;
  padding: 9px 16px;
  font-size: 16px;
  &::placeholder {
    color: #ebebeb;
    vertical-align: middle;
  }
  &:focus {
    outline: 1px solid #999;
  }
`

export default function MainInput(
  props: InputHTMLAttributes<HTMLInputElement>,
) {
  return (
    <Input {...props} />
  )
}