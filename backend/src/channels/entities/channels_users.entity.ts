import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ChannelsEntity } from "channels.entity"
import { UserEntity } from "user.entity"

export class ChannelsUsersEntity {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => ChannelsEntity, ChannelsEntity => ChannelsEntity.id)
  @JoinColumn()
  channel_id: number

  @ManyToOne(type => UserEntity, UserEntity => UserEntity.id)
  @JoinColumn()
  user_id: number

  @Column()
  owner: boolean

  @Column()
  administrator: boolean
}
