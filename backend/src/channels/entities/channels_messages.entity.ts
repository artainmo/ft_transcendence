import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ChannelsEntity } from "./channels.entity"
import { UserEntity } from "../../user/entities/user.entity"

@Entity({ orderBy: { order: "DESC" } })
export class ChannelsMessagesEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => UserEntity, {eager: true})
  @JoinColumn()
  user: UserEntity

  @ManyToOne(type => ChannelsEntity, ChannelsEntity => ChannelsEntity.messages, { onDelete: "CASCADE" })
  @JoinColumn()
  channel: ChannelsEntity

  @Column()
  content: string

  @Column()
  order: number
}
