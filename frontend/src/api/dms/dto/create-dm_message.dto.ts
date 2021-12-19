import { CreateDmDto } from "./create-dm.dto"
import { CreateUserDto } from "../../user/dto/create-user.dto"

export interface CreateDmMessageDto {
  user: CreateUserDto
  dm: CreateDmDto
  content: string
  order: number
}
