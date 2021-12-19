import { UpdateChannelDto } from "./update-channel.dto"
import { UpdateUserDto } from "../../user/dto/update-user.dto"

export interface UpdateChannelUserDto {
  channel?: UpdateChannelDto
  user?: UpdateUserDto
  owner?: boolean
  administrator?: boolean
}
