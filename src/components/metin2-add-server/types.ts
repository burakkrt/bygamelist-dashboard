export interface IFormValuesAddUser {
  userId: string
  status: boolean
  name: string
  level: string
  openingDate: Date | undefined
  autoHunt: boolean
  dropClient: number
  autoBoss?: boolean
  battlepass?: boolean
  legalSale?: boolean
  dolunayKdp?: boolean
  simya?: boolean
  kuleFarm?: boolean
  discord?: string
  website?: string
  singleStoreyDungeon?: boolean
  ownSalesSystem?: boolean
  efsunlar?: Array<string>
  bosses?: Array<string>
}

export interface IMetin2AddServerProps {}
