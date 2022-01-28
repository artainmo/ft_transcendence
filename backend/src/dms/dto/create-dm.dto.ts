import { DmsEntity } from "../entities/dms.entity";
import { OmitType } from "@nestjs/mapped-types";

export class CreateDmDto extends OmitType(DmsEntity, ["id"]) {}
