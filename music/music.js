// Replace with your Spotify API credentials
const clientId = 'dd3cf5e0b5c8480aafb5be815d5fca04';
const redirectUri = 'http://127.0.0.1:5500/music/music.html'; // Replace with your app's redirect URI

// Spotify API endpoints
const authEndpoint = 'https://accounts.spotify.com/authorize';
const genresUrl = 'https://api.spotify.com/v1/browse/categories';
const featuredPlaylistsUrl = 'https://api.spotify.com/v1/browse/featured-playlists';

const scopes = ['streaming', 'user-read-email', 'user-read-private', 'user-modify-playback-state', 'user-read-playback-state'].join('%20');

let accessToken = null; // Use a null value initially to check if it has been fetched

// Function to handle OAuth login and get access token
function getAccessTokenFromUrl() {
    const hash = window.location.hash.substring(1).split('&').reduce((acc, item) => {
        if (item) {
            let parts = item.split('=');
            acc[parts[0]] = decodeURIComponent(parts[1]);
        }
        return acc;
    }, {});

    window.location.hash = ''; // Clear the hash
    return hash.access_token;
}

// Function to redirect user to Spotify for authorization
function redirectToSpotifyLogin() {
    window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&show_dialog=true`;
}

// Function to fetch genres
async function fetchGenres() {
    try {
        const response = await fetch(genresUrl, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch genres');
        }

        const data = await response.json();
        return data.categories.items;
    } catch (error) {
        console.error('Error fetching genres:', error);
    }
}

// Function to fetch featured playlists
async function fetchFeaturedPlaylists() {
    try {
        const response = await fetch(featuredPlaylistsUrl, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch featured playlists');
        }

        const data = await response.json();
        return data.playlists.items;
    } catch (error) {
        console.error('Error fetching featured playlists:', error);
    }
}

// Function to display genres
function displayGenres(genres) {
    const genreContainer = document.querySelector('.genre-container');
    genreContainer.innerHTML = ''; // Clear existing content before rendering
    genres.forEach(genre => {
        const genreElement = document.createElement('div');
        genreElement.classList.add('genre-item');
        genreElement.innerHTML = `
            <img src="${genre.icons[0].url}" alt="${genre.name}">
            <h3>${genre.name}</h3>
        `;
        genreContainer.appendChild(genreElement);
    });
}

// Function to display featured playlists
function displayFeaturedPlaylists(playlists) {
    const playlistContainer = document.querySelector('.playlist-container');
    playlistContainer.innerHTML = ''; // Clear existing content before rendering
    playlists.forEach(playlist => {
        const playlistElement = document.createElement('div');
        playlistElement.classList.add('playlist-item');
        playlistElement.innerHTML = `
            <img src="${playlist.images[0].url}" alt="${playlist.name}">
            <h3>${playlist.name}</h3>
        `;
        playlistContainer.appendChild(playlistElement);
    });
}

// Initialize the app
async function init() {
    accessToken = getAccessTokenFromUrl(); // Get access token from URL fragment

    if (!accessToken) { // Check if no token is present
        accessToken = localStorage.getItem('spotifyAccessToken'); // Try to get from localStorage
    }

    if (!accessToken) { // Redirect to login if still no token
        redirectToSpotifyLogin();
    } else {
        localStorage.setItem('spotifyAccessToken', accessToken); // Store token in localStorage
        const genres = await fetchGenres();
        const featuredPlaylists = await fetchFeaturedPlaylists();

        if (genres && featuredPlaylists) { // Check if data is fetched successfully
            displayGenres(genres);
            displayFeaturedPlaylists(featuredPlaylists);
        }
    }
}

init();

// Spotify Web Playback SDK integration
window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: cb => { cb(accessToken); },
        volume: 0.5
    });

    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    // Ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        // Store the device ID for later use in playTrack function
        localStorage.setItem('spotifyDeviceId', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    player.connect();
};

// Function to play a specific track using the Web Playback SDK
async function playTrack(uri) {
    const deviceId = localStorage.getItem('spotifyDeviceId');
    try {
        const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [uri] }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        });

        if (!response.ok) {
            throw new Error('Playback failed');
        }
    } catch (error) {
        console.error('Error playing track:', error);
    }
}

// Event listeners for modal functionality
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeBtns = document.getElementsByClassName('close');

loginBtn.onclick = () => loginModal.style.display = 'block';
signupBtn.onclick = () => signupModal.style.display = 'block';

for (let closeBtn of closeBtns) {
    closeBtn.onclick = function () {
        loginModal.style.display = 'none';
        signupModal.style.display = 'none';
    };
}

window.onclick = function (event) {
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (event.target === signupModal) {
        signupModal.style.display = 'none';
    }
};

// Form submission (for demonstration purposes only)
document.getElementById('loginForm').onsubmit = function (e) {
    e.preventDefault();
    alert('Login functionality would be implemented here.');
};

document.getElementById('signupForm').onsubmit = function (e) {
    e.preventDefault();
    alert('Sign up functionality would be implemented here.');
};
