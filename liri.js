require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
var fs = require('fs');
var request = require("request");
var liri = process.argv[2];
var movieName = process.argv[3];

switch (liri) {
  case "my-tweets":
      myTweets();
      break;

  case "spotify-this-song":
      spotifyThisSong();
      break;

  case "movie-this":
      movieThis();
      break;

  case "do-what-it-says":
      doWhatItSays();
      break;

  default: console.log("\n" + "type any command after 'node liri.js': " + "\n" +
      "my-tweets" + "\n" +
      "spotify-this-song 'any song title' " + "\n" +
      "movie-this 'any movie title' " + "\n" +
      "do-what-it-says " + "\n" +
      "Use quotes for multiword titles!");
};
function myTweets(){
var params = {screen_name: 'trump', count: 20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i < 20; i++) {
              console.log(tweets[i].text);};
                   } else {
                            console.log("error: " + err);
                            return;
                           }
            });
}

function spotifyThisSong(trackName) {
  var trackName = process.argv[3];
  if (!trackName) {
      trackName = "Mutter";
  };
  songRequest = trackName;
  spotify.search({ type: "track", query: songRequest
  },
      function (err, data) {
          if (!err) {
              var trackInfo = data.tracks.items;
              for (var i = 0; i < 5; i++) {
                  if (trackInfo[i] != undefined) {
                      var spotifyResults =
                          "Artist: " + trackInfo[i].artists[0].name + "\n" +
                          "Song: " + trackInfo[i].name + "\n" +
                          "Preview URL: " + trackInfo[i].preview_url + "\n" +
                          "Album: " + trackInfo[i].album.name + "\n"

                      console.log(spotifyResults);
                      console.log(' ');
                  };
              };
          } else {
              console.log("error: " + err);
              return;
          };
      });
};


function movieThis() {
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  request(queryUrl, function (error, response, body) {
      if (!error && response.statusCode === 200) {

          var myMovieData = JSON.parse(body);
          var queryUrlResults =
              "Title: " + myMovieData.Title + "\n" +
              "Year: " + myMovieData.Year + "\n" +
              "IMDB Rating: " + myMovieData.Ratings[0].Value + "\n" +
              "Rotten Tomatoes Rating: " + myMovieData.Ratings[1].Value + "\n" +
              "Origin Country: " + myMovieData.Country + "\n" +
              "Language: " + myMovieData.Language + "\n" +
              "Plot: " + myMovieData.Plot + "\n" +
              "Actors: " + myMovieData.Actors + "\n"

          console.log(queryUrlResults);
      } else {
          console.log("error: " + err);
          return;
      };
  });
};


function doWhatItSays() {
  fs.writeFile("random.txt", 'spotify-this-song,"The Sign"', function (err) {
      var song = "spotify-this-song 'The Sign'"
      if (err) {
          return console.log(err);
      };
      console.log(song);
  });
};