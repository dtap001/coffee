import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";

@Entity("Roles")
export class RoleEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    caption: string;

}