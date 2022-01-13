import { DmsMessagesEntity } from "../entities/dms_messages.entity";

export type CreateDmMessageDto = Omit<DmsMessagesEntity, "id">;
