import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { CreateChannelMessageDto } from './dto/create-channel_messages.dto';
import { UpdateChannelMessageDto } from './dto/update-channel_messages.dto';
import { CreateChannelUserDto } from './dto/create-channel_users.dto';
import { UpdateChannelUserDto } from './dto/update-channel_users.dto';

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
  findOne(@Param('id') id: string) {
    return this.channelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChannelDto: UpdateChannelDto) {
    return this.channelsService.update(+id, updateChannelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.channelsService.remove(+id);
  }

  @Post('/message')
  create(@Body() createChannelMessageDto: CreateChannelMessageDto) {
    return this.channelsService.createMessage(createChannelMessageDto);
  }

  @Get('/message')
  findAll() {
    return this.channelsService.findAllMessages();
  }

  @Get('/message/:id')
  findOne(@Param('id') id: string) {
    return this.channelsService.findOneMessage(+id);
  }

  @Patch('/message/:id')
  update(@Param('id') id: string, @Body() updateChannelMessageDto: UpdateChannelMessageDto) {
    return this.channelsService.updateMessage(+id, updateChannelMessageDto);
  }

  @Delete('/message/:id')
  remove(@Param('id') id: string) {
    return this.channelsService.removeMessage(+id);
  }

  @Post('/user')
  create(@Body() createChannelUserDto: CreateChannelUserDto) {
    return this.channelsService.createUser(createChannelUserDto);
  }

  @Get('/user')
  findAll() {
    return this.channelsService.findAllUsers();
  }

  @Get('/user/:id')
  findOne(@Param('id') id: string) {
    return this.channelsService.findOneUser(+id);
  }

  @Patch('/user/:id')
  update(@Param('id') id: string, @Body() updateChannelUserDto: UpdateChannelUserDto) {
    return this.channelsService.updateUser(+id, updateChannelUserDto);
  }

  @Delete('/user/:id')
  remove(@Param('id') id: string) {
    return this.channelsService.removeUser(+id);
  }
}
