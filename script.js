
const songs = [
    {
        title: "Moulder",
        artist: "Ghost Mountain",
        src: "mouldy.mp3",
        albumArt: "october.jpg"
    },
    {
        title: "Freestyle",
        artist: "Lil Baby",
        src: "free.mp3",
        albumArt: "lilbb.jpg"
    },
    {
        title: "Agony",
        artist: "Yung Lean",
        src: "agony.mp3",
        albumArt: "agony.jpg"
    },
    {
        title: "TL;DR",
        artist: "Bladee",
        src: "tldr.mp3",
        albumArt: "tld.jpg"
    },
    {
        title: "idont...",
        artist: "p4rkr",
        src: "idont.mp3",
        albumArt: "idnt.jpg"
    },
    {
        title: "face to face",
        artist: "fakemink",
        src: "to.mp3",
        albumArt: "face.jpg"
    },
    {
        title: "be nice 2 me",
        artist: "Bladee",
        src: "bn2m.mp3",
        albumArt: "icedancer.jpg"
    },
];

const audio = new Audio();
let currentSongIndex = 0;
let isPlaying = false;

const albumArt = document.getElementById('album-art');
const trackTitle = document.getElementById('track-title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const playPauseBtn = document.getElementById('play-pause');
const playPauseImg = document.getElementById('play-pause-img');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const loadSong = (index) => {
    const song = songs[index];
    audio.src = song.src;
    albumArt.src = song.albumArt;
    trackTitle.textContent = song.title;
    artist.textContent = song.artist;

    if (isPlaying) {
        audio.play();
        playPauseImg.src = "pause.png";
    }
};

const togglePlayPause = () => {
    if (isPlaying) {
        audio.pause();
        playPauseImg.src = "play.png";
    } else {
        audio.play();
        playPauseImg.src = "pause.png";
    }
    isPlaying = !isPlaying;
};

audio.addEventListener('timeupdate', () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;
});

const playNextSong = () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
};

const playPrevSong = () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
};

playPauseBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', playNextSong);
prevBtn.addEventListener('click', playPrevSong);

audio.addEventListener('ended', playNextSong);

loadSong(currentSongIndex);


const bioContainer = document.querySelector('.bio-container');
const musicContainer = document.querySelector('.music-container');

const applyPokedEffect = (element) => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const offsetX = e.clientX - centerX;
        const offsetY = e.clientY - centerY;

        const normalizedX = (offsetX / (rect.width / 2));
        const normalizedY = (offsetY / (rect.height / 2));

        const skewX = normalizedY * 10; 
        const skewY = -normalizedX * 10;

        element.style.transform = `perspective(1000px) rotateX(${skewX}deg) rotateY(${skewY}deg)`;
    });

    element.addEventListener('mouseleave', () => {

        element.style.transition = 'transform 1s ease-out';
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';

        setTimeout(() => {
            element.style.transition = 'none';
        }, 1000);
    });
};

applyPokedEffect(bioContainer);
applyPokedEffect(musicContainer);

const visualizerCanvas = document.getElementById('visualizer');
const visualizerCtx = visualizerCanvas.getContext('2d');
visualizerCanvas.width = window.innerWidth;
visualizerCanvas.height = 100; 

let audioContext;
let analyser;
let dataArray;
let bufferLength;

const initAudioVisualizer = () => {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256; 
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
};

const drawVisualizer = () => {
    requestAnimationFrame(drawVisualizer);

    analyser.getByteFrequencyData(dataArray);

    visualizerCtx.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);


    const barWidth = (visualizerCanvas.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;

        visualizerCtx.fillStyle = `rgba(255, 255, 255, ${barHeight / 100})`;
        visualizerCtx.fillRect(x, visualizerCanvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 3; 
    }
};

audio.addEventListener('play', () => {
    if (!audioContext) {
        initAudioVisualizer();
    }
    drawVisualizer();
});