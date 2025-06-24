import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserApiModule } from 'src/user-api/user-api.module';
import { JwtModule } from '@nestjs/jwt';
import { constants } from 'buffer';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';


@Module({
  imports: [UserApiModule,JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1h' },
  })],
  controllers: [AuthController,],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports : [JwtAuthGuard],
})
export class AuthModule {}
