const API_KEY = 'AIzaSyA1rDJempb8DfnmD7DtG7WycxVXO_5lh4k';
const RESULTS_PER_PAGE = 20;

let player;

function loadClient() {
    gapi.client.setApiKey(API_KEY);
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(() => {
            console.log("GAPI client loaded for API");
            loadInitialVideos();
        },
        (err) => console.error("Error loading GAPI client for API", err));
}

function loadInitialVideos() {
    const query = 'exercise workout';
    searchVideos(query);
}

function searchVideos(query) {
    return gapi.client.youtube.search.list({
        "part": [
            "snippet"
        ],
        "maxResults": RESULTS_PER_PAGE,
        "q": query,
        "type": [
            "video"
        ]
    })
    .then((response) => {
        displayResults(response.result.items);
    },
    (err) => { console.error("Execute error", err); });
}

function displayResults(items) {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = '';

    items.forEach(item => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');
        videoItem.innerHTML = `
            <img src="${item.snippet.thumbnails.medium.url}" alt="${item.snippet.title}">
            <div class="video-info">
                <h2>${item.snippet.title}</h2>
                <p>${item.snippet.channelTitle}</p>
            </div>
        `;
        videoItem.addEventListener('click', () => {
            playVideo(item.id.videoId);
        });
        videoContainer.appendChild(videoItem);
    });
}

function playVideo(videoId) {
    const playerSection = document.getElementById('player-section');
    playerSection.classList.remove('hidden');

    if (player) {
        player.loadVideoById(videoId);
    } else {
        player = new YT.Player('player', {
            height: '360',
            width: '640',
            videoId: videoId,
            events: {
                'onReady': onPlayerReady
            }
        });
    }
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function closePlayer() {
    const playerSection = document.getElementById('player-section');
    playerSection.classList.add('hidden');
    if (player) {
        player.stopVideo();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    gapi.load("client", loadClient);

    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', () => {
        const searchInput = document.getElementById('search-input');
        const query = searchInput.value + ' exercise';
        searchVideos(query);
    });

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value + ' exercise';
            searchVideos(query);
        }
    });

    const closePlayerButton = document.getElementById('close-player');
    closePlayerButton.addEventListener('click', closePlayer);
});

// This function will be called by the YouTube IFrame API
function onYouTubeIframeAPIReady() {
    console.log('YouTube IFrame API ready');
}