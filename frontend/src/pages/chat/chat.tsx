import React, { useState, useEffect } from 'react';
import { addDm, getDm, addDmMessage, createNewDmMessage } from "../../api/dms/dms.api";
import { addChannel, removeChannel, updateChannel, updateChannelUser, getChannel, addChannelMessage, createNewChannelMessage, addChannelUser, createNewChannelUser } from "../../api/channels/channels.api";
import { getAllUsers, addUser, getCompleteUser } from "../../api/user/user.api";
import { UserDto } from "../../api/user/dto/user.dto";
import { DmDto } from "../../api/dms/dto/dm.dto";
import { ChannelDto } from "../../api/channels/dto/channel.dto";
import { ChannelUserDto } from "../../api/channels/dto/channel_user.dto";
import { connect, listen, joinRoom, leaveRoom, send, disconnect } from "../../websocket/chat/chat.socket";
import _ from 'underscore';

interface addUsersProps {
	currentChat: ChannelDto,
	currentChatLatestUpdates: () => void
}

interface channelViewUsersProps {
	channelUser: ChannelUserDto,
	currentChat: ChannelDto,
	currentChatLatestUpdates: () => void
}

interface channelSettingsprops {
	channelUser: ChannelUserDto,
	changeCurrentChat: (newChat: DmDto | ChannelDto | null) => void,
	currentChat: ChannelDto,
	password: string,
	type: string,
	changePassword: (newValue: string) => void,
	changeType: (newValue: "public" | "private" | "password" | '') => void,
	resetSettings: () => void,
	changeSettings: (newValue: boolean) => void
}

interface channelInfoProps {
	channelUser: ChannelUserDto,
	changeCurrentChat: (newChat: DmDto | ChannelDto | null) => void,
	currentChat: ChannelDto,
	currentChatLatestUpdates: () => void
}

interface messageProps {
	userOrchannelUser: any,
	currentChat: any, //type narrowing does not function correctly and typescript gives faulty type errors back, use any to avoid typescript type checking
	currentChatLatestUpdates: () => void,
	dm: boolean,
	socket: any
}

interface chatProps {
	user: UserDto,
	changeCurrentChat: (newChat: DmDto | ChannelDto | null) => void,
	currentChat: any //type narrowing does not function correctly and typescript gives faulty type errors back, use any to avoid typescript type checking
}

const AddUsers: React.FC<addUsersProps> = ({ currentChat, currentChatLatestUpdates }) => {
	const [searchResults, setSearchResults] = useState<UserDto[]>([]);
	const [searchText, setSearchText] = useState<string>('');

	const isPartOfUsers: (account: UserDto) => boolean = (account) => {
		const find = currentChat.users.find((user) => user.id === account.id);
		return (find !== undefined);
	}

  const handleSearch: (searchValue: string) => void = async (searchValue) => {
    let search: UserDto[] = [];
		const allUsers = await getAllUsers();

    allUsers.forEach((item) => searchValue.length !== 0 && !isPartOfUsers(item)
                            && item.login.includes(searchValue) && search.push(item))
    setSearchText(searchValue);
    setSearchResults(search);
  }

  const onSubmit: (id: number) => void = async (id) => {
			let user = await getCompleteUser(id);
			if (user === null) return ;
			user.channels = [...user.channels, currentChat];
			await addUser(user); //updateUser should be used but bugs... Thus addUser which calls save is used as it can update too if element already exists... And it works!!
			await addChannelUser(createNewChannelUser(currentChat, user, false, false));
			handleSearch('');
      currentChatLatestUpdates();
  }

  return (<div>
            <br/>
            <input type="text" value={searchText} onChange={(e) => handleSearch(e.target.value)}/><br/>
            {searchResults.map((item) => <div>
                                            <br/>
                                            <span>{item.login}</span><>&nbsp;&nbsp;&nbsp;</>
                                            <button onClick={(e)=> {onSubmit(item.id)}}>Add User</button>
                                         </div>)}
          </div>);
}

