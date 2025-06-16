import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { UserApi } from './user-api.entity';

@Entity({ name: 'roles' })
export class RoleEntity {

@PrimaryGeneratedColumn()
id: number;

@Column({ type: 'varchar', length: 50, unique: true })
Role : string; // e.g., 'admin', 'user', etc.

@ManyToMany(() => UserApi, (user) => user.roles)
users: UserApi[];


}