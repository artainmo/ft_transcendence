import { PartialType } from '@nestjs/mapped-types';
import { CreateDmMessageDto } from './create-dm_message.dto';

export class UpdateDmMessageDto extends PartialType(CreateDmMessageDto) {}
