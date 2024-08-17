import React from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import useUserStore from '@/store/useStore'
import Image from '../base/image'
import Icon from '../base/icon'
import { ISidebarProps } from './types'
import NavigationPages from '../navigation-pages'

function Sidebar({}: ISidebarProps) {
  const { name, surname, email } = useUserStore()
  const router = useRouter()

  const hanleLogout = () => {
    Cookies.remove('userInfo')
    Cookies.remove('userToken')
    router.reload()
  }

  return (
    <div className="sidebar">
      <div className="header">
        <div className="logo">
          <Image
            src="/images/site/bygamelist-logo-dark.png"
            alt="Bygamelist logo"
            priority
          />
        </div>
        <div className="user">
          <div className="user-info">
            <span className="name">{`${name} ${surname}`}</span>
            <span className="email">{email}</span>
          </div>
          <button type="button" onClick={hanleLogout}>
            <Icon name="icon-log-out" />
          </button>
        </div>
      </div>
      <div className="body">
        <nav>
          <NavigationPages pageType="mainPages" location="header" />
        </nav>
      </div>
      <div className="footer" />
    </div>
  )
}

export default Sidebar
