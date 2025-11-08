import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity, ClientId } from './client.entity';
import { CreateClientDto, UpdateClientDto } from './client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepo: Repository<ClientEntity>,
  ) {}

  async findAll(): Promise<ClientEntity[]> {
    return this.clientRepo.find();
  }

async findOne(id: ClientId): Promise<ClientEntity | null> {
  return this.clientRepo.findOne({
    where: { id },
    relations: ['achats', 'achats.book', 'achats.book.author'],
  });
  }

  async create(dto: CreateClientDto): Promise<ClientEntity> {
    const client = this.clientRepo.create(dto);
    return this.clientRepo.save(client);
  }

  async update(id: ClientId, dto: UpdateClientDto): Promise<ClientEntity | null> {
    await this.clientRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: ClientId): Promise<void> {
    await this.clientRepo.delete(id);
  }

}
