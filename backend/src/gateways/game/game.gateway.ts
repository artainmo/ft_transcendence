import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from "socket.io";
import { WebsocketGameDto } from "./dto/websocket-game.dto";

export interface ballDto {
	x: number,
	y: number,
	velocityX: number,
	velocityY: number,
	speed: number,
}

@WebSocketGateway(80, { namespace: 'game' })
export class GameGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: Socket, message: WebsocketGameDto): void {
    this.server.to(message.room).emit("message", message)
  }

  @SubscribeMessage('joinRoom')
  joinRoom(client: Socket, room: string): void {
    client.join(room);
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(client: Socket, room: string): void {
    client.leave(room);
  }

  /*
  ** Score P1
  */
  @SubscribeMessage('score1')
  handleScore1(client: Socket, message: {room: string, value: number}): void {
    this.server.to(message.room).emit("score1", message)
  }

  /*
  ** Score P2
  */
  @SubscribeMessage('score2')
  handleScore2(client: Socket, message: {room: string, value: number}): void {
    this.server.to(message.room).emit("score2", message)
  }

  /*
  ** Pos P1
  */
  @SubscribeMessage('pos1')
  handlePosP1(client: Socket, message: {room: string, value: number}): void {
    this.server.to(message.room).emit("pos1", message)
  }

  /*
  ** Pos P2
  */
  @SubscribeMessage('pos2')
  handlePosP2(client: Socket, message: {room: string, value: number}): void {
    this.server.to(message.room).emit("pos2", message)
  }

  /*
  ** Pos ball
  */
  @SubscribeMessage('ball')
  handleBall(client: Socket, message: {room: string, value: ballDto}): void {
    this.server.to(message.room).emit("ball", message)
  }
  
}
