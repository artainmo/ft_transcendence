import { ChannelsUsersEntity } from "../entities/channels_users.entity";
import { OmitType } from "@nestjs/mapped-types";

export class CreateChannelUserDto extends OmitType(ChannelsUsersEntity, ["id"]) {}
