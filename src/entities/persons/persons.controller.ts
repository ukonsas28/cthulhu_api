import { Controller, Get, HttpCode, Param, ParseIntPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PersonsService } from './persons.service';

@ApiTags('persons')
@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @ApiOperation({ summary: 'Получить список юзеров' })
  @Get()
  getPersonsList() {
    return this.personsService.getPersonsList();
  }

  @HttpCode(200)
  @Get(':userId')
  getPersonById(@Param('userId', ParseIntPipe) userId: number) {
    return this.personsService.getPersonById(userId);
  }
}
