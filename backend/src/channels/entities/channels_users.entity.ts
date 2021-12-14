import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ChannelsEntity } from "channels.entity"
import { UserEntity } from "user.entity"

export class ChannelsUsersEntity {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => ChannelsEntity, ChannelsEntity => ChannelsEntity.channels_users)
  @JoinColumn()
  channel: ChannelsEntity

  @ManyToOne(type => UserEntity, UserEntity => UserEntity.channels_users)
  @JoinColumn()
  user: UserEntity

  @Column()
  owner: boolean

  @Column()
  administrator: boolean
}
