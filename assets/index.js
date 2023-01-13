// API settings 

// TMDB (Movie Database)

// ? PLACEHOLDER VARIABLES FOR NOW, BUT WILL BE TAKEN DYNAMICALLY FROM USER.
let watchRegion = "&^GB$";
let watchProviders = "&with_watch_providers=337";
let genre = "&with_genres=35";
let rating = "";
let lang = "&language=en-US";
let cert = "";
let movieID = "899112"
const baseDiscoverURL = "https://api.themoviedb.org/3/discover/movie?api_key=";
const movieInfoURL = "https://api.themoviedb.org/3/movie/";
const APIKEY = "c4321cfbc4e58956270feef6a91120a8";

// Get array of films
function filmSearch() {
    let queryURL = baseDiscoverURL + APIKEY + genre
    console.log("filmSearch URL: " + queryURL)
    $.ajax({
        url: queryURL,
        method: "GET",
    })
    .then(function(response) {
        console.log("film search: " + JSON.stringify(response))
        getFilm()
    })
}

// Get film information
function getFilm() {
    let queryURL = movieInfoURL + movieID + "?api_key=" + APIKEY
    console.log("getFilm URL: " + queryURL)
    $.ajax({
        url: queryURL,
        method: "GET",
    })
    .then(function(response) {
        console.log
        console.log("film info: " + JSON.stringify(response))
    })
}
    filmSearch();