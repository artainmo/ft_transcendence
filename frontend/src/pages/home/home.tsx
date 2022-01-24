import React, { useState, useEffect } from 'react';
import Profile from '../userAccount/profile';
import ChatsView from '../chat/chatsView';
import Play from '../game/play';
import { UserDto } from "../../api/user/dto/user.dto";
import { updateUser, getUser } from "../../api/user/user.api";
import { GameDto } from "../../api/games/dto/game.dto";
import { getAllGames } from "../../api/games/games.api";

const HomeDisplay: React.FC<{user: UserDto, changeMenuPage: (newMenuPage: string) => void}> = ({user, changeMenuPage }) => {
	updateUser(user.id, {status: "Online"});

	return (<div>
				<h1>Welcome to the Pong Game</h1>
				<button onClick={()=>{changeMenuPage('play')}}>Play</button><>&nbsp;&nbsp;&nbsp;</>
				<button onClick={()=>{changeMenuPage('chat')}}>Chat</button><>&nbsp;&nbsp;&nbsp;</>
				<button onClick={()=>{changeMenuPage('profile')}}>Profile</button>
			</div>);
}

const Home: React.FC<{user: UserDto, changeUser: (newUser: UserDto | null) => void}> = ({ user, changeUser }) => {
	const [menuPage, setMenuPage] = useState<string>("home");
	const [game, setGame] = useState<GameDto | null>(null);

	useEffect(()=>{
    const findGame: () => void = async () => {
			let latestUser = await getUser(user.id);
			if (latestUser === null || latestUser.status !== "Online") return ;
      const games = await getAllGames();
      let myGame = games.find((findGame: GameDto) =>
						(findGame.user1.id === user.id || (findGame.user2 !== null && findGame.user2.id === user.id)));
      if (myGame === undefined) return ;
      changeGame(myGame);
    }
    const interval = setInterval(findGame, 2000);
    return () => clearInterval(interval);
  // eslint-disable-next-line
  }, [])

	const changeGame: (newGame: GameDto | null) => void = (newGame) => {
    setGame(newGame);
  }

	const changeMenuPage: (newMenuPage: string) => void = (newMenuPage) => {
		setMenuPage(newMenuPage);
	}

	const back: () => void = () => {
		changeMenuPage("home");
	}

	if (menuPage === "home") {
		return (<HomeDisplay user={user} changeMenuPage={changeMenuPage}/>);
	} else if (menuPage === "play" || game !== null) {
		return <Play user={user} changeMenuPage={changeMenuPage} game={game} changeGame={changeGame}/>;
	} else if (menuPage === "chat") {
		return <ChatsView user={user} changeUser={changeUser} changeMenuPage={changeMenuPage}/>;
	} else if (menuPage === "profile") {
		return <Profile user={user} changeUser={changeUser} back={back} myAccount={true}/>;
	} else {
		return <h1>Home Error</h1>;
	}
}

export default Home;
