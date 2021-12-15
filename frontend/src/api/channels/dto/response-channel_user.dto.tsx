export class ResponseChannelUserDto {
  id: number
  channel: ChannelsEntity
  user: UserEntity
  owner: boolean
  administrator: boolean
}
