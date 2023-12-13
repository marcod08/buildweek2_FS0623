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
            console.log(data)
            container.innerHTML =`<div id="album-image" class="col-4">
            <img class="mx-3 my-4 p-2 get-hex" id="album-cover-img" src="${data.cover_big}" alt="Album cover">
        </div>
        <div>
            <p class="album-title">ALBUM</p>
            <h1 class="album-name">${data.title}</h1>
            <p>
                <span class="img-rounded artist-redirect text-hover"><img class="rounded-circle" width="25" src=${data.artist.picture_small}></img></span>
                <span class="artist-name artist-redirect text-hover">${data.artist.name}</span>
                • <span class="album-year">${data.release_date} </span> •
                <span class="tracks-number">${data.nb_tracks} brani</span>,
                <span class="album-duration">${parseInt(data.duration/60)} min</span>
            </p>
        </div>
         `
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
    spinnerContainer.classList.add('d-none')
}
//