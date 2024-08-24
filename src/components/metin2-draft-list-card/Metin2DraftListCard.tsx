import React from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Button from '@/components/base/button'
import { IMetin2DraftListCardProps } from './types'

function Metin2DraftListCard({ data }: IMetin2DraftListCardProps) {
  const { id, name, openingDate, status } = data
  const router = useRouter()

  const handleRouteServerPage = (serverId?: string) => {
    if (serverId) {
      router.push(`/games/metin2/server?id=${serverId}`)
    } else {
      toast.error('İlgili serverin id bilgisi bulunamadı.')
    }
  }

  const handleLiveServer = () => {
    alert('yayınla')
  }

  const handleDraftServer = () => {
    alert('taslağa çek')
  }

  return (
    <div className="metin2-draft-list-card">
      <span className="name">{name}</span>
      <span className="id">{id}</span>
      <span className="date">
        {moment.utc(openingDate).local().format('DD MMMM YYYY HH:mm')}
      </span>
      <span className="status">{status ? 'Yayında' : 'Taslak'}</span>
      <div className="actions">
        {status ? (
          <Button
            type="button"
            variant="contained"
            size="small"
            color="secondary"
            onClick={handleDraftServer}
          >
            Taslağa çevir
          </Button>
        ) : (
          <>
            <Button
              type="button"
              variant="contained"
              size="small"
              color="success"
              onClick={handleLiveServer}
            >
              Yayına al
            </Button>
            <Button
              type="button"
              variant="contained"
              size="small"
              onClick={() => handleRouteServerPage(id)}
            >
              Düzenle
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

export default Metin2DraftListCard
