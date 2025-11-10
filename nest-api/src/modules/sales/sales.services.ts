import { Injectable } from '@nestjs/common';
import { SaleRepository } from './sales.repository';
import { CreateSaleModel, FilterSaleModel, SaleModel } from './sales.model';

@Injectable()
export class SaleService {
  constructor(private readonly saleRepository: SaleRepository) {}

  public async getAllSales(
    input?: FilterSaleModel,
  ): Promise<[SaleModel[], number]> {
    return this.saleRepository.getAllSales(input);
  }

  public async createSale(sale: CreateSaleModel): Promise<SaleModel> {
    return this.saleRepository.createSale(sale);
  }

  public async deleteSale(id: string): Promise<void> {
    await this.saleRepository.deleteSale(id);
  }
}
