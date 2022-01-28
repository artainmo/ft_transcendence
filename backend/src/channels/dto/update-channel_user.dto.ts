import { CreateChannelUserDto } from './create-channel_user.dto';
import { PartialType } from "@nestjs/mapped-types";

export class UpdateChannelUserDto extends PartialType(CreateChannelUserDto) {}
