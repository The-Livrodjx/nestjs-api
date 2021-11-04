import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {

  }

  hello() {
    return "Hello World From Livrodjx"
  }
  
  async create(body) {
    let user = body.name

    let userExists = await this.usersRepository.findOne({where: {'name': user}})

    if(!userExists) {
      await this.usersRepository.save(body)
    }
    else {
      return "Usuário já criado"
    }
  }

  async findAll() {
    let users = await this.usersRepository.find({
      relations: ['address', 'contacts']
    })

    
    return users;
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
