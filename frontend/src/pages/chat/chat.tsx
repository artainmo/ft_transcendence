import React, { useState, useEffect } from 'react';
import { addDm, getDm, addDmMessage, createNewDmMessage } from "../../api/dms/dms.api";
import { addChannel, removeChannel, updateChannelUser, getChannel, addChannelMessage, createNewChannelMessage } from "../../api/channels/channels.api";
import { UserDto } from "../../api/user/dto/user.dto";
import { DmDto } from "../../api/dms/dto/dm.dto";
import { ChannelDto } from "../../api/channels/dto/channel.dto";
import { ChannelUserDto } from "../../api/channels/dto/channel_user.dto";
import { listen, joinRoom, leaveRoom, send } from "../../websocket/chat/chat.socket";

// interface chatProps3 {
// 	account: accountType
// 	changeAccount: (newAccount: any) => void
//   chatIndex: number
// }

interface messageProps {
	user: UserDto,
	changeCurrentChat: (newChat: DmDto | ChannelDto | null) => void,
	currentChat: any, //type narrowing does not function correctly and typescript gives faulty type errors back, use any to avoid typescript type checking
	currentChatLatestUpdates: () => void,
	dm: boolean
}

interface chatProps {
	user: UserDto,
	changeCurrentChat: (newChat: DmDto | ChannelDto | null) => void,
	currentChat: any //type narrowing does not function correctly and typescript gives faulty type errors back, use any to avoid typescript type checking
}

