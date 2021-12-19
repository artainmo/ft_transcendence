import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";
import { DmsMessagesEntity } from "./dms_messages.entity"
import { UserEntity } from "../../user/entities/user.entity"

@Entity()
export class DmsEntity {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToMany(type => UserEntity, UserEntity => UserEntity.dms)
  users: UserEntity[]

  @OneToMany(type => DmsMessagesEntity, DmsMessagesEntity => DmsMessagesEntity.dm)
  messages: DmsMessagesEntity[]

  @Column()
  block: boolean
}
