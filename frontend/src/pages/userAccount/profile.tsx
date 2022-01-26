import React, { useState, useEffect } from 'react';
import { MdOutlinePersonOutline } from "react-icons/md";
import { FriendDto } from "../../api/friends/dto/friend.dto";
import { addFriend, createNewFriend, getFriendsOfUser, removeFriend } from "../../api/friends/friends.api";
import { UserDto } from "../../api/user/dto/user.dto";
import { getUser, getAllUsers, updateUser, getUserByLogin, getTwoFactorAuthenticationSecret, verifyTwoFactorAuthentication } from "../../api/user/user.api";
import { MatchHistoryDto } from "../../api/match-history/dto/match-history.dto";
import { getMatchHistoryOfUser } from "../../api/match-history/match-history.api";
import { GameDto } from "../../api/games/dto/game.dto";
import { getAllGames } from "../../api/games/games.api";
import styles from "./profile.module.css";
const QRCode = require('qrcode');

let g_viewed_users_history: UserDto[] = [];

interface profileProps {
	user: UserDto,
	changeUser: (newUser: UserDto | null) => void,
	back: () => void,
	myAccount: boolean
	changeGame: (newGame: GameDto | null) => void
}

interface settingsProps {
	user: UserDto,
	changeUser: (newUser: UserDto | null) => void,
	renderPage: () => void
}

interface FriendsProps {
	profile: UserDto,
	changeProfile: (newProfile: UserDto) => void,
	ownAccount: boolean,
	changeAccountOwner: (newValue: boolean) => void,
	renderPage: () => void
}

interface FindFriendsProps {
	profile: UserDto,
	userFriends: UserDto[],
	renderPage: () => void
}

const Settings: React.FC<settingsProps> = ({ user, changeUser, renderPage }) => {
	let [login, setLogin] = useState<string>('');
	let [loginAlreadyInUse, setLoginAlreadyInUse] = useState<boolean>(false);
	let [qrcode, setQrcode] = useState<string>('');
	let [activate2FA, setActivate2FA] = useState<boolean>(user.hasTwoFactorAuthentication);
	let [token, setToken] = useState<string>('');
	let [wrongToken, setWrongToken] = useState<boolean>(false);

	const newLogin: (name: string) => void = async (name) => {
		if (name === '') return ;
		let userInDatabaseByLogin = await getUserByLogin(login);
		if (userInDatabaseByLogin === null) {
			setLoginAlreadyInUse(false);
			user.login = name;
			changeUser(user);
			await updateUser(user.id, {login: name});
			setLogin('');
			renderPage();
		} else {
			setLoginAlreadyInUse(true);
			setLogin('');
		}
	}

	const changeTwoFactorAuthentication: () => void = async () => {
		activate2FA = !activate2FA;
		setActivate2FA(activate2FA);
		if (activate2FA) {
				const secret = await getTwoFactorAuthenticationSecret();
				QRCode.toDataURL(secret.otpauth_url, (err: any, url: any) => qrcode = url);
				await updateUser(user.id, {twoFactorAuthenticationSecret: secret.ascii});
				user.twoFactorAuthenticationSecret = secret.ascii;
		} else {
			await updateUser(user.id, {hasTwoFactorAuthentication: false});
			user.hasTwoFactorAuthentication = false;
			qrcode = '';
			setToken('');
			setWrongToken(false);
		}
		changeUser(user);
		renderPage();
		setQrcode(qrcode);
	}

	const verify2FA: () => void = async () => {
		setToken('');
		const correct = await verifyTwoFactorAuthentication(user.twoFactorAuthenticationSecret, token);
		if (correct) {
			setQrcode('');
			setWrongToken(false);
			await updateUser(user.id, {hasTwoFactorAuthentication: true});
			user.hasTwoFactorAuthentication = true;
			changeUser(user);
			renderPage();

		} else {
			setWrongToken(true);
		}
	}

	const changeAvatar: (event: any) => void = async (event) => {
		if (!event.target.files) return ;
		let reader = new FileReader();
	 	reader.onload = async (e) => {
			if (e === null || e!.target!.result === null) return ;
			await updateUser(user.id, {avatar: e!.target!.result as string});
			user.avatar = e!.target!.result as string;
			changeUser(user);
			renderPage();
	 	};
	 	reader.readAsDataURL(event.target.files[0]);
 }

	return (<div>
						<br/><label>New Login: </label>
						<input className={styles.textInput} type="text" value={login} onChange={(e)=>setLogin(e.target.value)}/><>&nbsp;&nbsp;</>
						<button className={styles.submitButton} type="submit" onClick={()=>newLogin(login)}>Submit</button>
						{loginAlreadyInUse && <><>&nbsp;&nbsp;</><span>This login is already in use</span></>}
						<br/><br/><label>Two-factor-authentication: </label>
						{user.hasTwoFactorAuthentication && <input type="checkbox" onClick={()=>changeTwoFactorAuthentication()} checked/>}
						{!user.hasTwoFactorAuthentication && <input type="checkbox" onClick={()=>changeTwoFactorAuthentication()}/>}
						{qrcode !== '' && <><br/><img src={qrcode} alt={"QR code"}/><br/></>}
						{qrcode !== '' && <label>Token: </label>}
						{qrcode !== '' && <input className={styles.textInput} type="text" value={token} onChange={(e)=>setToken(e.target.value)}/>}
						{token.length === 6 && verify2FA()}
						{wrongToken && <><>&nbsp;&nbsp;&nbsp;</><span>Wrong Token</span></>}
						<br/><br/>
						<label className={styles.chooseFileButton}>Download Avatar Image
						<input type="file" accept="image/*" onChange={(e)=>changeAvatar(e)}/>
						</label>
				  </div>)
}

