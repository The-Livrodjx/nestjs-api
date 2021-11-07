import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import {hashSync} from 'bcrypt'

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

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
