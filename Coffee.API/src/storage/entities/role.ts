import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";

@Entity()
export class RoleEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    caption: string;

}