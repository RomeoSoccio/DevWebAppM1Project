export type ClientModel = {
  id: string
  firstName: string
  lastName: string
  email?: string
  photoUrl?: string
}

export type CreateClientModel = {
  firstName: string
  lastName: string
  email?: string
  photoUrl?: string
}

export type UpdateClientModel = Partial<CreateClientModel>
export type UpdateClientModel = Partial<CreateClientModel>

export type GetClientsModel = {
  totalCount: number
  data: ClientModel[]
}
  totalCount: number
  data: ClientModel[]
}

export type FilterClientsModel = {
  limit: number
  offset: number
  sort?: Partial<Record<keyof ClientModel, 'ASC' | 'DESC'>>
}
  limit: number
  offset: number
  sort?: Partial<Record<keyof ClientModel, 'ASC' | 'DESC'>>
}
