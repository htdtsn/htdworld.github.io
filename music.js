var audio = document.getElementById("audio");
var playPauseButton = document.getElementById("playPauseButton");
var audioFiles = [
        {
        src: "shotgun.mp3",
        artist: "Sematary (tosen)",
        song: "Shotgun"
        },
        {
        src: "sloth.mp3",
        artist: "jaydes",
        song: "sloth"
        },
        {
        src: "stars.mp3",
        artist: "Duster",
        song: "Stars Will Fall"
        },
        {
        src: "sickles.mp3",
        artist: "Turnabout, Sematary",
        song: "Sickle"
        },
        {
        src: "hero.mp3",
        artist: "juno",
        song: "hero"
        },
        {
        src: "souljah.mp3",
        artist: "lil tracy",
        song: "souljahwitch's faith"
        },
        {
        src: "it's nothing.mp3",
        artist: "osquinn",
        song: "it's nothing"
        },
        {
        src: "cartoon.mp3",
        artist: "OutBy16",
        song: "Cartoon"
        },
        {
        src: "reverence.mp3",
        artist: "Sematary",
        song: "Reverence"
        },
];

var artist = document.getElementById("artist");
var songTitle = document.getElementById("songTitle");

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
    audio.play();
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
