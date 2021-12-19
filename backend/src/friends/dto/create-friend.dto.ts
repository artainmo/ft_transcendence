import { CreateUserDto } from "../../user/dto/create-user.dto"

export class CreateFriendDto {
  me: CreateUserDto;
  friend_id: number;
}
