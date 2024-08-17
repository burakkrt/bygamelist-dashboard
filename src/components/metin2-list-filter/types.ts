export interface IMetin2ListFilter {
  name: string
  id: string
  status: 'all' | 'true' | 'false'
}

export interface IMetin2ListFilterProps {
  className?: string
}
