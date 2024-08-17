import React, { memo, useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { debounce } from 'lodash'
import {
  Box,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import Icon from '@/components/base/icon'
import { IMetin2ListFilter, IMetin2ListFilterProps } from './types'

const allowedStatuses = ['all', 'live', 'draft'] as const

function Metin2ListFilter({ className }: IMetin2ListFilterProps) {
  const initialFilterValues: IMetin2ListFilter = {
    id: '',
    name: '',
    status: 'all',
  }
  const [filterValues, setFilterValues] = useState<IMetin2ListFilter>(initialFilterValues)
  const router = useRouter()

  const handleChange = (key: keyof IMetin2ListFilter, value: any) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleClear = () => {
    setFilterValues(initialFilterValues)
  }

  const debouncedUpdateQuery = useCallback(
    debounce((updatedValues: IMetin2ListFilter) => {
      const filteredRoute = Object.fromEntries(
        Object.entries(updatedValues).filter(([, value]) => value)
      )

      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, ...filteredRoute },
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
      id: typeof id === 'string' ? id : prev.id,
      name: typeof name === 'string' ? name : prev.name,
      status:
        typeof status === 'string' && allowedStatuses.includes(status as any)
          ? (status as IMetin2ListFilter['status'])
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
    <div className={classNames('metin2-list-filter', className)}>
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
            <FormControlLabel value="all" control={<Radio />} label="Hepsi" />
            <FormControlLabel value="live" control={<Radio />} label="Yayında" />
            <FormControlLabel value="draft" control={<Radio />} label="Taslak" />
          </RadioGroup>
        </div>
        {JSON.stringify(filterValues) !== JSON.stringify(initialFilterValues) && (
          <button type="button" className="clear-btn" onClick={handleClear}>
            <Icon name="icon-clear" />
          </button>
        )}
      </Box>
    </div>
  )
}

export default memo(Metin2ListFilter)
