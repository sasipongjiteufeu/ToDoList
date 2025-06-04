import { Entity,Column,PrimaryGeneratedColumn } from "typeorm";
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
    
}
