import { UpdateChannelDto } from "./update-channel.dto"
import { UpdateUserDto } from "../../user/dto/update-user.dto"

export interface UpdateChannelMessageDto {
  channel?: UpdateChannelDto
  user?: UpdateUserDto
  content?: string
  order?: number
}
