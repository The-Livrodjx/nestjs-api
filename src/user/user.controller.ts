import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/createUser')
  create(@Body() body: Body) {
    return this.userService.create(body);
  }
  
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body()  body: Body) {
    return this.userService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
