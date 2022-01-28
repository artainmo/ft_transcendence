import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from "socket.io";
import { clearInterval } from 'timers';
import { WebsocketGameDto } from "./dto/websocket-game.dto";
import * as CONSTS from './utils/game.constants';
import { GameInfosDto} from './dto/GameInfosDto';

const lodash = require('lodash');

var startGameInfos: GameInfosDto = {
  ballX: CONSTS.GAME_WIDTH / 2,
	ballY: CONSTS.GAME_HEIGHT / 2,
	p1y: CONSTS.GAME_HEIGHT / 2,
	p1x: 0,
	p2y: CONSTS.GAME_HEIGHT / 2,
	p2x: CONSTS.GAME_WIDTH - 15,
	scoreP1: 0,
	scoreP2: 0,
}

class gameRender {
  private gameInfos: GameInfosDto;
  private velocityX: number;
  private velocityY: number;
  private basicSpeed: number;
  private speed: number;
  private radius: number;
  private playing: boolean = true;
  private loop = null;
  public status: string;

  constructor (basic_infos: GameInfosDto, ballspeed: number) {
    this.gameInfos = basic_infos;
    this.basicSpeed = ballspeed * 3;
    this.velocityX = this.basicSpeed * (Math.random() < 0.5 ? 1 : -1);
    this.velocityY = 0;
    this.speed = this.basicSpeed;
    this.radius = 8; //modifier la provenance
    this.status = 'w';
  }

  get getLoop() { return this.loop; }
  set setLoop(content: any) { this.loop = content; }

  get getStatus() { return this.status; }
  set setStatut(status: string) { this.status = status; }

  /*
  ** Collision with the pos x and y of the player
  */
  public collision(pos: {x: number, y: number})
	{
		var ptop = pos.y;
		var pbottom = pos.y + CONSTS.PLAYER_HEIGHT;
		var pleft = pos.x;
		var pright = pos.x + CONSTS.PLAYER_WIDTH;

		var btop = this.gameInfos.ballY - this.radius;
		var bbottom = this.gameInfos.ballY + this.radius;
		var bleft = this.gameInfos.ballX - this.radius;
		var bright = this.gameInfos.ballX + this.radius;

		return (bright > pleft && bbottom > ptop && btop < pbottom && bleft < pright);
	}

  public update() {
			this.gameInfos.ballX += this.velocityX;
			this.gameInfos.ballY += this.velocityY;

      if (this.gameInfos.ballY + this.radius > CONSTS.GAME_HEIGHT || this.gameInfos.ballY - this.radius < 0)
				this.velocityY = -this.velocityY;

			let player = (this.gameInfos.ballX < CONSTS.GAME_WIDTH / 2 ? {x: this.gameInfos.p1x, y: this.gameInfos.p1y} : {x: this.gameInfos.p2x, y: this.gameInfos.p2y}); //player

			if (this.collision(player)) //opti mettre player et collision dans un else if
			{
				var collidepoint = this.gameInfos.ballY - (player.y + CONSTS.PLAYER_HEIGHT/2);
				collidepoint = collidepoint / (CONSTS.PLAYER_HEIGHT / 2);

				var angleRad = (Math.PI/4) * collidepoint;

				var direction = (this.gameInfos.ballX < CONSTS.GAME_WIDTH / 2 ? 1 : -1);

				this.velocityX = direction * (this.speed * Math.cos(angleRad));
				this.velocityY = this.speed * Math.sin(angleRad);

				this.speed += 0.5;
			}

			if (this.gameInfos.ballX - this.radius < 0)
			{
        this.gameInfos.scoreP2 += 1;
        this.resetBall();
			}
			else if (this.gameInfos.ballX + this.radius > CONSTS.GAME_WIDTH)
			{
        this.gameInfos.scoreP1 += 1;
        this.resetBall();
			}

      if (this.gameInfos.scoreP1 >= 11 || this.gameInfos.scoreP2 >= 11) {
        this.playing = false;
      }

      var gameInfosReturn = this.gameInfos;
      return (gameInfosReturn);
		}

