import { ChannelsMessagesEntity } from "../entities/channels_messages.entity";
import { OmitType } from "@nestjs/mapped-types";

export class CreateChannelMessageDto extends OmitType(ChannelsMessagesEntity, ["id"]) {}
