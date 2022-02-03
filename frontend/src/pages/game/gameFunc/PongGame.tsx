import { useEffect, useState } from 'react';
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
import { removeGame } from "../../../api/games/games.api";
import cs from "../../../css/convention.module.css";



const PongGame = (props : {gameInfos: GameDto, user: UserDto, changeUser: (newUser: UserDto | null) => void, back: () => void, player: boolean}) => {
	const [endGame, setEndGame] = useState<boolean>(false);
	const [quitPermited, setQuitPermited] = useState<boolean>(!props.player);
	const [userDisconnected, setUserDisconnected] = useState<boolean>(false);

	useEffect(() => {
		let user2 = props.user.id === props.gameInfos.user1.id ? props.gameInfos.user2! : props.gameInfos.user1
		const verifyOtherUserDisconnect: () => Promise<void> = async () => {
			let latestUser2 = await getUser(user2.id);
			if ((latestUser2 === null || latestUser2.status !== "In a game")) {
				setUserDisconnected(true);
				setQuitPermited(true);
			}
    }
    const interval = setInterval(verifyOtherUserDisconnect, 2000);
    return () => clearInterval(interval);
	// eslint-disable-next-line
	}, [])

 	useEffect( () => {
		var p: number = 0;
		if (props.user.login === props.gameInfos.user1.login)
			p = 1;
		else if (props.user.login === props.gameInfos.user2!.login)
			p = 2;

		var socket = connect();
		var game = new Game(props.gameInfos, props.user.login, socket); // classe avec les toutes les infos de la game

		joinRoom(socket, props.gameInfos.id.toString());
		if (p !== 0) {
			startGame(socket, {room: props.gameInfos.id.toString(), player: p, speed: props.gameInfos.ballspeed});
		}
		socket.on('gameData', (data: GameInfosDto) => {
			game.drawGame(data);
		})
		socket.on('finalScore', (scores: playerScoreDto) => {
			game.drawEnd(scores);
			const scoreToDatabase: () => void = async () => {
				removeGame(props.gameInfos.id);
				let user2 = props.user.id === props.gameInfos.user1.id ? props.gameInfos.user2! : props.gameInfos.user1;
				let latestUser2 = await getUser(user2.id);
				if (latestUser2 === null || latestUser2.status !== "In a game" || userDisconnected) return ;
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
				setEndGame(true);
				setQuitPermited(true);
			}
			if (props.player) { scoreToDatabase(); } else { setEndGame(true); }
		})
		socket.on('userLeft', (name: string) => {
			game.drawUserLeft(name);
		})
		return () => {
			if (p === 1|| p === 2) { // to avoid a viewer to destroy the game if he click on back button
				stopGame(socket, {room: game.myRoom, name: props.user.name});
			}
			disconnect(socket);
		}
	// eslint-disable-next-line
	}, [])

	return (
		<div>
			{quitPermited && <><button className={cs.backButton} onClick={()=>props.back()}>Back</button><br/><br/></>}
			{(!userDisconnected || endGame) && <canvas id="PongCanvas"></canvas>}
			{userDisconnected && !endGame && <h3>Other user disconnected :(</h3>}
		</div>
	)
}

export default PongGame;
