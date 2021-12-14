import { Injectable } from '@nestjs/common';
import { CreateMatchHistoryDto } from './dto/create-match-history.dto';
import { UpdateMatchHistoryDto } from './dto/update-match-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatchHistoryEntity } from "entities/match_history.entity"

@Injectable()
export class MatchHistoryService {
  constructor(
    @InjectRepository(MatchHistoryEntity)
    private MatchHistoryRepo: Repository<MatchHistoryEntity>
  ) {}

  create(createMatchHistoryDto: CreateMatchHistoryDto) {
    return 'This action adds a new matchHistory';
  }

  findAll() {
    return `This action returns all matchHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} matchHistory`;
  }

  update(id: number, updateMatchHistoryDto: UpdateMatchHistoryDto) {
    return `This action updates a #${id} matchHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} matchHistory`;
  }
}
