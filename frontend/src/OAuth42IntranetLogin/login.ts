const axios = require('axios');

export const OAuth42_access_token = async (AUTH_CODE: string) => {
	const CLIENT_ID = process.env.CLIENT_ID;
	const CLIENT_SECRET = process.env.CLIENT_SECRET;
	const REDIRECT_URI = process.env.REDIRECT_URI;

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
