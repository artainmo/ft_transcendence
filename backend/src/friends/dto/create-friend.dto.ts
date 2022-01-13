import { FriendsEntity } from "../entities/friends.entity";

export type CreateFriendDto = Omit<FriendsEntity, "id">;
