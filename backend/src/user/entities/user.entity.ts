import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { MatchHistoryEntity } from "../../match-history/entities/match_history.entity";
import { FriendsEntity } from "../../friends/entities/friends.entity";
import { ChannelsEntity } from "../../channels/entities/channels.entity";
import { ChannelsUsersEntity } from "../../channels/entities/channels_users.entity";
import { ChannelsMessagesEntity } from "../../channels/entities/channels_messages.entity";
import { DmsEntity } from "../../dms/entities/dms.entity";
import { DmsMessagesEntity } from "../../dms/entities/dms_messages.entity";
import { ValidateNested, IsNotEmpty, IsString, IsBoolean, IsInt, Min, IsArray, IsOptional } from "class-validator";
import { Type } from 'class-transformer';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    @IsNotEmpty()
    @IsString()
    name: string;

    @Column({unique: true})
    @IsNotEmpty()
    @IsString()
    login: string;

    @Column()
    @IsString()
    avatar: string;

    @Column()
    @IsBoolean()
    hasTwoFactorAuthentication: boolean;

    @Column()
    @IsString()
    twoFactorAuthenticationSecret: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    status: string;

    @Column()
    @IsInt()
    @Min(0)
    nbrVicotry: number;

    @Column()
    @IsInt()
    @Min(0)
    nbrLoss: number;

    @OneToMany(type => MatchHistoryEntity, MatchHistoryEntity => MatchHistoryEntity.me)
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MatchHistoryEntity)
    matchHistory: MatchHistoryEntity[]

    @OneToMany(type => FriendsEntity, FriendsEntity => FriendsEntity.me)
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FriendsEntity)
    friends: FriendsEntity[]

    @ManyToMany(type => DmsEntity, DmsEntity => DmsEntity.users)
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DmsEntity)
    dms: DmsEntity[]

    @ManyToMany(type => ChannelsEntity, ChannelsEntity => ChannelsEntity.users)
    @JoinTable()
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ChannelsEntity)
    channels: ChannelsEntity[]
}
