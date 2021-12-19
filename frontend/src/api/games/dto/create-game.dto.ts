import { CreateUserDto } from "../../user/dto/create-user.dto"

export interface CreateGameDto {
  user1: CreateUserDto;
  user2: CreateUserDto;
  ballspeed: number;
  map: string;
}
