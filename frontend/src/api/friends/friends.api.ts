import { API_ENDPOINT } from "../api_endpoint"
import { CreateFriendDto } from "./dto/create-friend.dto"
import { UpdateFriendDto } from "./dto/update-friend.dto"
import { FriendDto } from "./dto/friend.dto"
import { CreateUserDto } from "../user/dto/create-user.dto"
const axios = require('axios');
axios.defaults.baseURL = API_ENDPOINT;

export const addFriend: (createFriendDto: CreateFriendDto) => void = async (createFriendDto) => {
  await axios.post("/friends", createFriendDto);
}

export const createNewFriend: (me: CreateUserDto, friend_id: number) => CreateFriendDto = (me, friend_id) => {
  let createFriendDto: CreateFriendDto = {
    me: me,
    friend_id: friend_id,
  }
  return createFriendDto;
}

export const getAllFriends: () => Promise<FriendDto[]> = async () => {
  const response = await axios.get("/friends");
  return response.data;
}

export const getFriendsOfUser: (userLogin: string) => Promise<FriendDto[]> = async (userLogin) => {
  const response = await axios.get(`/friends/user/${userLogin}`);
  return response.data;
}

export const getFriend: (userId: number, friendId: number) => Promise<FriendDto> = async (userId, friendId) => {
  const response = await axios.get(`/friends/${userId}/${friendId}`);
  if (response.data === "") { return null; }
  return response.data;
}

export const updateFriend: (id: number, updateFriendDto: UpdateFriendDto) => void = async (id, updateFriendDto) => {
  await axios.patch(`/friends/${id}`, updateFriendDto);
}

export const removeFriend: (userId: number, friendId: number) => void = async (userId, friendId) => {
  const friendDto = await getFriend(userId, friendId);
  if (friendDto === null) return ;
  await axios.delete(`/friends/${friendDto.id}`);
}
