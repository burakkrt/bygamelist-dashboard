export interface ITeam {
  owners?: Array<string>
  comas?: Array<string>
  teamLeaders?: Array<string>
  gameAdmins?: Array<string>
  gameMasters?: Array<string>
}

export interface ITeamIClipInput {
  owners: string
  comas: string
  teamLeaders: string
  gameAdmins: string
  gameMasters: string
}

export interface IFormValuesAddServerFrom {
  userId: string
  status: boolean
  name: string
  level: string
  openingDate: string
  autoHunt: boolean
  legalSale: boolean
  dropClient: number
  autoBoss?: boolean
  battlepass?: boolean
  dolunayKdp?: boolean
  simya?: boolean
  kuleFarm?: boolean
  discord?: string
  website?: string
  singleStoreyDungeon?: boolean
  ownSalesSystem?: boolean
  efsunlar?: Array<string>
  bosses?: Array<string>
  team?: ITeam
}

export interface IMetin2AddServerProps {}
