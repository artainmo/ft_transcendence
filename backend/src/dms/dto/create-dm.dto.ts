import { DmsEntity } from "../entities/dms.entity";

export type CreateDmDto = Omit<DmsEntity, "id">;
