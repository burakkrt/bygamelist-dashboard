import React from 'react'
import classNames from 'classnames'
import { IIconProps } from './types'

function Icon({ name, className, ...rest }: IIconProps) {
  return <i className={classNames('base-icon', name, className)} {...rest} />
}

export default Icon
