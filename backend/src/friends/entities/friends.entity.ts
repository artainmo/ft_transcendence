import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserEntity } from "user.entity"

@Entity()
export class FriendsEntity {

    @PrimaryColumn()
    @ManyToOne(type => UserEntity, UserEntity => UserEntity.id)
    @JoinColumn()
    user1_id: number;

    @PrimaryColumn()
    @ManyToOne(type => UserEntity, UserEntity => UserEntity.id)
    @JoinColumn()
    user2_id: number;
}
