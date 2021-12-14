import { Injectable } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendsEntity } from "entities/friends.entity";

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(FriendsEntity)
    private FriendsRepo: Repository<FriendsEntity>
  ) {}

  create(createFriendDto: CreateFriendDto) {
    return 'This action adds a new friend';
  }

  findAll() {
    return `This action returns all friends`;
  }

  findOne(id: number) {
    return `This action returns a #${id} friend`;
  }

  update(id: number, updateFriendDto: UpdateFriendDto) {
    return `This action updates a #${id} friend`;
  }

  remove(id: number) {
    return `This action removes a #${id} friend`;
  }
}
