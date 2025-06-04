import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config'
@Module({
    imports: [
    TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
    inject: [ConfigService],
      type: 'mysql',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USER'), // ✅ Not DB_USERNAME
      password: configService.get<string>('DB_PASSWORD'),
      database:configService.get<string>('DB_NAME'),
      autoLoadEntities: true,
      synchronize: true,  
    })
    ,
    
  }),
    ]
})
export class DatabaseModule {}
