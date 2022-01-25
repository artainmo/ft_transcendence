import { WebsocketGameDto } from "./dto/websocket-game.dto";
import { io } from "socket.io-client";
import { ballDto } from "../../pages/game/gameFunc/utils/ballDto";
import { GameInfosDto } from "../../pages/game/gameFunc/utils/gameInfosDto";

export const connect: () => any = () => {
<<<<<<< HEAD
  return io("http://localhost:80/game");
}

/*
** validate the game when 2 players are in the room
*/
export const listenStartGame: (socket: any, callbackFunc: (response: GameInfosDto) => void) => void = (socket, callbackFunc) => {
  socket.on('valideStartgame', callbackFunc);
}

/*
** Receive the start game informations
*/
export const startGame: (socket: any, message : {room: string, player: number}) => void  = (socket, message) => {
  socket.emit('startgame', message);
}

/*
** Stop game loop interval in backend
*/
export const stopGame: (socket: any) => void  = (socket) => {
  socket.emit('stopGame');
}

/*
** Disconnect the socket
*/
export const disconnect : (socket: any) => void = (socket) => {
  console.log("Client disconnected");
  socket.disconnect();
}

/*
** Join the room
*/
export const joinRoom: (socket: any, room: string) => void = (socket, room) => {
  console.log("Join room : " + room);
  socket.emit("joinRoom", room);
}

/*
** Leave the room
*/
=======
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

>>>>>>> main
export const leaveRoom: (socket: any, room: string) => void = (socket, room) => {
  socket.emit("leaveRoom", room);
}

<<<<<<< HEAD
/*
** Send player position
*/
export const sendPos1: (socket: any, pos: number) => void = (socket, pos) => {
  socket.emit("pos1", pos);
}

export const sendPos2: (socket: any, pos: number) => void = (socket, pos) => {
  socket.emit("pos2", pos);
=======
export const send: (socket: any, message: WebsocketGameDto) => void = (socket, message) => {
  socket.emit("message", message);
>>>>>>> main
}
