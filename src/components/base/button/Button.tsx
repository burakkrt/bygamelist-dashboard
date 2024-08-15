import React from 'react'
import { Button as MUIButton } from '@mui/material'
import classNames from 'classnames'
import Icon from '@/components/base/icon'
import { IButtonProps } from './types'

function Button({
  children,
  className,
  beforeIcon,
  afterIcon,
  isLoading = false,
  ...rest
}: IButtonProps) {
  return (
    <MUIButton
      className={classNames('base-button', isLoading && 'isLoading', className)}
      disabled={isLoading}
      {...rest}
    >
      {beforeIcon && !isLoading && <Icon name={beforeIcon} />}
      {isLoading && !beforeIcon && <Icon name="icon-spinner" className="loading-anim" />}
      {isLoading ? 'Bekleyin...' : children}
      {afterIcon && <Icon name={afterIcon} />}
    </MUIButton>
  )
}

export default Button
