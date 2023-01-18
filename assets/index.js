// API settings 

// TMDB APIs
const baseURL = "https://api.themoviedb.org/3/";
const discoverURL = "discover/movie?api_key=";
const movieInfoURL = "movie/";
const genreURL = "genre/movie/list?api_key=";
const providerURL = "watch/providers/movie?api_key=";
const certURL = "certification/movie/list?api_key=";
let queryURL = "" 
// API Key
const APIKEY = "c4321cfbc4e58956270feef6a91120a8";

// API Queries
let watchRegion = "&watch_region=GB";
let watchProviderString = "&with_watch_providers=";
let genreString = "&with_genres="
let minVotes = "&vote_count.gte=3500"
let lang = "&language=en-US";
let certificationCountry = "&certification_country=GB";
let familyCerts = "&certification=PG%7CU";
let sortByPop = "&sort_by=popularity.desc";
let removeAdult = "&include_adult=false";
let removeTrailers = "&include_video=false";
let page = "&page=1";
let freeWithSub = "&with_watch_monetization_types=flatrate";
let longFilms = "&with_runtime.gte=150";
let shortFilms = "&with_runtime.lte=100";


$(".submit").click(function(){
    event.preventDefault()
    // 
    // Create a URL based on user choices
    //
    // Create initial URL
    queryURL = baseURL + discoverURL + APIKEY + lang + sortByPop + minVotes + certificationCountry + removeAdult + removeTrailers + page + freeWithSub + watchRegion;

    // Check genres
    let genreArray = [];
    if ($('#Comedy').is(":checked"))
        {
            genreArray.push(genres.get("Comedy"));
            console.log(genres)
        }
    if ($('#Action').is(":checked"))
        {
            genreArray.push(genres.get("Action"));
            console.log(genres)
        }
    if ($('#Thriller').is(":checked"))
        {
            genreArray.push(genres.get("Thriller"));
            console.log(genres)
        }
    if ($('#Horror').is(":checked"))
        {
            genreArray.push(genres.get("Horror"));
            console.log(genres)
        }
    if ($('#Drama').is(":checked"))
        {
            genreArray.push(genres.get("Drama"));
            console.log(genres)
        }
    if ($('#Romance').is(":checked"))
        {
            genreArray.push(genres.get("Romance"));
            console.log(genres)
        }
    // If no genres are selected, search all genres
    if (genreArray.length < 1) {
        console.log ("Searching all genres");
    }
    // If one genre is selected
    else if (genreArray.length < 2) {
        queryURL += genreString + genreArray[0];
    }
    // If several genres are selected use pipes for 'or'
    else {
        queryURL += genreString + genreArray[0];
        for (var i = 1; i < genreArray.length; i++) {
            queryURL += "|" + genreArray[i];
        }
    }

    // Check providers
    let providers = [];
    if ($('#Netflix').is(":checked"))
        {
            providers.push(watchProviders.get("Netflix"));
            console.log(providers)
        }
    if ($('#AmazonPrime').is(":checked"))
        {
            providers.push(watchProviders.get("Amazon Prime Video"));
            console.log(providers)
        }
    if ($('#Disney').is(":checked"))
        {
            providers.push(watchProviders.get("Disney Plus"));
            console.log(providers)
        }
    if ($('#AppleTV').is(":checked"))
        {
            providers.push(watchProviders.get("Apple TV Plus"));
            console.log(providers)
        }
    if ($('#BBCiPlayer').is(":checked"))
        {
            providers.push(watchProviders.get("BBC iPlayer"));
            console.log(providers)
        }
    if ($('#ITV').is(":checked"))
        {
            providers.push(watchProviders.get("ITVX"));
            console.log(providers)
        }
    // If no providers are selected, search all genres
    if (providers.length < 1) {
        console.log ("Searching all providers")
    }
    // If one provider is selected
    else if (providers.length < 2) {
        queryURL += watchProviderString + providers[0];
    }
    // If several providers are selected use pipes for 'or'
    else {
        queryURL += watchProviderString + providers[0];
        for (var i = 1; i < providers.length; i++) {
            queryURL += "|" + providers[i];
        }
    }

    // NEED TO ADD A THIRD OPTION HERE
    // Check for family friendly
    if ($('#yes').is(":checked"))
        {
            queryURL += familyCerts;
        }

    // Check for film length
    if ($('#long').is(":checked"))
        {
            queryURL += longFilms;
        }
    else if ($('#short').is(":checked")) 
        {
            queryURL += shortFilms;
        }
    console.log(queryURL)
    filmSearch(queryURL);
})

