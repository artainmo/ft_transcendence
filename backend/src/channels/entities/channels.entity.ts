import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";
import { ChannelsMessagesEntity } from "./channels_messages.entity"
import { ChannelsUsersEntity } from "./channels_users.entity"
import { UserEntity } from "../../user/entities/user.entity"

@Entity()
export class ChannelsEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToMany(type => UserEntity, UserEntity => UserEntity.channels, {eager: true})
  users: UserEntity[]

  @OneToMany(type => ChannelsUsersEntity, ChannelsUsersEntity => ChannelsUsersEntity.channel, {eager: true, cascade: true})
  channel_users: ChannelsUsersEntity[]

  @OneToMany(type => ChannelsMessagesEntity, ChannelsMessagesEntity => ChannelsMessagesEntity.channel, {eager: true, cascade: true})
  messages: ChannelsMessagesEntity[]

  @Column()
  type: string

  @Column()
  password: string

  @Column()
  name: string
}
