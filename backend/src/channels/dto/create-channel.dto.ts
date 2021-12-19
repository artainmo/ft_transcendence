import { ChannelsMessagesEntity } from "../entities/channels_messages.entity"
import { ChannelsUsersEntity } from "../entities/channels_users.entity"
import { UserEntity } from "../../user/entities/user.entity"

export class CreateChannelDto {
  users: UserEntity[]
  messages: ChannelsMessagesEntity[]
  channel_users: ChannelsUsersEntity[]
  type: string
  password: string
  name: string
}
