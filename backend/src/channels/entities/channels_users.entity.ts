import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ChannelsEntity } from "./channels.entity"
import { UserEntity } from "../../user/entities/user.entity"

@Entity()
export class ChannelsUsersEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => UserEntity, {eager: true})
  @JoinColumn()
  user: UserEntity

  @ManyToOne(type => ChannelsEntity, ChannelsEntity => ChannelsEntity.channel_users)
  @JoinColumn()
  channel: ChannelsEntity

  @Column()
  owner: boolean

  @Column()
  administrator: boolean
}
