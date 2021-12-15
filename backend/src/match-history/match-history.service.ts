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

  create(createMatchHistoryDto: CreateMatchHistoryDto): void {
    await this.MatchHistoryRepo.save(createMatchHistoryDto);
  }

  findAll(): Promise<MatchHistoryEntity[]>  {
    return await this.MatchHistoryRepo.find();
  }

  findOne(id: number): Promise<MatchHistoryEntity> {
    return await this.MatchHistoryRepo.findOne(id);;
  }

  update(id: number, updateMatchHistoryDto: UpdateMatchHistoryDto): void  {
    await this.MatchHistoryRepo.update(id, updateMatchHistoryDto);
  }

  remove(id: number): void {
    await this.MatchHistoryRepo.delete(id);
  }
}
