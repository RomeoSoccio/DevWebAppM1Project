import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  IsEmail,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  photoUrl: string;
}

export class UpdateClientDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

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
  nbLivresAchetes?: number;
}
