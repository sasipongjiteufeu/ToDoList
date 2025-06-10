import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { UserApiModule } from './user-api/user-api.module';
import { AuthModule } from './auth/auth.module';


@Module({
  
imports: [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),
  DatabaseModule,
  UserApiModule,
  AuthModule
],
})

export class AppModule {
}
