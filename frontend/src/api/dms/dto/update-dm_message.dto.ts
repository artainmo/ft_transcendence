import { UpdateDmDto } from "./update-dm.dto"
import { UpdateUserDto } from "../../user/dto/update-user.dto"

export interface UpdateDmMessageDto {
  user?: UpdateUserDto
  dm?: UpdateDmDto
  content?: string
  order?: number
}
