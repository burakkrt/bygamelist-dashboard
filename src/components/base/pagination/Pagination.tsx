import React from 'react'
import classNames from 'classnames'
import Icon from '@/components/base/icon'
import { IPaginationProps } from './types'

function Pagination({ totalPages, currentPage, onPageChange }: IPaginationProps) {
  const handlePageClick = (page: number) => {
    onPageChange(page)
  }

  const startPage = Math.max(1, currentPage - 2)
  const endPage = Math.min(totalPages, currentPage + 2)

  const pagesToShow = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  )

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

export default Pagination
