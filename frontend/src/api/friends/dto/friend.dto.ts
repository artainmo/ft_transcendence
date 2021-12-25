import { UserDto } from "../../user/dto/user.dto"

export interface FriendDto {
  id: number
  me: UserDto;
  friend_id: number;
}
