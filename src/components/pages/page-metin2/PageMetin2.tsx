import React from 'react'
import { IGetServers, IServer } from '@/utils/types'
import fetcher from '@/utils/services/fetcher'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import Metin2ListCard from '@/components/metin2-list-card'
import Pagination from '@/components/base/pagination'
import Spinner from '@/components/base/spinner'
import Metin2ListFilter from '@/components/metin2-list-filter'
import { useRouter } from 'next/router'

import { IPageMetin2Props } from './types'

function PageMetin2({}: IPageMetin2Props) {
  const router = useRouter()

  const { data, isLoading, error } = useQuery<IGetServers>({
    queryKey: ['servers', router.query],
    queryFn: () =>
      fetcher({
        endpoint: 'v1/serverlist',
        query: { ...router.query, pageSize: 12 },
      }),
    placeholderData: keepPreviousData,
  })

  return (
    <div className="page-metin2">
      <div className="server-list">
        <Metin2ListFilter />
        <div className="list">
          {isLoading && <Spinner size={64} />}
          {error && <span>{error.message}</span>}
          {data?.data &&
            data.data.map((server: IServer) => (
              <Metin2ListCard key={server.id} data={server} />
            ))}
          {data && <span className="total-info">Toplam {data?.meta?.total} sunucu</span>}
        </div>
        <div className="pagination">
          {data?.meta?.totalPages && <Pagination totalPages={data.meta.totalPages} />}
        </div>
      </div>
    </div>
  )
}

export default PageMetin2
