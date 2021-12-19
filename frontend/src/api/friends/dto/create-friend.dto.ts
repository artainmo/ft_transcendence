import { CreateUserDto } from "../../user/dto/create-user.dto"

export interface CreateFriendDto {
  me: CreateUserDto;
  friend_id: number;
}
