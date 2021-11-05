import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Address } from './entities/address.entity';
import { Contacts } from './entities/contact.entity';
import { User } from './entities/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: "FNJNHFJAENFJN", signOptions: {
        expiresIn: "1h",
      },
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "@Python123",
      database: "testeFinger",
      entities: [Address, User, Contacts],
      synchronize: false
    }),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
