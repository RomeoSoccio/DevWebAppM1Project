import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { SaleService } from './sales.services';
import { CreateSaleDTO, GetSalesDTO } from './sales.dto';
import { GetSalesModel } from './sales.model';

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Get()
  async getSales(@Query() input: GetSalesDTO): Promise<GetSalesModel> {
    const [sales, totalCount] = await this.saleService.getAllSales({
      ...input,
    });

    return {
      data: sales,
      totalCount,
    };
  }

  @Post()
  createSale(@Body() createSaleDTO: CreateSaleDTO) {
    return this.saleService.createSale(createSaleDTO);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return this.saleService.deleteSale(id);
  }
}
