import { useEffect } from 'react';
// import StartGame from './shapes';
import { GAME_HEIGHT, GAME_WIDTH } from './utils/gameConstants';
import {
	connect,
	startGame,
	listenStartGame,
	joinRoom,
	leaveRoom,
	stopGame,
	disconnect } from "../../../websocket/game/game.socket";
import { GameDto } from "../../../api/games/dto/game.dto";
import { WebsocketGameDto } from "../../../websocket/game/dto/websocket-game.dto";
import Background from "./Background";
import { UserDto } from "../../../api/user/dto/user.dto";
import { GameInfosDto } from "./utils/gameInfosDto";
import { Game } from "./Game";

const PongGame = (props : {gameInfos: GameDto, user: UserDto}) =>
{
	useEffect ( () => {
		//var b = new Background(props.gameInfos, props.user.name);
		

		var p = ((props.user.name === props.gameInfos.user1.name) ? 1 : 2);
		var socket = connect();
		var game = new Game(props.gameInfos, props.user.name, socket);

		joinRoom(socket, props.gameInfos.id.toString()); //"room3"
		startGame(socket, {room: props.gameInfos.id.toString(), player: p});
		socket.on('gameData', (data: GameInfosDto) => {
			game.drawGame(data);
		})
		return () => {
			stopGame(socket);
			disconnect(socket);
		}
	}, [])

	console.log("Gameinfos : ");
	console.log(props.gameInfos);
	console.log("user : ");
	console.log(props.user);

	return (
		<div>
			{/* <button onClick={() => testsock(props.gameInfos)}>Teeeeeeeessssstttttt</button> */}
			<canvas id="PongCanvas" width={GAME_WIDTH} height={GAME_HEIGHT}></canvas>
		</div>
	)
}

export default PongGame;