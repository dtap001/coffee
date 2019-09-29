import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany } from "typeorm";
import { Role } from "./Role";

@Entity()
export class Target {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address: string;

    @Column()
    caption: string;  

    @OneToMany(type => Role, role => role.id)
    roles: Role[];
}