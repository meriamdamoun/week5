function fetchGiphyGifs(searchQuery, limit = null, offset = null) {
    let apiUrl = `https://api.giphy.com/v1/gifs/search?q=${searchQuery}&rating=g&api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My`;
    
    if (limit !== null) {
        apiUrl += `&limit=${limit}`;
    }
    if (offset !== null) {
        apiUrl += `&offset=${offset}`;
    }
    
    console.log(`Fetching "${searchQuery}" GIFs from Giphy...`);
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(`Successfully retrieved "${searchQuery}" data from Giphy:`);
            console.log(data);
            const resultDescription = offset !== null ? `starting from position ${offset}` : '';
            console.log(`Retrieved ${data.data.length} "${searchQuery}" GIFs ${resultDescription}`);
        })
        .catch(error => {
            console.error(`Error fetching "${searchQuery}" data from Giphy:`, error);
        });
}

console.log('--- FETCHING HILARIOUS GIFS ---');
fetchGiphyGifs('hilarious');

console.log('\n--- FETCHING SUN GIFS ---');
fetchGiphyGifs('sun', 10, 2);