import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { DmsEntity } from "./dms.entity"
import { UserEntity } from "../../user/entities/user.entity"

@Entity({ orderBy: { order: "DESC" } })
export class DmsMessagesEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => UserEntity, {eager: true})
  @JoinColumn()
  user: UserEntity

  @ManyToOne(type => DmsEntity, DmsEntity => DmsEntity.messages)
  @JoinColumn()
  dm: DmsEntity

  @Column()
  content: string

  @Column()
  order: number
}
