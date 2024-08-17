export interface IMetin2ListFilter {
  name: string
  id: string
  status: 'all' | 'live' | 'draft'
}

export interface IMetin2ListFilterProps {
  className?: string
}
