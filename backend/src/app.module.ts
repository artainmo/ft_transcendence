import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { MatchHistoryModule } from "./match-history/match-history.module";
import { GamesModule } from "./games/games.module";
import { FriendsModule } from "./friends/friends.module";
import { DmsModule } from "./dms/dms.module";
import { ChannelsModule } from "./channels/channels.module";
import { UserModule } from "./user/user.module";
import { ChatGateway } from './gateways/chat/chat.gateway';
import { GameGateway } from './gateways/game/game.gateway';
import { channelPasswordEncryptionMiddleware } from './middleware/passwordEncryption.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { setUserStatusInterceptor } from './interceptors/userStatus.interceptor';


@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, ChannelsModule, DmsModule,
            FriendsModule, GamesModule, MatchHistoryModule],
  providers: [ChatGateway, GameGateway, { provide: APP_INTERCEPTOR, useClass: setUserStatusInterceptor}]
})
export class AppModule {
  async configure(consumer: MiddlewareConsumer) {
    await consumer.apply(channelPasswordEncryptionMiddleware).forRoutes('/channels');
  }
}
