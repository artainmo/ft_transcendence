import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { GamesEntity } from "../../games/entities/games.entity";
import { MatchHistoryEntity } from "../../match-history/entities/match_history.entity";
import { FriendsEntity } from "../../friends/entities/friends.entity";
import { ChannelsEntity } from "../../channels/entities/channels.entity";
import { ChannelsUsersEntity } from "../../channels/entities/channels_users.entity";
import { ChannelsMessagesEntity } from "../../channels/entities/channels_messages.entity";
import { DmsEntity } from "../../dms/entities/dms.entity";
import { DmsMessagesEntity } from "../../dms/entities/dms_messages.entity";

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
    online: boolean;

    @Column()
    nbrVicotry: number;

    @Column()
    nbrLoss: number;

    @OneToMany(type => MatchHistoryEntity, MatchHistoryEntity => MatchHistoryEntity.me)
    matchHistory: MatchHistoryEntity[]

    @OneToMany(type => FriendsEntity, FriendsEntity => FriendsEntity.me)
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
