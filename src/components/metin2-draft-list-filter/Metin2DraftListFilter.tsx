import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { debounce } from 'lodash'
import classNames from 'classnames'
import {
  Box,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import Icon from '@/components/base/icon'

import { IMetin2DraftListFilter, IMetin2DraftListFilterProps } from './types'

const allowedStatuses = ['true', 'false'] as const

function Metin2DraftListFilter({ className }: IMetin2DraftListFilterProps) {
  const initialFilterValues: IMetin2DraftListFilter = {
    id: '',
    name: '',
    status: 'false',
  }
  const [filterValues, setFilterValues] =
    useState<IMetin2DraftListFilter>(initialFilterValues)
  const router = useRouter()

  const handleChange = (key: keyof IMetin2DraftListFilter, value: any) => {
    setFilterValues((prev) => ({
      ...prev,
      [key]: typeof value === 'string' ? value.trim() : value,
    }))
  }

  const handleClear = () => {
    setFilterValues(initialFilterValues)
  }

  const debouncedUpdateQuery = useCallback(
    debounce((updatedValues: IMetin2DraftListFilter) => {
      const filteredRoute = Object.fromEntries(
        Object.entries(updatedValues).filter(([, value]) => value)
      )

      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, ...filteredRoute, page: 1 },
        },
        undefined,
        { shallow: true }
      )
    }, 300),
    []
  )

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const id = query.get('id')
    const name = query.get('name')
    const status = query.get('status')

    setFilterValues((prev) => ({
      ...prev,
      id: id ? id.toString() : prev.id, // id değeri string olarak ele alınıyor
      name: name ? name.toString() : prev.name, // name değeri string olarak ele alınıyor
      status:
        typeof status === 'string' && allowedStatuses.includes(status as any)
          ? (status as IMetin2DraftListFilter['status'])
          : prev.status,
    }))
  }, [])

  useEffect(() => {
    debouncedUpdateQuery(filterValues)

    return () => {
      debouncedUpdateQuery.cancel()
    }
  }, [filterValues, debouncedUpdateQuery])

  return (
    <div>
      <div className={classNames('metin2-draft-list-filter', className)}>
        <Box component="div" className="filter-form">
          <TextField
            label="Sunucu adı"
            variant="filled"
            className="server-name"
            autoComplete="off"
            value={filterValues.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          <TextField
            label="Sunucu Id"
            variant="filled"
            className="server-id"
            autoComplete="off"
            value={filterValues.id}
            onChange={(e) => handleChange('id', e.target.value)}
          />
          <div className="status">
            <FormLabel id="server-status">Sunucu Durumu</FormLabel>
            <RadioGroup
              aria-labelledby="Sunucu durumu radio butonları"
              name="server-status"
              className="filter-radio-group"
              value={filterValues.status}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              <FormControlLabel value="false" control={<Radio />} label="Taslak" />
              <FormControlLabel value="true" control={<Radio />} label="Yayında" />
            </RadioGroup>
          </div>
          {JSON.stringify(filterValues) !== JSON.stringify(initialFilterValues) && (
            <button type="button" className="clear-btn" onClick={handleClear}>
              <Icon name="icon-clear" />
            </button>
          )}
        </Box>
      </div>
    </div>
  )
}

export default Metin2DraftListFilter
