import { ChannelsEntity } from "../entities/channels.entity";

export type CreateChannelDto = Omit<ChannelsEntity, "id">;
