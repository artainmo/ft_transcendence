import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  // @Get('/user/:login')
  // findChannelsOfUser(@Param('login') login: string) {
  //   return this.channelsService.findChannelsOfUser(login);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.channelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChannelDto: UpdateChannelDto) {
    return this.channelsService.update(+id, updateChannelDto);
  }//TypeORM bugs, thus using a way around

  @Delete(':id')
  remove(@Param('id') id: string) {
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
  findOneMessage(@Param('id') id: string) {
    return this.channelsService.findOneMessage(+id);
  }

  @Patch('/message/:id')
  updateMessage(@Param('id') id: string, @Body() updateChannelMessageDto: UpdateChannelMessageDto) {
    return this.channelsService.updateMessage(+id, updateChannelMessageDto);
  }

  @Delete('/message/:id')
  removeMessage(@Param('id') id: string) {
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
  findOneUser(@Param('id') id: string) {
    return this.channelsService.findOneUser(+id);
  }

  @Patch('/user/:id')
  updateUser(@Param('id') id: string, @Body() updateChannelUserDto: UpdateChannelUserDto) {
    return this.channelsService.updateUser(+id, updateChannelUserDto);
  }

  @Delete('/user/:id')
  removeUser(@Param('id') id: string) {
    return this.channelsService.removeUser(+id);
  }
}
