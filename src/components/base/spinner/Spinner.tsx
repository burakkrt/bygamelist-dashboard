import React from 'react'
import Icon from '@/components/base/icon'
import { ISpinnerProps } from './types'

function Spinner({ size = 42 }: ISpinnerProps) {
  return (
    <div className="spinner" style={{ width: size, height: size }}>
      <Icon name="icon-spinner" className="loading" style={{ fontSize: size }} />
    </div>
  )
}

export default Spinner
