import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { GamesEntity } from "games.entity";
import { MatchHistoryEntity } from "match_history.entity";
import { FriendsEntity } from "friends.entity";
import { ChannelsEntity } from "channels.entity";
import { ChannelsUsersEntity } from "channels_users.entity";
import { ChannelsMessagesEntity } from "channels_messages.entity";
import { DmsEntity } from "dms.entity";
import { DmsMessagesEntity } from "dms_messages.entity";

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    login: string;

    @Column()
    avatar: string;

    @Column()
    hasTwoFactorAuthentication: boolean;

    @Column()
    twoFactorAuthenticationSecret: string;

    @Column()
    status: boolean;

    @Column()
    nbrVicotry: number;

    @Column()
    nbrLoss: number;

    @OneToMany(type => MatchHistoryEntity, MatchHistoryEntity => MatchHistoryEntity.me)
    matchHistory: MatchHistoryEntity[]

    @OneToMany(type => FriendsEntity, FriendsEntity => FriendsEntity.user)
    friends: FriendsEntity[]

    @ManyToMany(type => DmsEntity, DMsEntity => DmsEntity.users)
    dms: DmsEntity[]

    @OneToMany(type => DmsMessagesEntity, DmsMessagesEntity => DmsMessagesEntity.user)
    dms_messages: DmsMessagesEntity[]

    @ManyToMany(type => ChannelsEntity, ChannelsEntity => ChannelsEntity.users)
    channels: ChannelsEntity[]

    @OneToMany(type => ChannelsMessagesEntity, ChannelsMessagesEntity => ChannelsMessagesEntity.user)
    channels_messages: ChannelsMessagesEntity[]

    @OneToMany(type => ChannelsUsersEntity, ChannelsUsersEntity => ChannelsUsersEntity.user)
    channels_users: ChannelsUsersEntity[]
}
