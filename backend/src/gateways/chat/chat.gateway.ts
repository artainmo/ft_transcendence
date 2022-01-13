import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from "socket.io";

@WebSocketGateway(80, { namespace: 'chat', cors: true })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: Socket, message: {room: string, content: string}): void {
    this.server.to(message.room).emit("message", message.content)
  }

  @SubscribeMessage('joinRoom')
  joinRoom(client: Socket, room: string): void {
    // console.log(`room ${room} joined`);
    client.join(room);
  }

  @SubscribeMessage('leaveRoom')
  leaveRoom(client: Socket, room: string): void {
    // console.log(`room ${room} left`);
    client.leave(room);
  }
}
