import { MatchHistoryEntity } from "../entities/match_history.entity";
import { OmitType } from "@nestjs/mapped-types";

export class CreateMatchHistoryDto extends OmitType(MatchHistoryEntity, ["id"]) {}
