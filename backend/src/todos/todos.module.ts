import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserApi } from 'src/user-api/entities/user-api.entity';
import { RoleEntity } from 'src/user-api/entities/role.entity';
import { Todo } from './entities/todo.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserApi,Todo, 
        RoleEntity,AuthModule])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
