import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToOne, OneToOne } from "typeorm";
import { Target } from "../../models/target";
import { TargetEntity } from "./target";

@Entity("Jobs")
export class JobEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    caption: string;
    @Column()
    cronTiming: string;

    @ManyToOne(type => TargetEntity)
    @JoinTable()
    target: TargetEntity;
}