
const API_KEY = "9bc1b235-d63f-4129-bb61-a6f92f5e220b";
const urlPopular = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const urlSearch = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword="
const urlId="https://kinopoiskapiunofficial.tech/api/v2.2/films/"
const form = document.querySelector(".form");
const search = document.querySelector(".input");
const movies = document.querySelector(".movies");
form.addEventListener('submit', onFormSubmit);
getMovies(urlPopular);
async function getMovies(url) {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "aplication/json",
            "X-API-KEY": API_KEY,
        }
    });
    const responseData = await response.json();
    showMovies(responseData);
}
function showMovies(data) {
    const movies = document.querySelector(".movies");
    document.querySelector(".movies").innerHTML = '';
    data.films.forEach((movie) => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = ` <div class="movie__cover-inner">
                    <img src="${movie.posterUrl}" alt="${movie.nameRu}" class="movie__cover">
                    <div class="movie__cover--darkened"></div>
                </div>
                <div class="movie__info">
                    <div class="movie__title">${movie.nameRu}</div>
                    <div class="movie__average movie__average--${getByRate(movie.rating)}">${movie.rating ?  movie.rating : undefined}</div>
                </div>`;
        movieEl.addEventListener("click", () => openModal(movie.filmId))
        movies.appendChild(movieEl);
        
    })
}
function getByRate(vote) {
    if (vote > 7) {
        return "green"
    } else if (vote > 5) {
         return "orange"
    } else {
         return "red"
    }
}
function onFormSubmit(event) {
    event.preventDefault();
    const ApiSearchUrl = `${urlSearch}${search.value}`;
    if (search.value) {
        getMovies(ApiSearchUrl);
    }
    
}
//Modal
const modal = document.querySelector(".modal");
async function openModal(id) {
    const resp = await fetch(urlId + id, {
        headers: {
            "Content-Type": "aplication/json",
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();
    console.log(respData)
    modal.classList.add("modal--show");
    document.body.classList.add("stop-scrolling");
    modal.innerHTML = `<div class="modal__card">
    <img src="${respData.posterUrl}" alt="${respData.nameRu}" class="modal__movie-backdrop">
            <h2>
                <span class="modal__movie-title">${respData.nameRu}</span>
                <span class="modal__movie-realise-year">${respData.year}</span>
            </h2>
            <ul class="modal__movie-info">
<div class="loader"></div>
<li class="modal__movie-genre">Жанр:${respData.genres.map((el)=>`<span>${el.genre}</span>`)}</li>
<li class="modal__movie-runtime">Время:${respData.filmLength ? respData.filmLength : ' '} минут</li>
<li> Сaйт:<a class="modal__movie-site">Сайт:${respData.webUrl}</a></li>
<li class="modal__movie-overview">Описание:${respData.description}</li>
            </ul>
            <button type="button" class="modal__button-close">Закрыть</button>
            </div>`
    const button = document.querySelector(".modal__button-close");
button.addEventListener('click',closeModal)}
function closeModal() {
    modal.classList.remove("modal--show");
     document.body.classList.remove("stop-scrolling");
}
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal()
    }
})
window.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
        closeModal()
    }
})
