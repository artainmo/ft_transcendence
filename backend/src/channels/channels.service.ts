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

  create(createChannelDto: CreateChannelDto): void {
    await this.ChannelsRepo.save(createChannelDto);
  }

  findAll(): Promise<ChannelsEntity[]> {
    return await this.ChannelsRepo.find();
  }

  findOne(id: number): Promise<ChannelsEntity> {
    return await this.ChannelsRepo.findOne(id);
  }

  update(id: number, updateChannelDto: UpdateChannelDto): void {
    await this.ChannelsRepo.update(id, updateChannelDto);
  }

  remove(id: number): void {
    await this.ChannelsRepo.delete(id);
  }

  createMessage(createChannelMessageDto: CreateChannelMessageDto): void {
    await this.ChannelsMessagesRepo.save(createChannelMessageDto);
  }

  findAllMessages(): Promise<ChannelsMessagesEntity[]> {
    return await this.ChannelsMessagesRepo.find();
  }

  findOneMessage(id: number): Promise<ChannelsMessagesEntity> {
    return await this.ChannelsMessagesRepo.findOne(id);
  }

  updateMessage(id: number, updateChannelMessageDto: UpdateChannelMessageDto): void {
    await this.ChannelsMessagesRepo.update(id, updateChannelMessageDto);
  }

  removeMessage(id: number): void {
    await this.ChannelsMessagesRepo.delete(id);
  }

  createUser(createChannelUserDto: CreateChannelUsersDto): void {
    await this.ChannelsUsersRepo.save(createChannelUserDto);
  }

  findAllUsers(): Promise<ChannelsUsersEntity[]> {
    return await this.ChannelsUsersRepo.find();
  }

  findOneUser(id: number): Promise<ChannelsUsersEntity> {
    return await this.ChannelsUsersRepo.findOne(id);
  }

  updateUser(id: number, updateChannelUserDto: UpdateChannelUserDto): void {
    await this.ChannelsUsersRepo.update(id, updateChannelUserDto);
  }

  removeuser(id: number): void {
    await this.ChannelsUsersRepo.delete(id);
  }
}
