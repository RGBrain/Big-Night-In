// API settings

// TMDB APIs
const baseURL = "https://api.themoviedb.org/3/";
const discoverURL = "discover/movie?api_key=";
const movieInfoURL = "movie/";
const genreURL = "genre/movie/list?api_key=";
const providerURL = "watch/providers/movie?api_key=";
const certURL = "certification/movie/list?api_key=";
let queryURL = "";
// API Key
const APIKEY = "c4321cfbc4e58956270feef6a91120a8";

// API Queries
let watchRegion = "&watch_region=GB";
let watchProviderString = "&with_watch_providers=";
let genreString = "&with_genres=";
let minVotes = "&vote_count.gte=3500";
let lang = "&language=en-US";
let certificationCountry = "&certification_country=GB";
let familyCerts = "&certification=PG%7CU";
let adultCerts = "&certification=15%2C%2018%2C%2012";
let sortByPop = "&sort_by=popularity.desc";
let removeAdult = "&include_adult=false";
let removeTrailers = "&include_video=false";
let page = "&page=1";
let freeWithSub = "&with_watch_monetization_types=flatrate";
let longFilms = "&with_runtime.gte=150";
let shortFilms = "&with_runtime.lte=100";

// RUN SEARCH WHEN FORM SUBMITTED
$(".submit").click(function () {
  event.preventDefault();
  //
  // Create a URL based on user choices
  //

  // Create initial URL
  queryURL =
    baseURL +
    discoverURL +
    APIKEY +
    lang +
    sortByPop +
    minVotes +
    certificationCountry +
    removeAdult +
    removeTrailers +
    page +
    freeWithSub +
    watchRegion;

  // Check genres
  let genreArray = [];
  if ($("#Comedy").is(":checked")) {
    genreArray.push(genres.get("Comedy"));
  }
  if ($("#Action").is(":checked")) {
    genreArray.push(genres.get("Action"));
  }
  if ($("#Thriller").is(":checked")) {
    genreArray.push(genres.get("Thriller"));
  }
  if ($("#Horror").is(":checked")) {
    genreArray.push(genres.get("Horror"));
  }
  if ($("#Drama").is(":checked")) {
    genreArray.push(genres.get("Drama"));
  }
  if ($("#Romance").is(":checked")) {
    genreArray.push(genres.get("Romance"));
  }
  // If no genres are selected, search all genres
  if (genreArray.length < 1) {
    console.log("Searching all genres");
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
  if ($("#Netflix").is(":checked")) {
    providers.push(watchProviders.get("Netflix"));
  }
  if ($("#AmazonPrime").is(":checked")) {
    providers.push(watchProviders.get("Amazon Prime Video"));
  }
  if ($("#Disney").is(":checked")) {
    providers.push(watchProviders.get("Disney Plus"));
  }
  if ($("#Hayu").is(":checked")) {
    providers.push(watchProviders.get("Hayu Amazon Channel"));
  }
  if ($("#BBCiPlayer").is(":checked")) {
    providers.push(watchProviders.get("BBC iPlayer"));
  }
  if ($("#ITV").is(":checked")) {
    providers.push(watchProviders.get("ITVX"));
  }
  // If no providers are selected, search all genres
  if (providers.length < 1) {
    console.log("Searching all providers");
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

  // Check for family friendly
  if ($("#yes").is(":checked")) {
    queryURL += familyCerts;
  }
  if ($("#no").is(":checked")) {
    queryURL += adultCerts;
  }

  // Check for film length
  if ($("#long").is(":checked")) {
    queryURL += longFilms;
  } else if ($("#short").is(":checked")) {
    queryURL += shortFilms;
  }
  filmSearch(queryURL);
});

// Generate pseudo-random number
function getRandom(length) {
  return Math.floor(Math.random() * length);
}

// Create Genre Object Map
const genres = new Map();
function genreMap() {
  let queryURL = baseURL + genreURL + APIKEY;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // Build object map
    for (let i = 0; i < response.genres.length; i++) {
      genres.set(response.genres[i].name, response.genres[i].id);
    }
  });
}

// Create Watch Provider Object Map
const watchProviders = new Map();
function providerMap() {
  let queryURL = baseURL + providerURL + APIKEY + lang + watchRegion;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // Build object map
    for (let i = 0; i < response.results.length; i++) {
      watchProviders.set(
        response.results[i].provider_name,
        response.results[i].provider_id
      );
    }
  });
}

// GET FILM ARRAY AND RANDOMLY SELECT ONE
function filmSearch(queryURL) {
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    let movieID = response.results[getRandom(response.results.length)].id;
    getFilm(movieID);
  });
}

// Get info for a given film
function getFilm(movieID) {
  let queryURL = baseURL + movieInfoURL + movieID + "?api_key=" + APIKEY + lang;
  console.log("Chosen Film: " + queryURL);
  $.ajax({
    url: queryURL,
    method: "GET",
  })
    // Create elements for film information
    .then(function(response) {
        let movieDiv = $('<div>');
        let movieTitle = $('<h2>').text(response.title);
        let moviePlot = $('<p>').text(response.overview);
        let movieRating = $('<h4>').text("TMDB Rating: " + response.vote_average.toFixed(1) + "/10");
        let moviePoster = $('<img>').attr('src', "https://image.tmdb.org/t/p/original/" + response.poster_path);
        movieDiv.append(movieTitle, moviePlot, movieRating, moviePoster);
        // Remove previous searches
        $('#results').empty();
        // Add film recommendation to page
        $('#results').prepend(movieDiv);
        $(".container-results").css("display", "block");
        
        findFood();
    })
}

// Create Object Maps
genreMap();
providerMap();

//
// TOMTOM API
//

let userLat = "51";
let userLong = "0";

// Location settings
const successCallback = (position) => {
    // console.log(position);
    userLat = position.coords.latitude;
    userLong = position.coords.longitude;
    console.log("Your current latitude: " + userLat);
    console.log("Your current longitude: " + userLong);
    // findFood(); 
  };
  
  const errorCallback = (error) => {
    // HANDLE NO LOCATION ERROR
    console.log(error);
  };
  // get position
  let userLocation = navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
    enableHighAccuracy: true,
    timeout: 5000,
  });
  
  // watch position
  // const watchId = navigator.geolocation.watchPosition(
  //   successCallback,
  //   errorCallback
  // );
  // Command to clear geolocation from console
  // navigator.geolocation.clearWatch(watchId);

const ttBaseURL = "https://api.tomtom.com/search/2/";
const ttAPIKey = "jxWprAPAeXwm1cbD0NLRVPErGVwfEn1u";
const ttCatSearch = "categorySearch/";
let foodType = "pizza";;
let format = ".json";

// Get local pizza!
function findFood() {
    let queryURL =  ttBaseURL + ttCatSearch + foodType + format + "?key=" + ttAPIKey + "&lon=" + userLong + "&lat=" + userLat;
    
    console.log("API Test: " + queryURL)
    $.ajax({
        url: queryURL,
        method: "GET",
    })
    .then(function(response) {
        // console.log(response)
        let restaurantText = $('<h2>').text("Treat yourself to a pizza!").addClass("food");
        let restaurant = $('<a>').text(response.results[0].poi.name).prop("href", response.results[0].poi.url).addClass("food-link")
        let restaurantPhone = $('<h4>').text(response.results[0].poi.phone).addClass("food-contact").prop("href", "http://www.google.com/")
        $('#results').append(restaurantText);
        $('#results').append(restaurant);
        $('#results').append(restaurantPhone);

    })
}