const ChannelViewUsers: React.FC<channelViewUsersProps> = ({ channelUser, currentChat, currentChatLatestUpdates }) => {

  const changeStatus: (id: number, newValue: boolean) => void = async (id, newValue) => {
    await updateChannelUser(id, { administrator: newValue });
		currentChatLatestUpdates();
  }

  const ban: (target: ChannelUserDto) => void = async (target) => {
		currentChat.users = currentChat.users.filter((item: UserDto) => item.id !== target.user.id);
		currentChat.channel_users = currentChat.channel_users.filter((channelUser: ChannelUserDto) => channelUser.id !== target.id);
		await addChannel(currentChat); //updateChannel should be used but bugs... Thus addChannel which calls save is used as it can update too if element already exists... And it works!!
		await currentChatLatestUpdates();
  }

	const mute: (id: number, newValue: boolean) => void = async (id, newValue) => {
    await updateChannelUser(id, { mute: newValue });
		currentChatLatestUpdates();
  }

  return (<>
						<AddUsers currentChat={currentChat} currentChatLatestUpdates={currentChatLatestUpdates}/>
						<h3>Users</h3>
						<ul>
							{currentChat.channel_users.length === 1 ? <p>No other users</p> :
								currentChat.channel_users.map((item: ChannelUserDto) => {
									if (item.user.id === channelUser.user.id) return "";
									if (item.owner) return (<li>{item.user.login + " --- owner"}</li>);
									return (<div>
														<li>
															{item.user.login + " --- " + (item.administrator ? "administrator" : "user") + (item.mute ? " --- mute   " : "   ")}
															{channelUser.owner && <button onClick={(e)=>changeStatus(item.id, !item.administrator)}>Change Status</button>}
															{(channelUser.owner || (channelUser.administrator && !item.administrator)) && <button onClick={(e)=>ban(item)}>Ban</button>}
															{(channelUser.owner || (channelUser.administrator && !item.administrator)) && <button onClick={(e)=>mute(item.id, !item.mute)}>{item.mute ? "Unmute" : "mute"}</button>}
														</li>
													</div>);
								})
							}
            </ul>
				  </>);
}

const ChannelSettings: React.FC<channelSettingsprops> = ({ channelUser, changeCurrentChat, currentChat, password, type, changePassword, changeType, resetSettings, changeSettings }) => {

  const onSubmitChannel: () => void = async () => {
    if (type === "password" && password === '') {
      return ;
    }
		currentChat.type = type;
		currentChat.password = password;
		await updateChannel(currentChat.id, {type: type, password: password});
    changeCurrentChat(currentChat);
		changeSettings(false);
    resetSettings();
  }

  return (<>
            <br/><br/>
            <label>public</label>
            <input type="radio" name="type" value="on" onChange={()=>changeType("public")} required/><>&nbsp;&nbsp;&nbsp;</>
            <label>private</label>
            <input type="radio" name="type" onChange={()=>changeType("private")} required/><>&nbsp;&nbsp;&nbsp;</>
            <label>password</label>
            <input type="radio"name="type" onChange={()=>changeType("password")} required/><br/><br/>
            {type === "password" && <><input type="password" maxLength={20} value={password} onChange={(e)=>changePassword(e.target.value)} required/><br/><br/></>}
            <input type="submit" onClick={()=>onSubmitChannel()}/>
            <br/><br/>
         </>)
}

