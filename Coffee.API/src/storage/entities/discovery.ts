import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToOne, OneToOne } from "typeorm";
import { Target } from "../../models/target";
import { TargetEntity } from "./target";

@Entity("Discoveries")
export class DisocveryEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    network: string;
    @Column()
    startedTimeStamp: Date;
    @Column()
    finishedTimeStamp: Date;
}