import { GamesEntity } from "./../entities/games.entity"
import { OmitType } from "@nestjs/mapped-types";

export class CreateGameDto extends OmitType(GamesEntity, ["id"]) {}
