import { parseJsonSourceFileConfigFileContent } from "typescript";
import Background from "./Background";



function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }

function game(b: Background)
{
	b.update();
	b.drawGame();
	
}

function StartGame()
{
	var b = new Background();
	//b.addListener();
	setInterval( function() { game(b); }, 1000/50 );
}

export default StartGame;