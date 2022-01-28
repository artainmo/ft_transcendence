import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ChannelsEntity } from "./channels.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { IsString, ValidateNested, IsInt, Min } from "class-validator";
import { Type } from 'class-transformer';

@Entity({ orderBy: { order: "DESC" } })
export class ChannelsMessagesEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => UserEntity, {eager: true})
  @JoinColumn()
  @ValidateNested()
  @Type(() => UserEntity) //This is necessary for ValidateNested to work
  user: UserEntity

  @ManyToOne(type => ChannelsEntity, ChannelsEntity => ChannelsEntity.messages, { onDelete: "CASCADE" })
  @JoinColumn()
  @ValidateNested()
  @Type(() => ChannelsEntity)
  channel: ChannelsEntity

  @Column()
  @IsString()
  content: string

  @Column()
  @IsInt()
  @Min(0)
  order: number
}
