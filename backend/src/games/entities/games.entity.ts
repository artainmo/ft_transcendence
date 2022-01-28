import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";
import { ValidateNested, IsInt, IsIn, Min, Max, ValidateIf } from "class-validator";
import { Type } from 'class-transformer';

@Entity()
export class GamesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => UserEntity)
    @JoinColumn()
    @ValidateNested()
    @Type(() => UserEntity)
    user1: UserEntity;

    @OneToOne(type => UserEntity, {nullable: true})
    @JoinColumn()
    @ValidateIf(value => value === null) //If is equal to null all following validator-decorators are ignored
    @ValidateNested()
    @Type(() => UserEntity)
    user2: UserEntity;

    @Column()
    @IsInt()
    @Min(1)
    @Max(3)
    ballspeed: number;

    @Column()
    @IsIn(['black', 'white', 'winter', 'summer', 'night'])
    map: string;
}
