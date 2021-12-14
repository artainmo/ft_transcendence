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

  create(createDmDto: CreateDmDto) {
    return 'This action adds a new dm';
  }

  findAll() {
    return `This action returns all dms`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dm`;
  }

  update(id: number, updateDmDto: UpdateDmDto) {
    return `This action updates a #${id} dm`;
  }

  remove(id: number) {
    return `This action removes a #${id} dm`;
  }
}
