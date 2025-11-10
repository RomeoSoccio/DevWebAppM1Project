import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity, ClientId } from './client.entity';
import { DataSource, Repository } from 'typeorm';
import {
  ClientModel,
  CreateClientModel,
  FilterClientsModel,
  UpdateClientModel,
} from './client.model';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async getAllClients(
    input?: FilterClientsModel,
  ): Promise<[ClientModel[], number]> {
    const [clients, totalCount] = await this.clientRepository.findAndCount({
      take: input?.limit,
      skip: input?.offset,
      order: input?.sort,
    });
    return [clients, totalCount];
  }

  public async getClientById(id: string): Promise<ClientModel | undefined> {
    const client = await this.clientRepository.findOne({
      where: { id: id as ClientId },
    });

    if (!client) {
      return undefined;
    }

    return client;
  }
  public async createClient(client: CreateClientModel): Promise<ClientModel> {
    return this.clientRepository.save(this.clientRepository.create(client));
  }

  public async updateClient(
    id: string,
    client: UpdateClientModel,
  ): Promise<ClientModel | undefined> {
    const oldClient = await this.getClientById(id);
    if (!oldClient) {
      return undefined;
    }
    await this.clientRepository.update(id, client);
  }

  public async deleteClient(id: string): Promise<void> {
    await this.clientRepository.delete(id);
  }

  public async deleteClients(ids: string[]): Promise<void> {
    await this.dataSource.transaction(async (transactionalEntityManager) => {
      await Promise.all(
        ids.map((id) =>
          transactionalEntityManager.delete(ClientEntity, { id }),
        ),
      );
    });
  }
}
