import { API_ENDPOINT } from "../api_endpoint"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { UserDto } from "./dto/user.dto"
const axios = require('axios');
axios.defaults.baseURL = API_ENDPOINT;

export const addUser: (createUserDto: CreateUserDto) => Promise<UserDto> = async (createUserDto) => {
  const response = await axios.post("/user", createUserDto);
  return response.data;
}

export const createNewUser: (name: string, login: string, avatar: string) => CreateUserDto = (name, login, avatar) => {
  let createUserDto: CreateUserDto = {
    name: name,
    login: login,
    avatar: avatar,
    hasTwoFactorAuthentication: false,
    twoFactorAuthenticationSecret: '',
    online: true,
    nbrVicotry: 0,
    nbrLoss: 0,
    matchHistory: [],
    friends: [],
    dms: [],
    dms_messages: [],
    channels: [],
    channels_messages: [],
    channels_users: []
  }
  return createUserDto;
}

export const getAllUsers: () => Promise<UserDto[]> = async () => {
  const response = await axios.get("/user");
  return response.data;
}

export const getUser: (id: number) => Promise<UserDto | null> = async (id) => {
  const response = await axios.get(`/user/${id}`);
  if (response.data === "") { return null; }
  return response.data;
}

export const getUserByName: (name: string) => Promise<UserDto | null> = async (name) => {
  const response = await axios.get(`/user/name/${name}`);
  if (response.data === "") { return null; }
  return response.data;
}

export const getUserByLogin: (login: string) => Promise<UserDto | null> = async (login) => {
  const response = await axios.get(`/user/login/${login}`);
  if (response.data === "") { return null; }
  return response.data;
}

export const updateUser: (id: number, updateUserDto: UpdateUserDto) => void = async (id, updateUserDto) => {
  await axios.patch(`/user/${id}`, updateUserDto);
}

export const removeUser: (id: number) => void = async (id) => {
  await axios.delete(`/user/${id}`);
}
