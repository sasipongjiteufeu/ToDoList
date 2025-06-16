import { Injectable } from '@nestjs/common';
import { CreateUserApiDto } from './dto/create-user-api.dto';
import { UpdateUserApiDto } from './dto/update-user-api.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserApi } from './entities/user-api.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UserApiService {
  constructor(
    @InjectRepository(UserApi)
    private readonly userApiRepository: Repository<UserApi>,) { }

  Register_User(createUserApiDto: CreateUserApiDto) {
    console.log('Registering user with data:', createUserApiDto);
    try {
      const NewUser = this.userApiRepository.create(createUserApiDto);
      return this.userApiRepository.save(NewUser);
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('User registration failed');
    }
  }
  async Login_User(createUserApiDto: CreateUserApiDto) {
      try {
        const Login_Requst = await this.userApiRepository.findOneBy({
          username: createUserApiDto.username,
          password: createUserApiDto.password,
        })
        return Login_Requst;
      }
      catch (error) {
      console.error('Error logging in user:', error);
      throw new Error('User login failed');
      }
    }
  async Get_All_Users() {
    try {
      const users = await this.userApiRepository.find();
      const usersWithoutPasswords = users.map(({ password, ...user }) => user);
      return usersWithoutPasswords;
    }
    catch (error) {
      console.error('Error fetching all users:', error);
      throw new Error('Failed to fetch users');
    }
  }
}


