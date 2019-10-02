import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Role } from "./Role";

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;   

    @Column()
    passwordHash: string;

    @Column()
    email: string;

    @OneToMany(type => Role, role => role.id)
    roles: Role[];
}