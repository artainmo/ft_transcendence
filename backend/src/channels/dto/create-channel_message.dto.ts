import { CreateChannelDto } from "./create-channel.dto"
import { CreateUserDto } from "../../user/dto/create-user.dto"

export class CreateChannelMessageDto {
  channel: CreateChannelDto
  user: CreateUserDto
  content: string
  order: number
}
