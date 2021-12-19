import { UpdateUserDto } from "../../user/dto/update-user.dto"

export interface UpdateGameDto {
  user1?: UpdateUserDto;
  user2?: UpdateUserDto;
  ballspeed?: number;
  map?: string;
}
