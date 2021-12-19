import { Injectable } from '@nestjs/common';
import { CreateMatchHistoryDto } from './dto/create-match-history.dto';
import { UpdateMatchHistoryDto } from './dto/update-match-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MatchHistoryEntity } from "./entities/match_history.entity"

@Injectable()
export class MatchHistoryService {
  constructor(
    @InjectRepository(MatchHistoryEntity)
    private MatchHistoryRepo: Repository<MatchHistoryEntity>
  ) {}

  async create(createMatchHistoryDto: CreateMatchHistoryDto): Promise<void> {
    await this.MatchHistoryRepo.save(createMatchHistoryDto);
  }

  async findAll(): Promise<MatchHistoryEntity[]>  {
    return await this.MatchHistoryRepo.find();
  }

  async findOne(id: number): Promise<MatchHistoryEntity> {
    return await this.MatchHistoryRepo.findOne(id);;
  }

  async update(id: number, updateMatchHistoryDto: UpdateMatchHistoryDto): Promise<void>  {
    await this.MatchHistoryRepo.update(id, updateMatchHistoryDto);
  }

  async remove(id: number): Promise<void> {
    await this.MatchHistoryRepo.delete(id);
  }
}
