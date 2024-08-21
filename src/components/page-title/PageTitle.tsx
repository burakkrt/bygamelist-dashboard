import React from 'react'
import Icon from '@/components/base/icon'
import { IPageTitleProps } from './types'

function PageTitle({ children, beforeIcon = 'icon-document' }: IPageTitleProps) {
  return (
    <h3 className="custom-page-title">
      <Icon name={beforeIcon} />
      <span className="title-text">{children}</span>
    </h3>
  )
}

export default PageTitle
