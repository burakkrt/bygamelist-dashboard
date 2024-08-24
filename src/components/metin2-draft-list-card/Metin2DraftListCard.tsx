import React from 'react'
import moment from 'moment'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import Button from '@/components/base/button'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import fetcher from '@/utils/services/fetcher'
import useUserStore from '@/store/useStore'
import { IDialog, IDialogTypes, IInitialDialog, IMetin2DraftListCardProps } from './types'

const liveActionDialog: IInitialDialog = {
  actionType: 'live',
  title: 'Sunucu yayınlansın mı ?',
  text: "Bu işlemden sonra sunucu yayına alınacak. Bu işlemi yapmadan önce tüm bilgilerin doğru olduğundan emin ol. Eğer bir şeyler yanlış giderse tekrar sunucuyu taslak 'a çevirebilirsin.",
}

const draftActionDialog: IInitialDialog = {
  actionType: 'draft',
  title: 'Sunucu taslağa alınsın mı ?',
  text: 'Bu işlemden sonra sunucu yayından kaldırılıp taslak olarak kaydedilecek. Taslak sürecinde düzenleyebilir ve tekrar yayına alabilirsin.',
}

function Metin2DraftListCard({ data }: IMetin2DraftListCardProps) {
  const [dialog, setDialog] = React.useState<IDialog>({
    ...liveActionDialog,
    isOpen: false,
  })
  const { id, name, openingDate, status } = data
  const { token } = useUserStore()
  const router = useRouter()
  const queryClient = useQueryClient()

  const updateStatus = useMutation({
    mutationFn: () =>
      fetcher({
        endpoint: `v1/server/${id}`,
        method: 'PATCH',
        token,
        body: { status: !status },
      }),
    onSuccess: () => {},
  })

  const handleRouteServerPage = (serverId?: string) => {
    if (serverId) {
      router.push(`/games/metin2/server?id=${serverId}`)
    } else {
      toast.error('İlgili serverin id bilgisi bulunamadı.')
    }
  }

  const handleCloseDialog = () => {
    setDialog((prev) => ({ ...prev, isOpen: false }))
  }

  const handleOpenDialog = (type: IDialogTypes) => {
    switch (type) {
      case 'live':
        setDialog({ ...liveActionDialog, isOpen: true })
        break
      case 'draft':
        setDialog({ ...draftActionDialog, isOpen: true })
        break
      default:
        break
    }
  }

  const handleChanceStatus = () => {
    updateStatus.mutate(undefined, {
      onSuccess: () => {
        handleCloseDialog()
        toast.success(`${name} adlı sunucu ${!status ? 'Yayına' : 'Taslağa'} alındı.`)
        queryClient.invalidateQueries({ queryKey: ['serverlist-status'] })
      },
      onError: (error) => {
        if (dialog.isOpen) {
          handleCloseDialog()
        }
        toast.error(`${error.message}. Sunucu : ${name}`)
      },
    })
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
            onClick={() => handleOpenDialog('draft')}
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
              onClick={() => handleOpenDialog('live')}
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
      <Dialog
        open={dialog.isOpen}
        onClose={handleCloseDialog}
        aria-labelledby="draft-dialog-title"
        aria-describedby="draft-dialog-description"
        className="draft-list-action-dialog"
      >
        {dialog?.title && (
          <DialogTitle className="draft-dialog-title">{dialog.title}</DialogTitle>
        )}

        <DialogContent>
          <DialogContentText className="draft-dialog-text">
            {dialog.text}
          </DialogContentText>
          <DialogContentText component="div" className="server-draft-modal-infos">
            <span className="server-infos-title">İşlem yapılacak sunucu</span>
            <ul className="info-list">
              <li className="info-list-item">
                <span className="title">Sunucu ID</span>
                <span className="value">{id}</span>
              </li>
              <li className="info-list-item">
                <span className="title">Sunucu İsmi</span>
                <span className="value">{name}</span>
              </li>
              <li className="info-list-item">
                <span className="title">Sunucu Durumu</span>
                <span className="value">
                  {status ? (
                    <>
                      <s>Yayında</s> {'>'} <span className="new-status">Taslak</span>
                    </>
                  ) : (
                    <>
                      <s>Taslak</s> {'>'} <span className="new-status">Yayında</span>
                    </>
                  )}
                </span>
              </li>
              <li className="info-list-item">
                <span className="title">Sunucu Açılış Tarihi</span>
                <span className="value">
                  {moment.utc(openingDate).local().format('DD MMMM YYYY HH:mm')}
                </span>
              </li>
            </ul>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained" color="error">
            Vazgeç
          </Button>
          <Button
            onClick={handleChanceStatus}
            autoFocus
            variant="contained"
            color="success"
          >
            Tamamla
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Metin2DraftListCard
