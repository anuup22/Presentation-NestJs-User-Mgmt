import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RolesGuard } from 'src/roles/roles.guard';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  private users = []; // In-memory array to simulate a database

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() body: CreateUserDto) {
    const newUser = { id: Date.now(), ...body };
    this.users.push(newUser);
    return newUser;
  }

  @Get()
  getAllUsers() {
    return this.users;
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.users.find((user) => user.id === parseInt(id));
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() body: { name: string; email: string },
  ) {
    const userIndex = this.users.findIndex((user) => user.id === parseInt(id));
    if (userIndex === -1) return { message: 'User not found' };
    this.users[userIndex] = { ...this.users[userIndex], ...body };
    return this.users[userIndex];
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  deleteUser(@Param('id') id: string) {
    const userIndex = this.users.findIndex((user) => user.id === parseInt(id));
    if (userIndex === -1) return { message: 'User not found' };
    const deletedUser = this.users.splice(userIndex, 1);
    return deletedUser[0];
  }
}
