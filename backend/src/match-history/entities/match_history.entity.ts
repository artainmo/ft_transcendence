import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity"

@Entity()
export class MatchHistoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => UserEntity, UserEntity => UserEntity.matchHistory, {eager: true})
    @JoinColumn()
    me: UserEntity;

    @Column()
    my_score: number;

    @Column()
    opponent_id: number; //This is not cleanest method but is used because else typeorm bugs on multiple saves

    @Column()
    opponent_score: number;
}
