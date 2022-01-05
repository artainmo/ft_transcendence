import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";
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

    @Column({unique: true})
    name: string;

    @Column({unique: true})
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

    @ManyToMany(type => DmsEntity, DmsEntity => DmsEntity.users)
    dms: DmsEntity[]

    @ManyToMany(type => ChannelsEntity, ChannelsEntity => ChannelsEntity.users)
    channels: ChannelsEntity[]
}
