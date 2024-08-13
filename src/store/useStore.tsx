import { create } from 'zustand'
import { useEffect } from 'react'
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
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedData = JSON.parse(userData)
      setId(parsedData.id || '')
      setName(parsedData.name || '')
      setSurname(parsedData.surname || '')
      setEmail(parsedData.email || '')
      setToken(parsedData.token || '')
    }
  }, [setId, setName, setSurname, setEmail, setToken])
}

export default useUserStore
