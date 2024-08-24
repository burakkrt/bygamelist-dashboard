import React from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { IGetServersStatus, IServerStatus } from '@/utils/types'
import fetcher from '@/utils/services/fetcher'
import useUserStore from '@/store/useStore'
import { useRouter } from 'next/router'
import Spinner from '@/components/base/spinner'
import Pagination from '@/components/base/pagination'
import Metin2DraftListFilter from '@/components/metin2-draft-list-filter'
import { IMetin2DraftListProps } from './types'
import Metin2DraftListCard from '../metin2-draft-list-card'

function Metin2DraftList({}: IMetin2DraftListProps) {
  const router = useRouter()
  const { token } = useUserStore()

  const { data, isLoading, error } = useQuery<IGetServersStatus>({
    queryKey: ['serverlist-status', router.query],
    queryFn: () =>
      fetcher({
        endpoint: 'v1/serverlist-status',
        query: { ...router.query, pageSize: 12 },
        token,
      }),
    placeholderData: keepPreviousData,
    enabled: !!token,
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
        {data.data.map((server: IServerStatus) => (
          <Metin2DraftListCard key={server.id} data={server} />
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
