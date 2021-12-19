export class ChannelUserDto {
  id: number
  channel: ChannelsEntity
  user: UserEntity
  owner: boolean
  administrator: boolean
}
