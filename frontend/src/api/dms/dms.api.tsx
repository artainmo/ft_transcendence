import { API_ENDPOINT } from "../api_endpoint.tsx"
import { CreateDmDto } from "dto/create-dm.dto.tsx"
import { UpdateDmDto } from "dto/update-dm.dto.tsx"
import { ResponseDmDto } from "dto/response-dm.dto.tsx"
import { CreateDmMessageDto } from "dto/create-dm_message.dto.tsx"
import { UpdateDmMessageDto } from "dto/update-dm_message.dto.tsx"
import { ResponseDmMessageDto } from "dto/response-dm_message.dto.tsx"
axios = require('axios');
axios.defaults.baseURL = API_ENDPOINT;

export const addDm: (createDmDto: CreateDmDto) => void = async (createDmDto) => {
  await axios.post("/dms", { data: createDmDto });
}

export const getAllDms: () => ResponseDmDto[] = async () => {
  const response = await axios.get("/dms");
  return response.data;
}

export const getDm: (id: number) => ResponseDmDto = async (id) => {
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

export const getAllDmsMessages: () => ResponseDmMessageDto[] = async () => {
  const response = await axios.get("/dms/message");
  return response.data;
}

export const getDm: (id: number) => ResponseDmMessageDto = async (id) => {
  const response = await axios.get(`/dms/message?id=${id}`);
  return response.data;
}

export const updateDmMessage: (id: number, updateDmMessageDto: UpdateDmMessageDto) => void = async (id, updateDmMessageDto) => {
  await axios.patch(`/dms/message?id=${id}`, { data: updateDmMessageDto });
}

export const removeDmMessage: (id: number) => void = async (id) => {
  await axios.delete(`/dms/message?id=${id}`);
}
