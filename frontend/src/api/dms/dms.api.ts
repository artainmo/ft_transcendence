import { API_ENDPOINT } from "../api_endpoint"
import { CreateDmDto } from "./dto/create-dm.dto"
import { UpdateDmDto } from "./dto/update-dm.dto"
import { DmDto } from "./dto/dm.dto"
import { CreateDmMessageDto } from "./dto/create-dm_message.dto"
import { UpdateDmMessageDto } from "./dto/update-dm_message.dto"
import { DmMessageDto } from "./dto/dm_message.dto"
const axios = require('axios');
axios.defaults.baseURL = API_ENDPOINT;

export const addDm: (createDmDto: CreateDmDto) => void = async (createDmDto) => {
  await axios.post("/dms", { data: createDmDto });
}

export const getAllDms: () => Promise<DmDto[]> = async () => {
  const response = await axios.get("/dms");
  return response.data;
}

export const getDm: (id: number) => Promise<DmDto> = async (id) => {
  const response = await axios.get(`/dms?id=${id}`);
  return response.data;
}

export const updateDm: (id: number, updateDmDto: UpdateDmDto) => void = async (id, updateDmDto) => {
  await axios.patch(`/dms?id=${id}`, { data: updateDmDto });
}

export const removeDm: (id: number) => void = async (id) => {
  await axios.delete(`/dms?id=${id}`);
}

export const addDmMessage: (createDmMessageDto: CreateDmMessageDto) => void = async (createDmMessageDto) => {
  await axios.post("/dms/message", { data: createDmMessageDto });
}

export const getAllDmsMessages: () => Promise<DmMessageDto[]> = async () => {
  const response = await axios.get("/dms/message");
  return response.data;
}

export const getDm: (id: number) => Promise<DmMessageDto> = async (id) => {
  const response = await axios.get(`/dms/message?id=${id}`);
  return response.data;
}

export const updateDmMessage: (id: number, updateDmMessageDto: UpdateDmMessageDto) => void = async (id, updateDmMessageDto) => {
  await axios.patch(`/dms/message?id=${id}`, { data: updateDmMessageDto });
}

export const removeDmMessage: (id: number) => void = async (id) => {
  await axios.delete(`/dms/message?id=${id}`);
}
