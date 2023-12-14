const apiEndpoint = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=';
const apiKey = '282dc36a1cmsh8c330e4f006a015p1f7d11jsn69398e5693d6';
const q = new URLSearchParams(window.location.search).get('q');

document.addEventListener('DOMContentLoaded', function () {
    // Fetch dei data da Deezer API
    fetch(apiEndpoint + q, {
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

            nascondiSpinner();

            data.data.forEach(element => {
                const albumCard = document.createElement('div');
                albumCard.classList.add('col-6', 'col-md-3', 'my-3', 'h-100', 'p-1');

                albumCard.innerHTML = `
                <div class="bg-spotify-card spotify-card"
                  <div class="card bg-card card-container h-100">
                  <a href="./album.html?id=${element.album.id}"><img src="${element.album.cover_medium}" class="card-img-top spotify-card-image" alt="${element.album.title}"></a>
                  <div class="card-body px-3 py-4">
                        <h5 class="card-title album-redirect text-truncate" id="card-title"><a href="./album.html?id=${element.album.id}" class="text-light text-decoration-none">${element.album.title}</a></h5>
                        <p class="card-text artist-redirect text-truncate" id="card-text"><a href="./artist.html?id=${element.artist.id}" class="text-light text-decoration-none">${element.artist.name}</a></p>
                    </div>
                  </div>
                </div>
            `;

                container.appendChild(albumCard);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

function nascondiSpinner() {
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


//Funzione per il saluto//
function saluto() {
    let ora = new Date().getHours();
    let saluto;

    if (ora >= 5 && ora < 12) {
        saluto = "Buongiorno";
    } else if (ora >= 12 && ora < 18) {
        saluto = "Buon pomeriggio";
    } else {
        saluto = "Buonasera";
    }

    return saluto;
}

// Utilizzo della funzione per ottenere il saluto in base all'ora attuale
let messaggioSaluto = saluto();
console.log(messaggioSaluto);

// Funzione per inserire il saluto nell'elemento con id "saluto"
function mostraSaluto() {
    let elementoSaluto = document.getElementById("saluto");
    if (elementoSaluto) {
        elementoSaluto.textContent = saluto();
    }
}

// Esegui la funzione al caricamento della pagina
window.onload = function () {
    mostraSaluto();
};