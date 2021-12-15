export class ResponseChannelDto {
  id: number
  users: UserEntity[]
  messages: ChannelsMessagesEntity[]
  channel_users: ChannelsUsersEntity[]
  type: string
  password: string
  name: string
}
