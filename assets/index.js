
// watchProvidersList = "https://www.themoviedb.org/movie/577922-tenet/api.themoviedb.org/3/movie/577922/watch/providers?api_key="


// testURL = "https://api.themoviedb.org/3/discover/movie?api_key=c4321cfbc4e58956270feef6a91120a8&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=thriller&with_watch_monetization_types=flatrate"

// !Looking at Netflix in Canada, for example:
// ! https://api.themoviedb.org/3/discover/movie?api_key=###&with_watch_providers=8%7C119%7C337&watch_region=CA
// ! https://api.themoviedb.org/3/discover/movie?api_key=###&with_watch_providers=8&watch_region=CA

// {"genres":[{"id":28,"name":"Action"},
// {"id":12,"name":"Adventure"},
// {"id":16,"name":"Animation"},
// {"id":35,"name":"Comedy"},
// {"id":80,"name":"Crime"},
// {"id":99,"name":"Documentary"},
// {"id":18,"name":"Drama"},
// {"id":10751,"name":"Family"},
// {"id":14,"name":"Fantasy"},
// {"id":36,"name":"History"},
// {"id":27,"name":"Horror"},
// {"id":10402,"name":"Music"},
// {"id":9648,"name":"Mystery"},
// {"id":10749,"name":"Romance"},
// {"id":878,"name":"Science Fiction"},
// {"id":10770,"name":"TV Movie"},
// {"id":53,"name":"Thriller"},
// {"id":10752,"name":"War"},
// {"id":37,"name":"Western"}]}

// Certficate
// rating (don't ask user)
// Genre (quirky question/s)
// Platforms
// language
let watchRegion = "^GB$"
let watchProviders = "with_watch_providers=337"


// API settings 


// Search for a movie based on criteria
// Find out that movie ID
// get info for that movie
// where to watch





// TMDB (Movie Database)
baseURL = "https://api.themoviedb.org/3/movie/550?api_key=";
baseDiscoverURL = "https://api.themoviedb.org/3/discover/movie?api_key=";
personURL = "https://api.themoviedb.org/3/person/287?api_key=";
APIKEY = "c4321cfbc4e58956270feef6a91120a8";


let genre = "&with_genres=35";

function test(film) {
    let queryURL = baseDiscoverURL + APIKEY + "&" + watchProviders + "&" + watchRegion
    $.ajax({
        url: queryURL,
        method: "GET",
    })
    .then(function(response) {
        console.log(response)
    })
}
    test();