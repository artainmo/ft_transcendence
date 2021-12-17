import socketIOClient from "socket.io-client";
import { WebsocketGameDto } from "dto/websocket-game.dto";

const socket = socketIOClient("http://127.0.0.1:80/game");

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
