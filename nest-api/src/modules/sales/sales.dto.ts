import { IsDate, IsInt, IsOptional, IsUUID, Max, Min } from "class-validator";
import type { ClientId } from "../clients/client.entity";
import type { BookId } from "../books/entities/book.entity";

export class CreateSaleDTO {
  @IsUUID(4)
  clientId: ClientId;

  @IsUUID(4)
  bookId: BookId;

  @IsDate()
  date: Date;
}

export class GetSalesDTO {
  @IsInt()
  @Min(0)
  @Max(100)
  limit: number;

  @IsInt()
  @Min(0)
  offset: number;

  @IsUUID(4)
  @IsOptional()
  clientId?: ClientId;

  @IsUUID(4)
  @IsOptional()
  bookId?: BookId;
}
