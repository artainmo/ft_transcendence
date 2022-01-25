import { GAME_HEIGHT, GAME_WIDTH, PLAYER_HEIGHT, PLAYER_WIDTH } from "./utils/gameConstants";

class Player
{
	x;
	y; 
	// top = 0;
	// bottom = 0;
	// left = 0;
	// right = 0;
	width;
	height;

	constructor(x = 0, y = (GAME_HEIGHT / 2) - (PLAYER_HEIGHT / 2), w = PLAYER_WIDTH, h = PLAYER_HEIGHT)
	{
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
	}

	public setY(nY: number) { this.y = nY; }
}

export default Player;