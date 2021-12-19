import { API_ENDPOINT } from "../api_endpoint"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { UserDto } from "./dto/user.dto"
const axios = require('axios');
axios.defaults.baseURL = API_ENDPOINT;

export const addUser: (createUserDto: CreateUserDto) => void = async (createUserDto) => {
  await axios.post("/user", { data: createUserDto });
}

export const getAllUsers: () => Promise<UserDto[]> = async () => {
  const response = await axios.get("/user");
  return response.data;
}

export const getUser: (id: number) => Promise<UserDto> = async (id) => {
  const response = await axios.get(`/user?id=${id}`);
  return response.data;
}

export const updateUser: (id: number, updateUserDto: UpdateUserDto) => void = async (id, updateUserDto) => {
  await axios.patch(`/user?id=${id}`, { data: updateUserDto });
}

export const removeUser: (id: number) => void = async (id) => {
  await axios.delete(`/user?id=${id}`);
}
