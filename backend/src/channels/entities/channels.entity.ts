import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";
import { ChannelsMessagesEntity } from "./channels_messages.entity";
import { ChannelsUsersEntity } from "./channels_users.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { IsArray, ValidateNested, IsIn, IsNotEmpty, IsString } from "class-validator";
import { Type } from 'class-transformer';

@Entity()
export class ChannelsEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToMany(type => UserEntity, UserEntity => UserEntity.channels, {eager: true})
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserEntity)
  users: UserEntity[]

  @OneToMany(type => ChannelsUsersEntity, ChannelsUsersEntity => ChannelsUsersEntity.channel, {eager: true, cascade: true})
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChannelsUsersEntity)
  channel_users: ChannelsUsersEntity[]

  @OneToMany(type => ChannelsMessagesEntity, ChannelsMessagesEntity => ChannelsMessagesEntity.channel, {eager: true, cascade: true})
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChannelsMessagesEntity)
  messages: ChannelsMessagesEntity[]

  @Column()
  @IsIn(["public", "private", "password"])
  type: string

  @Column()
  @IsString()
  password: string

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string
}
