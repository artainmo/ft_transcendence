import { FriendsEntity } from "../entities/friends.entity";
import { OmitType } from "@nestjs/mapped-types";

export class CreateFriendDto extends OmitType(FriendsEntity, ["id"]) {}
