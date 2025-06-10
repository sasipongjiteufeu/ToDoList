import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserApiModule } from 'src/user-api/user-api.module';


@Module({
  imports: [UserApiModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
