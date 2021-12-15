export class ResponseChannelMessageDto {
  id: number
  channel: ChannelsEntity
  user: UserEntity
  content: string
  order: number
}
