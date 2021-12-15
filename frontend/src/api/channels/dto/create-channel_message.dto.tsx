export class CreateChannelMessageDto {
  channel: ChannelsEntity
  user: UserEntity
  content: string
  order: number
}
