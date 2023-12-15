
const apiKey = '282dc36a1cmsh8c330e4f006a015p1f7d11jsn69398e5693d6';

// Funzione per caricare le canzoni nel player
function loadAudio(id) {
  sessionStorage.setItem("song-id", id);

  fetch(`https://deezerdevs-deezer.p.rapidapi.com/track/${id}`, {
    headers: {
      'X-RapidAPI-Key': apiKey,
    },
  })
    .then((res) => {
      if (res.ok) return res.json();
      else throw new Error("Errore nella chiamata");
    })
    .then((song) => {
      // Imposto le visualizzazioni a schermo in basso a destra
      document.querySelector(".footer-album-song").innerHTML = song.title;
      document.querySelector(".footer-album-song").setAttribute("onclick", `location.href='album.html?id=${song.album.id}'`);
      document.querySelector(".footer-album-artist").innerHTML = song.artist.name;
      document.querySelector(".footer-album-artist").setAttribute("value", song.artist.id);
      document.querySelector(".footer-album-cover").setAttribute("src", song.album.cover_medium);
      document.querySelector(".footer-album-cover").setAttribute("style", "margin-left:40%");
      // Lo imposto anche per il mini player
      document.querySelector(".scroll-text").innerHTML = `${song.title.replaceAll(" ", "&nbsp;")}&nbsp;-&nbsp;${song.artist.name.replaceAll(" ", "&nbsp;")}&nbsp;(${song.album.title.replaceAll(" ", "&nbsp;")}&nbsp;)`;

      // Imposto l'audioplayer
      document.querySelector(".audio-player-source").setAttribute("src", song.preview);
      audioPlayer.load();

      document.querySelectorAll(".play-player-image").forEach(image => image.classList.remove("d-none"));
      document.querySelectorAll(".pause-player-image").forEach(image => image.classList.add("d-none"));
    })
    .then(() => {
      // Utilizzo dell'evento loadedmetadata per ottenere la durata corretta
      audioPlayer.addEventListener('loadedmetadata', function() {
        document.querySelector(".song-duration").innerHTML = formatDuration(audioPlayer.duration);
      });
    })
    .catch((err) => {
      console.log("Errore!", err);
    });
}

// Funzione per formattare la durata del brano (ad esempio, da secondi a "mm:ss")
function formatDuration(durationInSeconds) {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = Math.floor(durationInSeconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Funzione per introdurre un ritardo
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//Funzione per far partire la musica
const audioPlayer = document.getElementById("myAudio"); 
const sliderAudio = document.querySelector("#slider")
function playAudio() 
{ 
  audioPlayer.volume = sliderAudio.value / 100
  if(!audioPlayer.paused)
  {
    audioPlayer.pause()
  }
  else
  {
    audioPlayer.play();  
  }

  document.querySelectorAll(".play-player-image").forEach(image => image.classList.toggle("d-none")) 
  document.querySelectorAll(".pause-player-image").forEach(image => image.classList.toggle("d-none")) 
} 

//Alla fine della riproduzione
audioPlayer.onended = function() 
{
  document.querySelector(".play-player-image") .classList.remove("d-none")
  document.querySelector(".pause-player-image").classList.add("d-none")
}

//Funzione che aggiorna il timestamp
const songTimestamp = document.querySelector(".song-timestamp")
const audioSlider =  document.querySelector(".audio-slider")
const updateTime = function()
{
  if(!audioPlayer.paused)
    if (audioPlayer.currentTime < 10)
      songTimestamp.innerHTML =  "00:0" + Math.floor(audioPlayer.currentTime)
    else 
      songTimestamp.innerHTML =  "00:" + Math.floor(audioPlayer.currentTime)
    audioSlider.setAttribute("value", Math.floor(audioPlayer.currentTime))
}
setInterval(updateTime, 1000)

// Esegui la funzione ogni secondo
setInterval(updateTime, 1000);

// Funzione che aggiorna il volume
sliderAudio.addEventListener("change", function() {
    audioPlayer.volume = sliderAudio.value / 100;
  });
  
  // Verifica se c'è un ID di canzone memorizzato nella sessione
  if (sessionStorage.getItem("song-id")) {
    // Carica la canzone con l'ID memorizzato
    loadAudio(sessionStorage.getItem("song-id"));
  }

  
  
