export type AuthorModel = {
  id: string
  firstName: string
  lastName: string
  // photoURL comes from the API, keep both optional for flexibility
  photoURL?: string
  // frontend computed
  booksCount?: number
}

export type CreateAuthorModel = {
  firstName: string
  lastName: string
  photoURL?: string
}

export type UpdateAuthorModel = Partial<CreateAuthorModel>

export type GetAuthorsModel = {
  totalCount: number
  data: AuthorModel[]
}

export type FilterAuthorsModel = {
  limit: number
  offset: number
  sort?: Partial<Record<keyof AuthorModel, 'ASC' | 'DESC'>>
}
