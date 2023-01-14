// API settings 

// TMDB APIs
const baseURL = "https://api.themoviedb.org/3/";
const discoverURL = "discover/movie?api_key=";
const movieInfoURL = "movie/";
const genreURL = "genre/movie/list?api_key=";
const providerURL = "watch/providers/movie?api_key=";
const certURL = "certification/movie/list?api_key=";
// API Key
const APIKEY = "c4321cfbc4e58956270feef6a91120a8";

// API Queries 
let watchRegion = "&watch_region=GB";
// This searches for Netflix (8) or Disney Plus (337)
let watchProviderTest = "&with_watch_providers=337|8";
let genre = "&with_genres=28";
let minVotes = "&vote_count.gte=3500"
let lang = "&language=en-US";
let certificationCountry = "&certification_country=GB";
let familyCerts = "&certification=PG%7CU";
let movieID = "1726";
let sortByPop = "&sort_by=popularity.desc";
let removeAdult = "&include_adult=false";
let removeTrailers = "&include_video=false";
let page = "&page=1&page=2";
let freeWithSub = "&with_watch_monetization_types=flatrate";
let longFilms = "&with_runtime.gte=150"
let shortFilms = "&with_runtime.lte=100"


// Object Maps

// Certs     *****We may not need this, can hardcode U & PG***
function certMap() {
    let queryURL = baseURL + certURL + APIKEY 
    console.log("cert URL" + queryURL)
    $.ajax({
        url: queryURL,
        method: "GET",
    })
    .then(function(response) {
        console.log("certs: ")
        console.log(response)
    })
}

// Create Genre Object Map 
const genres = new Map();
function genreMap() {
    let queryURL = baseURL + genreURL + APIKEY 
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET",
    })
    .then(function(response) {
        // Build object map
        for (let i = 0; i < response.genres.length; i++) {
            genres.set(response.genres[i].name, response.genres[i].id);
        }
        console.log(genres)
        console.log(" The code is: " + genres.get("Documentary"))
    })
}

// Create Watch Provider Object Map 
const watchProviders = new Map();
function providerMap() {
    let queryURL = baseURL + providerURL + APIKEY + lang + watchRegion;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET",
    })
    .then(function(response) {
        // Build object map
        for (let i = 0; i < response.results.length; i++) {
            watchProviders.set(response.results[i].provider_name, response.results[i].provider_id);
        }
        console.log(watchProviders)
    })
}

// Get array of films
function filmSearch() {
    let queryURL = baseURL + discoverURL + APIKEY + lang + sortByPop + minVotes + certificationCountry + removeAdult + removeTrailers + page + genre + watchProviderTest + watchRegion + freeWithSub + longFilms;
    console.log("filmSearch URL: " + queryURL)
    $.ajax({
        url: queryURL,
        method: "GET",
    })
    .then(function(response) {
        console.log("film search: " + JSON.stringify(response))
        // ADD RANDOM FILM SELECTOR
        // STORE FILM ID AND PASS TO getFILM
        console.log("film id: " + (response.results[0].id))
        getFilm()
    })
}

// Get info for a given film
function getFilm() {
    let queryURL = baseURL + movieInfoURL + movieID + "?api_key=" + APIKEY + lang
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
    genreMap();
    providerMap();
    certMap();
    filmSearch();