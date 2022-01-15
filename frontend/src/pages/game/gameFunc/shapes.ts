import Background from "./Background";
import { WebsocketGameDto } from "../../../websocket/game/dto/websocket-game.dto";

// function sleep(ms: number) {
// 	return new Promise(resolve => setTimeout(resolve, ms));
//   }

function game(b: Background)
{
	b.update();
	b.drawGame();
	
}

function StartGame(wbsockinfos: WebsocketGameDto)
{
	// var b = new Background();
	// //b.addListener();
	// setInterval( function() { game(b); }, 1000/50 );
}

export default StartGame;