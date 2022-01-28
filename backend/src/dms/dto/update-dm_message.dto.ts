import { CreateDmMessageDto } from './create-dm_message.dto';
import { PartialType } from "@nestjs/mapped-types";

export class UpdateDmMessageDto extends PartialType(CreateDmMessageDto) {}
