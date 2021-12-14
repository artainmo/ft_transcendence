import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserEntity } from "user.entity"

@Entity()
export class MatchHistoryEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => UserEntity, UserEntity => UserEntity.id)
    @JoinColumn()
    user1_id: number;

    @Column()
    user1_score: string;

    @ManyToOne(type => UserEntity, UserEntity => UserEntity.id)
    @JoinColumn()
    user2_id: number;

    @Column()
    user2_score: string;
}
