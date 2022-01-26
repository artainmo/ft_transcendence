import { useEffect } from 'react';
import { GAME_HEIGHT, GAME_WIDTH } from './utils/gameConstants';
import {
	connect,
	startGame,
	joinRoom,
	stopGame,
	disconnect } from "../../../websocket/game/game.socket";
import { GameDto } from "../../../api/games/dto/game.dto";
import { UserDto } from "../../../api/user/dto/user.dto";
import { GameInfosDto, playerScoreDto } from "./utils/gameInfosDto";
import { Game } from "./Game";
import { addMatchHistory, createNewMatchHistory } from "../../../api/match-history/match-history.api";

const PongGame = (props : {gameInfos: GameDto, user: UserDto}) =>
{
	useEffect ( () => {
		var p = 0
		if (props.user.name === props.gameInfos.user1.name)
			p = 1;
		else if (props.user.name === props.gameInfos.user2!.name)
			p = 2;

		var socket = connect();
		var game = new Game(props.gameInfos, props.user.name, socket); // classe avec les toutes les infos de la game

		joinRoom(socket, props.gameInfos.id.toString()); //"room3"
		if (p !== 0)
			startGame(socket, {room: props.gameInfos.id.toString(), player: p});
		socket.on('gameData', (data: GameInfosDto) => {
			game.drawGame(data);
		})
		socket.on('finalScore', (scores: playerScoreDto) => {
			game.drawEnd(scores);
			addMatchHistory(createNewMatchHistory(props.user,
				game.myNum === scores.win.p ? scores.win.score : scores.loose.score,
				props.user.id === props.gameInfos.user1.id ? props.gameInfos.user2!.id : props.gameInfos.user1.id,
				game.myNum === scores.win.p ? scores.loose.score : scores.win.score));
			//scores = valeurs des scores
			//savoir qui on est = game.me
						/*
						export interface playerScoreDto {
							win: {
								p: number,
								score: number,
							}
							loose: {
								p: number,
								score: number,
							}
						}

			if game.me.num == win.p
						*/
			//envoyer data match history
		})
		return () => {
			stopGame(socket);
			disconnect(socket);
		}
	// eslint-disable-next-line
	}, [])

	console.log("Gameinfos : ");
	console.log(props.gameInfos);
	console.log("user : ");
	console.log(props.user);

	return (
		<div>
			<canvas id="PongCanvas" width={GAME_WIDTH} height={GAME_HEIGHT}></canvas>
		</div>
	)
}

export default PongGame;
