const express = require("express"); 
const path = require("path");
const bodyParser = require("body-parser"); 
const ejs = require("ejs");
const https = require("https");
const {config} = require('./config.js'); 
const mykey = config.MY_KEY;
const music = require('musicmatch')({apikey:mykey});

const app = express();

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

    music.trackSearch({q:title, page:1, page_size:3})
	.then(function(data){
        const track_is = data.message.body.track_list[0].track.track_id;

            music.trackLyrics({track_id:track_is})
            .then(function(data){
                const lyrics = data.message.body.lyrics.lyrics_body;
                res.render("index", {
                    success: true,
                    lyrics: lyrics
                })
            }).catch(function(err){
                console.log(err);
        });

	}).catch(function(err){
		console.log(err);
    }); 
});

app.listen(3000, function(){
    console.log("server running on port 3000");
});
