import { UserDto } from "../../user/dto/user.dto"

export interface GameDto {
  user1: UserDto;
  user2: UserDto;
  ballspeed: number;
  map: string;
}
