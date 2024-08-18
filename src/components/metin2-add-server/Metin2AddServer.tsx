import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { tr } from 'date-fns/locale'
import {
  Box,
  FilledInput,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import useUserStore from '@/store/useStore'
import { useQuery } from '@tanstack/react-query'
import fetcher from '@/utils/services/fetcher'
import { IGetBosses, IGetEfsunlar, IGetLevels } from '@/utils/types'
import { IFormValuesAddUser, IMetin2AddServerProps } from './types'

function Metin2AddServer({}: IMetin2AddServerProps) {
  const initialFormValues: IFormValuesAddUser = {
    userId: '',
    status: false,
    name: '',
    level: '',
    autoHunt: false,
    dropClient: 1,
    openingDate: undefined,
    autoBoss: undefined,
    battlepass: undefined,
    legalSale: undefined,
    dolunayKdp: undefined,
    simya: undefined,
    kuleFarm: undefined,
    singleStoreyDungeon: undefined,
    ownSalesSystem: undefined,
    discord: undefined,
    website: undefined,
    efsunlar: undefined,
    bosses: undefined,
  }
  const [formValues, setFormValues] = useState<IFormValuesAddUser>(initialFormValues)
  const { id } = useUserStore()

  const levels = useQuery<IGetLevels>({
    queryKey: ['level'],
    queryFn: () =>
      fetcher({
        endpoint: 'v1/level',
      }),
  })

  const efsunlar = useQuery<IGetEfsunlar>({
    queryKey: ['efsunlar'],
    queryFn: () =>
      fetcher({
        endpoint: 'v1/efsun',
      }),
  })

  const bosses = useQuery<IGetBosses>({
    queryKey: ['bosses'],
    queryFn: () =>
      fetcher({
        endpoint: 'v1/boss',
      }),
  })

  const handleChange = (key: keyof IFormValuesAddUser, value: any) => {
    setFormValues((prev) => ({ ...prev, [key]: value }))
  }

  const parseBooleanhandleChange = (
    key: keyof IFormValuesAddUser,
    value: string | boolean
  ) => {
    let parsedValue: boolean | undefined

    if (value === 'true') {
      parsedValue = true
    }

    if (value === 'false') {
      parsedValue = false
    }

    if (value === 'undefined') {
      parsedValue = undefined
    }

    setFormValues((prev) => ({ ...prev, [key]: parsedValue }))
  }

  useEffect(() => {
    handleChange('userId', id)
  }, [id])

  useEffect(() => {
    console.log(formValues)
  }, [formValues])

  return (
    <div className="metin2-add-server">
      <span className="title">Metin2 Sunucu Ekleme Formu</span>
      <Box component="form" className="create-server-form">
        <Grid container spacing={2}>
          <Grid xs={4}>
            <TextField
              label="Kullanıcı id"
              variant="filled"
              fullWidth
              value={formValues.userId}
              disabled
            />
          </Grid>
          <Grid xs={3}>
            <TextField
              label="Sunucu adı"
              variant="filled"
              fullWidth
              required
              value={formValues.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </Grid>
          <Grid xs={3}>
            <FormControl fullWidth>
              <InputLabel id="level-select-label">
                {levels.isError ? 'Veriler yüklenemedi !' : 'Level *'}
              </InputLabel>
              <Select
                labelId="level-select-label"
                value={formValues.level || ''}
                variant="filled"
                label="Level"
                required
                onChange={(e) => handleChange('level', e.target.value)}
              >
                {levels.data &&
                  levels.data.data.map((level) => (
                    <MenuItem value={level.id} key={level.id}>
                      {level.name} Level
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={2}>
            <FormControl fullWidth>
              <InputLabel id="dropClient-select-label">Drop Client *</InputLabel>
              <Select
                labelId="dropClient-select-label"
                value={formValues.dropClient || ''}
                variant="filled"
                label="Drop Client"
                required
                onChange={(e) => handleChange('dropClient', e.target.value)}
              >
                <MenuItem value={1}>1 Client</MenuItem>
                <MenuItem value={2}>2 Client</MenuItem>
                <MenuItem value={3}>3 Client</MenuItem>
                <MenuItem value={3}>4 Client</MenuItem>
                <MenuItem value={3}>5 Client</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid xs={3}>
            <FormControl fullWidth>
              <InputLabel id="autoBoss-select-label">Oto boss çağırma</InputLabel>
              <Select
                labelId="autoBoss-select-label"
                value={String(formValues.autoBoss) || ''}
                variant="filled"
                label="Auto Boss"
                onChange={(e) => parseBooleanhandleChange('autoBoss', e.target.value)}
              >
                <MenuItem value="true">Var</MenuItem>
                <MenuItem value="false">Yok</MenuItem>
                <MenuItem value="undefined">Bilinmiyor</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={3}>
            <FormControl fullWidth>
              <InputLabel id="battlepass-select-label">Battlepass</InputLabel>
              <Select
                labelId="battlepass-select-label"
                value={String(formValues.battlepass) || ''}
                variant="filled"
                label="Battlepass"
                onChange={(e) => parseBooleanhandleChange('battlepass', e.target.value)}
              >
                <MenuItem value="true">Var</MenuItem>
                <MenuItem value="false">Yok</MenuItem>
                <MenuItem value="undefined">Bilinmiyor</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={3}>
            <FormControl fullWidth>
              <InputLabel id="legalSale-select-label">Legal Satış</InputLabel>
              <Select
                labelId="legalSale-select-label"
                value={String(formValues.legalSale) || ''}
                variant="filled"
                label="Legal Satış"
                onChange={(e) => parseBooleanhandleChange('legalSale', e.target.value)}
              >
                <MenuItem value="true">İzin veriliyor</MenuItem>
                <MenuItem value="false">Yasak</MenuItem>
                <MenuItem value="undefined">Bilinmiyor</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={3}>
            <FormControl fullWidth>
              <InputLabel id="ownSalesSystem-select-label">Satış sistemi</InputLabel>
              <Select
                labelId="ownSalesSystem-select-label"
                value={String(formValues.ownSalesSystem) || ''}
                variant="filled"
                label="Satış sistemi"
                onChange={(e) =>
                  parseBooleanhandleChange('ownSalesSystem', e.target.value)
                }
              >
                <MenuItem value="true">Kendi satış sistemi var</MenuItem>
                <MenuItem value="false">Başka siteler üzerinden</MenuItem>
                <MenuItem value="undefined">Bilinmiyor</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid xs={3}>
            <FormControl fullWidth>
              <InputLabel id="simya-select-label">Simya sistemi</InputLabel>
              <Select
                labelId="simya-select-label"
                value={String(formValues.simya) || ''}
                variant="filled"
                label="Simya sistemi"
                onChange={(e) => parseBooleanhandleChange('simya', e.target.value)}
              >
                <MenuItem value="true">Var</MenuItem>
                <MenuItem value="false">Yok</MenuItem>
                <MenuItem value="undefined">Bilinmiyor</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={3}>
            <FormControl fullWidth>
              <InputLabel id="kuleFarm-select-label">Kule Farmı</InputLabel>
              <Select
                labelId="kuleFarm-select-label"
                value={String(formValues.kuleFarm) || ''}
                variant="filled"
                label="Kule Farmı"
                onChange={(e) => parseBooleanhandleChange('kuleFarm', e.target.value)}
              >
                <MenuItem value="true">Var</MenuItem>
                <MenuItem value="false">Yok</MenuItem>
                <MenuItem value="undefined">Bilinmiyor</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={3}>
            <FormControl fullWidth>
              <InputLabel id="singleStoreyDungeon-select-label">
                Zindan Sistemi
              </InputLabel>
              <Select
                labelId="singleStoreyDungeon-select-label"
                value={String(formValues.singleStoreyDungeon) || ''}
                variant="filled"
                label="Zindan Sistemi"
                onChange={(e) =>
                  parseBooleanhandleChange('singleStoreyDungeon', e.target.value)
                }
              >
                <MenuItem value="false">Oldschool sistem</MenuItem>
                <MenuItem value="true">Tek kat zindan</MenuItem>
                <MenuItem value="undefined">Bilinmiyor</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={3}>
            <FormControl fullWidth>
              <InputLabel id="dolunayKdp-select-label">Dolunay & Kdp</InputLabel>
              <Select
                labelId="dolunayKdp-select-label"
                value={String(formValues.dolunayKdp) || ''}
                variant="filled"
                label="Dolunay & Kdp"
                onChange={(e) => parseBooleanhandleChange('dolunayKdp', e.target.value)}
              >
                <MenuItem value="true">NPC 'den alınabilir</MenuItem>
                <MenuItem value="false">Düşürmeli</MenuItem>
                <MenuItem value="undefined">Bilinmiyor</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid xs={3}>
            <TextField
              label="Website"
              placeholder="https://servername.com"
              variant="filled"
              fullWidth
              value={formValues.website || ''}
              onChange={(e) => handleChange('website', e.target.value)}
            />
          </Grid>
          <Grid xs={3}>
            <TextField
              label="Discord"
              placeholder="Sadece pathname"
              variant="filled"
              fullWidth
              value={formValues.discord || ''}
              onChange={(e) => handleChange('discord', e.target.value)}
            />
          </Grid>
          <Grid xs={3}>
            <FormControl fullWidth>
              <InputLabel id="efsunlar-select-label">
                {efsunlar.isError ? 'Veriler yüklenemedi !' : 'Efsunlar'}
              </InputLabel>
              <Select
                labelId="efsunlar-select-label"
                variant="filled"
                label="Efsunlar"
                multiple
                value={formValues.efsunlar || []}
                onChange={(e) => handleChange('efsunlar', e.target.value)}
              >
                {efsunlar.data &&
                  efsunlar.data.data.map((efsun) => (
                    <MenuItem value={efsun.id} key={efsun.id}>
                      {efsun.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={3}>
            <FormControl fullWidth>
              <InputLabel id="bosses-select-label">
                {efsunlar.isError ? 'Veriler yüklenemedi !' : 'Bosslar'}
              </InputLabel>
              <Select
                labelId="bosses-select-label"
                variant="filled"
                label="Bosslar"
                multiple
                value={formValues.bosses || []}
                onChange={(e) => handleChange('bosses', e.target.value)}
              >
                {bosses.data &&
                  bosses.data.data.map((boss) => (
                    <MenuItem value={boss.id} key={boss.id}>
                      {boss.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

// <Grid xs={12}>
//             <FormControlLabel
//               required
//               control={
//                 <Switch
//                   onChange={(e) => handleChange('status', e.target.checked)}
//                   value={formValues.status}
//                   disabled
//                 />
//               }
//               label="Sunucuyu yayına al"
//             />
//           </Grid>
//           <Grid xs={12}>
//             <FormControlLabel
//               required
//               control={
//                 <Switch
//                   onChange={(e) => handleChange('autoHunt', e.target.checked)}
//                   value={formValues.autoHunt}
//                 />
//               }
//               label="Oto av ?"
//             />
//           </Grid>

// <Grid xs={3}>
//   <div className="opening-time">
//     <span className="label-text">Açılış tarihi *</span>
//     <DatePicker
//       locale={tr}
//       dateFormat="dd MMMM yyyy HH:mm"
//       timeFormat="HH:mm"
//       className="openingdate-input"
//       dayClassName={() => 'openingdate-popup-day'}
//       popperClassName="openingdate-picker-popup"
//       placeholderText="Açılış tarihi"
//       timeInputLabel="Saat:"
//       closeOnScroll
//       showTimeInput
//       isClearable
//       inline
//       required
//       selected={formValues.openingDate}
//       onChange={(date) => {
//         handleChange('openingDate', date)
//       }}
//     />
//   </div>
// </Grid>

export default Metin2AddServer
