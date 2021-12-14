import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ChannelsMessagesEntity } from "channels_messages.entity"
import { ChannelsUsersEntity } from "channels_users.entity"
import { UserEntity } from "user.entity"

export class ChannelsEntity {

  @PrimaryGeneratedColumn()
  @OneToMany(type => ChannelsMessagesEntity, ChannelsMessagesEntity => ChannelsMessagesEntity.channel_id)
  @OneToMany(type => ChannelsUsersEntity, ChannelsUsersEntity => ChannelsUsersEntity.channel_id)
  @ManyToMany(type => UserEntity, UserEntity => UserEntity.id)
  id: number

  @Column()
  type: string

  @Column()
  password: string

  @Column()
  name: string
}
