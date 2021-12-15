import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity"

@Entity()
export class GamesEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => UserEntity)
    @JoinColumn()
    user1: UserEntity;

    @OneToOne(type => UserEntity)
    @JoinColumn()
    user2: UserEntity;

    @Column()
    ballspeed: number;

    @Column()
    map: string;
}
