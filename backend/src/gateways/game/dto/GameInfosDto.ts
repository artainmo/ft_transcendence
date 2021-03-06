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