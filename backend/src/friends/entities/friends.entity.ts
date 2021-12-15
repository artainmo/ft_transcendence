import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity"

@Entity()
export class FriendsEntity {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => UserEntity, UserEntity => UserEntity.friends)
    @JoinColumn()
    me: UserEntity;

    @Column()
    friend_id: number;
}
