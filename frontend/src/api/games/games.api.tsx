import { API_ENDPOINT } from "../api_endpoint.tsx"
import { CreateGameDto } from "dto/create-game.dto.tsx"
import { UpdateGameDto } from "dto/update-game.dto.tsx"
import { ResponseGameDto } from "dto/response-game.dto.tsx"
axios = require('axios');
axios.defaults.baseURL = API_ENDPOINT;

export const addGame: (createGameDto: CreateGameDto) => void = async (createGameDto) => {
  await axios.post("/user", { data: createGameDto });
}

export const getAllGames: () => ResponseGameDto[] = async () => {
  const response = await axios.get("/user");
  return response.data;
}

export const getGame: (id: number) => ResponseGameDto = async (id) => {
  const response = await axios.get(`/user?id=${id}`);
  return response.data;
}

export const updateGame: (id: number, updateGameDto: UpdateGameDto) => void = async (id, updateGameDto) => {
  await axios.patch(`/user?id=${id}`, { data: updateGameDto });
}

export const removeGame: (id: number) => void = async (id) => {
  await axios.delete(`/user?id=${id}`);
}
