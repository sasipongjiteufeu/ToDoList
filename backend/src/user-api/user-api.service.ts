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
    private readonly userApiRepository: Repository<UserApi>,) {}
  
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

  findAll() {
    return `This action returns all userApi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userApi`;
  }

  update(id: number, updateUserApiDto: UpdateUserApiDto) {
    return `This action updates a #${id} userApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} userApi`;
  }
}
