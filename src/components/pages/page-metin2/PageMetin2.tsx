import React from 'react'
import { IGetServers, IServer } from '@/utils/types'
import fetcher from '@/utils/services/fetcher'
import { useQuery } from '@tanstack/react-query'
import { IPageMetin2Props } from './types'

function PageMetin2({}: IPageMetin2Props) {
  const { data, isLoading, error } = useQuery<IGetServers>({
    queryKey: ['servers'],
    queryFn: () =>
      fetcher({
        endpoint: 'v1/server',
      }),
  })

  if (isLoading) return <div>Yükleniyor...</div>
  if (error) return <div>Hata: {error.message}</div>

  return (
    <div>
      <h3>Metin2</h3>
      {data?.data &&
        data.data.map((server: IServer) => <div key={server.id}>{server.name}</div>)}
    </div>
  )
}

export default PageMetin2
