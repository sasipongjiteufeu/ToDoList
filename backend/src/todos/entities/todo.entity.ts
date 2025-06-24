// src/todos/entities/todo.entity.ts

import { UserApi } from 'src/user-api/entities/user-api.entity';

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' ,nullable: true })
  description: string;

  @Column({ default: false })
  isCompleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // This is the crucial part for linking a Todo to a User
  @ManyToOne(() => UserApi, (user) => user.todos, { eager: false })
  user: UserApi;
  
  // Also add a 'todos' property to your User entity
}