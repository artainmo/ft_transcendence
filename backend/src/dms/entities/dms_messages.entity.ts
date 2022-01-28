import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { DmsEntity } from "./dms.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { IsString, ValidateNested, IsInt, Min } from "class-validator";
import { Type } from 'class-transformer';

@Entity({ orderBy: { order: "DESC" } })
export class DmsMessagesEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => UserEntity, {eager: true})
  @JoinColumn()
  @ValidateNested()
  @Type(() => UserEntity)
  user: UserEntity

  @ManyToOne(type => DmsEntity, DmsEntity => DmsEntity.messages)
  @JoinColumn()
  @ValidateNested()
  @Type(() => DmsEntity)
  dm: DmsEntity

  @Column()
  @IsString()
  content: string

  @Column()
  @IsInt()
  @Min(0)
  order: number
}
