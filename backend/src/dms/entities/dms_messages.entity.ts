import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { DmsEntity } from "dms.entity"
import { UserEntity } from "user.entity"

export class DmsMessagesEntity {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => DmsEntity, DMsEntity => DmsEntity.id)
  @JoinColumn()
  dm_id: number

  @ManyToOne(type => UserEntity, UserEntity => UserEntity.id)
  @JoinColumn()
  user_id: number

  @Column()
  content: string

  @Column()
  order: number
}
