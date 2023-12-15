import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  index(): Observable<any> {
    return this.userService.findAll();
  }

  @Post()
  store(@Body() body: CreateUserDto): Observable<any> {
    return this.userService.store(body);
  }

  @Get(':id')
  show(@Param('id') id: number): Observable<any> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() body: UpdateUserDto,
  ): Observable<any> {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
