export interface IMeta {
  page?: number
  pageSize?: number
  total?: number
  totalPages?: number
  timestamp?: string
}

export interface IUser {
  id: string
  name: string
  surname: string
  phoneNumber?: string
  email: string
}

export interface ILevel {
  id?: string
  name: string
}

export interface IBosses {
  id?: string
  name: string
}

export interface IEfsunlar {
  id?: string
  name: string
  description?: string
}

export interface ITeam {
  owners?: Array<string>
  comas?: Array<string>
  teamLeaders?: Array<string>
  gameAdmins?: Array<string>
  gameMasters?: Array<string>
}

export interface IServer {
  id?: string
  name?: string
  openingDate?: string
  dropClient?: number
  autoHunt?: boolean
  legalSale?: boolean
  bosses?: Array<IBosses>
  efsunlar?: Array<IEfsunlar>
  team?: ITeam
  createdAt?: string
  updatedAt?: string
  level?: ILevel
  status?: boolean
}

export interface IServerStatus {
  id?: string
  name?: string
  openingDate?: string
  status?: boolean
}

// FETCHER RESPONSE TYPES
export interface IGetServers {
  data: Array<IServer>
  meta: IMeta
}

export interface IPostUserLogin {
  data: Array<{ token: string; user: IUser }>
  meta: IMeta
}

export interface IGetLevels {
  data: Array<ILevel>
  meta: IMeta
}

export interface IGetEfsunlar {
  data: Array<IEfsunlar>
  meta: IMeta
}

export interface IGetBosses {
  data: Array<IBosses>
  meta: IMeta
}

export interface IGetServersStatus {
  data: Array<IServerStatus>
  meta: IMeta
}
