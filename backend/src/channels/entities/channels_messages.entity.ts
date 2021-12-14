import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ChannelsEntity } from "channels.entity"
import { UserEntity } from "user.entity"

export class ChannelsMessagesEntity {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => ChannelsEntity, ChannelsEntity => ChannelsEntity.messages)
  @JoinColumn()
  channel: ChannelsEntity

  @ManyToOne(type => UserEntity, UserEntity => UserEntity.channels_messages)
  @JoinColumn()
  user: UserEntity

  @Column()
  content: string

  @Column()
  order: number
}
