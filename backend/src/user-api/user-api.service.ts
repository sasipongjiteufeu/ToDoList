import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserApiDto } from './dto/create-user-api.dto';
import { UpdateUserApiDto } from './dto/update-user-api.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserApi } from './entities/user-api.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/auth/Role/role.enum';
import { RoleEntity } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-Role.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserApiService {

  constructor(
    @InjectRepository(UserApi)
    private readonly userApiRepository: Repository<UserApi>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) { }

  async Register_User(createUserApiDto: CreateUserApiDto): Promise<UserApi> {
    console.log('Registering user with data:', createUserApiDto);
    try {
       const { username, email, password } = createUserApiDto;

    // Check if user already exists
    const existingUser = await this.userApiRepository.findOne({ where: [{ username }, { email }] });
    if (existingUser) {
      throw new ConflictException('Username or email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // --- THIS IS THE FIX ---

    // 1. Find the default 'USER' role in the database.
    const defaultRole = await this.roleRepository.findOne({ where: { name: Role.User } });
    if (!defaultRole) {
      throw new Error('Default user role not found. Please seed the roles in the database.');
    }
    
    // 2. Create the new user instance
    const newUser = this.userApiRepository.create({
      username,
      email,
      password: hashedPassword,
      // 3. Assign the found role to the user's roles array.
      roles: [defaultRole],
    });

    // 4. Save the new user with their assigned role.
    return this.userApiRepository.save(newUser);
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('User registration failed');
    }
  }
  async Login_User(createUserApiDto: CreateUserApiDto) {
    const user = await this.userApiRepository.findOne({
      where: { username: createUserApiDto.username },
      relations: ['roles'],
    });
      if (!user) {
        return null;
      }
      const isPasswordMatching = await bcrypt.compare(
      createUserApiDto.password,
      user.password,
    );
    
    return isPasswordMatching ? user : null;

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


