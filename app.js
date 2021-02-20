 
const express = require("express"); 
const path = require("path");
const bodyParser = require("body-parser"); 
const ejs = require("ejs");
const {config} = require('./config.js'); 
const mykey = config.MY_KEY;
const axios = require('axios');
const app = express();
const baseURL = "https://api.musixmatch.com/ws/1.1/";
const endURL = "&apikey=" + mykey;


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res){
    res.render("index", {
        success: false
    });
});

app.post("/", function(req, res){

var letra_musica;

axios
  .get(baseURL + "track.search?callback=callback&q_track=" + req.body.title + "&q_artist=" + req.body.artist + "&apikey=" + endURL)
  .then((response) => {
    console.log(response.data.message.body.track_list[0].track.track_id);

    axios
  .get(baseURL + "track.lyrics.get?track_id=" + response.data.message.body.track_list[0].track.track_id + "&apikey=" + endURL)
  .then((response) => {
    letra_musica = response.data.message.body.lyrics.lyrics_body;
    res.render("index", {
      success: true,
      lyrics: letra_musica,
      title: req.body.title,
      artista: req.body.artist
  });
  })
  .catch((error) => {
    console.log(error);
  });

  })
  .catch((error) => {
    console.log(error);
  });
    
});

app.listen(3000, function(){
    console.log("server running on port 3000");
});

