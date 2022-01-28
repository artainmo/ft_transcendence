import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { CreateChannelMessageDto } from './dto/create-channel_message.dto';
import { UpdateChannelMessageDto } from './dto/update-channel_message.dto';
import { CreateChannelUserDto } from './dto/create-channel_user.dto';
import { UpdateChannelUserDto } from './dto/update-channel_user.dto';

@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Post()
  create(@Body() createChannelDto: CreateChannelDto) {
    return this.channelsService.create(createChannelDto);
  }

  @Get()
  findAll() {
    return this.channelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.channelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateChannelDto: UpdateChannelDto) {
    return this.channelsService.update(+id, updateChannelDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.channelsService.remove(+id);
  }

  @Post('/message')
  createMessage(@Body() createChannelMessageDto: CreateChannelMessageDto) {
    return this.channelsService.createMessage(createChannelMessageDto);
  }

  @Get('/message')
  findAllMessages() {
    return this.channelsService.findAllMessages();
  }

  @Get('/message/:id')
  findOneMessage(@Param('id', ParseIntPipe) id: number) {
    return this.channelsService.findOneMessage(+id);
  }

  @Patch('/message/:id')
  updateMessage(@Param('id', ParseIntPipe) id: number, @Body() updateChannelMessageDto: UpdateChannelMessageDto) {
    return this.channelsService.updateMessage(+id, updateChannelMessageDto);
  }

  @Delete('/message/:id')
  removeMessage(@Param('id', ParseIntPipe) id: number) {
    return this.channelsService.removeMessage(+id);
  }

  @Post('/user')
  createUser(@Body() createChannelUserDto: CreateChannelUserDto) {
    return this.channelsService.createUser(createChannelUserDto);
  }

  @Get('/user')
  findAllUsers() {
    return this.channelsService.findAllUsers();
  }

  @Get('/user/:id')
  findOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.channelsService.findOneUser(+id);
  }

  @Patch('/user/:id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateChannelUserDto: UpdateChannelUserDto) {
    return this.channelsService.updateUser(+id, updateChannelUserDto);
  }

  @Delete('/user/:id')
  removeUser(@Param('id', ParseIntPipe) id: number) {
    return this.channelsService.removeUser(+id);
  }

  @Get('/password_verification/:id/:password')
  passwordVerification(@Param('id', ParseIntPipe) id: number, @Param('password') password: string) {
    return this.channelsService.passwordVerification(+id, password);
  }
}
