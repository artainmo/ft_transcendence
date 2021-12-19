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
const axios = require('axios');
axios.defaults.baseURL = API_ENDPOINT;

export const addChannel: (createChannelDto: CreateChannelDto) => void = async (createChannelDto) => {
  await axios.post("/channels", { data: createChannelDto });
}

export const getAllChannels: () => Promise<ChannelDto[]> = async () => {
  const response = await axios.get("/channels");
  return response.data;
}

export const getChannel: (id: number) => Promise<ChannelDto> = async (id) => {
  const response = await axios.get(`/channels?id=${id}`);
  return response.data;
}

export const updateChannel: (id: number, updateChannelDto: UpdateChannelDto) => void = async (id, updateChannelDto) => {
  await axios.patch(`/channels?id=${id}`, { data: updateChannelDto });
}

export const removeChannel: (id: number) => void = async (id) => {
  await axios.delete(`/channels?id=${id}`);
}

export const addChannelMessage: (createChannelMessageDto: CreateChannelMessageDto) => void = async (createChannelMessageDto) => {
  await axios.post("/channels/message", { data: createChannelMessageDto });
}

export const getAllChannelsMessages: () => Promise<ChannelMessageDto[]> = async () => {
  const response = await axios.get("/channels/message");
  return response.data;
}

export const getChannelMessage: (id: number) => Promise<ChannelMessageDto> = async (id) => {
  const response = await axios.get(`/channels/message?id=${id}`);
  return response.data;
}

export const updateChannelMessage: (id: number, updateChannelMessageDto: UpdateChannelMessageDto) => void = async (id, updateChannelMessageDto) => {
  await axios.patch(`/channels/message?id=${id}`, { data: updateChannelMessageDto });
}

export const removeChannelMessage: (id: number) => void = async (id) => {
  await axios.delete(`/channels/message?id=${id}`);
}

export const addChannelUser: (createChannelUserDto: CreateChannelUserDto) => void = async (createChannelUserDto) => {
  await axios.post("/channels/user", { data: createChannelUserDto });
}

export const getAllChannelsUsers: () => Promise<ChannelUserDto[]> = async () => {
  const response = await axios.get("/channels/user");
  return response.data;
}

export const getChannelUser: (id: number) => Promise<ChannelUserDto> = async (id) => {
  const response = await axios.get(`/channels/user?id=${id}`);
  return response.data;
}

export const updateChannelUser: (id: number, updateChannelUserDto: UpdateChannelUserDto) => void = async (id, updateChannelUserDto) => {
  await axios.patch(`/channels/user?id=${id}`, { data: updateChannelUserDto });
}

export const removeChannelUser: (id: number) => void = async (id) => {
  await axios.delete(`/channels/user?id=${id}`);
}
