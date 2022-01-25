import "./utils/gameConstants"
import {CENTER_WIDTH, GAME_HEIGHT, GAME_WIDTH, PLAYER_HEIGHT, PLAYER_WIDTH, START_POSITION_P1, START_POSITION_P2, CENTER_HEIGTH} from "./utils/gameConstants";
import Ball from "./Ball";
import Player from "./Player";
import { GameDto } from "../../../api/games/dto/game.dto";
// import { sendScore1, sendScore2, sendPos1, sendBallPos, sendPos2 } from "../../../websocket/game/game.socket";
import { ballDto } from "./utils/ballDto";
import { getUserByName } from "../../../api/user/user.api";

class Background 
{
		private room: string;
		private w: number;
		private h: number;
		private can: HTMLCanvasElement;
		private ctx: CanvasRenderingContext2D;
		private p1: Player = new Player(START_POSITION_P1);
		private p2: Player = new Player(GAME_WIDTH - PLAYER_WIDTH);
		b: Ball = new Ball();
		private scoreP1: number = 0;
		private scoreP2: number = 0;
		private nameP1: string = "Player 1 : "; 
		private nameP2: string = "Player 2 : ";
		private bgColor: string = "black";
		private me: string;

		constructor(baseGame: GameDto, name: string, w: number = GAME_WIDTH, h: number = GAME_HEIGHT, canId: string = "PongCanvas")
		{
			this.w = w;
			this.h = h;

			this.nameP1 = baseGame.user1.name;
			if (baseGame.user2 != null)
				this.nameP2 = baseGame.user2.name;
			this.b.setSpeed(baseGame.ballspeed*5);
			
			this.room = baseGame.id.toString();
				
			this.bgColor = baseGame.map;
			this.me = name;

			this.can = document.getElementById(canId)  as HTMLCanvasElement;
			this.ctx = this.can.getContext('2d') as CanvasRenderingContext2D;
			this.can.addEventListener("mousemove", this.movePaddle.bind(this));
		}

		// public addListener()
		// {
		// 	this.can.addEventListener("mousemove", this.movePaddle.bind(this));
		// }
		/*
		** Setter
		*/
		public setP1Y(ny: number) { this.p1.y = ny; }
		public setP2Y(ny: number) { this.p2.y = ny; }
		public setP1Score(score: number) { this.scoreP1 = score; }
		public setP2Score(score: number) { this.scoreP2 = score; }
		public setBallData(data: ballDto) {
			this.b.setX(data.x);
			this.b.setY(data.y);
			this.b.setVX(data.velocityX);
			this.b.setVY(data.velocityY);
			this.b.setSpeed(data.speed);
		}
		
		public movePaddle(evt: MouseEvent)
		{
			// var rectTop = {top: 0};
			var rect = this.can.getBoundingClientRect();// || rectTop;
			//this.p1.y = evt.clientY - rect.top - (PLAYER_HEIGHT / 2);
			// if (this.me == this.nameP1)
			// 	sendPos1({room: this.room, value: evt.clientY - rect.top - (PLAYER_HEIGHT / 2)});
			// else if (this.me == this.nameP2)
			// 	sendPos2({room: this.room, value: evt.clientY - rect.top - (PLAYER_HEIGHT / 2)});
		}

		public fillRect(color: string = this.bgColor, x: number = 0, y: number = 0, w: number = this.w, h:number = this.h)
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
			this.fillWrite(this.nameP1 + "   "  + this.scoreP1.toString(), (GAME_WIDTH / 2) - 250 , 15);
			this.fillWrite(this.nameP2 + "   "  + this.scoreP2.toString(), (GAME_WIDTH / 2) + 150 , 15);
			
			while (height < GAME_HEIGHT)
			{
				this.fillRect("white", (GAME_WIDTH / 2) - (CENTER_WIDTH / 2), height, CENTER_WIDTH, CENTER_HEIGTH);
				height += CENTER_HEIGTH * 2;
			}
			this.fillCircle("white", this.b.getX(), this.b.getY(), this.b.getRadius());
		}

		public update()
		{
			// this.b.update(this.h, this.p1, this.p2);

			this.b.x += this.b.velocityX;
			this.b.y += this.b.velocityY;

			//Vs ia
			// let computerLevel = 0.1;
			// p2.y += (this.y - (p2.y + PLAYER_HEIGHT / 2)) * computerLevel;

			if (this.b.y + this.b.r > this.h/*hMax*/ || this.b.y - this.b.r < 0)
				this.b.velocityY = -this.b.velocityY;

			let player = (this.b.x < GAME_WIDTH / 2 ? this.p1 : this.p2);

			if (this.b.collision(player))
			{
				var collidepoint = this.b.y - (player.y + PLAYER_HEIGHT/2);
				collidepoint = collidepoint / (PLAYER_HEIGHT / 2);

				var angleRad = (Math.PI/4) * collidepoint;

				var direction = (this.b.x < GAME_WIDTH / 2 ? 1 : -1);

				// sendBallPos({room: this.room, value : {
				// 	x: this.b.x,
				// 	y: this.b.y,
				// 	velocityX: direction * (this.b.speed * Math.cos(angleRad)),
				// 	velocityY: this.b.speed * Math.sin(angleRad),
				// 	speed: this.b.speed += 0.5,
				// }})

				// this.b.velocityX = direction * (this.b.speed * Math.cos(angleRad));
				// this.b.velocityY = this.b.speed * Math.sin(angleRad);

				// this.b.speed += 0.5;
			}

			if (this.b.getX() - this.b.getRadius() < 0)
			{
				// this.scoreP2 += 1;
				// sendScore2({room: this.room, value: this.scoreP2 + 1});
				// // this.b.resetBall();
				// sendBallPos({room: this.room, value : {
				// 	x: GAME_WIDTH / 2,
				// 	y: GAME_HEIGHT / 2,
				// 	velocityX: -this.b.velocityX,
				// 	velocityY: this.b.velocityY,
				// 	speed: 5,
				// }})
			}
			else if (this.b.getX() + this.b.getRadius() > GAME_WIDTH)
			{
				//this.scoreP1 += 1;
				// sendScore1({room: this.room, value: this.scoreP1 + 1});
				// // this.b.resetBall();
				// sendBallPos({room: this.room, value : {
				// 	x: GAME_WIDTH / 2,
				// 	y: GAME_HEIGHT / 2,
				// 	velocityX: -this.b.velocityX,
				// 	velocityY: this.b.velocityY,
				// 	speed: 5,
				// }})
			}
		}

}

export default Background;