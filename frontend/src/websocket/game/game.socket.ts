import { WebsocketGameDto } from "./dto/websocket-game.dto";
import { io } from "socket.io-client";

const socket = io("http://localhost:80/game");

export const listen: (callbackFunc: (response: WebsocketGameDto) => void) => void = (callbackFunc) => {
  socket.on('message', callbackFunc);
}

export const disconnect: () => void = () => {
  socket.disconnect();
}

export const joinRoom: (room: string) => void = (room) => {
  socket.emit("joinRoom", room);
}

export const leaveRoom: (room: string) => void = (room) => {
  socket.emit("leaveRoom", room);
}

export const send: (message: WebsocketGameDto) => void = (message) => {
  socket.emit("message", message);
}
