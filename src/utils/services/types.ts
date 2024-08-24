export type IContentTypes =
  | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'
  | 'text/plain'
  | 'text/html'
  | 'application/xml'
  | 'application/javascript'
  | 'application/octet-stream'
  | 'image/png'
  | 'image/jpeg'
  | 'image/gif'
  | 'audio/mpeg'
  | 'video/mp4'

export type IMethods = 'GET' | 'POST' | 'PATCH' | 'DELETE'

export interface IFetcherProps {
  endpoint: string
  method?: IMethods
  token?: string
  body?: Record<string, unknown>
  query?: Record<string, any>
  contentType?: IContentTypes
}
