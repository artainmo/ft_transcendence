import { MatchHistoryEntity } from "../entities/match_history.entity";

export type CreateMatchHistoryDto = Omit<MatchHistoryEntity, "id">;
