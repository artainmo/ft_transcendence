import { CreateDmMessageDto } from "./create-dm_message.dto"
import { CreateUserDto } from "../../user/dto/create-user.dto"

export interface CreateDmDto {
  users: CreateUserDto[]
  messages: CreateDmMessageDto[]
  block: boolean
}
