import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { ChannelsMessagesEntity } from "./channels_messages.entity"
import { ChannelsUsersEntity } from "./channels_users.entity"
import { UserEntity } from "../../user/entities/user.entity"

@Entity()
export class ChannelsEntity {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToMany(type => UserEntity, UserEntity => UserEntity.channels)
  @JoinTable()
  users: UserEntity[]

  @OneToMany(type => ChannelsUsersEntity, ChannelsUsersEntity => ChannelsUsersEntity.channel)
  channel_users: ChannelsUsersEntity[]

  @OneToMany(type => ChannelsMessagesEntity, ChannelsMessagesEntity => ChannelsMessagesEntity.channel)
  messages: ChannelsMessagesEntity[]

  @Column()
  type: string

  @Column()
  password: string

  @Column()
  name: string
}
