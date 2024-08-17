import React, { memo } from 'react'
import { useRouter } from 'next/router'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import useUserStore from '@/store/useStore'
import { IGetServers, IServer } from '@/utils/types'
import fetcher from '@/utils/services/fetcher'
import Metin2ListCard from '@/components/metin2-list-card'
import Pagination from '@/components/base/pagination'
import Spinner from '@/components/base/spinner'
import { IMetin2ListProps } from './types'

function Metin2List({}: IMetin2ListProps) {
  const router = useRouter()
  const { token } = useUserStore()

  const { data, isLoading, error } = useQuery<IGetServers>({
    queryKey: ['servers', router.query],
    queryFn: () =>
      fetcher({
        endpoint: 'v1/serverlist-auth',
        query: { ...router.query, pageSize: 12 },
        token,
      }),
    placeholderData: keepPreviousData,
  })

  if (isLoading) return <Spinner size={64} />
  if (error) return <span>{error.message}</span>

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="metin2-list not-found">
        <span className="not-found-text">Aradığınız kriterde sunucu bulunamadı.</span>
      </div>
    )
  }

  return (
    <div className="metin2-list">
      <div className="list">
        {data.data.map((server: IServer) => (
          <Metin2ListCard key={server.id} data={server} />
        ))}
        <span className="total-info">Toplam {data.meta.total} sunucu</span>
      </div>
      <div className="pagination">
        <Pagination totalPages={data.meta.totalPages || 0} />
      </div>
    </div>
  )
}

export default memo(Metin2List)
