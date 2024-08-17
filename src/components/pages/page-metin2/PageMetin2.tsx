import React from 'react'
import Metin2List from '@/components/metin2-list'
import Metin2ListFilter from '@/components/metin2-list-filter'
import { IPageMetin2Props } from './types'

function PageMetin2({}: IPageMetin2Props) {
  return (
    <div className="page-metin2">
      <div className="metin2-servers">
        <Metin2ListFilter />
        <Metin2List />
      </div>
    </div>
  )
}

export default PageMetin2
