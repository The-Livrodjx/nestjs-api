import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Address {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    type: string

    @Column()
    contact: string
}