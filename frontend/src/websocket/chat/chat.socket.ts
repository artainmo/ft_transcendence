import { io } from "socket.io-client";

export const connect: () => any = () => {
  // console.log("connect");
  return io("http://localhost:80/chat");
}

export const listen: (socket: any, callbackFunc: (response: string) => void) => void = (socket, callbackFunc) => {
  // console.log("listen " + socket.ids);
  socket.on('message', callbackFunc);
}

export const disconnect: (socket: any) => void = (socket) => {
  // console.log("disconnect " + socket.ids);
  socket.disconnect();
}

export const joinRoom: (socket: any, room: string) => void = (socket, room) => {
  // console.log("joinroom " + socket.ids);
  socket.emit("joinRoom", room);
}

export const leaveRoom: (socket: any, room: string) => void = (socket, room) => {
  // console.log("leave room " + socket.ids);
  socket.emit("leaveRoom", room);
}

export const send: (socket: any, message: {room: string, content: string}) => void = (socket, message) => {
  // console.log("message " + socket.ids);
  socket.emit("message", message);
}
