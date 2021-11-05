import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    type: string

    @Column()
    contact: string

    @ManyToOne(() => User, user => user.address, {cascade: true})
    user: User
}