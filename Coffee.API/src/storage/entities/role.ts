import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    caption: string;

}