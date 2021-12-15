import { API_ENDPOINT } from "../api_endpoint.tsx"
import { CreateMatchHistoryDto } from "dto/create-match-history.dto.tsx"
import { UpdateMatchHistoryDto } from "dto/update-match-history.dto.tsx"
import { ResponseMatchHistoryDto } from "dto/response-match-history.dto.tsx"
axios = require('axios');
axios.defaults.baseURL = API_ENDPOINT;

export const addMatchHistory: (createMatchHistoryDto: CreateMatchHistoryDto) => void = async (createMatchHistoryDto) => {
  await axios.post("/match-history", { data: createMatchHistoryDto });
}

export const getAllMatchHistory: () => ResponseMatchHistoryDto[] = async () => {
  const response = await axios.get("/match-history");
  return response.data;
}

export const getMatchHistory: (id: number) => ResponseMatchHistoryDto = async (id) => {
  const response = await axios.get(`/match-history?id=${id}`);
  return response.data;
}

export const updateMatchHistory: (id: number, updateMatchHistoryDto: UpdateMatchHistoryDto) => void = async (id, updateMatchHistoryDto) => {
  await axios.patch(`/match-history?id=${id}`, { data: updateMatchHistoryDto });
}

export const removeMatchHistory: (id: number) => void = async (id) => {
  await axios.delete(`/match-history?id=${id}`);
}