// const AddUsers: React.FC<chatProps3> = ({ account, changeAccount, chatIndex }) => {
//   const [searchResults, setSearchResults] = useState<string[][]>([]);
//   const [searchText, setSearchText] = useState<string>('');
//
//   const handleSearch: (searchValue: string) => void = (searchValue) => {
//     let searchResults: string[][] = [];
//
//     dataBaseAccounts.forEach((item) => searchValue.length !== 0 && !account.chatChannels[chatIndex!].users.find((elem)=>elem.name === item[0])
//                               && item[0].includes(searchValue) && item[0] !== account.name && searchResults.push(item))
//     setSearchText(searchValue);
//     setSearchResults(searchResults);
//   }
//
//   return (<div>
// 						<h3>Add users: </h3>
//             <input type="text" value={searchText} onChange={(e) => handleSearch(e.target.value)}/><br/>
//             {searchResults.map((item) => <div>
//                                             <br/>
//                                             <span>{item[0]}</span><>&nbsp;&nbsp;&nbsp;</>
//                                             <button onClick={(e)=> {
//                                                                     let tmp = account.chatChannels;
//                                                                     tmp[chatIndex].users.push({name: item[0], administrator: false, mute: false});
//                                                                     changeAccount({chatChannels: tmp});
//                                                                     handleSearch("");}}>Add User</button><>&nbsp;&nbsp;&nbsp;</>
// 																						<button onClick={(e)=> {
// 												                                           let tmp = account.chatChannels;
// 												                                           tmp[chatIndex].users.push({name: item[0], administrator: true, mute: false});
// 												                                           changeAccount({chatChannels: tmp});
// 												                                           handleSearch("");}}>Add administrator</button>
//                                          </div>)}
//           </div>);
// }
//
// const ChannelInfo: React.FC<chatProps3> = ({ account, changeAccount, chatIndex }) => {
//   const [info, setInfo] = useState<boolean>(false);
// 	const [viewUsers, setViewUsers] = useState<boolean>(false);
//   const [settings, setSettings] = useState<boolean>(false);
//   const [specific, setSpecific] = useState<"non-block" | "block" | "public" | "private" | "password" | ''>('');
//   const [password, setPassword] = useState<string>('');
//
//   const changeSpecific: (newValue: "non-block" | "block" | "public" | "private" | "password" | '') => void = (newValue) => {
//     setSpecific(newValue)
//   }
//
//   const resetSettings: () => void = () => {
//     setPassword('');
//     changeSpecific('');
//   }
//
//   const onSubmitChannel: () => void = () => {
//     let tmp = account.chatChannels;
//     // let channelIndex = dataBaseChannels.findIndex((item)=>(item.name === account.chatChannels[chatIndex].name));
//
//     if (specific === "password" && password === '') {
//       return ;
//     }
//     tmp[chatIndex!].specific = specific;
//     tmp[chatIndex!].password = password;
//     // dataBaseChannels[channelIndex].specific = specific;
//     // dataBaseChannels[channelIndex].password = password;
//     changeAccount({chatChannels: tmp});
//     setSettings(false);
//     resetSettings();
//   }
//
//   const changeAdmin: (UserIndex: number) => void = (UserIndex) => {
//     let tmp = account.chatChannels;
//     // let channelIndex = dataBaseChannels.findIndex((item)=>(item.name === account.chatChannels[chatIndex].name));
//
//     // dataBaseAccounts[channelIndex].users[UserIndex].administrator = !dataBaseAccounts[channelIndex].users[UserIndex].administrator;
//     tmp[chatIndex!].users[UserIndex].administrator = !tmp[chatIndex!].users[UserIndex].administrator;
//     changeAccount({chatChannels: tmp});
//   }
//
//   const ban: (UserIndex: number) => void = (UserIndex) => {
//     let tmp = account.chatChannels;
//     // let channelIndex = dataBaseChannels.findIndex((item)=>(item.name === account.chatChannels[chatIndex].name));
//
//     // dataBaseAccounts[channelIndex].users = dataBaseAccounts[channelIndex].users.filter((item, index)=>index !== UserIndex);
//     tmp[chatIndex!].users = tmp[chatIndex!].users.filter((item, index)=>index !== UserIndex);
//     changeAccount({chatChannels: tmp});
//   }
//
//   const mute: (UserIndex: number) => void = (UserIndex) => {
//     let tmp = account.chatChannels;
//     // let channelIndex = dataBaseChannels.findIndex((item)=>(item.name === account.chatChannels[chatIndex].name));
//
//     // dataBaseAccounts[channelIndex].users[UserIndex].mute = !dataBaseAccounts[channelIndex].users[UserIndex].mute;
//     tmp[chatIndex!].users[UserIndex].mute = !tmp[chatIndex!].users[UserIndex].mute;
//     changeAccount({chatChannels: tmp});
//   }
//
//   return (<div>
//             <button onClick={()=>{setInfo(!info); setSettings(false); setViewUsers(false); resetSettings();}}>Channel Info</button><>&nbsp;&nbsp;&nbsp;</>
// 						<button onClick={()=>{setViewUsers(!viewUsers); setSettings(false); setInfo(false); resetSettings();}}>Users</button><>&nbsp;&nbsp;&nbsp;</>
//             {account.chatChannels[chatIndex!].owner === account.name && <button onClick={()=>{setSettings(!settings); setInfo(false); setViewUsers(false); resetSettings();}}>Settings</button>}
//             {info && <ul>
//                       <li>{`Type: ${account.chatChannels[chatIndex!].specific}`}</li>
//                       <li>{`Owner: ${account.chatChannels[chatIndex!].owner}`}</li>
//                       {account.chatChannels[chatIndex!].specific === "password" && <li>{`Password: ${account.chatChannels[chatIndex].password}`}</li>}
//                       <li>{account.chatChannels[chatIndex!].users.find((elem)=>elem.name === account.name)!.administrator ?
//                           "You have administrator rights in this channel" : "You have no rights in this channel"}</li>
//                     </ul>}
//             {viewUsers && <>
// 														<AddUsers account={account} changeAccount={changeAccount} chatIndex={chatIndex}/>
// 														<h3>Users</h3>
// 														<ul>
// 															{account.chatChannels[chatIndex].users.length === 1 ? <p>No other users</p> :
// 																																									account.chatChannels[chatIndex].users.map((item, index)=>{return (<div>
// 																												                                                                                              {item.name !== account.name && <li>{item.name + " --- " + (item.administrator ? "administrator" : "user") + (item.mute ? " --- mute   " : "   ")}
// 																												                                                                                              {account.chatChannels[chatIndex!].owner === account.name && <button onClick={(e)=>changeAdmin(index)}>Change Status</button>}
// 																												                                                                                              {account.chatChannels[chatIndex!].users.find((elem)=>elem.name === account.name)!.administrator && <button onClick={(e)=>ban(index)}>Ban</button>}
// 																												                                                                                              {account.chatChannels[chatIndex!].users.find((elem)=>elem.name === account.name)!.administrator && <button onClick={(e)=>mute(index)}>{item.mute ? "Unmute" : "mute"}</button>}</li>}
// 																												                                                                                            </div>);})}
//                       	    </ul>
// 													</>}
//             {settings && <>
//                           <br/><br/>
//                           <label>public</label>
//                           <input type="radio" name="specific" value="on" onChange={()=>changeSpecific("public")} required/><>&nbsp;&nbsp;&nbsp;</>
//                           <label>private</label>
//                           <input type="radio" name="specific" onChange={()=>changeSpecific("private")} required/><>&nbsp;&nbsp;&nbsp;</>
//                           <label>password</label>
//                           <input type="radio"name="specific" onChange={()=>changeSpecific("password")} required/><br/><br/>
//                           {specific === "password" && <><input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/><br/><br/></>}
//                           <input type="submit" onClick={()=>onSubmitChannel()}/>
//                           <br/>
//                         </>}
//             <br/><br/>
//           </div>)
// }
//
const Message: React.FC<messageProps> = ({ user, changeCurrentChat, currentChat, currentChatLatestUpdates, dm }) => {
  const [message, setMessage] = useState<string>('');

	 // eslint-disable-next-line
	useEffect(()=> currentChatLatestUpdates(), []); //This has to be called to set the order of messages correctly

  const submitMessage: () => void = async () => {
		await currentChatLatestUpdates();
		if (dm) {
			await addDmMessage(createNewDmMessage(user, currentChat, message, currentChat.messages.length + 1));
		} else {
			await addChannelMessage(createNewChannelMessage(user, currentChat, message, currentChat.messages.length + 1));
		}
		send({room: currentChat.id, content: "new message"});
    setMessage('');
		await currentChatLatestUpdates();
  }

  return (<div>
            {currentChat.messages.map((message: any)=><p>{`${message.user.login} --- ${message.content}`}</p>)}
            <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)}/>
            {dm && (currentChat.block !== "block" ? <input type="submit" value="Message" onClick={(e)=>submitMessage()}/>
                                : <input type="submit" value="Message" onClick={(e)=>submitMessage()} disabled/>)}
						{!dm && <input type="submit" value="Message" onClick={(e)=>submitMessage()}/>}
          </div>);
}

