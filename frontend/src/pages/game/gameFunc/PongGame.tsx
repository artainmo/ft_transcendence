import { useEffect } from 'react';
// import StartGame from './shapes';
import { GAME_HEIGHT, GAME_WIDTH } from './utils/gameConstants';
import { listen, listenscore1, joinRoom, leaveRoom, send, disconnect } from "../../../websocket/game/game.socket";
import { GameDto } from "../../../api/games/dto/game.dto";
import { WebsocketGameDto } from "../../../websocket/game/dto/websocket-game.dto";
import Background from "./Background";

/*
export interface GameDto {
  id: number;
  user1: UserDto;
  user2: UserDto | null;
  ballspeed: number;
  map: string;
}
*/ 
const testsock  = (gameInfos: GameDto) => {
	
	var wbsockinfos: WebsocketGameDto = {
		room: gameInfos.id.toString(10),
		index: gameInfos.id,
		ballX: GAME_WIDTH / 2,
		ballY: GAME_HEIGHT / 2,
		ballVelocityX: 5,
		ballVelocityY: 5,
		player1Y: GAME_HEIGHT / 2,
		player2Y: GAME_HEIGHT / 2,
		player1Score: 0,
		player2Score: 0,
	}
	console.log("mais wshhh???");
	send({room: "room3", content: wbsockinfos});
}

/* 
** TODOOO
** mettre room id a la palce de room3 :)
*/

function game(b: Background)
{
	b.update();
	b.drawGame();
}



const PongGame = (props : {gameInfos: GameDto}) =>
{
	// <button onClick={StartGame}>Start Game</button> { StartGame() }
	var wbsockinfos: WebsocketGameDto = {
		room: props.gameInfos.id.toString(10),
		index: props.gameInfos.id,
		ballX: GAME_WIDTH / 2,
		ballY: GAME_HEIGHT / 2,
		ballVelocityX: 5,
		ballVelocityY: 5,
		player1Y: GAME_HEIGHT / 2,
		player2Y: GAME_HEIGHT / 2,
		player1Score: 0,
		player2Score: 0,
	}
	

	useEffect ( () => {
		var b = new Background(props.gameInfos);
		joinRoom("room3");
		listen((data) => { 
			console.log("On a ecoute qqch");
  			console.log(data);
			
			b.b.setVX(data.ballVelocityX);
			b.b.setVY(data.ballVelocityY);
			b.setP1Y(data.player1Y);
			b.setP2Y(data.player2Y);
			b.setP1Score(data.player1Score);
			b.setP2Score(data.player2Score);
			
			
		})

		listenscore1((data) => { 
			console.log("On a ecoute le score !");
  			console.log(data);
			
			b.setP2Score(data);
			// b.b.setVX(data.ballVelocityX);
			// b.b.setVY(data.ballVelocityY);
			// b.setP1Y(data.player1Y);
			// b.setP2Y(data.player2Y);
			// b.setP1Score(data.player1Score);
			// b.setP2Score(data.player2Score);	
		})
		// StartGame(wbsockinfos);
		setInterval( function() { game(b); }, 1000/50 );
		return () => leaveRoom("room3");
	}, [])

	console.log("Gameinfos : ");
	console.log(props.gameInfos);


	return (
		<div>
			<button onClick={() => testsock(props.gameInfos)}>Teeeeeeeessssstttttt</button>
			<canvas id="PongCanvas" width={GAME_WIDTH} height={GAME_HEIGHT}></canvas>
		</div>
	)
}

export default PongGame;