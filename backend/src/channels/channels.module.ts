import { Module } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { ChannelsController } from './channels.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChannelsMessagesEntity } from "./entities/channels_messages.entity";
import { ChannelsUsersEntity } from "./entities/channels_users.entity";
import { ChannelsEntity } from "./entities/channels.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ChannelsEntity, ChannelsUsersEntity, ChannelsMessagesEntity])],
  controllers: [ChannelsController],
  providers: [ChannelsService]
})
export class ChannelsModule {}
