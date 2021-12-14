import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import DMsMessagesEntity from "dms_messages.entity"
import UserEntity from "user.entity"

export class DMsEntity {

  @PrimaryGeneratedColumn()
  @OneToMany(type => DMsMessagesEntity, DMsMessagesEntity => DMsMessagesEntity.dm_id)
  @ManyToMany(type => UserEntity, UserEntity => UserEntity.id)
  id: number

  @Column()
  block: boolean
}
