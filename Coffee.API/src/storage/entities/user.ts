import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";  

import { RoleEntity } from "./Role";
@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;   

    @Column()
    passwordHash: string;

    @Column()
    email: string;

    @OneToMany(type => RoleEntity, role => role.id)
    roles: RoleEntity[];
}