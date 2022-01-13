import { GamesEntity } from "./../entities/games.entity"

export type CreateGameDto = Omit<GamesEntity, "id">;
