import { DmsMessagesEntity } from "../entities/dms_messages.entity";
import { OmitType } from "@nestjs/mapped-types";

export class CreateDmMessageDto extends OmitType(DmsMessagesEntity, ["id"]) {}
