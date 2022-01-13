import { useEffect } from 'react';
import StartGame from './shapes';
import { GAME_HEIGHT, GAME_WIDTH } from './utils/gameConstants';

const PongGame = () =>
{
	// <button onClick={StartGame}>Start Game</button> { StartGame() }
	useEffect ( () => {
		StartGame();
	})

	return (
		<div>	
			<canvas id="PongCanvas" width={GAME_WIDTH} height={GAME_HEIGHT}></canvas>
		</div>
	)
}

export default PongGame;