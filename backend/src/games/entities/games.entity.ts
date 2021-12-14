import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserEntity } from "user.entity"

@Entity()
export class GamesEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => UserEntity, UserEntity => UserEntity.id)
    @JoinColumn()
    user1_id: number;

    @OneToOne(type => UserEntity, UserEntity => UserEntity.id)
    @JoinColumn()
    user2_id: number;

    @Column()
    ballspeed: number;

    @Column()
    map: string;
}
