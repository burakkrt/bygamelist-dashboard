import React from 'react'
import Container from '@/components/base/container'
import Image from '@/components/base/image'
import { IFooterProps } from './types'

function Footer({}: IFooterProps) {
  return (
    <footer>
      <div className="footer">
        <Container size="extended">
          <div className="footer-in">
            <div className="logo">
              <Image src="/images/site/bygamelist-logo.png" alt="ByGameList Logo" />
            </div>
            <span>support@bygamelist.com</span>
            <span>Copyright © 2024 ByGameList</span>
          </div>
        </Container>
      </div>
    </footer>
  )
}

export default Footer
