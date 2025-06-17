import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './entities/role.entity';
import { Role } from 'src/auth/Role/role.enum';

@Injectable()
export class RoleSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  // onModuleInit is a NestJS lifecycle hook that runs once the host module has been initialized.
  async onModuleInit() {
    // We will seed all roles defined in the Role enum
    const rolesToSeed = Object.values(Role);

    for (const roleName of rolesToSeed) {
      // Check if the role already exists in the database
      const roleExists = await this.roleRepository.findOneBy({ name: roleName });

      if (!roleExists) {
        // If it doesn't exist, create and save it
        const newRole = this.roleRepository.create({ name: roleName });
        await this.roleRepository.save(newRole);
        console.log(`Seeded role: ${roleName}`);
      }
    }
  }
}