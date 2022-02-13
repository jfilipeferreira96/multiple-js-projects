const body = document.body;
const playerContainer = document.querySelector('.player-container');
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const everyBtn = document.querySelectorAll('.fas');

// Toogle Themes
changeTheme = (number) =>{
  //procedure to save the previous theme 
  let previousTheme;
  if(body.className){
    previousTheme = body.className;
  }

  //reset css body classes
  body.className = ''; 

  switch(number){
    case 1: //patern bg
      if(previousTheme == 'theme-1'){ //check if any other background is already showing
        playerContainer.style.background = '#e7e7e7';
        everyBtn.forEach((btn) => btn.classList.remove('theme-1-buttons', 'theme-2-buttons'));
      }else{
        body.classList.add('theme-1');
        playerContainer.style.background = '#ffffff40';
        everyBtn.forEach((btn) => btn.classList.add('theme-1-buttons'));
      }
      break;
    case 2: //dark mode
      if(previousTheme == 'theme-2'){ //check if any other background is already showing
        playerContainer.style.background = '#e7e7e7';
        everyBtn.forEach((btn) => btn.classList.remove('theme-1-buttons', 'theme-2-buttons'));
      }else{
        body.classList.add('theme-2');
        playerContainer.style.background = `url("data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='brick-wall' fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;
        everyBtn.forEach((btn) => btn.classList.add('theme-2-buttons'));
      }
      break;
    default:
      break;
  }
}

// Object of Songs
const tracks = [
  {
    name: 'red-hot-1',
    displayName: "Can't Stop",
    artist: 'Red Hot Chili Peppers',
  },
  {
    name: 'xutos-1',
    displayName: 'Contentores',
    artist: 'Xutos & Pontapés',
  },
  {
    name: 'seven-1',
    displayName: 'The White Stripes',
    artist: 'Seven Nation Army',
  },
  {
    name: 'aaron-1',
    displayName: 'Dancin (Remix)',
    artist: 'Aaron Smith/KRONO Remix',
  },
];

// Check if Track is Playing
let isTrackPlaying = false;

// Play
const playTrack = () => {
  isTrackPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Pause
const pauseTrack = () => {
  isTrackPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isTrackPlaying ? pauseTrack() : playTrack()));

// Update DOM - main body
const loadTrack = (track) => {
  if(track === undefined){
    location.reload();
  }
  playerContainer.classList.contains('display-none') ? playerContainer.classList.remove('display-none') : '';
  
  title.textContent = track.displayName;
  artist.textContent = track.artist;
  music.src = `music/${track.name}.mp3`;
  image.src = `img/${track.name}.jpg`;
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Current Song
let trackIndex = getRandomInt(0,tracks.length);

// Previous Song
const prevTrack = () => {
  trackIndex--;
  if (trackIndex < 0) {
    trackIndex = tracks.length - 1;
  }
  loadTrack(tracks[trackIndex]);
  playTrack();
}

// Next Song
const nextTrack = () => {
  trackIndex++;
  if (trackIndex > tracks.length - 1) {
    trackIndex = 0;
  }
  loadTrack(tracks[trackIndex]);
  playTrack();
}


// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isTrackPlaying) {

    const { duration, currentTime } = e.srcElement;

    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

//Jump to X minutes progress bard
function setProgressBar(e) {
  const width = this.clientWidth;  //total width in px of the progress bar
  const clickX = e.offsetX; //position of the X 
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

//Event Listeners
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);
music.addEventListener('ended', nextTrack);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);

document.addEventListener("DOMContentLoaded", function() {
  // On Page load - Select Random Song
  loadTrack(tracks[trackIndex]);
});