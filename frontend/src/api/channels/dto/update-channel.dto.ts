import { UpdateChannelMessageDto } from "./update-channel_message.dto"
import { UpdateChannelUserDto } from "./update-channel_user.dto"
import { UpdateUserDto } from "../../user/dto/update-user.dto"

export interface UpdateChannelDto {
  users?: UpdateUserDto[]
  messages?: UpdateChannelMessageDto[]
  channel_users?: UpdateChannelUserDto[]
  type?: string
  password?: string
  name?: string
}
