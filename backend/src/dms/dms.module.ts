import { Module } from '@nestjs/common';
import { DmsService } from './dms.service';
import { DmsController } from './dms.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { DmsMessagesEntity } from "entities/dms_messages.entity";
import { DmsEntity } from "entities/dms.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DmsEntity, DmsMessagesEntity])],
  controllers: [DmsController],
  providers: [DmsService]
})
export class DmsModule {}
