import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { UserApi } from './user-api.entity';
import { Role } from 'src/auth/Role/role.enum';

@Entity({ name: 'roles' })
export class RoleEntity {

@PrimaryGeneratedColumn()
id: number;

@Column({ type: 'enum', enum: Role, unique: true })
name : Role; // e.g., 'admin', 'user', etc.

@ManyToMany(() => UserApi, (user) => user.roles)
users: UserApi[];


}