import { UserEntity } from "../../user/entities/user.entity"

export class CreateFriendDto {
  me: UserEntity;
  friend_id: number;
}
