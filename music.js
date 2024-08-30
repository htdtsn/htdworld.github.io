var audio = document.getElementById("audio");



var playPauseButton = document.getElementById("playPauseButton");



var audioFiles = [

        {

        src: "overseas.mp3",

        artist: "Ken Carson",

        song: "overseas"

        },

        {

        src: "thatsnotme.mp3",

        artist: "Skepta, JME",

        song: "That's Not Me"

        },

        {

        src: "a2z.mp3",

        artist: "babytron",

        song: "a2z"

        },

        {

        src: "knucks.mp3",

        artist: "knucks",

        song: "Los Pollos Hermanos"

        },

        {

        src: "rose.mp3",

        artist: "jaydes",

        song: "rose"

        },

        {

        src: "sloth.mp3",

        artist: "jaydes",

        song: "sloth"

        },

        {

        src: "souljah.mp3",

        artist: "yung bruh",

        song: "souljahwitches faith"

        },

        {

        src: "cartoon.mp3",

        artist: "outby16",

        song: "CARTOON"

        },

        {

        src: "addygeek.mp3",

        artist: "summrs (religion)",

        song: "Addy Geek"

        },

        {

        src: "jetlggd.mp3",

        artist: "Destroy Lonely",

        song: "JETLGGD"

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
