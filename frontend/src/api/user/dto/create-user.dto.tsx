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
