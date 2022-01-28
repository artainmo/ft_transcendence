import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";
import { ValidateNested, IsInt, IsPositive } from "class-validator";
import { Type } from 'class-transformer';

@Entity()
export class FriendsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => UserEntity, UserEntity => UserEntity.friends)
    @JoinColumn()
    @ValidateNested()
    @Type(() => UserEntity)
    me: UserEntity;

    @Column()
    @IsInt()
    @IsPositive()
    friend_id: number;
}
