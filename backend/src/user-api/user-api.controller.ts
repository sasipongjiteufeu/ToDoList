import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UserApiService } from './user-api.service';
import { CreateUserApiDto } from './dto/create-user-api.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/Role/roles.decorator';
import { Role } from 'src/auth/Role/role.enum';
import { RolesGuard } from 'src/auth/Role/roles.guard';
import { CreateRoleDto } from './dto/create-Role.dto';


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

  @UseGuards(JwtAuthGuard)
  @Get('Get_All_Users')
  Get_All_Users() {
    return this.userApiService.Get_All_Users();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('Give_admin')
  getAdminContent(@Param('username') username: string,@Body() RoleDto: CreateRoleDto,) {
    return this.userApiService.assignRoleToUser(username, RoleDto.roleName);
  }
  

}
