import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GamesEntity } from './entities/games.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(GamesEntity)
    private GamesRepo: Repository<GamesEntity>
  ) {}

  async create(createGameDto: CreateGameDto): Promise<void> {
    await this.GamesRepo.save(createGameDto);
  }

  async findAll(): Promise<GamesEntity[]> {
    return await this.GamesRepo.find();
  }

  async findOne(id: number): Promise<GamesEntity> {
    return await this.GamesRepo.findOne(id);
  }

  async update(id: number, updateGameDto: UpdateGameDto): Promise<void> {
    await this.GamesRepo.update(id, updateGameDto);
  }

  async remove(id: number): Promise<void> {
    await this.GamesRepo.delete(id);
  }
}
