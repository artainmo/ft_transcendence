import { CreateFriendDto } from './create-friend.dto';
import { PartialType } from "@nestjs/mapped-types";

export class UpdateFriendDto extends PartialType(CreateFriendDto) {}