const ChannelInfo: React.FC<channelInfoProps> = ({ channelUser, changeCurrentChat, currentChat, currentChatLatestUpdates }) => {
  const [info, setInfo] = useState<boolean>(false);
	const [viewUsers, setViewUsers] = useState<boolean>(false);
  const [settings, setSettings] = useState<boolean>(false);
  const [type, setType] = useState<"public" | "private" | "password" | ''>('');
  const [password, setPassword] = useState<string>('');

  const resetSettings: () => void = () => {
    setPassword('');
    setType('');
  }

	const changeSettings: (newValue: boolean) => void = (newValue) => {
		if (newValue === true) currentChatLatestUpdates();
		setSettings(newValue);
	}

	const changeViewUsers: (newValue: boolean) => void = (newValue) => {
		if (newValue === true) currentChatLatestUpdates();
		setViewUsers(newValue);
	}

	const changeInfo: (newValue: boolean) => void = (newValue) => {
		if (newValue === true) currentChatLatestUpdates();
		setInfo(newValue);
	}

	const changeType: (newValue: "public" | "private" | "password" | '') => void = (newValue) => {
    setType(newValue);
  }

	const changePassword: (newValue: string) => void = (newValue) => {
    setPassword(newValue);
  }

  return (<div>
            <button onClick={()=>{changeInfo(!info); changeSettings(false); changeViewUsers(false); resetSettings();}}>Channel Info</button><>&nbsp;&nbsp;&nbsp;</>
						<button onClick={()=>{changeViewUsers(!viewUsers); changeSettings(false); changeInfo(false); resetSettings();}}>Users</button><>&nbsp;&nbsp;&nbsp;</>
            {channelUser.owner === true && <button onClick={()=>{changeSettings(!settings); changeInfo(false); changeViewUsers(false); resetSettings();}}>Settings</button>}
            {info && <ul>
                      <li>{`Type: ${currentChat.type}`}</li>
                      <li>{`Owner: ${currentChat.channel_users.find((channel_user: ChannelUserDto) => channel_user.owner === true)!.user.login}`}</li>
                      {currentChat.type === "password" && <li>{`Password: ${currentChat.password}`}</li>}
                      {!channelUser.owner && channelUser.administrator && <li>You have administrator rights in this channel</li>}
                    </ul>}
            {settings && <ChannelSettings channelUser={channelUser} changeCurrentChat={changeCurrentChat} currentChat={currentChat} password={password} type={type} changePassword={changePassword} changeType={changeType} resetSettings={resetSettings} changeSettings={changeSettings}/>}
            {viewUsers && <ChannelViewUsers channelUser={channelUser} currentChat={currentChat} currentChatLatestUpdates={currentChatLatestUpdates} />}
          </div>);
}

const Message: React.FC<messageProps> = ({ userOrchannelUser, currentChat, currentChatLatestUpdates, dm, socket }) => {
  const [message, setMessage] = useState<string>('');

	 // eslint-disable-next-line
	useEffect(() => currentChatLatestUpdates(), []); //This has to be called once to set the order of messages correctly

  const submitMessage: () => void = async () => {
		await currentChatLatestUpdates();
		if (dm) {
			await addDmMessage(createNewDmMessage(userOrchannelUser, currentChat, message, currentChat.messages.length + 1));
		} else {
			await addChannelMessage(createNewChannelMessage(userOrchannelUser.user, currentChat, message, currentChat.messages.length + 1));
		}
		setMessage('');
		send(socket, {room: currentChat.id, content: "new message"});
		await currentChatLatestUpdates();
  }

  return (<div>
            {currentChat.messages.map((message: any)=><p>{`${message.user.login} --- ${message.content}`}</p>)}
            <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)}/>
            {((dm && currentChat.block) || (!dm && userOrchannelUser.mute)) && <input type="submit" value="Message" disabled/>}
						{((dm && !currentChat.block) || (!dm && !userOrchannelUser.mute)) && <input type="submit" value="Message" onClick={(e)=>submitMessage()}/>}
          </div>);
}

