import { Module } from '@nestjs/common';
import { UserApiService } from './user-api.service';
import { UserApiController } from './user-api.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserApi } from './entities/user-api.entity';

@Module({
   imports: [TypeOrmModule.forFeature([UserApi])],
  controllers: [UserApiController],
  providers: [UserApiService],
  exports:[UserApiService]
})
export class UserApiModule {}
