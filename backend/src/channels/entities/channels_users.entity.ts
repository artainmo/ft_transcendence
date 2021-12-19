import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ChannelsEntity } from "./channels.entity"
import { UserEntity } from "../../user/entities/user.entity"

@Entity()
export class ChannelsUsersEntity {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => ChannelsEntity, ChannelsEntity => ChannelsEntity.channel_users)
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
