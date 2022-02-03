const axios = require('axios');
//import { readFile } from 'fs';
//import * as dotenv from "dotenv";
//dotenv.config();

export const OAuth42_access_token = async (AUTH_CODE: string) => {
	const CLIENT_ID = "433eb612bd72cf577b98ad16b16bc482ddf45b46c37f326595b7600495b11807";
	const CLIENT_SECRET = "febbc673eca619c5b9410a5f796a1dee941029d7e5cba5ad67affbea82d1e416";
	const REDIRECT_URI = "http%3A%2F%2Flocalhost%3A3000";
//	const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
//	const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
//	const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

	const queryParams = "?"
	+ "grant_type=authorization_code&"
	+ "client_id=" + CLIENT_ID + "&"
	+ "client_secret=" + CLIENT_SECRET + "&"
	+ "code=" + AUTH_CODE + "&"
	+ "redirect_uri=" + REDIRECT_URI + "&"
	+ "scope=public";
	try {
		const res = await axios('https://api.intra.42.fr/oauth/token' + queryParams, {
				          method: 'POST',
				          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				        });
		return res.data.access_token;
	} catch (error) {
		return null;
	}
}

export const OAuth42_user = async (ACCESS_TOKEN: string) => {
	const res = await axios.get('https://api.intra.42.fr/v2/me', {
								headers: { 'Authorization': 'Bearer ' + ACCESS_TOKEN }
							});
	return ({name: res.data.displayname, login: res.data.login, avatar: res.data.image_url});
}

//Hide secrets in .env
