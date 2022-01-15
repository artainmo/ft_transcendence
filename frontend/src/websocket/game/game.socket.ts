import { WebsocketGameDto } from "./dto/websocket-game.dto";
import { io } from "socket.io-client";

export const connect: () => any = () => {
  // console.log("connect");
  return io("http://localhost:80/game");
}

export const listen: (socket: any, callbackFunc: (response: WebsocketGameDto) => void) => void = (socket, callbackFunc) => {
  socket.on('message', callbackFunc);
}

export const disconnect: (socket: any) => void = (socket) => {
  socket.disconnect();
}

export const joinRoom: (socket: any, room: string) => void = (socket, room) => {
  socket.emit("joinRoom", room);
}

export const leaveRoom: (socket: any, room: string) => void = (socket, room) => {
  socket.emit("leaveRoom", room);
}

export const send: (socket: any, message: WebsocketGameDto) => void = (socket, message) => {
  socket.emit("message", message);
}
