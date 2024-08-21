const express = require('express');
const router = express.Router();
require('dotenv').config();

async function getToken() {
	const params = new URLSearchParams({
		client_id: process.env.client_id,
		client_secret: process.env.client_secret,
		grant_type: 'client_credentials',
	});

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

// router.post('/oauth2/token', async (req, res) => {

//     const request = req.body

// 	try {
// 		const token = await getToken();

// 		if (token) {
// 			const igdbResponse = await fetch('https://api.igdb.com/v4/games', {
// 				method: 'POST',
// 				headers: {
// 					'Client-ID': process.env.client_id,
// 					Authorization: `Bearer ${token}`,
// 				},
// 				body: `fields name,cover.image_id,cover.url; limit 500; where name = "${request.searchString}"* & cover.url != null;`,
// 			});

// 			if (!igdbResponse.ok) {
// 				throw new Error(`IGDB Response status: ${igdbResponse.status}`);
// 			}

// 			const games = await igdbResponse.json();
// 			res.json(games);
// 		} else {
// 			res.status(500).json({ error: 'Failed to obtain token' });
// 		}
// 	} catch (error) {
// 		console.log(error);
// 	}
// });

router.post('/oauth2/token/game-search', async (req, res) => {
	const request = req.body;

	try {
		const token = await getToken();

		if (token) {
			const igdbResponse = await fetch('https://api.igdb.com/v4/games', {
				method: 'POST',
				headers: {
					'Client-ID': process.env.client_id,
					Authorization: `Bearer ${token}`,
				},
				body: `fields name,cover.image_id,cover.url; limit 10; search "${request.search}";`,
			});
			if (!igdbResponse) {
				throw new Error(`IGDB Response Status: ${igdbResponse.status}`);
			}

			const games = await igdbResponse.json();
			res.json(games);
		} else {
			res.status(500).json({ error: 'Failed to obtain token' });
		}
	} catch (err) {
		console.error(err);
	}
});

router.post('/oauth2/token/game/:id', async (req, res) => {
	try {
		const token = await getToken();
		const gameId = req.params.id;

		if (token) {
			const igdbResponse = await fetch('https://api.igdb.com/v4/games', {
				method: 'POST',
				headers: {
					'Client-ID': process.env.client_id,
					Authorization: `Bearer ${token}`,
				},
				body: `fields name,cover.image_id,involved_companies.company.name,first_release_date,genres.name,summary,updated_at,storyline; where id = ${gameId};`,
			});

			if (!igdbResponse) {
				throw new Error(`IGDB Response Status: ${igdbResponse.status}`);
			}

			const game = await igdbResponse.json();
			res.json(game);
		} else {
			res.status(500).json({ message: 'Failed to obtain token' });
		}
	} catch (error) {
		console.error(error);
	}
});


module.exports = router;
