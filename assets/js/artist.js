document.addEventListener("DOMContentLoaded", function () {
    // Ottieni l'ID dell'artista dalla query string
    const urlParams = new URLSearchParams(window.location.search);
    const artistId = urlParams.get('id');

    getArtistInfo(artistId);

    getPopularSongs(artistId);

    getDiscography(artistId);

    nascondiSpinner()
});

// Funzione per ottenere informazioni sull'artista
function getArtistInfo(artistId) {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`)
        .then(response => response.json())
        .then(data => {
            // Popola i dati dell'artista nella pagina HTML
            document.querySelector('.artist-img').src = data.picture_big;
            document.querySelector('.artist-name').textContent = data.name;
            document.querySelector('.monthly-listeners').textContent = `${data.nb_fan} Ascoltatori mensili`;
        })
        .catch(error => console.error('Error fetching artist info:', error));
}

function getPopularSongs(artistId) {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=5`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const songs = data.data || [];

            const popularSongsList = document.getElementById('popular-songs');
            popularSongsList.classList.add('row');

            songs.forEach((song, index) => {
                const colItem = document.createElement('div');
                colItem.classList.add('col-md-12', 'mb-3');

                const listItem = document.createElement('div');
                listItem.classList.add('list-group-item', 'd-flex', 'align-items-center', 'text-white');

                // Numero progressivo
                const rankNumber = document.createElement('span');
                rankNumber.classList.add('badge', 'me-3', 'col-1');
                rankNumber.textContent = index + 1;

                // Immagine dell'album
                const albumImage = document.createElement('img');
                albumImage.src = song.album.cover_small;
                albumImage.alt = song.title;
                albumImage.classList.add('flex-direction-column', 'me-3', 'img-fluid', 'col-1');

                // Titolo del brano
                const songTitle = document.createElement('span');
                songTitle.textContent = song.title;
                songTitle.classList.add('me-3', 'col-6');

                // Numero di ascolti
                const listeners = document.createElement('span');
                listeners.textContent = `${song.rank}`;
                listeners.classList.add('text-opacity', 'opacity-50', 'ms-auto', 'col-2')

                // Durata
                const durationSong = document.createElement('span');
                const minutes = Math.floor(song.duration / 60);
                const seconds = song.duration % 60;
                const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                durationSong.textContent = `${formattedDuration}`;
                durationSong.classList.add('text-opacity', 'opacity-50', 'ms-auto', 'col-2');

                // Aggiungi gli elementi al listItem
                listItem.appendChild(rankNumber);
                listItem.appendChild(albumImage);
                listItem.appendChild(songTitle);
                listItem.appendChild(listeners);
                listItem.appendChild(durationSong);

                colItem.appendChild(listItem);
                popularSongsList.appendChild(colItem);
            });
        })
        .catch(error => console.error('Error fetching popular songs:', error));
}




function nascondiSpinner() {
    const spinners = document.querySelectorAll('.spinner-border');
    spinners.forEach(spinner => {
        spinner.parentElement.classList.add('d-none');
    });
}

// Funzione per ottenere la discografia dell'artista
function getDiscography(artistId) {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/albums`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Assicurati che l'array di album sia presente nei dati
            const albums = data.data || [];

            // Popola la discografia nella pagina HTML
            const discographyContainer = document.querySelector('.discography');
            albums.forEach(album => {
                const releaseDate = new Date(album.release_date);
                const year = releaseDate.getFullYear();
                const albumCard = document.createElement('div');
                albumCard.className = 'col-6 col-md-3 my-3 mb-3 p-1 h-100';
                albumCard.innerHTML = `
                    <div class="spotify-card bg-spotify-card">
                      <div class="card h-100 bg-card card-container">
                        <a href="./album.html?id=${album.id}"><img src="${album.cover_medium}" class="card-img-top spotify-card-image p-2" alt="${album.title}" /></a>
                        <div class="card-body">
                            <h6 class="card-title album-redirect text-hover text-truncate" id="card-title"><a href="./album.html?id=${album.id}" class="text-light text-decoration-none">${album.title}<a/></h6>
                            <p class="card-text">${year} • Album</p>
                        </div>
                      </div>  
                    </div>
                `;
                discographyContainer.appendChild(albumCard);
            });
        })
        .catch(error => console.error('Error fetching discography:', error));
}