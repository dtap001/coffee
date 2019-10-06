import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";

import { RoleEntity } from "./Role";
@Entity("Users")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    passwordHash: string;
    @Column()
    email: string;
    @Column()
    name: string;
    @ManyToMany(type => RoleEntity)
    @JoinTable()
    roles: RoleEntity[];
}