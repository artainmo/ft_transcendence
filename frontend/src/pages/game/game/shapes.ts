/* eslint-disable */

import { parseJsonSourceFileConfigFileContent } from 'typescript';
import Background from './Background';



function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }

function game(b: Background)
{
	b.update();
	b.drawGame();
	
}

function StartGame(b: Background)
{
	//var b = new Background();
	//b.addListener();
	var element = document.getElementById('startGameButton');
	element?.parentNode?.removeChild(element);
	b.resetGame();
	setInterval( function() { game(b); }, 1000/50 );
}

export default StartGame;
