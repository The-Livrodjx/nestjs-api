import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn} from 'typeorm'
import { Address } from './address.entity'
import { Contacts } from './contact.entity'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => Address, address => address.id)
    @JoinColumn({name: "address_id"})
    address: Address[]

    @OneToMany(() => Contacts, contact => contact.id)
    @JoinColumn({name: "contact_id"})
    contacts: Contacts[]
}
