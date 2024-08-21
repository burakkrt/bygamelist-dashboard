import React from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { IGetServers, IServer } from '@/utils/types'
import fetcher from '@/utils/services/fetcher'
import useUserStore from '@/store/useStore'
import { useRouter } from 'next/router'
import Spinner from '@/components/base/spinner'
import Metin2ListCard from '@/components/metin2-list-card'
import Pagination from '@/components/base/pagination'
import Metin2DraftListFilter from '@/components/metin2-draft-list-filter'

import { IMetin2DraftListProps } from './types'

function Metin2DraftList({}: IMetin2DraftListProps) {
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

  const renderContent = () => {
    if (isLoading)
      return (
        <div className="metin2-draft-list not-found">
          <Spinner size={64} />
        </div>
      )

    if (error)
      return (
        <div className="metin2-draft-list not-found">
          <span className="not-found-text">{error.message}</span>
        </div>
      )

    if (!data?.data || data.data.length === 0) {
      return (
        <div className="metin2-draft-list not-found">
          <span className="not-found-text">Aradığınız kriterde sunucu bulunamadı.</span>
        </div>
      )
    }

    return (
      <div className="list">
        {data.data.map((server: IServer) => (
          <Metin2ListCard key={server.id} data={server} />
        ))}
        <span className="total-info">Toplam {data.meta.total} sunucu</span>
      </div>
    )
  }

  return (
    <div className="metin2-draft-list">
      <Metin2DraftListFilter />
      {renderContent()}
      <div className="pagination">
        <Pagination totalPages={data?.meta?.totalPages || 0} />
      </div>
    </div>
  )
}

export default Metin2DraftList
