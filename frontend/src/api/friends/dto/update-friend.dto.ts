import { UpdateUserDto } from "../../user/dto/update-user.dto"

export interface UpdateFriendDto {
  me?: UpdateUserDto;
  friend_id?: number;
}
