import { ChannelsUsersEntity } from "../entities/channels_users.entity";

export type CreateChannelUserDto = Omit<ChannelsUsersEntity, "id">;
