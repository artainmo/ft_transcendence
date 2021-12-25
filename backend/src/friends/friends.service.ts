import { Injectable } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendsEntity } from "./entities/friends.entity";

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(FriendsEntity)
    private FriendsRepo: Repository<FriendsEntity>
  ) {}

  async create(createFriendDto: CreateFriendDto): Promise<void> {
    await this.FriendsRepo.save(createFriendDto);
  }

  async findAll(): Promise<FriendsEntity[]> {
    return await this.FriendsRepo.find();
  }

  async findFriendsOfUser(login: string): Promise<FriendsEntity[]> {
    return await this.FriendsRepo.find({
      relations: ['me'],
      where: { me: {login: login} }
    });
  }

  async findOne(userId: number, friendId: number): Promise<FriendsEntity> {
    return await this.FriendsRepo.findOne({
      relations: ['me'],
      where: { me: {id: userId}, friend_id: friendId }
    });
  }

  async update(id: number, updateFriendDto: UpdateFriendDto): Promise<void> {
    await this.FriendsRepo.update(id, updateFriendDto);
  }

  async remove(id: number): Promise<void> {
    await this.FriendsRepo.delete(id);
  }
}
