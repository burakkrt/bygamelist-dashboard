import { ButtonProps } from '@mui/material'
import { IconTypes } from '@/components/base/icon/types'

export interface IButtonProps extends ButtonProps {
  children: React.ReactNode
  beforeIcon?: IconTypes
  afterIcon?: IconTypes
  isLoading?: boolean
}
