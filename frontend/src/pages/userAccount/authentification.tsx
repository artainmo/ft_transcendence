import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'
import Home from '../home/home';
import { OAuth42_access_token, OAuth42_user } from '../../OAuth42IntranetLogin/login';
import { getUserByName, getUserByLogin, createNewUser, addUser } from "../../api/user/user.api";
import { UserDto } from "../../api/user/dto/user.dto";


const CLIENT_ID = '433eb612bd72cf577b98ad16b16bc482ddf45b46c37f326595b7600495b11807';
const REDIRECT_URI = 'http%3A%2F%2Flocalhost%3A3000';

const LogForm: React.FC<{changeUser: (newUser: UserDto | null) => void, signup: boolean}> = ({ changeUser, signup }) => {
	let [accountAlreadyInUse, setAccountAlreadyInUse] = useState<boolean>(false);
	let [nonExistingAccount, setNonExistingAccount] = useState<boolean>(false);
	let [name, setName] = useState<string>('');
	let [login, setLogin] = useState<string>('');
	let [avatar, setAvatar] = useState<string>('');

	const onSubmitLogin: () => void = async () => {
		let userInDatabase = await getUserByName(name);
		if (userInDatabase === null) {
			setNonExistingAccount(true);
			setName('');
			setLogin('');
			setAvatar('');
		} else {
			setNonExistingAccount(false);
			changeUser(userInDatabase)
		}
	}

	const onSubmitSignup: () => void = async () => {
		let userInDatabaseByName = await getUserByName(name);
		let userInDatabaseByLogin = await getUserByLogin(login);
		if (userInDatabaseByName === null && userInDatabaseByLogin === null) {
			await addUser(createNewUser(name, login, avatar));
			let userInDatabase = await getUserByName(name);
			setAccountAlreadyInUse(false);
			changeUser(userInDatabase);
		} else {
			setAccountAlreadyInUse(true);
			setName('');
			setLogin('');
			setAvatar('');
		}
	}

	return (<div>
						<label>Name:</label><br/>
						<input required type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
						{signup && <br/>}
						{signup && <br/>}
						{signup && <label>Login:</label>}
						{signup && <br/>}
						{signup && <input required type="text" value={login} onChange={(e)=>setLogin(e.target.value)}/>}
						{signup && <br/>}
						{signup && <br/>}
						{signup && <label>Download Avatar Image: </label>}
						{signup && <input type="file" id="fileInput" onChange={(e)=> e.target.files && setAvatar(URL.createObjectURL(e.target.files[0]))}/>}
						<br/><br/>
						{accountAlreadyInUse && <p>This account already exists, try another one</p>}
						{nonExistingAccount && <p>This account does not exist, try another one</p>}
						<button type="submit" onClick={()=> signup ? onSubmitSignup() : onSubmitLogin()}>Submit</button>
				</div>);
}

const Signup: React.FC<{changePage: (newPage: string) => void, changeUser: (newUser: UserDto | null) => void}> = ({ changePage, changeUser }) => {
	return (<div>
						<button onClick={()=>{changePage("start")}}>Back</button>
						<h1>Sign up</h1>
						<LogForm changeUser={changeUser} signup={true}/>
					</div>);
}

const Login: React.FC<{changePage: (newPage: string) => void, changeUser: (newUser: UserDto | null) => void}> = ({ changePage, changeUser }) => {
	return (<div>
						<button onClick={()=>{changePage("start")}}>Back</button>
						<h1>Log in</h1>
						<LogForm changeUser={changeUser} signup={false}/>
					</div>);
}

const Start: React.FC<{changePage: (newPage: string) => void}> = ({ changePage }) => {
	return (<div>
						<h1>Pong Game</h1>
						<button onClick={()=>{changePage('login')}}>Log in</button><>&nbsp;&nbsp;&nbsp;</>
						<button onClick={()=>{changePage('signup')}}>Sign up</button><>&nbsp;&nbsp;&nbsp;</>
						<button onClick={()=>{window.location.href = `https://api.intra.42.fr/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;}}>Intra 42 login</button>
					</div>);
}

const Authentification: React.FC = () => {
	const [searchParams] = useSearchParams(); //Will enable the extraction of queryparams
	const AUTH_CODE = searchParams.get('code'); //code queryparam extraction gives us an authorization code necessary for OAuth access token generation
	const [user, setUser] = useState<UserDto | null>(null);
	const [page, setPage] = useState<string>('start');

	useEffect(() => {
		const user42 = async () => {
			if (AUTH_CODE !== null) {
				const ACCESS_TOKEN = await OAuth42_access_token(AUTH_CODE);
				if (ACCESS_TOKEN !== null) {
					const user = await OAuth42_user(ACCESS_TOKEN);
					let userInDatabase = await getUserByName(user.name);
					if (userInDatabase === null) {
						userInDatabase = await addUser(createNewUser(user.name, user.login, user.avatar));
					}
					setUser(userInDatabase)
				}
			}
		}
		user42();
	}, [AUTH_CODE]);

	const changeUser: (newUser: UserDto | null) => void = (newUser) => {
		setUser(newUser);
	}

	const changePage: (newPage: string) => void = (newPage) => {
		setPage(newPage);
	}

	if (user !== null) {
		if (page !== "start") changePage("start");
		return (<Home user={user} changeUser={changeUser}/>);
	} else if (page === "start") {
		return (<Start changePage={changePage}/>);
	} else if (page === "signup") {
		return (<Signup changePage={changePage} changeUser={changeUser}/>);
	} else if (page === "login"){
		return (<Login changePage={changePage} changeUser={changeUser}/>);
	} else {
		return <h1>Authentification Error</h1>;
	}
}

export default Authentification;
