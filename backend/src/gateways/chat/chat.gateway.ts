import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from "socket.io";
import { IsNotEmpty, IsString } from "class-validator";

class Message {
  @IsNotEmpty()
  @IsString()
  room: string

  @IsString()
  content: string
}

@WebSocketGateway(80, { namespace: 'chat', cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: Socket, message: Message): void {
    this.server.to(message.room).emit("message", message.content)
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
