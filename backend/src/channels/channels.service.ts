import { Injectable } from '@nestjs/common';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { CreateChannelMessageDto } from './dto/create-channel_message.dto';
import { UpdateChannelMessageDto } from './dto/update-channel_message.dto';
import { CreateChannelUserDto } from './dto/create-channel_user.dto';
import { UpdateChannelUserDto } from './dto/update-channel_user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';
import { ChannelsMessagesEntity } from "./entities/channels_messages.entity";
import { ChannelsUsersEntity } from "./entities/channels_users.entity";
import { ChannelsEntity } from "./entities/channels.entity";

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

  async create(createChannelDto: CreateChannelDto): Promise<ChannelsEntity> {
    return await this.ChannelsRepo.save(createChannelDto);
  }

  async findAll(): Promise<ChannelsEntity[]> {
    return await this.ChannelsRepo.find();
  }

  // async findChannelsOfUser(login: string): Promise<ChannelsEntity[]> {
  //   return await this.ChannelsRepo.find({
  //     relations: ['users'],
  //     where: { users: Equal({login: login})}
  //   });
  // }

  async findOne(id: number): Promise<ChannelsEntity> {
    return await this.ChannelsRepo.findOne(id);
  }

  async update(id: number, updateChannelDto: UpdateChannelDto): Promise<void> {
    await this.ChannelsRepo.update(id, updateChannelDto);
  }

  async remove(id: number): Promise<void> {
    await this.ChannelsRepo.delete(id);
  }

  async createMessage(createChannelMessageDto: CreateChannelMessageDto): Promise<void> {
    await this.ChannelsMessagesRepo.save(createChannelMessageDto);
  }

  async findAllMessages(): Promise<ChannelsMessagesEntity[]> {
    return await this.ChannelsMessagesRepo.find();
  }

  async findOneMessage(id: number): Promise<ChannelsMessagesEntity> {
    return await this.ChannelsMessagesRepo.findOne(id);
  }

  async updateMessage(id: number, updateChannelMessageDto: UpdateChannelMessageDto): Promise<void> {
    await this.ChannelsMessagesRepo.update(id, updateChannelMessageDto);
  }

  async removeMessage(id: number): Promise<void> {
    await this.ChannelsMessagesRepo.delete(id);
  }

  async createUser(createChannelUserDto: CreateChannelUserDto): Promise<void> {
    await this.ChannelsUsersRepo.save(createChannelUserDto);
  }

  async findAllUsers(): Promise<ChannelsUsersEntity[]> {
    return await this.ChannelsUsersRepo.find();
  }

  async findOneUser(id: number): Promise<ChannelsUsersEntity> {
    return await this.ChannelsUsersRepo.findOne(id);
  }

  async updateUser(id: number, updateChannelUserDto: UpdateChannelUserDto): Promise<void> {
    await this.ChannelsUsersRepo.update(id, updateChannelUserDto);
  }

  async removeUser(id: number): Promise<void> {
    await this.ChannelsUsersRepo.delete(id);
  }
}