const FindFriends: React.FC<FindFriendsProps> = ({ profile, userFriends, renderPage }) => {
	const [searchResults, setSearchResults] = useState<UserDto[]>([]);
  const [searchText, setSearchText] = useState<string>('');

	const isPartOfFriends: (account: UserDto) => boolean = (account) => {
		const find = userFriends.find((friend) => account.id === friend.id);
		return (find !== undefined);
	}

  const handleSearch: (searchValue: string) => void = async (searchValue) => {
    let search: UserDto[] = [];
		const allUsers = await getAllUsers();

    allUsers.forEach((item) => searchValue.length !== 0 && !isPartOfFriends(item)
                              && item.login.includes(searchValue) && item.login !== profile.login && search.push(item))
    setSearchText(searchValue);
    setSearchResults(search);
  }

  return (<div>
            <input placeholder={"New friends..."} className={styles.textInput} type="text" value={searchText} onChange={(e) => handleSearch(e.target.value)}/><br/>
            {searchResults.map((item) => <div>
                                            <br/>
                                            <span>{item.login}</span><>&nbsp;&nbsp;</>
                                            <button onClick={(e)=> {
																																		addFriend(createNewFriend(profile, item.id));
																																		addFriend(createNewFriend(item, profile.id));
                                                                    handleSearch("");
																																		renderPage();}}
																																		className={styles.addFriendButton}>Add Friend</button>
                                         </div>)}
          </div>);
}

const Friends: React.FC<FriendsProps> = ({ profile, changeProfile, ownAccount, changeAccountOwner, renderPage }) => {
	const [userFriends, setUserFriends] = useState<UserDto[]>([]);

	const getFriendFromId: (friend_id: number) => Promise<UserDto | null> = async (friend_id) => {
		const friend = await getUser(friend_id);
		if (friend === null) return null;
		return friend;
	}

	useEffect(() => {
		const getUserFriends: () => void = async () => {
			let friends: FriendDto[] = await getFriendsOfUser(profile.login);
			let friends1: (UserDto | null)[] = await Promise.all(friends.map(async (item): Promise<UserDto | null> => { return await getFriendFromId(item.friend_id); }));
			// @ts-ignore
			let friends2: UserDto[] = friends1.filter((friend) => friend !== null);
			setUserFriends(friends2);
		}
		getUserFriends();
	})

  const seeFriendProfile: (friend: UserDto) => void = (friend) => {
    g_viewed_users_history.push(profile);
		if (friend === null) return ;
		changeProfile(friend);
    if (ownAccount === true) changeAccountOwner(false);
  }

  return (<div>
            <h3>Friends</h3>
            {userFriends.length ? userFriends.map((elem) => <div>
																															<span className={styles.clickable} onClick={()=> seeFriendProfile(elem)}>{`${elem.login}`}</span><>&nbsp;&nbsp;&nbsp;</>
																															{ownAccount && <><button className={styles.removeFriendButton}
																																onClick={(e)=> {removeFriend(profile.id, elem.id); removeFriend(elem.id, profile.id); renderPage();}}>
																																Remove Friend</button><br/><br/></>}
																														</div>)
																	: <p>No friends</p>}
						<br/>
            {ownAccount && <FindFriends profile={profile} userFriends={userFriends} renderPage={renderPage}/>}
          </div>);
}