// Generate pseudo-random number
function getRandom() {
    return Math.floor(Math.random() * 19);
    }

// Create Genre Object Map 
const genres = new Map();
function genreMap() {
    let queryURL = baseURL + genreURL + APIKEY 
    // console.log(queryURL)
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
        // console.log(" The code is: " + genres.get("Comedy"))
    })
}

// Create Watch Provider Object Map 
const watchProviders = new Map();
function providerMap() {
    let queryURL = baseURL + providerURL + APIKEY + lang + watchRegion;
    // console.log(queryURL);
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

// GET FILM ARRAY AND RANDOMLY SELECT ONE
function filmSearch(queryURL) {
    $.ajax({
        url: queryURL,
        method: "GET",
    })
    .then(function(response) {
        // console.log("film search: " + JSON.stringify(response))
        // console.log("film id: " + (response.results[getRandom()].id))
        let movieID = response.results[getRandom()].id
        getFilm(movieID)
    })
}

// Get info for a given film
function getFilm(movieID) {
    let queryURL = baseURL + movieInfoURL + movieID + "?api_key=" + APIKEY + lang
    // console.log("getFilm URL: " + queryURL)
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
    // filmSearch();


// 
// TOMTOM API
// 

// ? Request Format: https://{baseURL}/search/{versionNumber}/search/{query}.{ext}?key={Your_API_Key}&typeahead={typeahead}&limit={limit}&ofs={ofs}&countrySet={countrySet}&lat={lat}&lon={lon}&radius={radius}&topLeft={topLeft}&btmRight={btmRight}&language={language}&idxSet={idxSet}&extendedPostalCodesFor={extendedPostalCodesFor}&minFuzzyLevel={minFuzzyLevel}&maxFuzzyLevel={maxFuzzyLevel}&categorySet={categorySet}&brandSet={brandSet}&connectorSet={connectorSet}&fuelSet={fuelSet}&view={view}&openingHours={openingHours}&timeZone={timeZone}&mapcodes={mapcodes}&relatedPois={relatedPois}&minPowerKW={minPowerKW}&maxPowerKW={maxPowerKW}&entityTypeSet={entityTypeSet}

// ? Request Example: https://api.tomtom.com/search/2/search/36.98844,-121.97483.json?key={Your_API_Key}

// ? Geocode Example: https://api.tomtom.com/search/2/geocode/De Ruijterkade 154, 1011 AC, Amsterdam.json?key={Your_API_Key}

// ! https://api.tomtom.com/search/2/categorySearch/pizza.json?lat=37.337&lon=-121.89&view=Unified&relatedPois=false&key=*****

// ! https://api.tomtom.com/search/2/poiCategories.json?key={Your_API_Key}


const ttBaseURL = "https://api.tomtom.com/search/2/";
const ttAPIKey = "jxWprAPAeXwm1cbD0NLRVPErGVwfEn1u";
let geo =  "?lat=52.111&lon=-2.32"
const ttCatSearch = "categorySearch/"
let foodType = "pizza";
let format = ".json"
let URLEnd = "&view=Unified&relatedPois=false&key="

// API Test
function findFood() {
    // let queryURL = ttBaseURL + ttCatSearch + foodType + format + geo + URLEnd + ttAPIKey;
    let queryURL = "https://api.tomtom.com/search/2/search/52.1116,-2.3293.json?key=" + ttAPIKey;
    // let queryURL = "https://api.tomtom.com/search/2/poiCategories.json?key=" + ttAPIKey;
    // console.log("API Test: " + queryURL)
    $.ajax({
        url: queryURL,
        method: "GET",
    })
    .then(function(response) {
        // console.log(response)
        // console.log("TOMTOM API: " + JSON.stringify(response))
    })
}
    findFood();