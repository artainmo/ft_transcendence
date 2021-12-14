import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { GamesEntity } from "games.entity";
import { MatchHistoryEntity } from "match_history.entity";
import { FriendsEntity } from "friends.entity";
import { ChannelsEntity } from "channels.entity";
import { ChannelsUsersEntity } from "channels_users.entity";
import { ChannelsMessagesEntity } from "channels_messages.entity";
import { DMsEntity } from "dms.entity";
import { DMsMessagesEntity } from "dms_messages.entity";

@Entity()
export class UserEntity {

    @PrimaryGeneratedColumn()
    @OneToOne(type => GamesEntity, GamesEntity => GamesEntity.user1_id)
    @OneToOne(type => GamesEntity, GamesEntity => GamesEntity.user2_id)
    @OneToMany(type => MatchHistoryEntity, MatchHistoryEntity => MatchHistoryEntity.user1_id)
    @OneToMany(type => MatchHistoryEntity, MatchHistoryEntity => MatchHistoryEntity.user2_id)
    @OneToMany(type => FriendsEntity, FriendsEntity => FriendsEntity.user1_id)
    @OneToMany(type => FriendsEntity, FriendsEntity => FriendsEntity.user2_id)
    @ManyToMany(type => ChannelsEntity, ChannelsEntity => ChannelsEntity.id)
    @OneToMany(type => ChannelsUsersEntity, ChannelsUsersEntity => ChannelsUsersEntity.user_id)
    @OneToMany(type => ChannelsMessagesEntity, ChannelsMessagesEntity => ChannelsMessagesEntity.user_id)
    @ManyToMany(type => DMsEntity, DMsEntity => DMsEntity.id)
    @OneToMany(type => DMsMessagesEntity, DMsMessagesEntity => DMsMessagesEntity.user_id)
    id: number;

    @Column()
    name: string;

    @Column()
    login: string;

    @Column()
    avatar: string;

    @Column()
    hasTwoFactorAuthentication: string

    @Column()
    twoFactorAuthenticationSecret: string

    @Column()
    status: string

    @Column()
    nbrVicotry: number

    @Column()
    nbrLoss: number
}
