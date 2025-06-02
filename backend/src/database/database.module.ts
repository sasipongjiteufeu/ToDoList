import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
    TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
    inject: [ConfigService],
      type: 'mysql',
      host: configService.getOrThrow('DB_HOST'),
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER, // ✅ Not DB_USERNAME
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      
    }),
    
  }),
    ],
})
export class DatabaseModule {}
