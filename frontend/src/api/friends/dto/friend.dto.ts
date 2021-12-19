import { UserDto } from "../../user/dto/user.dto"

export interface FriendDto {
  me: UserDto;
  friend_id: number;
}
