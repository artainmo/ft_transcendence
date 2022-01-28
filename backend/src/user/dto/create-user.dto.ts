import { UserEntity } from "../entities/user.entity";
import { OmitType } from "@nestjs/mapped-types";

export class CreateUserDto extends OmitType(UserEntity, ["id"]) {}
