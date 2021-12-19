import { CreateUserDto } from "../../user/dto/create-user.dto"

export class CreateGameDto {
  user1: CreateUserDto;
  user2: CreateUserDto;
  ballspeed: number;
  map: string;
}
