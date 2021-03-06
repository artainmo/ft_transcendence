import React, { useState, useEffect } from 'react';
import Chat from './chat';
import { createNewDm, addDm } from "../../api/dms/dms.api";
import { getChannel, addChannel, createNewChannel, addChannelUser, createNewChannelUser, getAllChannels, channelPasswordVerification } from "../../api/channels/channels.api";
import { getAllUsers, getCompleteUser } from "../../api/user/user.api";
import { UserDto } from "../../api/user/dto/user.dto";
import { DmDto } from "../../api/dms/dto/dm.dto";
import { ChannelDto } from "../../api/channels/dto/channel.dto";
import { CreateChannelDto } from "../../api/channels/dto/create-channel.dto";
import { CreateDmDto } from "../../api/dms/dto/create-dm.dto";
import { GameDto } from "../../api/games/dto/game.dto";
import _ from 'underscore';
import styles from "../../css/chatsView.module.css";
import cs from "../../css/convention.module.css";

interface joinChannelProps {
	user: UserDto,
	channels: ChannelDto[],
  changeCurrentChat: (newChat: DmDto | ChannelDto | null) => void
}

interface newChannelProps {
	user: UserDto,
  changeCurrentChat: (newChat: DmDto | ChannelDto | null) => void
}

interface newDmProps {
	user: UserDto,
	dms: DmDto[],
  changeCurrentChat: (newChat: DmDto | ChannelDto | null) => void
}

interface chatsViewProps {
	user: UserDto,
	changeUser: (newUser: UserDto | null) => void,
	changeMenuPage: (newMenuPage: string) => void,
	changeGame: (newGame: GameDto | null) => void
}

