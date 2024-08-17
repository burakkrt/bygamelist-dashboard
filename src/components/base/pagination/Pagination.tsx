import React, { memo, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import Icon from '@/components/base/icon'
import { IPaginationProps } from './types'

function Pagination({ totalPages = 0 }: IPaginationProps) {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const router = useRouter()

  const handlePageClick = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber)
      router.replace({
        pathname: router.pathname,
        query: { ...router.query, page: pageNumber },
      })
    }
  }

  const startPage = Math.max(1, currentPage - 2)
  const endPage = Math.min(totalPages, currentPage + 2)

  const pagesToShow = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  )

  useEffect(() => {
    const pageFromQuery = router.query.page ? Number(router.query.page) : currentPage

    if (!router.query.page) {
      router.replace({
        pathname: router.pathname,
        query: { ...router.query, page: currentPage },
      })
    } else {
      setCurrentPage(pageFromQuery)
    }
  }, [router.query.page])

  if (!totalPages || totalPages <= 0) {
    return null
  }

  return (
    <div className="pages">
      {currentPage > 3 && (
        <>
          <button type="button" onClick={() => handlePageClick(1)} className="page-btn">
            1
          </button>
          <span className="more-icon">
            <Icon name="icon-chevron-left" />{' '}
          </span>
        </>
      )}

      {pagesToShow.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => handlePageClick(page)}
          className={classNames('page-btn', currentPage === page ? 'active' : '')}
          disabled={currentPage === page}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          <span className="more-icon">
            <Icon name="icon-chevron-right" />{' '}
          </span>
          <button
            type="button"
            onClick={() => handlePageClick(totalPages)}
            className="page-btn"
          >
            {totalPages}
          </button>
        </>
      )}
    </div>
  )
}

export default memo(Pagination)
