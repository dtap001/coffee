import { Entity, Column, PrimaryGeneratedColumn, , JoinTable, ManyToOne } from "typeorm";
import { Target } from "../../models/target";
import { TargetEntity } from "./target";

@Entity("Jobs")
export class JobEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    caption: string;
    @Column()
    timeStamp: string;
    @ManyToOne(type => Target)
    @JoinTable()
    target: TargetEntity[];
}