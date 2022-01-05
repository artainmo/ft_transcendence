import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ChannelsEntity } from "./channels.entity"
import { UserEntity } from "../../user/entities/user.entity"

@Entity()
export class ChannelsMessagesEntity {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity

  @ManyToOne(type => ChannelsEntity, ChannelsEntity => ChannelsEntity.messages)
  @JoinColumn()
  channel: ChannelsEntity

  @Column()
  content: string

  @Column()
  order: number
}
