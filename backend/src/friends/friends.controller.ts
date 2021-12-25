import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post()
  create(@Body() createFriendDto: CreateFriendDto) {
    this.friendsService.create(createFriendDto);
  }

  @Get()
  findAll() {
    return this.friendsService.findAll();
  }

  @Get('/user/:login')
  findFriendsOfUser(@Param('login') login: string) {
    return this.friendsService.findFriendsOfUser(login);
  }

  @Get(':userId/:friendId')
  findOne(@Param('userId') userId: number, @Param('friendId') friendId: number) {
    return this.friendsService.findOne(userId, friendId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFriendDto: UpdateFriendDto) {
    this.friendsService.update(+id, updateFriendDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.friendsService.remove(+id);
  }
}
