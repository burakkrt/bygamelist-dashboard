import { IMetin2ListFilter } from '@/components/pages/page-metin2/types'

export interface IMetin2ListFilterProps {
  filterValues: IMetin2ListFilter
  setFilterValues: React.Dispatch<React.SetStateAction<IMetin2ListFilter>>
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  isSubmitLoading?: boolean
  className?: string
}
