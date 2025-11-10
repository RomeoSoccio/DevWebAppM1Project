import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from '../books/entities/book.entity';
import { ClientEntity } from '../clients/client.entity';
import { SaleEntity } from './sales.entity';
import { SaleRepository } from './sales.repository';
import { SaleService } from './sales.services';
import { Module } from '@nestjs/common';
import { SaleController } from './sales.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SaleEntity, ClientEntity, BookEntity])],
  controllers: [SaleController],
  providers: [SaleRepository, SaleService],
})
export class SaleModule {}
