import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserEntity } from "user.entity"

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
    opponent: string;

    @Column()
    opponent_score: string;
}