const Chat: React.FC<chatProps> = ({ user, changeCurrentChat, currentChat }) => {
  let dm: boolean = ("block" in currentChat);

	useEffect(() => {
		console.log("YES");
		joinRoom(currentChat.id);
		listen((response: string) => {
			console.log(response);
			if (response === "new message") currentChatLatestUpdates(); //the chat should have the new message on its database, query it back and re-render
		});
		return () => { leaveRoom(currentChat.id); }
		 // eslint-disable-next-line
	}, [])

	const currentChatLatestUpdates: () => void = async () => {
		if (dm) {
			currentChat = await getDm(currentChat.id);
		} else {
			currentChat = await getChannel(currentChat.id);
		}
		changeCurrentChat(currentChat);
	}

  const setBlock: () => void = async () => {
		await currentChatLatestUpdates();
		currentChat.block = !currentChat.block;
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
            {dm && <><>&nbsp;&nbsp;&nbsp;</><button onClick={()=>setBlock()}>{currentChat.block === false ? "Block" : "Unblock"}</button></>}
            {!dm && <><>&nbsp;&nbsp;&nbsp;</><button onClick={()=>leaveChannel()}>Leave Channel</button></>}
						{dm && <h1>{currentChat.users.find((userDm: UserDto) => userDm.id !== user.id).login}</h1>}
            {!dm && <h1>{currentChat.name}</h1>}
            {/* {!dm && <ChannelInfo account={account} changeAccount={changeAccount} chatIndex={chatIndex}/>} */}
            <Message user={user} changeCurrentChat={changeCurrentChat} currentChat={currentChat} currentChatLatestUpdates={currentChatLatestUpdates} dm={dm}/>
          </div>);
}

export default Chat
