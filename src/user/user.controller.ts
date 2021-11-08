import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/createUser')
  create(@Body() body: Body) {
    return this.userService.create(body);
  }

  @Post('/createAddress')
  createAddress(@Body() body: Body) {
    
    return this.userService.createAddress(body)
  }

  @Post('/createContact')
  createContacts(@Body() body: Body) {

    return this.userService.createContacts(body)
  }

  @Post('/excludeAddress')
  // @UseGuards(AuthGuard('jwt'))
  excludeAddress(@Body() body: any) {

    const {userId, addressId} = body
    return this.userService.excludeAddress(userId, addressId)
  }

  @Get()
  // @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put('/update')
  update(@Body() body: Body) {

    return this.userService.update(body)
  }

  @Delete(':id/:entity')
  remove(@Param('id') id: string, @Param('entity') entity: string) {
    return this.userService.remove(id, entity)
  }
}
