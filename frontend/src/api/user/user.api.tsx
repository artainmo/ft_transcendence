import { API_ENDPOINT } from "../api_endpoint.tsx"
import { CreateUserDto } from "dto/create-user.dto.tsx"
import { UpdateUserDto } from "dto/update-user.dto.tsx"
import { ResponseUserDto } from "dto/response-user.dto.tsx"
axios = require('axios');
axios.defaults.baseURL = API_ENDPOINT;

export const addUser: (createUserDto: CreateUserDto) => void = async (createUserDto) => {
  await axios.post("/user", { data: createUserDto });
}

export const getAllUsers: () => ResponseUserDto[] = async () => {
  const response = await axios.get("/user");
  return response.data;
}

export const getUser: (id: number) => ResponseUserDto = async (id) => {
  const response = await axios.get(`/user?id=${id}`);
  return response.data;
}

export const updateUser: (id: number, updateUserDto: UpdateUserDto) => void = async (id, updateUserDto) => {
  await axios.patch(`/user?id=${id}`, { data: updateUserDto });
}

export const removeUser: (id: number) => void = async (id) => {
  await axios.delete(`/user?id=${id}`);
}
