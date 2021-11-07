import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import bcrypt from 'bcrypt';
import { Address } from './address.entity';
import { Contacts } from './contact.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Address, (address) => address.user, {
    cascade: ['insert', 'update'],
  })
  address: Address[];

  @OneToMany(() => Contacts, (contact) => contact.user, {
    cascade: ['insert', 'update'],
  })
  contacts: Contacts[];
}
