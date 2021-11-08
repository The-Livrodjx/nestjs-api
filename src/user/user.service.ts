import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import {hashSync} from 'bcrypt'
import { Address } from 'src/entities/address.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find({
      relations: ['address', 'contacts'],
    });

    return users;
  }

  async create(body) {
    const user = body.email;

    const userExists = await this.usersRepository.findOne({
      where: { email: user },
    });

    if (!userExists) {
      body.password = hashSync(body.password, 10)
      await this.usersRepository.save(body);
    } else {
      throw new HttpException('Usuário já criado', 406);
    }
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({where: {id}, relations: 
      ['address', 'contacts']})

    if(user) {
      return user
    }
  }

  async update(body) {
    
    const {id, email, username} = body

    if(email !== "" && username !== "") {

      const properties = await this.usersRepository.findOne({where: {id}})

      const newUser = await this.usersRepository.save({
        ...properties,
        id,
        email,
        name: username
      })

      return newUser
    }

    else {
      throw new HttpException('Por favor insira informações', 406)
    }
  }

  async remove(id: string, entity: string) {
    this.usersRepository
      .createQueryBuilder()
      .delete()
      .from(entity)
      .where("userId = :id", {id})
      .execute()
  }

  async createAddress(body) {
    body = body.body
    let id = body.id
    let user = await this.usersRepository.findOne({where: {id}, relations: ['address']})
    
    if(user) {

      delete body.id

      user.address.push(body)
      let newAddress = await this.usersRepository.save(user)

      return newAddress
    }

  }

  async excludeAddress(userId: string, addressid: string) {
     
    let user = await this.usersRepository.findOne({where: {id: userId}, relations: ['address']})
    
    let newAddressArray = user.address.filter(address => address.id != addressid)
    user.address = newAddressArray

    return this.usersRepository.save(user)
  }

  async createContacts(body) {
    // body = body.body

    // return body
    let id = body.id
    let user = await this.usersRepository.findOne({where: {id}, relations: ['contacts']})
    
    if(user) {

      delete body.id

      user.contacts.push(body)
      let newContact = await this.usersRepository.save(user)

      return newContact
    }
  }

  async excludeContact(userId: string, contactId: string) {
     
    let user = await this.usersRepository.findOne({where: {id: userId}, relations: ['contacts']})
    
    let newContactsArray = user.contacts.filter(contact => contact.id != contactId)
    user.contacts = newContactsArray

    return this.usersRepository.save(user)
  }

}
