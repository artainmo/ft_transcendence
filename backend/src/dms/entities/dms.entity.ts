import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { DmsMessagesEntity } from "dms_messages.entity"
import { UserEntity } from "user.entity"

export class DmsEntity {

  @PrimaryGeneratedColumn()
  @OneToMany(type => DmsMessagesEntity, DMsMessagesEntity => DmsMessagesEntity.dm_id)
  @ManyToMany(type => UserEntity, UserEntity => UserEntity.id)
  id: number

  @Column()
  block: boolean
}
