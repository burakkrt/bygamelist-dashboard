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
import { IDialog, IDialogTypes, IInitialDialog, IMetin2DraftListCardProps } from './types'

const liveActionDialog: IInitialDialog = {
  title: 'Sunucu yayınlansın mı ?',
  text: "Bu işlemden sonra sunucu yayına alınacak. Bu işlemi yapmadan önce tüm bilgilerin doğru olduğundan emin ol. Eğer bir şeyler yanlış giderse tekrar sunucuyu taslak 'a çevirebilirsin.",
}

const draftActionDialog: IInitialDialog = {
  title: 'Sunucu taslağa alınsın mı ?',
  text: 'Bu işlemden sonra sunucu yayından kaldırılıp taslak olarak kaydedilecek. Taslak sürecinde düzenleyebilir ve tekrar yayına alabilirsin.',
}

function Metin2DraftListCard({ data }: IMetin2DraftListCardProps) {
  const [dialog, setDialog] = React.useState<IDialog>({
    ...liveActionDialog,
    isOpen: false,
  })
  const { id, name, openingDate, status } = data
  const router = useRouter()

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

  const openDialog = (type: IDialogTypes) => {
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
            onClick={() => openDialog('draft')}
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
              onClick={() => openDialog('live')}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained" color="error">
            Vazgeç
          </Button>
          <Button
            onClick={handleCloseDialog}
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
