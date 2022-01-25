import { BALL_RADIUS, GAME_HEIGHT, GAME_WIDTH, PLAYER_HEIGHT, PLAYER_WIDTH } from "./utils/gameConstants";
import Player from "./Player";
import { ballDto } from "./utils/ballDto";

class Ball
{
	/*
	** ---------------------------
	** Public
	*/
	public x: number;
	public y: number;
	public r: number;
	public speed: number;
	public velocityX: number;
	public velocityY: number;
	public color: string;
	
	constructor(r = BALL_RADIUS, s = 5, vX = 5, vY = 5, color = "white")
	{

		this.x = GAME_WIDTH / 2;
		this.y = GAME_HEIGHT / 2;
		this.r = r;
		this.speed = s;
		this.velocityX = vX;
		this.velocityY = vY;
		this.color = color;
		
	}

	/*
	** Getter
	*/
	public getX() {return this.x;}
	public getY() {return this.y;}
	public getRadius() {return this.r;}
	public getSpeed() {return this.speed;}
	public getVX() {return this.velocityX;}
	public getVY() {return this.velocityY;}
	public getColor() {return this.color;}

	/*
	** Setter
	*/
	public setX(nX: number) {this.x = nX;}
	public setY(nY: number) {this.x = nY;}
	public setRadius(r: number) {this.r = r;}
	public setSpeed(s: number) {this.speed = s;}
	public setVX(vX: number) {this.velocityX = vX;}
	public setVY(vY: number) {this.velocityY = vY;}
	public setColor(c: string) {this.color = c;}

	/*
	** Func
	*/
	public collision(player: Player)
	{
		var ptop = player.y;
		var pbottom = player.y + PLAYER_HEIGHT;
		var pleft = player.x;
		var pright = player.x + PLAYER_WIDTH;

		var btop = this.y - this.r;
		var bbottom = this.y + this.r;
		var bleft = this.x - this.r;
		var bright = this.x + this.r;

		return (bright > pleft && bbottom > ptop && btop < pbottom && bleft < pright);
	}

	public update(hMax: number, p1: Player, p2: Player)
	{
		this.x += this.velocityX;
		this.y += this.velocityY;

		//Vs ia
		// let computerLevel = 0.1;
		// p2.y += (this.y - (p2.y + PLAYER_HEIGHT / 2)) * computerLevel;

		if (this.y + this.r > hMax || this.y - this.r < 0)
			this.velocityY = -this.velocityY;

		let player = (this.x < GAME_WIDTH / 2 ? p1 : p2);

		if (this.collision(player))
		{
			var collidepoint = this.y - (player.y + PLAYER_HEIGHT/2);
			collidepoint = collidepoint / (PLAYER_HEIGHT / 2);

			var angleRad = (Math.PI/4) * collidepoint;

			var direction = (this.x < GAME_WIDTH / 2 ? 1 : -1);

			// sendBallPos({room: this.room, value : {
			// 	x: this.x,
			// 	y: this.y,
			// 	velocityX: direction * (this.speed * Math.cos(angleRad)),
			// 	velocityY: this.speed * Math.sin(angleRad),
			// 	speed: this.speed += 0.5,
			// }})

			this.velocityX = direction * (this.speed * Math.cos(angleRad));
			this.velocityY = this.speed * Math.sin(angleRad);

			this.speed += 0.5;
		}
	}

	public resetBall()
	{
		// sendBallPos({room: this.room, value : {
		// 	x: GAME_WIDTH / 2,
		// 	y: GAME_HEIGHT / 2,
		// 	velocityX: -this.velocityX,
		// 	velocityY: this.velocityY,
		// 	speed: 5,
		// }})

		this.x = GAME_WIDTH / 2;
		this.y = GAME_HEIGHT / 2;
		this.speed = 5;
		this.velocityX = -this.velocityX;
	}

	/*
	** ---------------------------
	** Private
	*/
	
}

export default Ball;