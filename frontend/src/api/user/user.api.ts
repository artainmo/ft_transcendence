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

export const createNewUser: (name: string, login: string, avatar: string, password?: string) => CreateUserDto = (name, login, avatar, password="") => {
  let createUserDto: CreateUserDto = {
    name: name,
    login: login,
    avatar: avatar,
    hasTwoFactorAuthentication: false,
    twoFactorAuthenticationSecret: '',
    status: "Online",
    nbrVicotry: 0,
    nbrLoss: 0,
    matchHistory: [],
    friends: [],
    dms: [],
    dms_messages: [],
    channels: [],
    channels_messages: [],
    channels_users: [],
    latestTimeOnline: Math.round(new Date().getTime() / 1000).toString(),
    password: password
  }
  return createUserDto;
}

export const getAllUsers: () => Promise<UserDto[]> = async () => {
  const response = await axios.get("/user");
  return response.data;
}

export const getAllUsersRank: () => Promise<UserDto[]> = async () => {
  const response = await axios.get("/user/rank");
  return response.data;
}

export const getUser: (id: number) => Promise<UserDto | null> = async (id) => {
  const response = await axios.get(`/user/${id}`);
  if (response.data === "") { return null; }
  return response.data;
}

export const getCompleteUser: (id: number) => Promise<UserDto | null> = async (id) => {
  const response = await axios.get(`/user/complete/${id}`);
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
} //TypeORM bug: Cannot query across many-to-many for property channels | use addUser instead .save will update if already exist

export const removeUser: (id: number) => void = async (id) => {
  await axios.delete(`/user/${id}`);
}

export const getTwoFactorAuthenticationSecret: () => Promise<any> = async () => {
  return (await axios.get('user/2fa/secret')).data;
}

export const verifyTwoFactorAuthentication: (secret: any, token: string) => Promise<boolean> = async (secret, token) => {
  return (await axios.post(`user/2fa/verify`, {
    secret: secret,
    token: token
  })).data;
} //Post is used because it allows to send a body while get does not

export const userPasswordVerification: (id: number, password: string) => Promise<boolean> = async (id, password) => {
  const response = await axios.get(`/user/password_verification/${id}/${password}`);
  return response.data;
}
