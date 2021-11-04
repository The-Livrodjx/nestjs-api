import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

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
}
