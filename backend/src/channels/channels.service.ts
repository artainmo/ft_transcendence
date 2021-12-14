import { Injectable } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

import { CreateChannelMessageDto } from './dto/create-channel_message.dto';
import { UpdateChannelMessageDto } from './dto/update-channel_message.dto';
import { CreateChannelUserDto } from './dto/create-channel_user.dto';
import { UpdateChannelUserDto } from './dto/update-channel_user.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelsMessagesEntity } from "entities/channels_messages.entity";
import { ChannelsUsersEntity } from "entities/channels_users.entity";
import { ChannelsEntity } from "entities/channels.entity";

@Injectable()
export class ChannelsService {
  constructor(
    @InjectRepository(ChannelsEntity)
    private ChannelsRepo: Repository<ChannelsEntity>,
    @InjectRepository(ChannelsUsersEntity)
    private ChannelsUsersRepo: Repository<ChannelsUsersEntity>,
    @InjectRepository(ChannelsMessagesEntity)
    private ChannelsMessagesRepo: Repository<ChannelsMessagesEntity>
  ) {}

  create(createChannelDto: CreateChannelDto) {
    return 'This action adds a new channel';
  }

  findAll() {
    return `This action returns all channels`;
  }

  findOne(id: number) {
    return `This action returns a #${id} channel`;
  }

  update(id: number, updateChannelDto: UpdateChannelDto) {
    return `This action updates a #${id} channel`;
  }

  remove(id: number) {
    return `This action removes a #${id} channel`;
  }
}
