const musicContainer = document.querySelector(".music-player-container");
const playButton = document.querySelector("#play");
const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#music-name");
const cover = document.querySelector("#cover");

//song titles
const songs = [
    "One Love",
    "Just The Two Of Us",
    "Houdini",
    "Monta re",
    "Ehsaan Tera",
    "Chaar Kadam",
];

//Song track
let songIndex = 0;

loadSong(songs[songIndex]);

//Update Song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `assets/songs/${song}.mp3`;
    cover.src = `assets/cover/${song}.jpg`;
}

//Play song
function playSong() {
    musicContainer.classList.add("play");
    playButton.querySelector("i.fa-solid").classList.remove("fa-play");
    playButton.querySelector("i.fa-solid").classList.add("fa-pause");

    audio.play();
}

//Pause song
function pauseSong() {
    musicContainer.classList.remove("play");
    playButton.querySelector("i.fa-solid").classList.remove("fa-pause");
    playButton.querySelector("i.fa-solid").classList.add("fa-play");

    audio.pause();
}

//Previous song
function previousSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

//Next song
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

//Event Listeners
playButton.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains("play");

    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

previousButton.addEventListener("click", previousSong);
nextButton.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);