const JoinChannel: React.FC<joinChannelProps> = ({ user, channels, changeCurrentChat }) => {
  const [searchResults, setSearchResults] = useState<ChannelDto[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [password, setPassword] = useState<string>('');

	const isPartOfChannels: (channel: ChannelDto) => boolean = (channel) => {
		const find = channels.find((myChannel) => myChannel.name === channel.name);
		return (find !== undefined);
	}

  const handleSearch: (searchValue: string) => void = async (searchValue) => {
		let search: ChannelDto[] = [];
		const allChannels = await getAllChannels();

    allChannels.forEach((item) => searchValue.length !== 0 && item.type !== "private"
                            && !isPartOfChannels(item) && item.name.includes(searchValue)
														&& search.push(item))
    setSearchText(searchValue);
    setSearchResults(search);
  }

  const onSubmit: (channel: ChannelDto) => void = async (channel) => {
			if (channel.type === "password" && !(await channelPasswordVerification(channel.id, password))) {
				setPassword('');
				return ;
			}
			channel.users = [...channel.users, user]
			await addChannel(channel)
			await addChannelUser(createNewChannelUser(channel, user, false, false));
			changeCurrentChat((await getChannel(channel.id)));
	}

  return (<div>
            <br/>
            <input className={cs.textInput} placeholder={"Search channel..."} type="text" value={searchText} onChange={(e) => handleSearch(e.target.value)}/><br/>
            {searchResults.map((item) => <div>
                                            <br/>
                                            <span>{item.name}</span><>&nbsp;&nbsp;</>
																						{item.type === "password" && <><input className={cs.textInput} placeholder={"Password..."} type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/><>&nbsp;&nbsp;</></>}
                                            <button className={styles.startChannelButton} onClick={(e)=>{onSubmit(item)}}>Join</button><>&nbsp;&nbsp;</>
                                         </div>)}
          </div>);
}

const NewChannel: React.FC<newChannelProps> = ({ user, changeCurrentChat }) => {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<"public" | "private" | "password" | "">('');
  const [password, setPassword] = useState<string>('');
	const [nameAlreadyInUse, setNameAlreadyInUse] = useState<boolean>(false);

  const onSubmit: (newChannel: CreateChannelDto) => void = async (newChannel) => {
			if (newChannel.name === '' || newChannel.type === '' || (newChannel.type === 'password' && newChannel.password === "")) return ;
			const allChannels = await getAllChannels();

      if (allChannels.some((channel)=> channel.name === newChannel.name)) {
        setName('');
        setNameAlreadyInUse(true);
      } else {
				let NewChannel: ChannelDto = await addChannel(newChannel);
				await addChannelUser(createNewChannelUser(NewChannel, user, true, true));
	      changeCurrentChat((await getChannel(NewChannel.id)));
      }
  }

  return (<div>
              <br/>
              <label>Channel name: </label>
              <input className={cs.textInput} type="text" maxLength={20} value={name} name="channelname" onChange={(e)=>setName(e.target.value)} required/><br/><br/>
              <label className={type === "public" ? cs.radioButtonOn : cs.radioButton}>public
              	<input type="radio" name="channeltype" onChange={()=>setType("public")} required/>
							</label>
							<>&nbsp;&nbsp;&nbsp;</>
              <label className={type === "private" ? cs.radioButtonOn : cs.radioButton}>private
              	<input type="radio" name="channeltype" onChange={()=>setType("private")} required/>
							</label>
							<>&nbsp;&nbsp;&nbsp;</>
              <label className={type === "password" ? cs.radioButtonOn : cs.radioButton}>password
              	<input type="radio"name="channeltype" onChange={()=>setType("password")} required/>
							</label>
							<br/><br/>
              {type === "password" && <><input className={cs.textInput} placeholder={"Password..."} type="password" maxLength={20} value={password} onChange={(e)=>setPassword(e.target.value)}/><br/><br/></>}
              {nameAlreadyInUse && <p>Name already exists try another one</p>}
              <button className={cs.submitButton} type="submit" onClick={()=>onSubmit(createNewChannel([user], name, type, password))}>Submit</button>
          </div>)
}

const NewDm: React.FC<newDmProps> = ({ user, dms, changeCurrentChat }) => {
	const [searchResults, setSearchResults] = useState<UserDto[]>([]);
	const [searchText, setSearchText] = useState<string>('');

	const isPartOfDms: (account: UserDto) => boolean = (account) => {
		const find = dms.find((dm) => dm.users.some((user) => user.id === account.id));
		return (find !== undefined);
	}

  const handleSearch: (searchValue: string) => void = async (searchValue) => {
    let search: UserDto[] = [];
		const allUsers = await getAllUsers();

    allUsers.forEach((item) => searchValue.length !== 0 && !isPartOfDms(item)
                            && item.login.includes(searchValue) && item.login !== user.login && search.push(item))
    setSearchText(searchValue);
    setSearchResults(search);
  }

  const onSubmit: (user2: UserDto) => void = async (user2) => {
			const newDm: CreateDmDto = createNewDm(user, user2);
			const NewDm: DmDto = await addDm(newDm);
      changeCurrentChat(NewDm);
  }

  return (<div>
            <br/>
            <input className={cs.textInput} placeholder={"Search user..."} type="text" value={searchText} onChange={(e) => handleSearch(e.target.value)}/><br/>
            {searchResults.map((item) => <div>
                                            <br/>
                                            <span>{item.login}</span><>&nbsp;&nbsp;</>
                                            <button className={styles.startDmButton} onClick={(e)=> {onSubmit(item)}}>DM</button>
                                         </div>)}
          </div>);
}

const ChatsView: React.FC<chatsViewProps> = ({ user, changeUser, changeMenuPage, changeGame }) => {
    const [newdm, setNewdm] = useState<boolean>(false);
    const [newchannel, setNewchannel] = useState<boolean>(false);
    const [joinchannel, setJoinchannel] = useState<boolean>(false);
		const [viewChatCommands, setViewChatCommands] = useState<boolean>(false);
		const [dms, setDms] = useState<DmDto[]>([]);
		const [channels, setChannels] = useState<ChannelDto[]>([]);
    const [currentChat, setCurrentChat] = useState<DmDto | ChannelDto | null>(null);

		// eslint-disable-next-line
		useEffect(() => getChats(), [currentChat]);

		useEffect(() => {
			const interval = setInterval(getChats, 2000);
	    return () => clearInterval(interval);
		// eslint-disable-next-line
		}, [])

		const getChats: () => void = async () => {
			const completeUser = await getCompleteUser(user.id);
			if (completeUser === null) return ;
			if (_.isEqual(completeUser.dms, dms) && _.isEqual(completeUser.channels, channels)) return ;
			if (currentChat !== null && !("block" in currentChat) && completeUser!.channels.find((channel: ChannelDto) => channel.id === currentChat.id) === undefined) changeCurrentChat(null);
			if (currentChat !== null && ("block" in currentChat) && completeUser!.dms.find((dm: DmDto) => dm.id === currentChat.id) === undefined) changeCurrentChat(null);
			setDms(completeUser!.dms);
			setChannels(completeUser!.channels);
		}

    const changeCurrentChat: (newChat: DmDto | ChannelDto | null) => void = (newChat) => {
      setNewchannel(false);
      setNewdm(false);
      setJoinchannel(false);
      setCurrentChat(newChat);
    }

    if (currentChat !== null) {
      return (<Chat user={user} changeUser={changeUser} changeCurrentChat={changeCurrentChat} currentChat={currentChat} changeGame={changeGame}/>);
    } else {
      return (<div className={cs.chatRootClass}>
                <button className={cs.backButton} onClick={()=>{changeMenuPage('home')}}>Back</button>
								<h1>Chat</h1>
                <button className={!newdm ? styles.newDmButton : styles.newDmButtonOn} onClick={()=> {setNewdm(!newdm); setNewchannel(false); setJoinchannel(false); setViewChatCommands(false);}}>New DM</button><>&nbsp;&nbsp;</>
                <button className={!newchannel ? styles.newChannelButton : styles.newChannelButtonOn} onClick={()=>{setNewchannel(!newchannel); setNewdm(false); setJoinchannel(false); setViewChatCommands(false);}}>New Channel</button><>&nbsp;&nbsp;</>
                <button className={!joinchannel ? styles.joinChannelButton : styles.joinChannelButtonOn} onClick={()=> {setJoinchannel(!joinchannel); setNewchannel(false); setNewdm(false); setViewChatCommands(false);}}>Join Channel</button><>&nbsp;&nbsp;</>
								<button className={!viewChatCommands ? styles.viewChatCommandsButton : styles.viewChatCommandsButtonOn} onClick={()=> {setViewChatCommands(!viewChatCommands); setNewchannel(false); setNewdm(false); setJoinchannel(false);}}>Chat Commands</button>
                {newdm && <NewDm user={user} dms={dms} changeCurrentChat={changeCurrentChat}/>}
                {newchannel && <NewChannel user={user} changeCurrentChat={changeCurrentChat}/>}
                {joinchannel && <JoinChannel user={user} channels={channels} changeCurrentChat={changeCurrentChat}/>}
								{viewChatCommands && <><br/><br/><span style={{color:"#507255"}}>Propose to play a default game: </span><span style={{color:"#4AAD52"}}>*PLAY*</span>
																		 <br/><br/><span style={{color:"#507255"}}>Play a random game: </span><span style={{color:"#4AAD52"}}>*PLAY* random</span>
																	 	 <br/><br/><span style={{color:"#507255"}}>Play a game with custom settings: </span><span style={{color:"#4AAD52"}}>*PLAY* 3 night</span><br/></>}
                <br/><br/>
								<h3>Active Chats</h3>
                {channels.map((item)=><p className={cs.clickable} onClick={()=>changeCurrentChat(item)}>{`${item.name} -- channel`}</p>)}
								{dms.map((item)=><p className={cs.clickable} onClick={()=>changeCurrentChat(item)}>{`${item.users[0].id === user.id ? item.users[1].login : item.users[0].login} -- dm`}</p>)}
								{!channels.length && !dms.length && <p>No chats</p>}
              </div>);
    }
}


export default ChatsView;
