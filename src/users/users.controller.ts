import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.getUsers();
  }

  @Get('id/:id')
  async findOneById(@Param('id') id: string): Promise<User | null> {
    return await this.usersService.getUserById(id);
  }

  @Get(':email')
  async findOneByEmail(@Param('email') email: string): Promise<User | null> {
    return await this.usersService.getUserByEmail(email);
  }

  @Post()
  async create(@Body() user: User): Promise<User> {
    return await this.usersService.createUser(user);
  }

  @Patch()
  async update(@Body() user: Partial<User>): Promise<User | null> {
    return await this.usersService.updateUser(user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User | null> {
    return await this.usersService.deleteUser(id);
  }
}
