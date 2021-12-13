/* eslint-disable */

//import "../utils/constants"
import {CENTER_WIDTH, GAME_HEIGHT, GAME_WIDTH, PLAYER_HEIGHT, PLAYER_WIDTH, START_POSITION_P1, START_POSITION_P2, CENTER_HEIGTH} from "./infos";
import Ball from "./Ball";
import Player from "./Player";

class Background 
{
		private w: number = 0;
		private h: number = 0;
		private can: HTMLCanvasElement = {} as HTMLCanvasElement;
		private ctx: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;
		private p1: Player = new Player(START_POSITION_P1);
		private p2: Player = new Player(GAME_WIDTH - PLAYER_WIDTH);
		private b: Ball = new Ball();
		private scoreP1: number = 0;
		private scoreP2: number = 0;
		private nameP1: string = "Player 1 : "; 
		private nameP2: string = "Player 2 : ";

		constructor(w: number = GAME_WIDTH, h: number = GAME_HEIGHT, canId: string = "PongCanvas")
		{
			// this.w = w;
			// this.h = h;
			// this.can = document.getElementById(canId)  as HTMLCanvasElement;
			// this.ctx = this.can.getContext('2d') as CanvasRenderingContext2D;
			// this.can.addEventListener("mousemove", this.movePaddle.bind(this));
		}

		// public addListener()
		// {
		// 	this.can.addEventListener("mousemove", this.movePaddle.bind(this));
		// }

		public resetGame(w: number = GAME_WIDTH, h: number = GAME_HEIGHT, canId: string = "PongCanvas")
		{
			this.w = w;
			this.h = h;
			this.can = document.getElementById(canId)  as HTMLCanvasElement;
			this.ctx = this.can.getContext('2d') as CanvasRenderingContext2D;
			this.can.addEventListener("mousemove", this.movePaddle.bind(this));
			this.p1 = new Player(START_POSITION_P1);
			this. p2 = new Player(GAME_WIDTH - PLAYER_WIDTH);
			this.b = new Ball();
			this.scoreP1 = 0;
			this.scoreP2 = 0;
			this.nameP1 = "Player 1 : "; 
			this.nameP2 = "Player 2 : ";
		}

		public movePaddle(evt: MouseEvent)
		{
			// var rectTop = {top: 0};
			var rect = this.can.getBoundingClientRect();// || rectTop;
			this.p1.y = evt.clientY - rect.top - (PLAYER_HEIGHT / 2);
		}

		public fillRect(color: string = "black", x: number = 0, y: number = 0, w: number = this.w, h:number = this.h)
		{
			this.ctx.fillStyle = color;
			this.ctx.fillRect(x, y, w, h);
		}

		public fillCircle (color: string = "white", x: number = GAME_WIDTH / 2, y: number = GAME_HEIGHT / 2, r: number = this.b.getRadius())
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

		public drawGame()
		{
			var height = 0;
		
			this.destroyGame();
			this.fillRect();
			this.fillRect("white", this.p1.x, this.p1.y, PLAYER_WIDTH, PLAYER_HEIGHT);
			this.fillRect("white", this.p2.x, this.p2.y, PLAYER_WIDTH, PLAYER_HEIGHT);
			this.fillWrite(this.nameP1 + this.scoreP1, (GAME_WIDTH / 2) - 70 , 15);
			this.fillWrite(this.nameP2 + this.scoreP2, (GAME_WIDTH / 2) + 15 , 15);
			
			while (height < GAME_HEIGHT)
			{
				this.fillRect("white", (GAME_WIDTH / 2) - (CENTER_WIDTH / 2), height, CENTER_WIDTH, CENTER_HEIGTH);
				height += CENTER_HEIGTH * 2;
			}
			this.fillCircle("white", this.b.getX(), this.b.getY(), this.b.getRadius());
		}

		public update()
		{
			this.b.update(this.h, this.p1, this.p2);

			if (this.b.getX() - this.b.getRadius() < 0)
			{
				this.scoreP2 += 1;
				this.b.resetBall();
			}
			else if (this.b.getX() + this.b.getRadius() > GAME_WIDTH)
			{
				this.scoreP1 += 1;
				this.b.resetBall();
			}
		}

}

export default Background;