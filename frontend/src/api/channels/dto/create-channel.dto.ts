import { CreateChannelMessageDto } from "./create-channel_message.dto"
import { CreateChannelUserDto } from "./create-channel_user.dto"
import { CreateUserDto } from "../../user/dto/create-user.dto"

export interface CreateChannelDto {
  users: CreateUserDto[]
  messages: CreateChannelMessageDto[]
  channel_users: CreateChannelUserDto[]
  type: string
  password: string
  name: string
}
