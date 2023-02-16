import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UserInterface, UsersService } from './users.service';

interface CreateUserDto {
  firstname: string;
  lastname: string;
  email: string;
  id: number;
}

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    if (!user) {
      return 'Error in creating user';
    }
    return 'User created successfully';
  }

  @Get()
  async findAll(@Req() request: Request) {
    const user: Array<UserInterface> = await this.usersService.findAll();
    return user;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: any) {
    const newUser: any = await this.usersService.update(id, body);
    return 'User updated';
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.usersService.delete(id);
    return 'User deleted';
  }
}
