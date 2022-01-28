import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(+id);
  }

  @Get('/complete/:id')
  findCompleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findCompleteOne(+id);
  }

  @Get('/name/:name')
  findOneByName(@Param('name') name: string) {
    return this.userService.findOneByName(name);
  }

  @Get('/login/:login')
  findOneByLogin(@Param('login') login: string) {
    return this.userService.findOneByLogin(login);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.userService.remove(+id);
  }

  @Get('2fa/secret')
  getTwoFactorAuthenticationSecret() {
    return this.userService.twoFactorAuthenticationSecret();
  }

  @Post('2fa/verify')
  verifyTwoFactorAuthentication(@Body() obj: { secret: string, token: string }) {
    return this.userService.verifyTwoFactorAuthentication(obj.secret, obj.token);
  }
}