    /*
    ** reset ball
    */
    public resetBall() {
      this.gameInfos.ballX = CONSTS.GAME_WIDTH / 2;
      this.gameInfos.ballY = CONSTS.GAME_HEIGHT / 2;
      this.velocityX = (this.velocityX > 0) ? -this.basicSpeed : this.basicSpeed;
      this.velocityY = 0;
      this.speed = this.basicSpeed;
    }

    /*
    ** Update the player position
    */
    public updatePos1 (pos: number) {
      this.gameInfos.p1y = pos;
    }

    public updatePos2 (pos: number) {
      this.gameInfos.p2y = pos;
    }

    /*
    ** To know if the game is finish
    */
    public isEnd () { //if playing = true the game is not finish :)
      return (this.playing ? false : true);
    }

    /*
    ** Return the score
    */
    public getScore() {
      var tmp_win = this.gameInfos.scoreP1 > this.gameInfos.scoreP2 ? {p: 1, score: this.gameInfos.scoreP1} : {p: 2, score: this.gameInfos.scoreP2};
      var tmp_loose = tmp_win.p == 1 ? {p: 2, score: this.gameInfos.scoreP2} : {p: 1, score: this.gameInfos.scoreP1};

      return ( {win: tmp_win, loose: tmp_loose} );
    }
}

@WebSocketGateway(80, { namespace: 'game' })
export class GameGateway {
  @WebSocketServer()
  server: Server;

  public games = {} ;

  @SubscribeMessage('startgame')
  connectPlayer(client: Socket, message: any): Promise<void> {
    console.log("le player : " + message.player);
    console.log("la room : " + message.room);

    if (this.games[message.room] == undefined) { //status :  w = waiting | p = playing | e = end
      this.games[message.room] = {players: {p1: false, p2: false}, game: new gameRender(lodash.cloneDeep(startGameInfos), message.speed), loop: null, room: message.room};
    }

    if (message.player == 1) { //check if p1 and p2 are connected
      this.games[message.room].players.p1 = true;
    }
    else if (message.player == 2) {
      this.games[message.room].players.p2 = true;
    }

    if (this.games[message.room].players.p1 == true && this.games[message.room].players.p2 == true && (message.player == 1 || message.player == 2) && this.games[message.room].game.status == 'w') {
      this.games[message.room].game.status = 'p';
      this.games[message.room].loop = setInterval((room: string) => this.sendGameData(room), 1000/60, message.room);
    }
    else if (this.games[message.room] != undefined && this.games[message.room].status == 'e') { //if someone refresh the page this condition avoid to duplicate game with a same room id and just send the final score of the current game
        this.server.to(message.room).emit('finalScore', this.games[message.room].game.getScore());
    }
    return ;
  }

  /*
  ** func to put in setinterval loop who update the game
  */
  sendGameData(room: string) {
    var data = this.games[room].game.update();

    // console.log("we are in sendgamedata ! room : " + room);
    if (this.games[room].game.isEnd()) {
      this.games[room].game.setStatus = 'e';
      this.clearGame(room);
      this.server.to(room).emit('finalScore', this.games[room].game.getScore());
    }
    else {
      this.server.to(room).emit('gameData', data);
    }
  }

  /*
  ** Stop game
  */
  @SubscribeMessage('stopGame')
  stopGame(client: Socket, room: string): void {

    if (this.games[room] != undefined) {
      this.clearGame(room);
    }

    if (this.games[room] != undefined) {
      delete this.games[room];
    }
  }

  public clearGame(room: string) {
    if (this.games[room].loop != null) {
      console.log("On clear l'interval de la room : " + room);

      clearInterval(this.games[room].loop);
      this.games[room].loop = null;
    }
  }
  /*
  ** receive P1
  */
  @SubscribeMessage('pos1')
  handlePosP1(client: Socket, message: {room: string, pos: number}): void {
    if ( this.games[message.room] != undefined)
      this.games[message.room].game.updatePos1(message.pos);
  }

  /*
  ** receive P2
  */
  @SubscribeMessage('pos2')
  handlePosP2(client: Socket, message: {room: string, pos: number}): void {
    if ( this.games[message.room] != undefined)
      this.games[message.room].game.updatePos2(message.pos);
  }


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
}
