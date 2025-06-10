import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserApiService } from './user-api.service';
import { CreateUserApiDto } from './dto/create-user-api.dto';


@Controller('user-api')
export class UserApiController {
  constructor(private readonly userApiService: UserApiService) {}
  
  @Post('Register')
  Register(@Body() createUserApiDto: CreateUserApiDto) {
    return this.userApiService.Register_User(createUserApiDto);
  }
  @Post('Login_User')
  async Login_User(@Body() createUserApiDto: CreateUserApiDto) {

    if (!createUserApiDto.username || !createUserApiDto.password) {
      throw new Error('Username and password are required for login');
    } 
    else if (createUserApiDto.username && createUserApiDto.password) {
      return this.userApiService.Login_User(createUserApiDto);
    }
  }

}
