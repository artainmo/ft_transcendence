/* eslint-disable */

/*
** Contain all the game page elements
*/

import StartGame from '../game/shapes'
import { GAME_HEIGHT, GAME_WIDTH } from '../game/infos'
import { Button } from '@material-ui/core';
import Background from '../game/Background';

const PongGame = () =>
{
	var background = new Background();
	// StartGame(background);
	return (
		<div className='PongPageClass'>
			<p>Awesome Pong game</p> 
			<Button variant='contained' id='startGameButton' onClick={ () => StartGame(background) }>Start Game</Button>
			<canvas id="PongCanvas" width={GAME_WIDTH} height={GAME_HEIGHT}></canvas>
		</div>
	)
}

export default PongGame;