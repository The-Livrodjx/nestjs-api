import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import {compareSync, hashSync} from 'bcrypt'

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {

  }

  async findAll() {
    let users = await this.usersRepository.find({
      relations: ['address', 'contacts']
    })

    
    return users;
  }
  
  async create(body) {
    let user = body.email
   
    let userExists = await this.usersRepository.findOne({where: {'email': user}})


    if(!userExists) {
      await this.usersRepository.save(body)
    }
    else {
      
      throw new HttpException ("Usuário já criado", 406)
    }
  }


  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
