import { Module } from "@nestjs/common";
import { ClientController } from "./client.controller";
import { ClientService } from "./client.service";
import { ClientRepository } from "./client.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookEntity } from "../books/entities/book.entity";
import { AuthorEntity } from "../authors/author.entity";


@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, AuthorEntity])],
  controllers: [ClientController],
  providers: [ClientRepository, ClientService],
})
export class ClientModule {}
