import { MatchHistoryEntity } from "../../match-history/entities/match_history.entity";
import { FriendsEntity } from "../../friends/entities/friends.entity";
import { ChannelsEntity } from "../../channels/entities/channels.entity";
import { ChannelsUsersEntity } from "../../channels/entities/channels_users.entity";
import { ChannelsMessagesEntity } from "../../channels/entities/channels_messages.entity";
import { DmsEntity } from "../../dms/entities/dms.entity";
import { DmsMessagesEntity } from "../../dms/entities/dms_messages.entity";

export class CreateUserDto {
  name: string;
  login: string;
  avatar: string;
  hasTwoFactorAuthentication: boolean;
  twoFactorAuthenticationSecret: string;
  online: boolean;
  nbrVicotry: number;
  nbrLoss: number;
  matchHistory: MatchHistoryEntity[]
  friends: FriendsEntity[]
  dms: DmsEntity[]
  dms_messages: DmsMessagesEntity[]
  channels: ChannelsEntity[]
  channels_messages: ChannelsMessagesEntity[]
  channels_users: ChannelsUsersEntity[]
}
