import { ChannelDto } from "./channel.dto"
import { UserDto } from "../../user/dto/user.dto"

export interface ChannelUserDto {
  channel: ChannelDto
  user: UserDto
  owner: boolean
  administrator: boolean
}
