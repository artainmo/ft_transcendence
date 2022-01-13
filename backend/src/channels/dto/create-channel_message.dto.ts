import { ChannelsMessagesEntity } from "../entities/channels_messages.entity";

export type CreateChannelMessageDto = Omit<ChannelsMessagesEntity, "id">; 
