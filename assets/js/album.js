document.addEventListener('DOMContentLoaded', function () {
    let albumID = new URLSearchParams(window.location.search).get('id');
    const url = `https://deezerdevs-deezer.p.rapidapi.com/album/${albumID}`;
    
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5c5442c31amsh21a7d16eed953d6p172833jsnee319271633b',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella richiesta HTTP: ' + response.status)
            }
            return response.json()
        })
        .then(data => {
            const container = document.querySelector('#artist-container')
            const container2 = document.querySelector('#container2')
            const songs = data.tracks.data
            let index = 0
            console.log(data)
            container.innerHTML =`<div id="album-image" class="col-9 col-sm-4">
            <img class="mx-3 my-4 p-2 get-hex" id="album-cover-img" src="${data.cover_big}" alt="Album cover">
        </div>
        <div class="album-text p-4">
            <p class="album-title d-none d-sm-block">ALBUM</p>
            <h1 class="album-name">${data.title}</h1>
            <p>
                <span class="img-rounded artist-redirect text-hover"><img class="rounded-circle" width="25" src=${data.artist.picture_small}></img></span>
                <span class="artist-name artist-redirect text-hover"><a class="text-light" href="artist.html?id=${data.artist.id}">${data.artist.name}</a></span>
                • <span class="album-year">${data.release_date} </span> •
                <span class="tracks-number">${data.nb_tracks} brani</span>,
                <span class="album-duration">${parseInt(data.duration/60)} min</span>
            </p>
        </div>
         `
         let innerHTMLContent = ''
         songs.forEach((song,index)=>{
            innerHTMLContent +=`
         <div class="col-1 d-none d-md-block my-3">${index+1}</div>

         <div class="col-8 col-md-7 my-3"><p class="text-light text-hover text-decoration-none" onclick="loadAudio(${song.id})">${song.title}</p><p><a class="text-decoration-none text-secondary" href="artist.html?id=${data.artist.id}">${song.artist.name}</a></p></div>

         <div class="d-none d-md-block col-2 text-truncate">
             ${song.rank}
         </div>
         <div class="col-1 d-none d-md-block"></div>
         <div class="col-1 d-none d-md-block">
             ${parseInt(song.duration/60)}min
         </div>
         `
         container2.innerHTML = innerHTMLContent
        })
        })
        .catch(error => {
            console.error('Si è verificato un errore:', error)
        })
        const container = document.querySelector('#artist-container')
        nascondiSpinner()
      
})


//
function nascondiSpinner () {
    const spinnerContainer = document.getElementById('spinner-container-album-top');
    const spinnerContainer2 = document.getElementById('spinner-container-tracks')
    spinnerContainer.classList.add('d-none')
    spinnerContainer2.classList.add('d-none')
}
//