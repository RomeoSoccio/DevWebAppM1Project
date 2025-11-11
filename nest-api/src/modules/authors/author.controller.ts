import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAllAuthors() {
    return this.authorService.getAllAuthors();
  }

  @Get(':id')
  public async getAuthor(@Param('id') id: string) {
    return this.authorService.getAuthorById(id);
  }

  @Delete(':id')
  public async deleteAuthor(@Param('id') id: string) {
    return this.authorService.deleteAuthor(id);
  }

  @Post()
  public async createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.createAuthor(createAuthorDto);
  }
}
