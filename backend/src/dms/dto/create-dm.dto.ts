import { DmsMessagesEntity } from "../entities/dms_messages.entity"
import { UserEntity } from "../../user/entities/user.entity"

export class CreateDmDto {
  users: UserEntity[]
  messages: DmsMessagesEntity[]
  block: boolean
}
