import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";
import { ChannelsMessagesEntity } from "./channels_messages.entity"
import { ChannelsUsersEntity } from "./channels_users.entity"
import { UserEntity } from "../../user/entities/user.entity"

@Entity()
export class ChannelsEntity {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToMany(type => UserEntity, UserEntity => UserEntity.channels)
  users: UserEntity[]

  @OneToMany(type => ChannelsMessagesEntity, ChannelsMessagesEntity => ChannelsMessagesEntity.channel)
  messages: ChannelsMessagesEntity[]

  @OneToMany(type => ChannelsUsersEntity, ChannelsUsersEntity => ChannelsUsersEntity.channel)
  channel_users: ChannelsUsersEntity[]

  @Column()
  type: string

  @Column()
  password: string

  @Column()
  name: string
}
