import { Injectable } from "@nestjs/common";
import { ClientRepository } from "./client.repository";
import {
  ClientModel,
  CreateClientModel,
  FilterClientsModel,
  UpdateClientModel,
} from "./client.model";

@Injectable()
export class ClientService {
  constructor(private clientRepo: ClientRepository) {}

  public async getAllClients(
    input?: FilterClientsModel,
  ): Promise<[ClientModel[], number]> {
    return this.clientRepo.getAllClients(input);
  }

  public async getClientById(id: string): Promise<ClientModel | undefined> {
    return this.clientRepo.getClientById(id);
  }

  public async createClient(client: CreateClientModel): Promise<ClientModel> {
    return this.clientRepo.createClient(client);
  }

  public async updateClient(
    id: string,
    client: UpdateClientModel,
  ): Promise<ClientModel | undefined> {
    const oldClient = await this.getClientById(id);
    if (!oldClient) {
      return undefined;
    }

    return this.clientRepo.updateClient(id, client);
  }

  public async deleteClient(id: string): Promise<void> {
    await this.clientRepo.deleteClient(id);
  }
}
