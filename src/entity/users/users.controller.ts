import { Controller, Get, HttpCode, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Получить список юзеров' })
  @Get()
  getUsersList() {
    return this.usersService.getUsersList();
  }

  @HttpCode(200)
  @Get(':userId')
  getUserById(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.getUserById(userId);
  }
}
