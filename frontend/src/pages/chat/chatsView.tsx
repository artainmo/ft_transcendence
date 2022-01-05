import React, { useState, useEffect } from 'react';
import Chat from './chat';
import { getDmsOfUser, createNewDm, addDm } from "../../api/dms/dms.api";
import { getChannelsOfUser, addChannel, createNewChannel, addChannelUser, createNewChannelUser, getAllChannels } from "../../api/channels/channels.api";
import { getAllUsers } from "../../api/user/user.api";
import { UserDto } from "../../api/user/dto/user.dto";
import { DmDto } from "../../api/dms/dto/dm.dto";
import { ChannelDto } from "../../api/channels/dto/channel.dto";
import { CreateChannelDto } from "../../api/channels/dto/create-channel.dto";
import { CreateDmDto } from "../../api/dms/dto/create-dm.dto";

interface joinChannelProps {
	user: UserDto,
	channels: ChannelDto[],
  changeCurrentChat: (newChat: DmDto | ChannelDto | null) => void
}

interface newChannelProps {
	user: UserDto,
	channels: ChannelDto[],
  changeCurrentChat: (newChat: DmDto | ChannelDto | null) => void
}

interface newDmProps {
	user: UserDto,
	dms: DmDto[],
  changeCurrentChat: (newChat: DmDto | ChannelDto | null) => void
}

interface chatProps {
	user: UserDto,
	changeMenuPage: (newMenuPage: string) => void
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
			if (channel.type === "password" && channel.password !== password) {
				setPassword('');
				return ;
			}
			await addChannelUser(createNewChannelUser(channel, user, false, false));
			changeCurrentChat(channel);
	}

  return (<div>
            <br/>
            <input type="text" value={searchText} onChange={(e) => handleSearch(e.target.value)}/><br/>
            {searchResults.map((item) => <div>
                                            <br/>
                                            <span>{item.name}</span><>&nbsp;&nbsp;&nbsp;</>
                                            <button onClick={(e)=>{onSubmit(item)}}>Join</button><>&nbsp;&nbsp;&nbsp;</>
                                            {item.type === "password" && <><label>Password: </label>
                                            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/></>}
                                         </div>)}
          </div>);
}

const NewChannel: React.FC<newChannelProps> = ({ user, channels, changeCurrentChat }) => {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<"public" | "private" | "password" | "">('');
  const [password, setPassword] = useState<string>('');
	const [nameAlreadyInUse, setNameAlreadyInUse] = useState<boolean>(false);

  const onSubmit: (newChannel: CreateChannelDto) => void = async (newChannel) => {
      if (channels.some((channel)=> channel.name === newChannel.name)) {
        setName('');
        setNameAlreadyInUse(true);
      } else {
				const NewChannel: ChannelDto = await addChannel(newChannel);
				await addChannelUser(createNewChannelUser(NewChannel, user, true, true));
	      changeCurrentChat(NewChannel);
      }
  }

  return (<div>
            <form>
              <br/>
              <label>Channel name: </label>
              <input type="text" value={name} name="channelname" onChange={(e)=>setName(e.target.value)} required/><br/><br/>
              <label>public</label>
              <input type="radio" name="channeltype" onChange={()=>setType("public")} required/><>&nbsp;&nbsp;&nbsp;</>
              <label>private</label>
              <input type="radio" name="channeltype" onChange={()=>setType("private")} required/><>&nbsp;&nbsp;&nbsp;</>
              <label>password</label>
              <input type="radio"name="channeltype" onChange={()=>setType("password")} required/><br/><br/>
              {type === "password" && <><input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/><br/><br/></>}
              {nameAlreadyInUse && <p>Name already exists try another one</p>}
              <input type="submit" onClick={()=>onSubmit(createNewChannel([user], name, type, password))}/>
            </form>
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
    setSearchResults(searchResults);
  }

  const onSubmit: (user2: UserDto) => void = async (user2) => {
			const newDm: CreateDmDto = createNewDm(user, user2);
			const NewDm: DmDto = await addDm(newDm);
      changeCurrentChat(NewDm);
  }

  return (<div>
            <br/>
            <input type="text" value={searchText} onChange={(e) => handleSearch(e.target.value)}/><br/>
            {searchResults.map((item) => <div>
                                            <br/>
                                            <span>{item.login}</span><>&nbsp;&nbsp;&nbsp;</>
                                            <button onClick={(e)=> {onSubmit(item)}}>Start DM</button>
                                         </div>)}
          </div>);
}

const ChatsView: React.FC<chatProps> = ({ user, changeMenuPage }) => {
    const [newdm, setNewdm] = useState<boolean>(false);
    const [newchannel, setNewchannel] = useState<boolean>(false);
    const [joinchannel, setJoinchannel] = useState<boolean>(false);
		const [dms, setDms] = useState<DmDto[]>([]);
		const [channels, setChannels] = useState<ChannelDto[]>([]);
    const [currentChat, setCurrentChat] = useState<DmDto | ChannelDto | null>(null);

		useEffect(()=>{
			const getChats: () => void = async () => {
				const userDms = await getDmsOfUser(user.login);
				const userChannels = await getChannelsOfUser(user.login);
				setDms(userDms);
				setChannels(userChannels);
			}
			getChats();
		})

    const changeCurrentChat: (newChat: DmDto | ChannelDto | null) => void = (newChat) => {
      setNewchannel(false);
      setNewdm(false);
      setJoinchannel(false);
      setCurrentChat(newChat);
    }

    if (currentChat !== null) {
      // return (<Chat user={user} changeCurrentChat={changeCurrentChat} currentChat={currentChat}/>);
			return (<button onClick={()=> changeCurrentChat(null)}>Back</button>)
    } else {
      return (<div>
                <button onClick={()=>{changeMenuPage('home')}}>Back</button>
                <h1>Chat</h1>
                <button onClick={()=> {setNewdm(!newdm); setNewchannel(false); setJoinchannel(false);}}>New DM</button><>&nbsp;&nbsp;&nbsp;</>
                <button onClick={()=>{setNewchannel(!newchannel); setNewdm(false); setJoinchannel(false);}}>New Channel</button><>&nbsp;&nbsp;&nbsp;</>
                <button onClick={()=> {setJoinchannel(!joinchannel); setNewchannel(false); setNewdm(false);}}>Join Channel</button>
                {newdm && <NewDm user={user} dms={dms} changeCurrentChat={changeCurrentChat}/>}
                {newchannel && <NewChannel user={user} channels={channels} changeCurrentChat={changeCurrentChat}/>}
                {joinchannel && <JoinChannel user={user} channels={channels} changeCurrentChat={changeCurrentChat}/>}
                <br/><br/>
                {channels.map((item)=><p onClick={()=>changeCurrentChat(item)}>{`${item.name} -- channel`}</p>)}
								{dms.map((item)=><p onClick={()=>changeCurrentChat(item)}>{`${item.users[0].id === user.id ? item.users[1].login : item.users[0].login} -- dm`}</p>)}
								{!channels.length && !dms.length && <p>No chats</p>}
              </div>);
    }
}


export default ChatsView;