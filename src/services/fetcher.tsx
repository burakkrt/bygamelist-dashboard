import { IFetcherProps } from './types'

const fetcher = async ({
  endpoint,
  method,
  token,
  body,
  contentType = 'application/json',
}: IFetcherProps) => {
  const headers: Record<string, string> = {
    'Content-Type': contentType,
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}

export default fetcher
