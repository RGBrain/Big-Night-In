// API settings 

// TMDB (Movie Database)
const baseURL = "https://api.themoviedb.org/3/";
const discoverURL = "https://api.themoviedb.org/3/discover/movie?api_key=";
const movieInfoURL = "https://api.themoviedb.org/3/movie/";
const genreURL = "genre/movie/list?api_key="
const providerURL = "watch/providers/movie?api_key="
// API Key
const APIKEY = "c4321cfbc4e58956270feef6a91120a8";

// https://api.themoviedb.org/3/watch/providers/regions?api_key=c4321cfbc4e58956270feef6a91120a8&language=en-US

// https://api.themoviedb.org/3/watch/providers/movie?api_key=c4321cfbc4e58956270feef6a91120a8&language=en-US&watch_region=GB

// genre
// Family friendly?
// length?  Short - Epic - I don't care

// ? PLACEHOLDER VARIABLES FOR NOW, BUT WILL BE TAKEN DYNAMICALLY FROM USER.
// let watchRegion = "&^GB$";
let watchRegion = "&watch_region=GB"
let watchProviderTest = "&with_watch_providers=337";
let genre = "&with_genres=35";
let rating = "";
let lang = "&language=en-US";
let cert = "";
let certificationCountry = "GB"
let movieID = "899112"
// Object Maps

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
        console.log("line 60: " + response.results.provider_name)
        // Build object map
        for (let i = 0; i < response.results.length; i++) {
            watchProviders.set(response.results[i].provider_name, response.results[i].provider_id);
        }
        console.log(watchProviders)
    })
}

// Get array of films
function filmSearch() {
    let queryURL = discoverURL + APIKEY + genre
    console.log("filmSearch URL: " + queryURL)
    $.ajax({
        url: queryURL,
        method: "GET",
    })
    .then(function(response) {
        // console.log("film search: " + JSON.stringify(response))
        getFilm()
    })
}

// Get film information
function getFilm() {
    let queryURL = movieInfoURL + movieID + "?api_key=" + APIKEY
    // console.log("getFilm URL: " + queryURL)
    $.ajax({
        url: queryURL,
        method: "GET",
    })
    .then(function(response) {
        console.log
        // console.log("film info: " + JSON.stringify(response))
    })
}
    genreMap();
    providerMap()
    filmSearch();