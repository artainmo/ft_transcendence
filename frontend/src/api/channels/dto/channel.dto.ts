export class ChannelDto {
  id: number
  users: UserEntity[]
  messages: ChannelsMessagesEntity[]
  channel_users: ChannelsUsersEntity[]
  type: string
  password: string
  name: string
}
