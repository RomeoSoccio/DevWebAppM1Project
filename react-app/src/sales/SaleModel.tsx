import type { ClientModel } from '../clients/ClientModel'
import type { BookModel } from '../books/BookModel'

export type SaleModel = {
  id: string
  date: Date
  clientId: string
  bookId: string
  client: ClientModel
  book: BookModel
}

export type CreateSaleModel = {
  clientId: string
  bookId: string
  date: Date
}

export type FilterSaleModel = {
  limit: number
  offset: number
  clientId?: string
  bookId?: string
}

export type GetSalesModel = {
  totalCount: number
  data: SaleModel[]
}
