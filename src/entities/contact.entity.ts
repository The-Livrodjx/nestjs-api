import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Contacts {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    street: string

    @Column()
    city: string

    @Column()
    state: string

    @Column()
    zipCode: string

    @ManyToOne(() => User, user => user.contacts, {cascade: true})
    user: User
}
