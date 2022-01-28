import { CreateChannelMessageDto } from './create-channel_message.dto';
import { PartialType } from "@nestjs/mapped-types";

export class UpdateChannelMessageDto extends PartialType(CreateChannelMessageDto) {}
