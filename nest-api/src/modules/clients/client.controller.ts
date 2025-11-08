import {Get, Post, Patch, Delete, Controller, Param, Body} from "@nestjs/common";
import { CreateClientDto, GetClientsDto, UpdateClientDto } from "./client.dto";
import { GetClientsModel } from "./client.model";
import { ClientService } from "./client.service";
import { ClientId } from "./client.entity";

function toClientId(id: string): ClientId {
  return id as ClientId;
}


@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(toClientId(id));
  }

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(toClientId(id), updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(toClientId(id));
  }
}
