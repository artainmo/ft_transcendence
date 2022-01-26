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

export interface players {
  p1: boolean;
  p2: boolean;
}

export interface GameInfosDto {
	ballX: number,
	ballY: number,
	p1y: number,
	p1x: number,
	p2y: number,
	p2x: number,
	scoreP1: number,
	scoreP2: number,
}

export const GAME_WIDTH = 700;
export const GAME_HEIGHT = 500;
export const CENTER_WIDTH = 12;
export const CENTER_HEIGTH = 30;

export const BALL_RADIUS = 8;
export const PLAYER_WIDTH = 15;
export const PLAYER_HEIGHT = 60;
export const MAX_SCORE = 11;

// export const START_POSITION_P1 = 0
// export const START_POSITION_P2 = 0;

var startGameInfos: GameInfosDto = {
  ballX: 350,
	ballY: 250,
	p1y: 500/2,
	p1x: 0,
	p2y: 500/2,
	p2x: 700-15,
	scoreP1: 0,
	scoreP2: 0,
}

class gameRender {
  private gameInfos: GameInfosDto;
  private velocityX: number;
  private velocityY: number;
  private speed: number;
  private radius: number;
  private playing: boolean = true;

  constructor (basic_infos: GameInfosDto) {
    this.gameInfos = basic_infos;
    this.velocityX = 5;
    this.velocityY = 5;
    this.speed = 5;
    this.radius = 8; //modifier la provenance
  }

  /*
  ** Collision with the pos x and y of the player
  */
  public collision(pos: {x: number, y: number})
	{
		var ptop = pos.y;
		var pbottom = pos.y + PLAYER_HEIGHT;
		var pleft = pos.x;
		var pright = pos.x + PLAYER_WIDTH;

		var btop = this.gameInfos.ballY - this.radius;
		var bbottom = this.gameInfos.ballY + this.radius;
		var bleft = this.gameInfos.ballX - this.radius;
		var bright = this.gameInfos.ballX + this.radius;

		return (bright > pleft && bbottom > ptop && btop < pbottom && bleft < pright);
	}

  public update() {
			this.gameInfos.ballX += this.velocityX;
			this.gameInfos.ballY += this.velocityY;

      if (this.gameInfos.ballY + this.radius > GAME_HEIGHT || this.gameInfos.ballY - this.radius < 0)
				this.velocityY = -this.velocityY;

			let player = (this.gameInfos.ballX < GAME_WIDTH / 2 ? {x: this.gameInfos.p1x, y: this.gameInfos.p1y} : {x: this.gameInfos.p2x, y: this.gameInfos.p2y}); //player

			if (this.collision(player)) //opti mettre player et collision dans un else if
			{
				var collidepoint = this.gameInfos.ballY - (player.y + PLAYER_HEIGHT/2);
				collidepoint = collidepoint / (PLAYER_HEIGHT / 2);

				var angleRad = (Math.PI/4) * collidepoint;

				var direction = (this.gameInfos.ballX < GAME_WIDTH / 2 ? 1 : -1);

				this.velocityX = direction * (this.speed * Math.cos(angleRad));
				this.velocityY = this.speed * Math.sin(angleRad);

				this.speed += 0.5;
			}

			if (this.gameInfos.ballX - this.radius < 0)
			{
        this.gameInfos.scoreP2 += 1;
        this.resetBall();
			}
			else if (this.gameInfos.ballX + this.radius > GAME_WIDTH)
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
      this.gameInfos.ballX = GAME_WIDTH / 2;
      this.gameInfos.ballY = GAME_HEIGHT / 2;
      this.velocityX = -this.velocityX; // reset velocity a 5 ou -5
      this.speed = 5;
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

  users: players = {
    p1: false,
    p2: false,
  };

  public games : gameRender[];
  public game = new gameRender(startGameInfos);
  public loop = null;

  @SubscribeMessage('startgame')
  connectPlayer(client: Socket, message: any): void {
    console.log("le player : " + message.player);
    if (message.player == 1)
      this.users.p1 = true;
    else if (message.player == 2)
      this.users.p2 = true;
    
    console.log("liste de la room : ");
    if (this.users.p1 == true && this.users.p2 == true)
      this.loop = setInterval(() => this.sendGameData(message.room), 1000/60);
  }

  /*
  ** func to put in setinterval loop who update the game
  */
  sendGameData(room: string) {
    var data = this.game.update();
    if (this.game.isEnd()) {
      this.clearGame();
      this.server.to(room).emit('finalScore', this.game.getScore());
      //enregistrer scores
    }
    else {
      this.server.to(room).emit('gameData', data);
    }
  }

  /*
  ** Stop game
  */
  @SubscribeMessage('stopGame')
  stopGame(client: Socket): void {
    this.clearGame();
  }

  public clearGame() {
    if (this.loop != null) {
      clearInterval(this.loop);
      this.loop = null;
    }
  }
  /*
  ** receive P1
  */
  @SubscribeMessage('pos1')
  handlePosP1(client: Socket, pos: number): void {
    this.game.updatePos1(pos);
  }

  /*
  ** receive P2
  */
  @SubscribeMessage('pos2')
  handlePosP2(client: Socket, pos: number): void {
    this.game.updatePos2(pos);
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
