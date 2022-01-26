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
import { updateUser } from "../../../api/user/user.api";
import { GameInfosDto, playerScoreDto } from "./utils/gameInfosDto";
import { Game } from "./Game";
import { addMatchHistory, createNewMatchHistory } from "../../../api/match-history/match-history.api";
import { getUser } from "../../../api/user/user.api";

const PongGame = (props : {gameInfos: GameDto, user: UserDto, changeUser: (newUser: UserDto | null) => void }) =>
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
			const scoreToDatabase: () => void = async () => {
				let user2 = props.user.id === props.gameInfos.user1.id ? props.gameInfos.user2! : props.gameInfos.user1
				await addMatchHistory(createNewMatchHistory(props.user,
					game.myNum === scores.win.p ? scores.win.score : scores.loose.score,
					user2.id,
					game.myNum === scores.win.p ? scores.loose.score : scores.win.score));
				if (game.myNum === scores.win.p) {
					await updateUser(props.user.id, {nbrVicotry: props.user.nbrVicotry + 1});
					await updateUser(user2.id, {nbrLoss: user2.nbrLoss + 1});
				} else {
					await updateUser(props.user.id, {nbrLoss: props.user.nbrLoss + 1});
					await updateUser(user2.id, {nbrVicotry: user2.nbrVicotry + 1});
				}
				let latestUser = await getUser(props.user.id);
				props.changeUser(latestUser);
			}
			scoreToDatabase();
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
