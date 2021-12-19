import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity"

@Entity()
export class MatchHistoryEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => UserEntity, UserEntity => UserEntity.matchHistory)
    @JoinColumn()
    me: UserEntity;

    @Column()
    my_score: string;

    @Column()
    opponent_id: number;

    @Column()
    opponent_score: string;
}
