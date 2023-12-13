const apiEndpoint = 'https://deezerdevs-deezer.p.rapidapi.com/playlist/115495';
const apiKey = '6e85a2755bmsh8d7d68ee0f84f37p153c1djsn4c09afbb6f6d';

document.addEventListener('DOMContentLoaded', function () {
    // Fetch dei data da Deezer API
    fetch(apiEndpoint, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
            'X-RapidAPI-Key': apiKey,
        }
    })
    .then(response => response.json())
    .then(data => {
        // Popolo il contenitore con i dati
        const container = document.getElementById('row-to-append-children');

        nascondiSpinner ();

        data.tracks.data.forEach(album => {
            const albumCard = document.createElement('div');
            albumCard.classList.add('col-6', 'col-md-3', 'mb-4', 'h-100', 'my-3', 'p-1');

            albumCard.innerHTML = `
                <div class="card">
                    <img src="${album.album.cover_medium}" class="card-img-top" alt="${album.album.title}">
                    <div class="card-body" style="height: 8rem; overflow:hidden;">
                        <h5 class="card-title">${album.album.title}</h5>
                        <p class="card-text">${album.artist.name}</p>
                    </div>
                </div>
            `;

            container.appendChild(albumCard);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
});

function nascondiSpinner () {
    const spinnerContainer = document.getElementById('spinner-container');
    spinnerContainer.classList.add('d-none')
}
//right-column aside div//

const centralColumn = document.querySelector('#central-column')
const xIconFriend = document.querySelector('#xIconFriend')

xIconFriend.addEventListener('click', () => {
    centralColumn.classList.remove('col-lg-8')
    centralColumn.classList.add('col-lg-10')
})
//right-column aside div//