const Chat: React.FC<chatProps> = ({ user, changeCurrentChat, currentChat }) => {
  let dm: boolean = ("block" in currentChat);
	const [socket, setSocket] = useState<any>(null);

	useEffect(() => {
		const connectedSocket = connect()
		setSocket(connectedSocket);
		joinRoom(connectedSocket, currentChat.id);
		listen(connectedSocket, async (response: string) => {
			// console.log("Messaged received");
			if (response === "new message") await currentChatLatestUpdates(); //the chat should have the new message on its database, query it back and re-render
		});
		return () => { leaveRoom(connectedSocket, currentChat.id); disconnect(connectedSocket); }
	// eslint-disable-next-line
	}, [])

	//constant check if the user has been banned!!!
	//constant check if the user has been muted!!!
	useEffect(() => {
		const interval = setInterval(currentChatLatestUpdates, 2000);
    return () => clearInterval(interval);
	// eslint-disable-next-line
	}, []);

	const currentChatLatestUpdates: () => void = async () => {
		let latestChat: any;

		if (dm) {
			latestChat = await getDm(currentChat.id);
		} else {
			latestChat = await getChannel(currentChat.id);
		}
		if (_.isEqual(latestChat, currentChat)) return ;
		if (latestChat === null || latestChat.users.find((item: UserDto) => item.id === user.id) === undefined || (!dm && latestChat.channel_users.find((channel_user: ChannelUserDto) => channel_user.owner === true) === undefined)) { //User has been banned or chat removed
			changeCurrentChat(null);
			return ;
		}
		changeCurrentChat(latestChat);
	}

  const setBlock: () => void = async () => {
		await currentChatLatestUpdates();
		currentChat.block = !currentChat.block;
		if (currentChat.block === true) currentChat.user_id_who_initiated_blocking = user.id;
		await addDm(currentChat);
		changeCurrentChat(currentChat);
  }

  const leaveChannel: () => void = async () => {
		await currentChatLatestUpdates();
		currentChat.users = currentChat.users.filter((channelUser: UserDto) => channelUser.id !== user.id);
		currentChat.channel_users = currentChat.channel_users.filter((channelUser: ChannelUserDto) => channelUser.user.id !== user.id);
		await addChannel(currentChat); //updateChannel should be used but bugs... Thus addChannel which calls save is used as it can update too if element already exists... And it works!!
		if (currentChat.users.length === 0) {
			await removeChannel(currentChat.id);
			changeCurrentChat(null);
			return ;
		}
		if (currentChat.channel_users.find((channel_user: ChannelUserDto) => channel_user.owner === true) === undefined) {
			let newOwner: ChannelUserDto | undefined = currentChat.channel_users.find((channel_user: ChannelUserDto) => channel_user.administrator === true);
			if (newOwner === undefined) newOwner = currentChat.channel_users[0];
			await updateChannelUser(newOwner!.id, {owner: true, administrator: true});
		}
    changeCurrentChat(null);
  }

  return (<div>
            <button onClick={()=>changeCurrentChat(null)}>Back</button>
            {dm && (!currentChat.block || (currentChat.block && currentChat.user_id_who_initiated_blocking === user.id))
							&& <><>&nbsp;&nbsp;&nbsp;</><button onClick={()=>setBlock()}>{currentChat.block === false ? "Block" : "Unblock"}</button></>}
            {!dm && <><>&nbsp;&nbsp;&nbsp;</><button onClick={()=>leaveChannel()}>Leave Channel</button></>}
						{dm && <h1>{currentChat.users.find((userDm: UserDto) => userDm.id !== user.id).login}</h1>}
            {!dm && <h1>{currentChat.name}</h1>}
            {!dm && <ChannelInfo channelUser={currentChat.channel_users.find((channelUser: ChannelUserDto)=> channelUser.user.id === user.id)} changeCurrentChat={changeCurrentChat} currentChat={currentChat} currentChatLatestUpdates={currentChatLatestUpdates}/>}
						<br/><br/>
            <Message userOrchannelUser={dm ? user : currentChat.channel_users.find((channelUser: ChannelUserDto)=> channelUser.user.id === user.id)} currentChat={currentChat} currentChatLatestUpdates={currentChatLatestUpdates} dm={dm} socket={socket}/>
          </div>);
}

export default Chat
