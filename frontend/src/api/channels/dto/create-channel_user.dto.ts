export class CreateChannelUserDto {
  channel: ChannelsEntity
  user: UserEntity
  owner: boolean
  administrator: boolean
}
