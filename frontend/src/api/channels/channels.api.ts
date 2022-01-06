import { API_ENDPOINT } from "../api_endpoint"
import { CreateChannelDto } from "./dto/create-channel.dto"
import { UpdateChannelDto } from "./dto/update-channel.dto"
import { ChannelDto } from "./dto/channel.dto"
import { CreateChannelMessageDto } from "./dto/create-channel_message.dto"
import { UpdateChannelMessageDto } from "./dto/update-channel_message.dto"
import { ChannelMessageDto } from "./dto/channel_message.dto"
import { CreateChannelUserDto } from "./dto/create-channel_user.dto"
import { UpdateChannelUserDto } from "./dto/update-channel_user.dto"
import { ChannelUserDto } from "./dto/channel_user.dto"
import { CreateUserDto } from "../user/dto/create-user.dto"
const axios = require('axios');
axios.defaults.baseURL = API_ENDPOINT;

export const addChannel: (createChannelDto: CreateChannelDto) => Promise<ChannelDto> = async (createChannelDto) => {
  const response = await axios.post("/channels", createChannelDto);
  return response.data
}

export const createNewChannel: (users: CreateUserDto[], name: string, type: string, password: string) => CreateChannelDto = (users, name, type, password) => {
  let createChannelDto: CreateChannelDto = {
    users: users,
    messages: [],
    channel_users: [],
    type: type,
    password: password,
    name: name
  }
  return createChannelDto;
}

export const getAllChannels: () => Promise<ChannelDto[]> = async () => {
  const response = await axios.get("/channels");
  return response.data;
}

// export const getChannelsOfUser: (userLogin: string) => Promise<ChannelDto[]> = async (userLogin) => {
//   const response = await axios.get(`/channels/user/${userLogin}`);
//   return response.data;
// }

export const getChannel: (id: number) => Promise<ChannelDto> = async (id) => {
  const response = await axios.get(`/channels/${id}`);
  return response.data;
}

export const updateChannel: (id: number, updateChannelDto: Partial<ChannelDto>) => void = async (id, updateChannelDto) => {
  // let channel = await getChannel(id);
  // await removeChannel(id);
  // channel = {...channel, ...updateChannelDto};
  // await addChannel(channel);
  await axios.patch(`/channels/${id}`, updateChannelDto);
}

export const removeChannel: (id: number) => void = async (id) => {
  await axios.delete(`/channels/${id}`);
}

export const addChannelMessage: (createChannelMessageDto: CreateChannelMessageDto) => void = async (createChannelMessageDto) => {
  await axios.post("/channels/message", createChannelMessageDto);
}

export const getAllChannelsMessages: () => Promise<ChannelMessageDto[]> = async () => {
  const response = await axios.get("/channels/message");
  return response.data;
}

export const getChannelMessage: (id: number) => Promise<ChannelMessageDto> = async (id) => {
  const response = await axios.get(`/channels/message/${id}`);
  return response.data;
}

export const updateChannelMessage: (id: number, updateChannelMessageDto: UpdateChannelMessageDto) => void = async (id, updateChannelMessageDto) => {
  await axios.patch(`/channels/message/${id}`, updateChannelMessageDto);
}

export const removeChannelMessage: (id: number) => void = async (id) => {
  await axios.delete(`/channels/message/${id}`);
}

export const addChannelUser: (createChannelUserDto: CreateChannelUserDto) => void = async (createChannelUserDto) => {
  await axios.post("/channels/user", createChannelUserDto);
}

export const createNewChannelUser: (channel: CreateChannelDto, user: CreateUserDto, administrator: boolean, owner: boolean) => CreateChannelUserDto = (channel, user, owner, administrator) => {
  let createChannelUserDto: CreateChannelUserDto = {
    channel: channel,
    user: user,
    owner: owner,
    administrator: administrator,
  }
  return createChannelUserDto;
}

export const getAllChannelsUsers: () => Promise<ChannelUserDto[]> = async () => {
  const response = await axios.get("/channels/user");
  return response.data;
}

export const getChannelUser: (id: number) => Promise<ChannelUserDto> = async (id) => {
  const response = await axios.get(`/channels/user/${id}`);
  return response.data;
}

export const updateChannelUser: (id: number, updateChannelUserDto: UpdateChannelUserDto) => void = async (id, updateChannelUserDto) => {
  await axios.patch(`/channels/user/${id}`, updateChannelUserDto);
}

export const removeChannelUser: (id: number) => void = async (id) => {
  await axios.delete(`/channels/user/${id}`);
}
