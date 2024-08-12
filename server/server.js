const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());

async function getToken() {
	const params = new URLSearchParams({
		client_id: process.env.client_id,
		client_secret: process.env.client_secret,
		grant_type: 'client_credentials',
	});

	console.log(`https://id.twitch.tv/oauth2/token?${params.toString()}`);

	const response = await fetch(
		`https://id.twitch.tv/oauth2/token?${params.toString()}`,
		{
			method: 'POST',
		}
	);
	if (!response.ok) {
		throw new Error(`Response Status: ${response.status}`);
	}
	const auth = await response.json();
	return auth.access_token;
}

app.post('/oauth2/token', async (req, res) => {

    try {
    const token = await getToken();

    if (token) {
		const igdbResponse = await fetch('https://api.igdb.com/v4/games', {
			method: 'POST',
			headers: {
				'Client-ID': process.env.client_id,
				Authorization: `Bearer ${token}`,
			},
			body: 'fields name; limit 10;',
		});

        if (!igdbResponse.ok) {
            throw new Error(`IGDB Response status: ${igdbResponse.status}`)
        }

        const games = await igdbResponse.json();
        console.log(games);
        res.json(games);
	} else {
        res.status(500).json({ error: 'Failed to obtain token'})
    }
} .catch(error) {
    console.log(error)
}
})

app.listen(port, () => {
	console.log(`Successfully connected to port ${port}`);
});
