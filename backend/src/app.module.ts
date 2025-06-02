import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';


@Module({
  
imports: [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  DatabaseModule
],
  controllers: [AppController],
    providers: [AppService],
})

export class AppModule {
}
