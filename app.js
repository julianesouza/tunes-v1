const express = require("express"); 
const path = require("path");
const bodyParser = require("body-parser"); 
const ejs = require("ejs");
const https = require("https");
const {config} = require('./config.js'); 
const mykey = config.MY_KEY;
const music = require('musicmatch')({apikey:mykey});

const app = express();

let letra = "";

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", function(req, res){

    res.render("index", {
        success: false
    });
});

app.post("/", function(req, res){

    let title = req.body.title;

    music.trackSearch({q:title})
	.then(function(data){

        music.trackLyrics({track_id: data.message.body.track_list[0].track.track_id})
        .then(function(data){
            console.log(data.message.body.lyrics.lyrics_body);
            letra = data.message.body.lyrics.lyrics_body;
        }).catch(function(err){
            console.log(err);
        })

	}).catch(function(err){
		console.log(err);
})

    res.render("index", {
        success: true,
        lyrics: letra
    });
});

app.listen(3000, function(){
    console.log("server running on port 3000");
});
