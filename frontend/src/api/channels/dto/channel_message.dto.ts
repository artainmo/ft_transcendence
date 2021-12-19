export class ChannelMessageDto {
  id: number
  channel: ChannelsEntity
  user: UserEntity
  content: string
  order: number
}
