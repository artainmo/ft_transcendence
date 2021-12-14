import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { DmsEntity } from "dms.entity"
import { UserEntity } from "user.entity"

export class DmsMessagesEntity {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => UserEntity, UserEntity => UserEntity.dms_messages)
  @JoinColumn()
  user: UserEntity

  @ManyToOne(type => DmsEntity, DMsEntity => DmsEntity.messages)
  @JoinColumn()
  dm: DmsEntity

  @Column()
  content: string

  @Column()
  order: number
}
