import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'
import Home from '../home/home';
import { OAuth42_access_token, OAuth42_user } from '../../OAuth42IntranetLogin/login';
import { getUserByName, getUserByLogin, createNewUser, addUser } from "../../api/user/user.api";

const CLIENT_ID = '433eb612bd72cf577b98ad16b16bc482ddf45b46c37f326595b7600495b11807';
const REDIRECT_URI = 'http%3A%2F%2Flocalhost%3A3000';

const LogForm: React.FC<{changeAccountId: (id: number) => void, signup: boolean}> = ({ changeAccountId, signup }) => {
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
			changeAccountId(userInDatabase!.id)
		}
	}

	const onSubmitSignup: () => void = async () => {
		let userInDatabaseByName = await getUserByName(name);
		let userInDatabaseByLogin = await getUserByLogin(login);
		if (userInDatabaseByName === null && userInDatabaseByLogin === null) {
			await addUser(createNewUser(name, login, avatar));
			let userInDatabase = await getUserByName(name);
			setAccountAlreadyInUse(false);
			changeAccountId(userInDatabase!.id)
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

const Signup: React.FC<{changeAccountId: (id: number) => void}> = ({ changeAccountId }) => {
	return (<div>
						<button onClick={()=>{changeAccountId(-1)}}>Back</button>
						<h1>Sign up</h1>
						<LogForm changeAccountId={changeAccountId} signup={true}/>
					</div>);
}

const Login: React.FC<{changeAccountId: (id: number) => void}> = ({ changeAccountId }) => {
	return (<div>
						<button onClick={()=>{changeAccountId(-1)}}>Back</button>
						<h1>Log in</h1>
						<LogForm changeAccountId={changeAccountId} signup={false}/>
					</div>);
}

const LoginOrSignup: React.FC<{changeAccountId: (id: number) => void}> = ({ changeAccountId }) => {
	return (<div>
						<h1>Pong Game</h1>
						<button onClick={()=>{changeAccountId(-3)}}>Log in</button><>&nbsp;&nbsp;&nbsp;</>
						<button onClick={()=>{changeAccountId(-2)}}>Sign up</button><>&nbsp;&nbsp;&nbsp;</>
						<button onClick={()=>{window.location.href = `https://api.intra.42.fr/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;}}>Intra 42 login</button>
					</div>);
}

const Authentification: React.FC = () => {
	const [searchParams] = useSearchParams(); //Will enable the extraction of queryparams
	const AUTH_CODE = searchParams.get('code'); //code queryparam extraction gives us an authorization code necessary for OAuth access token generation
	const [accountId, setAccountId] = useState<number>(-1); //As long as accountid is set to -1 no account yet

	useEffect(() => {
		const user42 = async () => {
			if (AUTH_CODE !== null) {
				const ACCESS_TOKEN = await OAuth42_access_token(AUTH_CODE);
				if (ACCESS_TOKEN !== null) {
					const user = await OAuth42_user(ACCESS_TOKEN);
					let userInDatabase = await getUserByName(user.name);
					if (userInDatabase === null) {
						await addUser(createNewUser(user.name, user.login, user.avatar));
						userInDatabase = await getUserByName(user.name);
					}
					setAccountId(userInDatabase!.id)
				}
			}
		}
		user42();
	}, [AUTH_CODE]);

	const changeAccountId: (id: number) => void = (id) => {
		setAccountId(id);
	}

	if (accountId === -1) {
		return (<LoginOrSignup changeAccountId={changeAccountId}/>);
	} else if (accountId > -1) {
		// return (<Home accountId={accountId} changeAccountId={changeAccountId}/>);
		return (<h1>Home</h1>);
	} else if (accountId === -2) {
		return (<Signup changeAccountId={changeAccountId}/>);
	} else if (accountId === -3){
		return (<Login changeAccountId={changeAccountId}/>);
	} else {
		return <h1>Authentification Error</h1>;
	}
}

export default Authentification;
