import { WebsocketGameDto } from "./dto/websocket-game.dto";
import { io } from "socket.io-client";

const socket = io("http://localhost:80/game");

export const listen: (callbackFunc: (response: WebsocketGameDto) => void) => void = (callbackFunc) => {
  socket.on('message', callbackFunc);
}

export const disconnect : () => void = () => {
  console.log("Client disconnected");
  socket.disconnect();
}

export const joinRoom: (room: string) => void = (room) => {
  console.log("Join room : " + room);
  socket.emit("joinRoom", room);
}

export const leaveRoom: (room: string) => void = (room) => {
  
  socket.emit("leaveRoom", room);
}

export const send: (message : {room: string, content: WebsocketGameDto}) => void = (message) => {
  socket.emit("message", message);
}

export const listenscore1: (callbackFunc: (response: number) => void) => void = (callbackFunc) => {
  socket.on('score1', callbackFunc);
}

export const sendScore1: (score: number) => void = (score) => {
  socket.emit("score1", score);
}
