import React from 'react'
import { IContainerProps } from './types'

function Container({ size, children }: IContainerProps) {
  return <div className={`container container-${size}`}>{children}</div>
}

export default Container
