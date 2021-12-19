import { ChannelsEntity } from "../entities/channels.entity"
import { UserEntity } from "../../user/entities/user.entity"

export class CreateChannelMessageDto {
  channel: ChannelsEntity
  user: UserEntity
  content: string
  order: number
}
