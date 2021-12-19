import { CreateMatchHistoryDto } from "../../match-history/dto/create-match-history.dto";
import { CreateFriendDto } from "../../friends/dto/create-friend.dto";
import { CreateChannelDto } from "../../channels/dto/create-channel.dto";
import { CreateChannelUserDto } from "../../channels/dto/create-channel_user.dto";
import { CreateChannelMessageDto } from "../../channels/dto/create-channel_message.dto";
import { CreateDmDto } from "../../dms/dto/create-dm.dto";
import { CreateDmMessageDto } from "../../dms/dto/create-dm_message.dto";

export class CreateUserDto {
  name: string;
  login: string;
  avatar: string;
  hasTwoFactorAuthentication: boolean;
  twoFactorAuthenticationSecret: string;
  online: boolean;
  nbrVicotry: number;
  nbrLoss: number;
  matchHistory: CreateMatchHistoryDto[]
  friends: CreateFriendDto[]
  dms: CreateDmDto[]
  dms_messages: CreateDmMessageDto[]
  channels: CreateChannelDto[]
  channels_messages: CreateChannelMessageDto[]
  channels_users: CreateChannelUserDto[]
}
