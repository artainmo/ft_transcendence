import { CreateUserDto } from "../../user/dto/create-user.dto"

export class CreateMatchHistoryDto {
  me: CreateUserDto;
  my_score: string;
  opponent_id: number;
  opponent_score: string;
}
