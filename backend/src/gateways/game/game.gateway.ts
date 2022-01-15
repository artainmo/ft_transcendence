import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from "socket.io";
import { WebsocketGameDto } from "./dto/websocket-game.dto";

@WebSocketGateway(80, { namespace: 'game' })
export class GameGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: Socket, message: WebsocketGameDto): void {
    this.server.to(message.room).emit("message", message)
  }

  @SubscribeMessage('score1')
  handleScore1(client: Socket, message: number): void {
    this.server.to("room3"/*message.room*/).emit("score1", message)
  }

  @SubscribeMessage('joinRoom')
  joinRoom(client: Socket, room: string): void {
    client.join(room);
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(client: Socket, room: string): void {
    client.leave(room);
  }

  
}
