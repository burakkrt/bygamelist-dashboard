import React, { memo } from 'react'
import classNames from 'classnames'
import {
  Box,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import Button from '@/components/base/button'

import { IMetin2ListFilterProps } from './types'

function Metin2ListFilter({
  filterValues,
  setFilterValues,
  onSubmit,
  isSubmitLoading = false,
  className,
}: IMetin2ListFilterProps) {
  const hanleChance = (key: keyof IMetin2ListFilterProps['filterValues'], value: any) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className={classNames('metin2-list-filter', className)}>
      <Box component="form" className="filter-form" onSubmit={onSubmit}>
        <TextField
          label="Sunucu adı"
          variant="filled"
          className="server-name"
          autoComplete="off"
          value={filterValues.name}
          onChange={(e) => hanleChance('name', e.target.value)}
        />
        <TextField
          label="Sunucu Id"
          variant="filled"
          className="server-id"
          autoComplete="off"
          value={filterValues.id}
          onChange={(e) => hanleChance('id', e.target.value)}
        />
        <div className="status">
          <FormLabel id="server-status">Sunucu Durumu</FormLabel>
          <RadioGroup
            aria-labelledby="Sunucu durumu radio butonları"
            name="server-status"
            className="filter-radio-group"
            value={filterValues.status}
            onChange={(e) => hanleChance('status', e.target.value)}
          >
            <FormControlLabel value="all" control={<Radio />} label="Hepsi" />
            <FormControlLabel value="live" control={<Radio />} label="Yayında" />
            <FormControlLabel value="draft" control={<Radio />} label="Taslak" />
          </RadioGroup>
        </div>
        <Button
          type="submit"
          variant="contained"
          className="filter-submit-btn"
          disabled={isSubmitLoading}
        >
          Filtrele
        </Button>
      </Box>
    </div>
  )
}

export default memo(Metin2ListFilter)
