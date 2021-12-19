import { UserEntity } from "../../user/entities/user.entity"

export class CreateGameDto {
  user1: UserEntity;
  user2: UserEntity;
  ballspeed: number;
  map: string;
}
