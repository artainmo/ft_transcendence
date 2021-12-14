import { Module } from '@nestjs/common';
import { MatchHistoryService } from './match-history.service';
import { MatchHistoryController } from './match-history.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { MatchHistoryEntity } from "entities/match_history.entity"

@Module({
  imports: [TypeOrmModule.forFeature([MatchHistoryEntity])],
  controllers: [MatchHistoryController],
  providers: [MatchHistoryService]
})
export class MatchHistoryModule {}
