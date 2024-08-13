import { create } from 'zustand'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { IUserStore } from './types'

const useUserStore = create<IUserStore>((set) => ({
  id: '',
  name: '',
  surname: '',
  email: '',
  token: '',
  setId: (id) => set((state) => ({ ...state, id })),
  setName: (name) => set((state) => ({ ...state, name })),
  setSurname: (surname) => set((state) => ({ ...state, surname })),
  setEmail: (email) => set((state) => ({ ...state, email })),
  setToken: (token) => set((state) => ({ ...state, token })),
}))

export const useInitializeUserStore = () => {
  const setId = useUserStore((state) => state.setId)
  const setName = useUserStore((state) => state.setName)
  const setSurname = useUserStore((state) => state.setSurname)
  const setEmail = useUserStore((state) => state.setEmail)
  const setToken = useUserStore((state) => state.setToken)

  useEffect(() => {
    const userInfo = Cookies.get('userInfo')
    const userToken = Cookies.get('userToken')

    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo)
      setId(parsedUserInfo.id || '')
      setName(parsedUserInfo.name || '')
      setSurname(parsedUserInfo.surname || '')
      setEmail(parsedUserInfo.email || '')
    }

    if (userToken) {
      setToken(userToken || '')
    }
  }, [setId, setName, setSurname, setEmail, setToken])
}

export default useUserStore
