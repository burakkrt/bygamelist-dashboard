import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'
import { tr } from 'date-fns/locale'
import classNames from 'classnames'
import Grid from '@mui/material/Unstable_Grid2'
import useUserStore from '@/store/useStore'
import { useMutation, useQuery } from '@tanstack/react-query'
import fetcher from '@/utils/services/fetcher'
import Button from '@/components/base/button'
import Icon from '@/components/base/icon'
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { IGetBosses, IGetEfsunlar, IGetLevels } from '@/utils/types'
import { IFormValuesAddServerFrom, IMetin2AddServerProps } from './types'

function Metin2AddServer({}: IMetin2AddServerProps) {
  const initialFormValues: IFormValuesAddServerFrom = {
    userId: '',
    status: false,
    name: '',
    level: '',
    autoHunt: false,
    dropClient: 1,
    openingDate: '',
    autoBoss: undefined,
    battlepass: undefined,
    legalSale: false,
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
  const [formValues, setFormValues] =
    useState<IFormValuesAddServerFrom>(initialFormValues)
  const { id, token: userToken } = useUserStore()

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

  const createServer = useMutation({
    mutationFn: () =>
      fetcher({
        endpoint: 'v1/server',
        method: 'POST',
        token: userToken,
        body: {
          ...formValues,
          openingDate: moment(formValues.openingDate).format(),
        },
      }),
    onSuccess: (data) => {
      setFormValues({ ...initialFormValues, userId: id })
      toast.success(
        `Sunucu oluşturuldu ve ${data.data[0].status ? 'Yayınlandı.' : 'Taslak olarak kaydedildi'}`
      )
    },
    onError: (err) => {
      toast.error(err.message)
      console.log(err)
    },
  })

  const handleChange = (key: keyof IFormValuesAddServerFrom, value: any) => {
    setFormValues((prev) => ({ ...prev, [key]: value }))
  }

  const parseBooleanhandleChange = (
    key: keyof IFormValuesAddServerFrom,
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

  const isValueEmpty = (key: keyof IFormValuesAddServerFrom): string => {
    const stateValue = formValues[key]

    if (
      stateValue === undefined ||
      (Array.isArray(stateValue) && stateValue.length === 0) ||
      stateValue === ''
    ) {
      return 'empty'
    }

    return 'not-empty'
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    createServer.mutate()
  }

  useEffect(() => {
    handleChange('userId', id)
  }, [id])

  useEffect(() => {
    console.log(formValues)
  }, [formValues])

  return (
    <div className="metin2-add-server">
      <Grid container spacing={2}>
        <Grid xs={6}>
          <Box component="form" className="create-server-form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <span className="title">Metin2 Sunucu Ekleme Formu</span>
              </Grid>
              {/* kullanıcı id */}
              <Grid xs={12}>
                <TextField
                  label="Kullanıcı id"
                  variant="filled"
                  fullWidth
                  disabled
                  value={formValues.userId}
                  onChange={(e) => handleChange('userId', e.target.value)}
                  className={classNames(isValueEmpty('userId'))}
                />
              </Grid>
              {/* sunucu adı */}
              <Grid xs={12}>
                <TextField
                  label="Sunucu adı"
                  variant="filled"
                  fullWidth
                  required
                  value={formValues.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={classNames(isValueEmpty('name'))}
                />
              </Grid>
              {/* paylaşım durumu, oto av, level, drop client */}
              <Grid xs={6}>
                <div>
                  <Grid container spacing={2}>
                    {/* paylaşım durumu */}
                    <Grid xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="status-select-label">
                          Paylaşım durumu *
                        </InputLabel>
                        <Select
                          labelId="status-select-label"
                          value={String(formValues.status) || ''}
                          variant="filled"
                          label="Paylaşım durumu"
                          required
                          onChange={(e) =>
                            parseBooleanhandleChange('status', e.target.value)
                          }
                          className={classNames(isValueEmpty('autoHunt'))}
                        >
                          <MenuItem value="true">Yayınla</MenuItem>
                          <MenuItem value="false">Taslak olarak kaydet</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {/* drop client */}
                    <Grid xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="dropClient-select-label">
                          Drop Client *
                        </InputLabel>
                        <Select
                          labelId="dropClient-select-label"
                          value={formValues.dropClient || ''}
                          variant="filled"
                          label="Drop Client"
                          required
                          onChange={(e) => handleChange('dropClient', e.target.value)}
                          className={classNames(isValueEmpty('dropClient'))}
                        >
                          <MenuItem value={1}>1 Client</MenuItem>
                          <MenuItem value={2}>2 Client</MenuItem>
                          <MenuItem value={3}>3 Client</MenuItem>
                          <MenuItem value={3}>4 Client</MenuItem>
                          <MenuItem value={3}>5 Client</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {/* legal satış */}
                    <Grid xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id="legalSale-select-label">Legal Satış *</InputLabel>
                        <Select
                          labelId="legalSale-select-label"
                          value={String(formValues.legalSale) || ''}
                          variant="filled"
                          label="Legal Satış"
                          required
                          onChange={(e) =>
                            parseBooleanhandleChange('legalSale', e.target.value)
                          }
                          className={classNames(isValueEmpty('legalSale'))}
                        >
                          <MenuItem value="true">Var</MenuItem>
                          <MenuItem value="false">Yok</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {/* oto av */}
                    <Grid xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id="autoHunt-select-label">Oto av *</InputLabel>
                        <Select
                          labelId="autoHunt-select-label"
                          value={String(formValues.autoHunt) || ''}
                          variant="filled"
                          label="Oto av"
                          required
                          onChange={(e) =>
                            parseBooleanhandleChange('autoHunt', e.target.value)
                          }
                          className={classNames(isValueEmpty('autoHunt'))}
                        >
                          <MenuItem value="true">Var</MenuItem>
                          <MenuItem value="false">Yok</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {/* level */}
                    <Grid xs={12}>
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
                          className={classNames(isValueEmpty('level'))}
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
                  </Grid>
                </div>
              </Grid>
              {/* açılış tarihi */}
              <Grid xs={6}>
                <Grid xs={3}>
                  <div className="opening-time">
                    <DatePicker
                      locale={tr}
                      dateFormat="dd MMMM yyyy HH:mm"
                      timeFormat="HH:mm"
                      className="openingdate-input"
                      dayClassName={() => 'openingdate-popup-day'}
                      popperClassName="openingdate-picker-popup"
                      placeholderText="Açılış tarihi"
                      timeInputLabel="Saat:"
                      closeOnScroll
                      showTimeInput
                      isClearable
                      inline
                      required
                      selected={
                        formValues.openingDate !== ''
                          ? moment(formValues.openingDate).toDate()
                          : null
                      }
                      onChange={(date) => {
                        handleChange('openingDate', moment(date).toISOString())
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
              {/* website */}
              <Grid xs={12}>
                <TextField
                  label="Website"
                  placeholder="https://servername.com"
                  variant="filled"
                  fullWidth
                  value={formValues.website || ''}
                  onChange={(e) => handleChange('website', e.target.value)}
                  className={classNames(isValueEmpty('website'))}
                />
              </Grid>
              {/* discord */}
              <Grid xs={12}>
                <TextField
                  label="Discord"
                  placeholder="Sadece pathname"
                  variant="filled"
                  fullWidth
                  value={formValues.discord || ''}
                  onChange={(e) => handleChange('discord', e.target.value)}
                  className={classNames(isValueEmpty('discord'))}
                />
              </Grid>
              {/* oto boss */}
              <Grid xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="autoBoss-select-label">Oto boss çağırma</InputLabel>
                  <Select
                    labelId="autoBoss-select-label"
                    value={String(formValues.autoBoss) || ''}
                    variant="filled"
                    label="Auto Boss"
                    onChange={(e) => parseBooleanhandleChange('autoBoss', e.target.value)}
                    className={classNames(isValueEmpty('autoBoss'))}
                  >
                    <MenuItem value="true">Var</MenuItem>
                    <MenuItem value="false">Yok</MenuItem>
                    <MenuItem value="undefined">Bilinmiyor</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* battlepass */}
              <Grid xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="battlepass-select-label">Battlepass</InputLabel>
                  <Select
                    labelId="battlepass-select-label"
                    value={String(formValues.battlepass) || ''}
                    variant="filled"
                    label="Battlepass"
                    onChange={(e) =>
                      parseBooleanhandleChange('battlepass', e.target.value)
                    }
                    className={classNames(isValueEmpty('battlepass'))}
                  >
                    <MenuItem value="true">Var</MenuItem>
                    <MenuItem value="false">Yok</MenuItem>
                    <MenuItem value="undefined">Bilinmiyor</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* satış sistemi */}
              <Grid xs={6}>
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
                    className={classNames(isValueEmpty('ownSalesSystem'))}
                  >
                    <MenuItem value="true">Kendi satış sistemi var</MenuItem>
                    <MenuItem value="false">Başka siteler üzerinden</MenuItem>
                    <MenuItem value="undefined">Bilinmiyor</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* simya sistemi */}
              <Grid xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="simya-select-label">Simya sistemi</InputLabel>
                  <Select
                    labelId="simya-select-label"
                    value={String(formValues.simya) || ''}
                    variant="filled"
                    label="Simya sistemi"
                    onChange={(e) => parseBooleanhandleChange('simya', e.target.value)}
                    className={classNames(isValueEmpty('simya'))}
                  >
                    <MenuItem value="true">Var</MenuItem>
                    <MenuItem value="false">Yok</MenuItem>
                    <MenuItem value="undefined">Bilinmiyor</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* kule farmı */}
              <Grid xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="kuleFarm-select-label">Kule Farmı</InputLabel>
                  <Select
                    labelId="kuleFarm-select-label"
                    value={String(formValues.kuleFarm) || ''}
                    variant="filled"
                    label="Kule Farmı"
                    onChange={(e) => parseBooleanhandleChange('kuleFarm', e.target.value)}
                    className={classNames(isValueEmpty('kuleFarm'))}
                  >
                    <MenuItem value="true">Var</MenuItem>
                    <MenuItem value="false">Yok</MenuItem>
                    <MenuItem value="undefined">Bilinmiyor</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* zindan sistemi */}
              <Grid xs={6}>
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
                    className={classNames(isValueEmpty('singleStoreyDungeon'))}
                  >
                    <MenuItem value="false">Oldschool sistem</MenuItem>
                    <MenuItem value="true">Tek kat zindan</MenuItem>
                    <MenuItem value="undefined">Bilinmiyor</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* dolunay&kdp */}
              <Grid xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="dolunayKdp-select-label">Dolunay & Kdp</InputLabel>
                  <Select
                    labelId="dolunayKdp-select-label"
                    value={String(formValues.dolunayKdp) || ''}
                    variant="filled"
                    label="Dolunay & Kdp"
                    onChange={(e) =>
                      parseBooleanhandleChange('dolunayKdp', e.target.value)
                    }
                    className={classNames(isValueEmpty('dolunayKdp'))}
                  >
                    <MenuItem value="true">NPC 'den alınabilir</MenuItem>
                    <MenuItem value="false">Düşürmeli</MenuItem>
                    <MenuItem value="undefined">Bilinmiyor</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* efsunlar */}
              <Grid xs={12}>
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
                    className={classNames(isValueEmpty('efsunlar'))}
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
              {/* bosslar */}
              <Grid xs={12}>
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
                    className={classNames(isValueEmpty('bosses'))}
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
              {/* form butonları */}
              <Grid xs={12}>
                <div className="form-action-buttons">
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    className="submit-btn"
                    disabled={createServer.isPending}
                  >
                    {createServer.isPending ? (
                      <Icon name="icon-spinner" />
                    ) : (
                      <Icon name="icon-checkmark" />
                    )}

                    <span>Sunucuyu Oluştur</span>
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    color="inherit"
                    className="clear-btn"
                    title="Formu temizle"
                    onClick={() => {
                      setFormValues({ ...initialFormValues, userId: id })
                      toast.info('Form temizlendi.')
                    }}
                  >
                    <Icon name="icon-clear" />
                    <span>Temizle</span>
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid xs={6}>
          <Grid xs={6}>
            <div>
              <Grid container spacing={2}>
                <Grid xs={12}>
                  <div className="rules">
                    <span className="rule-title">Dikkat edilmesi gereken hususlar</span>
                    <ul className="rule-list">
                      <li>Tüm bilgileri eksiksiz ve doğru bir şekilde giriniz.</li>
                      <li>* ile belirtilen alanlar zorunludur.</li>
                      <li>
                        Eğer bilinmiyor işaretli ise ilgili seçenek sunucu bilgisinde
                        gösterilmeyecektir.
                      </li>
                    </ul>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Metin2AddServer
