import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserApiDto } from './dto/create-user-api.dto';
import { UpdateUserApiDto } from './dto/update-user-api.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserApi } from './entities/user-api.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/auth/Role/role.enum';
import { RoleEntity } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-Role.dto';


@Injectable()
export class UserApiService {

  constructor(
    @InjectRepository(UserApi)
    private readonly userApiRepository: Repository<UserApi>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) { }

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
     async assignRoleToUser(username: string, roleName: Role): Promise<UserApi> {
    const user = await this.userApiRepository.findOne({
      where: { username: username },
      relations: ['roles'], // Explicitly load relations
    });

    if (!user) {
      throw new NotFoundException(`User with username '${username}' not found`);
    }

    // ==========================================================
    // THIS IS THE CORRECTED LINE
    // We now use { Role: roleName } to match your entity property
    // ==========================================================
    const role = await this.roleRepository.findOneBy({ name : roleName });

    if (!role) {
      // Now this error message will be accurate if a role truly doesn't exist
      throw new NotFoundException(`Role with name '${roleName}' not found in the database`);
    }

    const hasRole = await user.roles.some((existingRole) => existingRole.id === role.id);
    if (hasRole) {
      throw new BadRequestException(
        `User '${username}' already has the role '${roleName}'`,
      );
    }

    user.roles.push(role);
    return this.userApiRepository.save(user);
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


