export interface IUserStore {
  id: string
  name: string
  surname: string
  email: string
  token: string
  setId: (id: string) => void
  setName: (name: string) => void
  setSurname: (surname: string) => void
  setEmail: (email: string) => void
  setToken: (token: string) => void
}
