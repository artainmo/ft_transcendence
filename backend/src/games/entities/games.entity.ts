import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity"

@Entity()
export class GamesEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => UserEntity)
    @JoinColumn()
    user1: UserEntity;

    @OneToOne(type => UserEntity, {nullable: true})
    @JoinColumn()
    user2: UserEntity;

    @Column()
    ballspeed: number;

    @Column()
    map: string;
}
