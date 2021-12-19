import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { GamesEntity } from './entities/games.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GamesEntity])],
  controllers: [GamesController],
  providers: [GamesService]
})
export class GamesModule {}
