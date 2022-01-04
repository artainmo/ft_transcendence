import React, { useState } from 'react';
import Profile from '../userAccount/profile';
import ChatsView from '../chat/chatsView';
import Play from '../game/play';
import { UserDto } from "../../api/user/dto/user.dto";

const HomeDisplay: React.FC<{changeMenuPage: (newMenuPage: string) => void}> = ({ changeMenuPage }) => {
	return (<div>
				<h1>Welcome to the Pong Game</h1>
				<button onClick={()=>{changeMenuPage('play')}}>Play</button><>&nbsp;&nbsp;&nbsp;</>
				<button onClick={()=>{changeMenuPage('chat')}}>Chat</button><>&nbsp;&nbsp;&nbsp;</>
				<button onClick={()=>{changeMenuPage('profile')}}>Profile</button>
			</div>);
}

const Home: React.FC<{user: UserDto, changeUser: (newUser: UserDto | null) => void}> = ({ user, changeUser }) => {
	const [menuPage, setMenuPage] = useState<string>("home");

	const changeMenuPage: (newMenuPage: string) => void = (newMenuPage) => {
		setMenuPage(newMenuPage);
	}

	if (menuPage === "home") {
		return (<HomeDisplay changeMenuPage={changeMenuPage}/>);
	} else if (menuPage === "play") {
		return (<h1>Play</h1>);
		// return <Play user={user} changeUser={changeUser} changeMenuPage={changeMenuPage}/>;
	} else if (menuPage === "chat") {
		return <ChatsView user={user} changeMenuPage={changeMenuPage}/>;
	} else if (menuPage === "profile") {
		return <Profile user={user} changeUser={changeUser} changeMenuPage={changeMenuPage}/>;
	} else {
		return <h1>Home Error</h1>;
	}
}

export default Home;