const Profile: React.FC<profileProps> = ({ user, changeUser, back, myAccount, changeGame }) => {
	const [profile, setProfile] = useState<UserDto>(user);
  const [ownAccount, setOwnAccount] = useState<boolean>(myAccount);
	const [userMatchHistory, setUserMatchHistory] = useState<MatchHistoryDto[]>([]);
	const [render, setRender] = useState<boolean>(true);
	const [settings, setSettings] = useState<boolean>(false);

	useEffect(() => {
		const getUserMatchHistory: () => void = async () => {
			let matchHistory = await getMatchHistoryOfUser(profile.login);
			setUserMatchHistory(matchHistory);
		}
		getUserMatchHistory();
	}, [profile])

	const changeAccountOwner: (newValue: boolean) => void = (newValue) => {
    setOwnAccount(newValue);
  }

	const changeProfile: (newProfile: UserDto) => void = (newProfile) => {
    setProfile(newProfile);
  }

	const renderPage: () => void = () => {
    setRender(!render);
  }

	const logout: () => void = async () => {
		if (profile.status === "Online") await updateUser(profile.id, {status: "Offline"});
		changeUser(null);
	}

	const backFromViewedProfile: () => void = () => {
		changeProfile(g_viewed_users_history[g_viewed_users_history.length - 1]);
		g_viewed_users_history.pop();
		if (g_viewed_users_history.length === 0 && myAccount === true) changeAccountOwner(true);
	}

	const watchGame: () => void = async () => {
		let latestUser = await getUser(profile.id);
		if (latestUser === null || latestUser.status !== "In a game") {
			if (latestUser === null) return ;
			changeProfile(latestUser);
			return ;
		}
		const games = await getAllGames();
		let Game = games.find((findGame: GameDto) =>
					(findGame.user1.id === profile.id || (findGame.user2 !== null && findGame.user2.id === profile.id)));
		if (Game === undefined) return ;
		g_viewed_users_history = [];
		changeGame(Game);
	}

  return (<div>
              {g_viewed_users_history.length === 0 && <><button className={styles.backButton} onClick={()=>{back()}}>Back</button><>&nbsp;&nbsp;</></>}
							{ownAccount && <><button className={styles.settingsButton} onClick={()=>{setSettings(!settings); renderPage();}}>Settings</button><>&nbsp;&nbsp;</></>}
              {ownAccount && <button className={styles.logoutButton} onClick={()=>{logout()}}>Log out</button>}
							{settings && <Settings user={user} changeUser={changeUser} renderPage={renderPage}/>}
              {g_viewed_users_history.length !== 0 && <button className={styles.backButton} onClick={()=>{backFromViewedProfile()}}>Back</button>}
              <h1>Profile</h1>
              {profile.avatar ? <img src={profile.avatar} alt={"avatar"} height='100em' width='100em'/> : <MdOutlinePersonOutline size='3em'/>}
              <p>Name: {profile.name}</p>
							<p>Login: {profile.login}</p>
							<span>{profile.status}</span><>&nbsp;&nbsp;&nbsp;</>
							{profile.status === "In a game" && <button onClick={()=>watchGame()}>Watch Game</button>}<br/>
              <h3>Stats</h3>
							<p>Ratio: {(profile.nbrVicotry / profile.nbrLoss) ? (profile.nbrVicotry / profile.nbrLoss) : 0}</p>
              <p>Victories: {profile.nbrVicotry}</p>
              <p>Losses: {profile.nbrLoss}</p>
              <h3>Match History</h3>
              {userMatchHistory.length ? userMatchHistory.map((elem)=><p>{elem}</p>) : <p>No matches</p>}
              <Friends profile={profile} changeProfile={changeProfile} ownAccount={ownAccount} changeAccountOwner={changeAccountOwner} renderPage={renderPage}/>
          </div>);
}

export default Profile;
