const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': process.env.VITE_DEEZER_API_KEY || '',
		'X-RapidAPI-Host': process.env.VITE_DEEZER_HOST || 'deezerdevs-deezer.p.rapidapi.com'
	}
};

// Note: Add VITE_DEEZER_API_KEY to .env file before using this

fetch('https://deezerdevs-deezer.p.rapidapi.com/infos', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

    