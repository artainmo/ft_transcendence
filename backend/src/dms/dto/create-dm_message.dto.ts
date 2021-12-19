import { CreateDmDto } from "./create-dm.dto"
import { CreateUserDto } from "../../user/dto/create-user.dto"

export class CreateDmMessageDto {
  user: CreateUserDto
  dm: CreateDmDto
  content: string
  order: number
}
