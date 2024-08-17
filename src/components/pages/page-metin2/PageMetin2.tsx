import React, { useCallback, useEffect, useState } from 'react'
import { IGetServers, IServer } from '@/utils/types'
import fetcher from '@/utils/services/fetcher'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import Metin2ListCard from '@/components/metin2-list-card'
import Pagination from '@/components/base/pagination'
import Spinner from '@/components/base/spinner'
import Metin2ListFilter from '@/components/metin2-list-filter'
import { IMetin2ListFilter, IPageMetin2Props } from './types'

function PageMetin2({}: IPageMetin2Props) {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filterValues, setFilterValues] = useState<IMetin2ListFilter>({
    id: '',
    name: '',
    status: 'all',
  })

  const filteredQuery = useCallback(
    () =>
      Object.fromEntries(
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        Object.entries(filterValues).filter(([key, value]) => value)
      ),
    [filterValues]
  )

  const { data, isLoading, error, refetch } = useQuery<IGetServers>({
    queryKey: ['servers', currentPage],
    queryFn: () =>
      fetcher({
        endpoint: 'v1/serverlist',
        query: { pageSize: 12, page: currentPage, ...filteredQuery() },
      }),
    placeholderData: keepPreviousData,
  })

  const hanleSubmitFilter = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (currentPage === 1) {
      refetch()
    } else setCurrentPage(1)
  }

  useEffect(() => {
    console.log(filterValues)
  }, [filterValues])

  return (
    <div className="page-metin2">
      <div className="server-list">
        <Metin2ListFilter
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          isSubmitLoading={isLoading}
          onSubmit={hanleSubmitFilter}
        />
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
