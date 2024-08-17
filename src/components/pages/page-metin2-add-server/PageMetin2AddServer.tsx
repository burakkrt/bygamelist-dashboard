import React, { useState } from 'react'
import { IPageMetin2AddServerProps, IFormValuesAddServer } from './types'

function PageMetin2AddServer({}: IPageMetin2AddServerProps) {
  const initialFormValues: IFormValuesAddServer = {}
  const [formValues, setFormValues] = useState<IFormValuesAddServer>({})

  return (
    <div className="page-metin2-add-server">
      <h3>Metin2 sunucu ekle</h3>
    </div>
  )
}

export default PageMetin2AddServer
