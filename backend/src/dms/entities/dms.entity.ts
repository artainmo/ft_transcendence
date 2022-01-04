import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { DmsMessagesEntity } from "./dms_messages.entity"
import { UserEntity } from "../../user/entities/user.entity"

@Entity()
export class DmsEntity {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToMany(type => UserEntity, UserEntity => UserEntity.dms)
  @JoinTable()
  users: UserEntity[]

  @OneToMany(type => DmsMessagesEntity, DmsMessagesEntity => DmsMessagesEntity.dm)
  messages: DmsMessagesEntity[]

  @Column()
  block: boolean
}
