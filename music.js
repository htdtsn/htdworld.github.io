var audio = document.getElementById("audio");
var playPauseButton = document.getElementById("playPauseButton");
var artist = document.getElementById("artist");
var songTitle = document.getElementById("songTitle");
var lyricsContainer = document.getElementById("lyrics");

var API_KEY = '5a490421bfb5604a5e1752602f4f3baf'; 

var audioFiles = [
    { src: "overseas.mp3", artist: "Ken Carson", song: "overseas" },
    { src: "thatsnotme.mp3", artist: "Skepta, JME", song: "That's Not Me" },
    { src: "knucks.mp3", artist: "knucks", song: "Los Pollos Hermanos" },
    { src: "rose.mp3", artist: "jaydes", song: "rose" },
    { src: "sloth.mp3", artist: "jaydes", song: "sloth" },
    { src: "cartoon.mp3", artist: "outby16", song: "CARTOON" },
    { src: "jetlggd.mp3", artist: "Destroy Lonely", song: "JETLGGD" }
    { src: "scarecraw.mp3", artist: "Sematary", song: "Scarecraw" }
    { src: "whiteowls.mp3", artist: "smokedope2016", song: "White Owls" }
    { src: "ialreadyknow.mp3", artist: "kevinhilfiger", song: "i already know" }
];

var shuffledAudioFiles = shuffleArray(audioFiles);
var currentAudioIndex = 0;

audio.addEventListener("ended", function() {
    nextAudio();
});

function playMedia() {
    audio.play();
    document.getElementById("overlays").classList.add("fade-out");
}

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseButton.innerHTML = "<img src='pause.png'>";
    } else {
        audio.pause();
        playPauseButton.innerHTML = "<img src='play.png'>";
    }
}

function nextAudio() {
    currentAudioIndex = (currentAudioIndex + 1) % shuffledAudioFiles.length;
    loadAudio(currentAudioIndex);
}

function previousAudio() {
    if (audio.currentTime <= 3) {
        currentAudioIndex = (currentAudioIndex - 1 + shuffledAudioFiles.length) % shuffledAudioFiles.length;
    } else {
        audio.currentTime = 0;
    }
    loadAudio(currentAudioIndex);
}

function loadAudio(index) {
    var audioFile = shuffledAudioFiles[index];
    audio.src = audioFile.src;
    artist.textContent = audioFile.artist;
    songTitle.textContent = audioFile.song;
    fetchLyrics(audioFile.artist, audioFile.song);
    audio.play();
}

async function fetchLyrics(artist, song) {
    const url = `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=${encodeURIComponent(song)}&q_artist=${encodeURIComponent(artist)}&apikey=${API_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.message.body.lyrics) {
            lyricsContainer.innerText = data.message.body.lyrics.lyrics_body;
        } else {
            lyricsContainer.innerText = "Lyrics not found.";
        }
    } catch (error) {
        lyricsContainer.innerText = "Error fetching lyrics.";
        console.error("Lyrics Fetch Error:", error);
    }
}

function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

audio.src = shuffledAudioFiles[0].src;
audio.play();
loadAudio(0);
