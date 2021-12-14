import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { DmsMessagesEntity } from "dms_messages.entity"
import { UserEntity } from "user.entity"

export class DmsEntity {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToMany(type => UserEntity, UserEntity => UserEntity.dms)
  users: UserEntity[]

  @OneToMany(type => DmsMessagesEntity, DMsMessagesEntity => DmsMessagesEntity.dm)
  messages: DmsMessagesEntity[]

  @Column()
  block: boolean
}
