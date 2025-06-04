import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserApiService } from './user-api.service';
import { CreateUserApiDto } from './dto/create-user-api.dto';
import { UpdateUserApiDto } from './dto/update-user-api.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('user-api')
export class UserApiController {
  constructor(private readonly userApiService: UserApiService) {}
  
  @Post('Register')
  Register(@Body() createUserApiDto: CreateUserApiDto) {
    return this.userApiService.Register_User(createUserApiDto);
  }
  @Get()
  findAll() {
    return this.userApiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userApiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserApiDto: UpdateUserApiDto) {
    return this.userApiService.update(+id, updateUserApiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userApiService.remove(+id);
  }
}
