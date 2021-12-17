import { SubscribeMessage, WebSocketGateway, WebSocketServer, Server } from '@nestjs/websockets';
import { Server, Socket } from "socket.io";
import { WebsocketChatDto } from "dto/websocket-chat.dto";

@WebSocketGateway(80, { namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: Socket, message: WebsocketChatDto): string {
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
}
