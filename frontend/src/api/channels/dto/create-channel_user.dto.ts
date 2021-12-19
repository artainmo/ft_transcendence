import { CreateChannelDto } from "./create-channel.dto"
import { CreateUserDto } from "../../user/dto/create-user.dto"

export interface CreateChannelUserDto {
  channel: CreateChannelDto
  user: CreateUserDto
  owner: boolean
  administrator: boolean
}
