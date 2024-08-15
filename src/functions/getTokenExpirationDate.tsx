import { decodeJwt } from 'jose'

function getTokenExpirationDate(token: string) {
  if (!token) return null

  const decoded = decodeJwt(token)
  if (!decoded || !decoded.exp) return null

  const expirationDate = new Date(decoded.exp * 1000)
  return expirationDate
}

export default getTokenExpirationDate
