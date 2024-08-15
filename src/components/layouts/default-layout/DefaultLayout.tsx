import React from 'react'
import Footer from '@/components/footer'
import Container from '@/components/base/container'
import { useInitializeUserStore } from '@/store/useStore'
import Sidebar from '@/components/sidebar'
import TokenTimer from '@/components/token-timer'
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
      <TokenTimer />
    </>
  )
}

export default DefaultLayout
