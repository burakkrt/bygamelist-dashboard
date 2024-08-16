import { IFetcherProps } from './types'

const fetcher = async ({
  endpoint,
  method = 'GET',
  token,
  body,
  contentType = 'application/json',
  query,
}: IFetcherProps) => {
  const headers: Record<string, string> = {
    'Content-Type': contentType,
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const queryString = query
    ? `?${new URLSearchParams(
        Object.entries(query).reduce(
          (acc, [key, value]) => {
            if (value !== undefined && value !== null) {
              acc[key] = String(value)
            }
            return acc
          },
          {} as Record<string, string>
        )
      ).toString()}`
    : ''

  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/${endpoint}${queryString}`

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      const errorData = await response.json()
      const errorMessage = errorData?.error?.message || 'Bilinmeyen bir hata oluştu.'
      throw new Error(errorMessage)
    }

    return response.json()
  } catch (error: unknown) {
    if (error instanceof TypeError) {
      throw new Error('Sunucuya ulaşılamıyor.')
    }

    if (error instanceof Error) {
      throw error
    } else {
      throw new Error('Bilinmeyen bir hata oluştu.')
    }
  }
}

export default fetcher
