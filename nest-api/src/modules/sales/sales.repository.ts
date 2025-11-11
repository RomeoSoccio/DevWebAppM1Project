import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleEntity } from './sales.entity';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { CreateSaleModel, FilterSaleModel, SaleModel } from './sales.model';
import { ClientEntity } from '../clients/client.entity';
import { BookEntity } from '../books/entities/book.entity';
import { AuthorId } from '../authors/author.entity';

@Injectable()
export class SaleRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
    @InjectRepository(SaleEntity)
    private readonly saleRepository: Repository<SaleEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async getAllSales(
    input?: FilterSaleModel,
  ): Promise<[SaleModel[], number]> {
    const where: Record<string, any> = {};
    if (input?.clientId) {
      where.client = { id: input.clientId };
    }
    if (input?.bookId) {
      where.book = { id: input.bookId };
    }

    const [sales, totalCount] = await this.saleRepository.findAndCount({
      where: Object.keys(where).length ? where : undefined,
      take: input?.limit,
      skip: input?.offset,
      relations: ['client', 'book'],
    });
    return [sales, totalCount];
  }

  public async createSale(sale: CreateSaleModel): Promise<SaleModel> {
    const client = await this.clientRepository.findOne({
      where: { id: sale.clientId },
    });

    if (!client) {
      throw new Error('Client not found');
    }

    const book = await this.bookRepository.findOne({
      where: { id: sale.bookId },
    });

    if (!book) {
      throw new Error('Book not found');
    }

    return this.saleRepository.save(this.saleRepository.create(sale));
  }

  public async deleteSale(id: string): Promise<void> {
    await this.saleRepository.delete(id);
  }

  public async getSalesCountsByAuthor(authorId: string): Promise<
    {
      bookId: string;
      salesCount: number;
    }[]
  > {
    const rows = await this.saleRepository
      .createQueryBuilder('sale')
      .innerJoin('sale.book', 'book')
      .select('book.id', 'bookId')
      .addSelect('COUNT(sale.id)', 'salesCount')
      .where('book.authorId = :authorId', { authorId })
      .groupBy('book.id')
      .getRawMany<{
        bookId: string;
        salesCount: string | number;
      }>();

    return rows.map((r) => ({
      bookId: r.bookId,
      salesCount: Number(r.salesCount),
    }));
  }

  public async getSalesSummaryByAuthor(authorId: string): Promise<{
    salesByBook: { bookId: string; salesCount: number }[];
    totalBooks: number;
    totalSales: number;
    averageSalesPerBook: number;
  }> {
    const salesByBook = await this.getSalesCountsByAuthor(authorId);
    const totalSales = salesByBook.reduce(
      (acc, cur) => acc + cur.salesCount,
      0,
    );
    const totalBooks = await this.bookRepository.count({
      where: { authorId: authorId as AuthorId },
    });
    const averageSalesPerBook = totalBooks === 0 ? 0 : totalSales / totalBooks;

    return { salesByBook, totalBooks, totalSales, averageSalesPerBook };
  }
}
