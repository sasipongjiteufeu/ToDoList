import { Module } from '@nestjs/common';
import { UserApiService } from './user-api.service';
import { UserApiController } from './user-api.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserApi } from './entities/user-api.entity';
import { RoleEntity } from './entities/role.entity';
import { RoleSeeder } from './role.seeder';

@Module({
   imports: [TypeOrmModule.forFeature([UserApi, 
      RoleEntity])],
  controllers: [UserApiController],
  providers: [UserApiService,RoleSeeder],
  exports:[UserApiService]
})
export class UserApiModule {}
