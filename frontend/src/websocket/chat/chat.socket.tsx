import socketIOClient from "socket.io-client";
import { WebsocketChatDto } from "dto/websocket-chat.dto";

const socket = socketIOClient("http://127.0.0.1:80/chat");

export const listen: (callbackFunc: (response: WebsocketChatDto) => void) => void = (callbackFunc) => {
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

export const send: (message: WebsocketChatDto) => void = (message) => {
  socket.emit("message", message);
}
