import { MatchHistoryDto } from "../../match-history/dto/match-history.dto";
import { FriendDto } from "../../friends/dto/friend.dto";
import { ChannelDto } from "../../channels/dto/channel.dto";
import { ChannelUserDto } from "../../channels/dto/channel_user.dto";
import { ChannelMessageDto } from "../../channels/dto/channel_message.dto";
import { DmDto } from "../../dms/dto/dm.dto";
import { DmMessageDto } from "../../dms/dto/dm_message.dto";

export interface UserDto {
  name: string;
  login: string;
  avatar: string;
  hasTwoFactorAuthentication: boolean;
  twoFactorAuthenticationSecret: string;
  online: boolean;
  nbrVicotry: number;
  nbrLoss: number;
  matchHistory: MatchHistoryDto[]
  friends: FriendDto[]
  dms: DmDto[]
  dms_messages: DmMessageDto[]
  channels: ChannelDto[]
  channels_messages: ChannelMessageDto[]
  channels_users: ChannelUserDto[]
}
