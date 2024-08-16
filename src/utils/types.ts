export interface IUser {
  id: string
  name: string
  surname: string
  phoneNumber?: string
  email: string
}

export interface IPostUserLogin {
  data: Array<{ token: string; user: IUser }>
  success: boolean
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
  owner?: string
  name: string
}

export interface ITeam {
  owners?: Array<string>
  comas?: Array<string>
  teamLeaders?: Array<string>
  gameAdmins?: Array<string>
  gameMasters?: Array<string>
}

export interface IServer {
  id: string
  name: string
  openingDate: string
  dropClient?: number
  autoHunt?: boolean
  bosses?: Array<IBosses>
  efsunlar?: Array<IEfsunlar>
  team?: Array<ITeam>
  createdAt?: string
  updatedAt?: string
  level: ILevel
}

export interface IGetServers {
  data: Array<IServer>
  success: boolean
}
