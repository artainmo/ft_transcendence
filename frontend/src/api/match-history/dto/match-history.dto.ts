import { UserDto } from "../../user/dto/user.dto"

export interface MatchHistoryDto {
  me: UserDto;
  my_score: string;
  opponent_id: number;
  opponent_score: string;
}
