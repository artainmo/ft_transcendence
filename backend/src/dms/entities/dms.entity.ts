import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { DmsMessagesEntity } from "./dms_messages.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { IsArray, ValidateNested, IsBoolean, IsInt, Min } from "class-validator";
import { Type } from 'class-transformer';

@Entity()
export class DmsEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToMany(type => UserEntity, UserEntity => UserEntity.dms, {eager: true})
  @JoinTable()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserEntity)
  users: UserEntity[]

  @OneToMany(type => DmsMessagesEntity, DmsMessagesEntity => DmsMessagesEntity.dm, {eager: true, cascade: true})
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DmsMessagesEntity)
  messages: DmsMessagesEntity[]

  @Column()
  @IsBoolean()
  block: boolean

  @Column({ nullable: false, type: "int", default: 0 })
  @IsInt()
  @Min(0)
  user_id_who_initiated_blocking: number
}
