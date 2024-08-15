import React from 'react'
import useUserStore from '@/store/useStore'
import { ISidebarProps } from './types'

function Sidebar({}: ISidebarProps) {
  const { name, surname, email } = useUserStore()

  return (
    <div className="sidebar">
      <div className="profile">
        <span className="name">{`${name} ${surname}`}</span>
        <span className="email">{email}</span>
      </div>
    </div>
  )
}

export default Sidebar
