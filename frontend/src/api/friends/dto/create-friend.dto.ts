import { FriendDto } from "./friend.dto";

export type CreateFriendDto = Omit<FriendDto, "id">
