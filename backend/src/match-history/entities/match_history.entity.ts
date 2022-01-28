import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";
import { ValidateNested, IsInt, IsPositive, Min, Max } from "class-validator";
import { Type } from 'class-transformer';

@Entity()
export class MatchHistoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => UserEntity, UserEntity => UserEntity.matchHistory, {eager: true})
    @JoinColumn()
    @ValidateNested()
    @Type(() => UserEntity)
    me: UserEntity;

    @Column()
    @IsInt()
    @Min(0)
    @Max(11)
    my_score: number;

    @Column()
    @IsInt()
    @IsPositive()
    opponent_id: number; //This is not cleanest method but is used because else typeorm bugs on multiple saves

    @Column()
    @IsInt()
    @Min(0)
    @Max(11)
    opponent_score: number;
}
