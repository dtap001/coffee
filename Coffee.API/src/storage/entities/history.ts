import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { User } from "./User";
@Entity()
export class AccessLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sourceAddress: string;

    @Column()
    caption: string;  

    @OneToOne(type => User, user => user.id)
    user: User;
}