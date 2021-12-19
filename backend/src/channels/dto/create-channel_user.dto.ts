import { ChannelsEntity } from "../entities/channels.entity"
import { UserEntity } from "../../user/entities/user.entity"

export class CreateChannelUserDto {
  channel: ChannelsEntity
  user: UserEntity
  owner: boolean
  administrator: boolean
}
