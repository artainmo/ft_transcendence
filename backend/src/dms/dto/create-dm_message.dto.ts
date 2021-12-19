import { DmsEntity } from "../entities/dms.entity"
import { UserEntity } from "../../user/entities/user.entity"

export class CreateDmMessageDto {
  user: UserEntity
  dm: DmsEntity
  content: string
  order: number
}
