import { BookId } from '../books/entities/book.entity';
import { ClientId } from '../clients/client.entity';

export type SaleModel = {
  id: string;
  clientId: ClientId;
  bookId: BookId;
  date: Date;
};

export type CreateSaleModel = {
  clientId: ClientId;
  bookId: BookId;
  date: Date;
};

export type FilterSaleModel = {
  limit: number;
  offset: number;
  clientId?: ClientId;
  bookId?: BookId;
};

export type GetSalesModel = {
  totalCount: number;
  data: SaleModel[];
};
