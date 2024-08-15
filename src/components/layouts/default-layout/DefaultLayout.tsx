import React from 'react'
import Footer from '@/components/footer'
import Container from '@/components/base/container'
import { useInitializeUserStore } from '@/store/useStore'

import Sidebar from '@/components/sidebar'

import { IDefaultLayoutProps } from './types'

function DefaultLayout({ children }: IDefaultLayoutProps) {
  useInitializeUserStore()

  return (
    <>
      <Container size="wide">
        <div className="root-layout">
          <Sidebar />
          {children}
        </div>
      </Container>
      <Footer />
    </>
  )
}

export default DefaultLayout
