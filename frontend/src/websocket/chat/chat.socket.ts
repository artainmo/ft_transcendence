import { io } from "socket.io-client";

const socket = io("http://localhost:80/chat");

export const listen: (callbackFunc: (response: string) => void) => void = (callbackFunc) => {
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

export const send: (message: {room: string, content: string}) => void = (message) => {
  socket.emit("message", message);
}
