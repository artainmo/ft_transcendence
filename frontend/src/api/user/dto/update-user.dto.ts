import { UpdateMatchHistoryDto } from "../../match-history/dto/update-match-history.dto";
import { UpdateFriendDto } from "../../friends/dto/update-friend.dto";
import { UpdateChannelDto } from "../../channels/dto/update-channel.dto";
import { UpdateChannelUserDto } from "../../channels/dto/update-channel_user.dto";
import { UpdateChannelMessageDto } from "../../channels/dto/update-channel_message.dto";
import { UpdateDmDto } from "../../dms/dto/update-dm.dto";
import { UpdateDmMessageDto } from "../../dms/dto/update-dm_message.dto";

export interface UpdateUserDto {
  name?: string;
  login?: string;
  avatar?: string;
  hasTwoFactorAuthentication?: boolean;
  twoFactorAuthenticationSecret?: string;
  online?: boolean;
  nbrVicotry?: number;
  nbrLoss?: number;
  matchHistory?: UpdateMatchHistoryDto[]
  friends?: UpdateFriendDto[]
  dms?: UpdateDmDto[]
  dms_messages?: UpdateDmMessageDto[]
  channels?: UpdateChannelDto[]
  channels_messages?: UpdateChannelMessageDto[]
  channels_users?: UpdateChannelUserDto[]
}
