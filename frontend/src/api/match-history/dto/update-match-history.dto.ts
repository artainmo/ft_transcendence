import { UpdateUserDto } from "../../user/dto/update-user.dto"

export interface UpdateMatchHistoryDto {
  me?: UpdateUserDto;
  my_score?: string;
  opponent_id?: number;
  opponent_score?: string;
}
