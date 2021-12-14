import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import DMsEntity from "dms.entity"
import UserEntity from "user.entity"

export class DMsMessagesEntity {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(type => DMsEntity, DMsEntity => DMsEntity.id)
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
