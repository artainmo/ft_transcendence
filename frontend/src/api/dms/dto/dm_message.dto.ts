import { DmDto } from "./dm.dto"
import { UserDto } from "../../user/dto/user.dto"

export interface DmMessageDto {
  user: UserDto
  dm: DmDto
  content: string
  order: number
}
