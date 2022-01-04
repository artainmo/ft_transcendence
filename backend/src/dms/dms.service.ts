import { Injectable } from '@nestjs/common';
import { CreateDmDto } from './dto/create-dm.dto';
import { UpdateDmDto } from './dto/update-dm.dto';
import { CreateDmMessageDto } from './dto/create-dm_message.dto';
import { UpdateDmMessageDto } from './dto/update-dm_message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal } from 'typeorm';
import { DmsMessagesEntity } from "./entities/dms_messages.entity";
import { DmsEntity } from "./entities/dms.entity";

@Injectable()
export class DmsService {
  constructor(
    @InjectRepository(DmsEntity)
    private DmsRepo: Repository<DmsEntity>,
    @InjectRepository(DmsMessagesEntity)
    private DmsMessagesRepo: Repository<DmsMessagesEntity>
  ) {}

  async create(createDmDto: CreateDmDto): Promise<DmsEntity> {
    return await this.DmsRepo.save(createDmDto);
  }

  async findAll(): Promise<DmsEntity[]> {
    return await this.DmsRepo.find();
  }

  async findDmsOfUser(login: string): Promise<DmsEntity[]> {
    return await this.DmsRepo.find({
      where: { users: Equal({login: login}) }
    });
  }

  async findOne(id: number): Promise<DmsEntity> {
    return await this.DmsRepo.findOne(id);
  }

  async update(id: number, updateDmDto: UpdateDmDto): Promise<void> {
    await this.DmsRepo.update(id, updateDmDto);
  }

  async remove(id: number): Promise<void> {
    await this.DmsRepo.delete(id);
  }

  async createMessage(createDmMessageDto: CreateDmMessageDto): Promise<void> {
    await this.DmsMessagesRepo.save(createDmMessageDto);
  }

  async findAllMessages(): Promise<DmsMessagesEntity[]> {
    return await this.DmsMessagesRepo.find();
  }

  async findOneMessage(id: number): Promise<DmsMessagesEntity> {
    return await this.DmsMessagesRepo.findOne(id);
  }

  async updateMessage(id: number, updateDmMessageDto: UpdateDmMessageDto): Promise<void> {
    await this.DmsMessagesRepo.update(id, updateDmMessageDto);
  }

  async removeMessage(id: number): Promise<void> {
    await this.DmsMessagesRepo.delete(id);
  }
}
