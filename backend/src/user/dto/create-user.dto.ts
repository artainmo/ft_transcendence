import { UserEntity } from "../entities/user.entity";

export type CreateUserDto = Omit<UserEntity, "id">;
