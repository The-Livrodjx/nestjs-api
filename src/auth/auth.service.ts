import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcrypt';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const userExists = await this.usersRepository.findOne({
      where: { email: email },
      select: ['id', 'name', 'email', 'password'],
    });

    if (userExists) {
      const result = compareSync(password, userExists.password);

      if (result) {
        const token = this.genToken(userExists.id);
        const username = userExists.name;
        const userId = userExists.id
        return { username, token, userId };
      } else {
        throw new HttpException('Senha incorreta', 401);
      }
    } else {
      throw new HttpException('Usuário não encontrado', 403);
    }
  }

  genToken(payload) {
    return this.jwtService.sign({ payload });
  }
}
