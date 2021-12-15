import { API_ENDPOINT } from "../api_endpoint.tsx"
import { CreateFriendDto } from "dto/create-friend.dto.tsx"
import { UpdateFriendDto } from "dto/update-friend.dto.tsx"
import { ResponseFriendDto } from "dto/response-friend.dto.tsx"
axios = require('axios');
axios.defaults.baseURL = API_ENDPOINT;

export const addFriend: (createFriendDto: CreateFriendDto) => void = async (createFriendDto) => {
  await axios.post("/user", { data: createFriendDto });
}

export const getAllFriends: () => ResponseFriendDto[] = async () => {
  const response = await axios.get("/user");
  return response.data;
}

export const getFriend: (id: number) => ResponseFriendDto = async (id) => {
  const response = await axios.get(`/user?id=${id}`);
  return response.data;
}

export const updateFriend: (id: number, updateFriendDto: UpdateFriendDto) => void = async (id, updateFriendDto) => {
  await axios.patch(`/user?id=${id}`, { data: updateFriendDto });
}

export const removeFriend: (id: number) => void = async (id) => {
  await axios.delete(`/user?id=${id}`);
}
