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

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/${endpoint}`, {
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
