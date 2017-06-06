var fs = require("fs")
var request = require("request")

var one = process.argv[2]
var two = process.argv[3]

//Vars For Twitter
var keys = require("./keys.js")
var Twitter = require("twitter")
tKeys = keys.twitterKeys

var client = new Twitter ({

	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret

})

//Vars For Spotify
var Spotify = require("spotify")

//Vars For Movies
var omdb = require("omdb")


var params = {count:2}


switch (one) {
	case "my-tweets":
	getTweets();
	break;

	case "spotify-this-song":
	getSong();
	break;

	case "movie-this":
	getMovie();
	break;

	case "do-what-it-says":
	readRandom();
	break;
}

function getTweets(){
client.get("statuses/user_timeline",{count:6}, function(error, tweets, response) {
   if (!error) {
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text + " created on " + tweets[i].created_at)
    }
  }

  })
}

function getSong(queryInput){

for (var i = 3; i < process.argv.length; i++) {

  if (i > 3 && i < process.argv.length) {

    queryInput = queryInput + " " + process.argv[i];
  }

  else {
    queryInput = process.argv[i];
  }
}

Spotify.search({ type: "track", query: queryInput }, function(err, data) {
    if (!err ) {

    	console.log("Artist: " + data.tracks.items[0].artists[0].name)
    	console.log("Track: " + data.tracks.items[0].name)
        console.log("Album : " + data.tracks.items[0].album.name)
    }
})
}

function getMovie(movieName){
	for (var i = 3; i < process.argv.length; i++) {

  if (i > 3 && i < process.argv.length) {
    movieName = movieName + " " + process.argv[i];
  }

  else {
    movieName = process.argv[i];
  }
}

omdb.search("movieName", function(err,data) {
	if (!err) {
		console.log(data)
		console.log(data.title)
		console.log(data.year)
	}
})
}

function readRandom(){

fs.readFile("random.txt","utf-8", function(error,data) {
	console.log(data)
	dataOne = data.split(",")[0]
	console.log(dataOne)
	dataTwo = data.split(",")[1]
	console.log(dataTwo)

	if (dataOne === "my-tweets") {
		getTweets();
	}

	else if (dataOne ==="spotify-this-song") {

		getSong(dataTwo);
	}

	else if (dataOne === "movie-this") {
		getMovie(dataTwo)
	}

})
}
