import { Entity, Column, PrimaryGeneratedColumn, ObjectType, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { RoleEntity } from "./role.entity";
import { Todo } from "src/todos/entities/todo.entity";
@Entity()
export class UserApi {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    password: string;

    @OneToMany(() => Todo, (todo) => todo.user, { eager: true })
    todos: Todo[];
    
    @ManyToMany(() => RoleEntity, (role) => role.users,{eager: true})
    @JoinTable({
        name: 'user_roles', // name of the pivot table
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
    })

    
    roles: RoleEntity[];

}
