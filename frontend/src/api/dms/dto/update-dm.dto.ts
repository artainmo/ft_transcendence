import { UpdateDmMessageDto } from "./update-dm_message.dto"
import { UpdateUserDto } from "../../user/dto/update-user.dto"

export interface UpdateDmDto {
  users?: UpdateUserDto[]
  messages?: UpdateDmMessageDto[]
  block?: boolean
}
