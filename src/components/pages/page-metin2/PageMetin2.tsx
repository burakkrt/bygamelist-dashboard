import React, { useState } from 'react'
import { IGetServers, IServer } from '@/utils/types'
import fetcher from '@/utils/services/fetcher'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import Metin2ListCard from '@/components/metin2-list-card'
import Pagination from '@/components/base/pagination'
import Spinner from '@/components/base/spinner'
import { IPageMetin2Props } from './types'

function PageMetin2({}: IPageMetin2Props) {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const { data, isLoading, error } = useQuery<IGetServers>({
    queryKey: ['servers', currentPage],
    queryFn: () =>
      fetcher({
        endpoint: 'v1/serverlist',
        query: { pageSize: 12, page: currentPage },
      }),
    placeholderData: keepPreviousData,
  })

  return (
    <div className="page-metin2">
      <div className="server-list">
        <span className="total-info">Toplam {data?.meta?.total} sunucu</span>
        <div className="list">
          {isLoading && <Spinner size={64} />}
          {error && <span>{error.message}</span>}
          {data?.data &&
            data.data.map((server: IServer) => (
              <Metin2ListCard key={server.id} data={server} />
            ))}
        </div>
        <div className="pagination">
          {data?.meta?.totalPages && (
            <Pagination
              currentPage={currentPage}
              totalPages={data.meta.totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default PageMetin2
