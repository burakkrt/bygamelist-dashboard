import { IServerStatus } from '@/utils/types'

export type IDialogTypes = 'live' | 'draft'

export interface IDialog {
  isOpen: boolean
  actionType: IDialogTypes
  title?: string
  text: string
}

export type IInitialDialog = Omit<IDialog, 'isOpen'>

export interface IMetin2DraftListCardProps {
  data: IServerStatus
}
