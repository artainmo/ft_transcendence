import { Injectable } from '@nestjs/common';
import { CreateDmDto } from './dto/create-dm.dto';
import { UpdateDmDto } from './dto/update-dm.dto';
import { CreateDmMessageDto } from './dto/create-dm_message.dto';
import { UpdateDmMessageDto } from './dto/update-dm_message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DmsMessagesEntity } from "entities/dms_messages.entity";
import { DmsEntity } from "entities/dms.entity";

@Injectable()
export class DmsService {
  constructor(
    @InjectRepository(DmsEntity)
    private DmsRepo: Repository<DmsEntity>,
    @InjectRepository(DmsMessagesEntity)
    private DmsMessagesRepo: Repository<DmsMessagesEntity>
  ) {}

  create(createDmDto: CreateDmDto): void {
    await this.DmsRepo.save(createDmDto);
  }

  findAll(): Promise<DmsEntity[]> {
    return await this.DmsRepo.find();
  }

  findOne(id: number): Promise<DmsEntity> {
    return await this.DmsRepo.findOne(id);
  }

  update(id: number, updateDmDto: UpdateDmDto): void {
    await this.DmsRepo.update(id, updateDmDto);
  }

  remove(id: number) {
    await this.DmsRepo.delete(id);
  }

  createMessage(createDmMessageDto: CreateDmMessageDto): void {
    await this.DmsMessagesRepo.save(createDmMessageDto);
  }

  findAllMessages(): Promise<DmsMessagesEntity[]> {
    return await this.DmsMessagesRepo.find();
  }

  findOneMessage(id: number): Promise<DmsMessagesEntity> {
    return await this.DmsMessagesRepo.findOne(id);
  }

  updateMessage(id: number, updateDmMessageDto: UpdateDmMessageDto): void {
    await this.DmsMessagesRepo.update(id, updateDmMessageDto);
  }

  removeMessage(id: number) {
    await this.DmsMessagesRepo.delete(id);
  }
}
