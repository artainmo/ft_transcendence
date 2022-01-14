import React, { useState, useEffect } from 'react';
import { MdOutlinePersonOutline } from "react-icons/md";
import { getUser, getAllUsers, updateUser } from "../../api/user/user.api";
import { addFriend, createNewFriend, getFriendsOfUser, removeFriend } from "../../api/friends/friends.api";
import { UserDto } from "../../api/user/dto/user.dto";
import { FriendDto } from "../../api/friends/dto/friend.dto";
import { MatchHistoryDto } from "../../api/match-history/dto/match-history.dto";
import { getMatchHistoryOfUser } from "../../api/match-history/match-history.api";

let g_remember_account: UserDto;

interface profileProps {
	user: UserDto,
	changeUser: (newUser: UserDto | null) => void,
	changeMenuPage: (newMenuPage: string) => void
}

interface FriendsProps {
	user: UserDto,
	changeUser: (newUser: UserDto | null) => void,
	ownAccount: boolean,
	changeAccountOwner: () => void,
	renderPage: () => void
}

interface FindFriendsProps {
	user: UserDto,
	changeUser: (newUser: UserDto | null) => void,
	userFriends: UserDto[],
	renderPage: () => void
}

const FindFriends: React.FC<FindFriendsProps> = ({ user, changeUser, userFriends, renderPage }) => {
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
                              && item.login.includes(searchValue) && item.login !== user.login && search.push(item))
    setSearchText(searchValue);
    setSearchResults(search);
  }

  return (<div>
            <input type="text" value={searchText} onChange={(e) => handleSearch(e.target.value)}/><br/>
            {searchResults.map((item) => <div>
                                            <br/>
                                            <span>{item.login}</span><>&nbsp;&nbsp;&nbsp;</>
                                            <button onClick={(e)=> {
																																		addFriend(createNewFriend(user, item.id));
																																		addFriend(createNewFriend(item, user.id));
                                                                    handleSearch("");
																																		renderPage();}}>Add Friend</button>
                                         </div>)}
          </div>);
}

const Friends: React.FC<FriendsProps> = ({ user, changeUser, ownAccount, changeAccountOwner, renderPage }) => {
	const [userFriends, setUserFriends] = useState<UserDto[]>([]);

	const getFriendFromId: (friend_id: number) => Promise<UserDto | null> = async (friend_id) => {
		const friend = await getUser(friend_id);
		if (friend === null) return null;
		return friend;
	}

	useEffect(() => {
		const getUserFriends: () => void = async () => {
			let friends: FriendDto[] = await getFriendsOfUser(user.login);
			let friends1: (UserDto | null)[] = await Promise.all(friends.map(async (item): Promise<UserDto | null> => { return await getFriendFromId(item.friend_id); }));
			// @ts-ignore
			let friends2: UserDto[] = friends1.filter((friend) => friend !== null);
			setUserFriends(friends2);
		}
		getUserFriends();
	})

  const seeFriendProfile: (friend: UserDto) => void = (friend) => {
    g_remember_account = user;
		if (friend === null) return ;
		changeUser(friend);
    changeAccountOwner();
  }

  return (<div>
            <h3>Friends</h3>
            {userFriends.length ? userFriends.map((elem) => <div>
																															<span onClick={()=> seeFriendProfile(elem)}>{`${elem.login}`}</span><>&nbsp;&nbsp;&nbsp;</>
																															{ownAccount && <button onClick={(e)=> {removeFriend(user.id, elem.id); removeFriend(elem.id, user.id); renderPage();}}>Remove Friend</button>}
																														</div>)
																	: <p>No friends</p>}
						<br/>
            {ownAccount && <FindFriends user={user} changeUser={changeUser} userFriends={userFriends} renderPage={renderPage}/>}
          </div>);
}

const Profile: React.FC<profileProps> = ({ user, changeUser, changeMenuPage }) => {
  const [ownAccount, setOwnAccount] = useState<boolean>(true);
	const [userMatchHistory, setUserMatchHistory] = useState<MatchHistoryDto[]>([]);
	const [render, setRender] = useState<boolean>(true);

	useEffect(() => {
		const getUserMatchHistory: () => void = async () => {
			let matchHistory = await getMatchHistoryOfUser(user.login);
			setUserMatchHistory(matchHistory);
		}
		getUserMatchHistory();
	}, [user])

	const changeAccountOwner: () => void = () => {
    setOwnAccount(!ownAccount);
  }

	const renderPage: () => void = () => {
    setRender(!render);
  }

	const logout: () => void = async () => {
		if (user.online === true) await updateUser(user.id, {online: false});
		changeUser(null);
	}

  return (<div>
              {ownAccount && <><button onClick={()=>{changeMenuPage('home')}}>Back</button><>&nbsp;&nbsp;&nbsp;</></>}
              {ownAccount && <button onClick={()=>{logout()}}>Log out</button>}
              {!ownAccount && <><button onClick={()=>{changeUser(g_remember_account); changeAccountOwner();}}>Back</button><>&nbsp;&nbsp;&nbsp;</></>}
              <h1>Profile</h1>
              {user.avatar ? <img src={user.avatar} alt={"avatar"} height='50em' width='50em'/> : <MdOutlinePersonOutline size='3em'/>}
              <p>Name: {user.name}</p>
							<p>Login: {user.login}</p>
							<p>{user.online ? "Connected" : "Disconnected"}</p>
              <h3>Stats</h3>
              <p>Victories: {user.nbrVicotry}</p>
              <p>Losses: {user.nbrLoss}</p>
              <p>Ratio: {(user.nbrVicotry / user.nbrLoss) ? (user.nbrVicotry / user.nbrLoss) : 0}</p>
              <h3>Match History</h3>
              {userMatchHistory.length ? userMatchHistory.map((elem)=><p>{elem}</p>) : <p>No matches</p>}
              <Friends user={user} changeUser={changeUser} ownAccount={ownAccount} changeAccountOwner={changeAccountOwner} renderPage={renderPage}/>
          </div>);
}

export default Profile;
