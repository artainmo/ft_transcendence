import { GameDto } from "../../../api/games/dto/game.dto";
import { GameInfosDto } from "./utils/gameInfosDto";
import {CENTER_WIDTH, GAME_HEIGHT, GAME_WIDTH, PLAYER_HEIGHT, PLAYER_WIDTH, START_POSITION_P1, START_POSITION_P2, CENTER_HEIGTH} from "./utils/gameConstants";
import { sendPos1, sendPos2 } from "../../../websocket/game/game.socket";

export interface Ime {
	name: string,
	num: number,
}

export class Game {
		private room: string;
		private w: number;
		private h: number;
		private can: HTMLCanvasElement;
		private ctx: CanvasRenderingContext2D;
		private nameP1: string = "Player 1 : "; 
		private nameP2: string = "Player 2 : ";
		private bgColor: string = "black";
		private me: Ime = {name: "unkown", num: 0};
		private bRadius: number = 8; //radius de la ball a changer pour responsive
		private socket: any;

		constructor(baseGame: GameDto, name: string, socket: any, w: number = GAME_WIDTH, h: number = GAME_HEIGHT, canId: string = "PongCanvas")
		{
			this.socket = socket;
			this.w = w;
			this.h = h;
	
			this.nameP1 = baseGame.user1.name;
			if (baseGame.user2 != null)
				this.nameP2 = baseGame.user2.name;
			
				//this.b.setSpeed(baseGame.ballspeed*5);
			
			this.room = baseGame.id.toString();
				
			this.bgColor = baseGame.map;

			this.me.name = name;
			if (this.me.name == this.nameP1)
				this.me.num = 1;
			else if (this.me.name == this.nameP2)
				this.me.num = 2;

			this.can = document.getElementById(canId)  as HTMLCanvasElement;
			this.ctx = this.can.getContext('2d') as CanvasRenderingContext2D;
			this.can.addEventListener("mousemove", this.movePaddle.bind(this));
		}

		/*
		** Player move function
		*/
		public movePaddle(evt: MouseEvent)
		{
			// var rectTop = {top: 0};
			var rect = this.can.getBoundingClientRect();// || rectTop;
			//this.p1.y = evt.clientY - rect.top - (PLAYER_HEIGHT / 2);
			if (this.me.num == 1) {
				sendPos1(this.socket, evt.clientY - rect.top - (PLAYER_HEIGHT / 2));
			}	
			else if (this.me.num == 2) {
				sendPos2(this.socket, evt.clientY - rect.top - (PLAYER_HEIGHT / 2));
			}
		}

		/*
		** Drawing functions
		*/
		public fillRect(color: string = this.bgColor, x: number = 0, y: number = 0, w: number = this.w, h:number = this.h)
		{
			this.ctx.fillStyle = color;
			this.ctx.fillRect(x, y, w, h);
		}

		public fillCircle (color: string = "white", x: number = GAME_WIDTH / 2, y: number = GAME_HEIGHT / 2, r: number = this.bRadius)
		{
			this.ctx.fillStyle = color;
			this.ctx.beginPath();
			this.ctx.arc(x, y, r, 0, Math.PI*2, false);
			this.ctx.closePath();
			this.ctx.fill();
		}

		public fillWrite (text: string, x: number, y: number, color: string = "white", font: string = "15px fantasy")
		{
			this.ctx.fillStyle = color;
			this.ctx.font = font;
			this.ctx.fillText(text, x, y);
		}
	
		public destroyGame()
		{
			this.ctx.clearRect(0, 0, this.can.width, this.can.height);
		}

		/*
		** Update and draw in canvas
		** Take a GameInfos in argument to have websocket infos from backend
		*/
		public drawGame(data: GameInfosDto)
		{
			var height = 0;
		
			this.destroyGame();
			this.fillRect();
			this.fillRect("white", data.p1x, data.p1y, PLAYER_WIDTH, PLAYER_HEIGHT);
			this.fillRect("white", data.p2x, data.p2y, PLAYER_WIDTH, PLAYER_HEIGHT);
			this.fillWrite(this.nameP1 + "   "  + data.scoreP1.toString(), (GAME_WIDTH / 2) - 250 , 15);
			this.fillWrite(this.nameP2 + "   "  + data.scoreP2.toString(), (GAME_WIDTH / 2) + 150 , 15);
			
			while (height < GAME_HEIGHT)
			{
				this.fillRect("white", (GAME_WIDTH / 2) - (CENTER_WIDTH / 2), height, CENTER_WIDTH, CENTER_HEIGTH);
				height += CENTER_HEIGTH * 2;
			}
			this.fillCircle("white", data.ballX, data.ballY, this.bRadius);
		}


}