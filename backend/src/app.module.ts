import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { UserApiModule } from './user-api/user-api.module';
import { AuthModule } from './auth/auth.module';
import { UserApi } from './user-api/entities/user-api.entity';
import { Role } from './auth/Role/role.enum';
import { TodosModule } from './todos/todos.module';


@Module({
  
imports: [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),
  DatabaseModule,
  UserApiModule,
  AuthModule,
  TodosModule
],
})

export class AppModule {
}
