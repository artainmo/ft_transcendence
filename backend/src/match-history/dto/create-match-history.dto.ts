import { UserEntity } from "../../user/entities/user.entity"

export class CreateMatchHistoryDto {
  me: UserEntity;
  my_score: string;
  opponent_id: number;
  opponent_score: string;
}
