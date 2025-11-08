import { IsInt, IsOptional, IsString, Max, Min, IsEmail } from "class-validator";

export class CreateClientDto {
  @IsString()
  prenom: string;

  @IsString()
  nom: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;
}

export class UpdateClientDto {
  @IsOptional()
  @IsString()
  prenom?: string;

  @IsOptional()
  @IsString()
  nom?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;
}

export class GetClientsDto {
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number;

  @IsInt()
  @Min(0)
  offset: number;

  @IsOptional()
  @IsString()
  sort?: string;
}

export class ClientDto {
  id: number;
  prenom: string;
  nom: string;
  email?: string;
  photoUrl?: string;
  nbLivresAchetes?: PurchasedBookDto[];
}

export class PurchasedBookDto {
  titre: string;
  auteur: string;
  dateAchat: string; 
}
