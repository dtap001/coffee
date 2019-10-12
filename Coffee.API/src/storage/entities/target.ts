import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToMany } from "typeorm";

@Entity()
export class TargetEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    macAddress: string;
    @Column()
    ipAddress: string;
    @Column()
    caption: string;
}