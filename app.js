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

    music.trackSearch({q:"Chet Faker - Gold", page:1, page_size:3})
	.then(function(data){
		console.log(data);
	}).catch(function(err){
		console.log(err);
});

    music.trackLyrics({track_id:15445219})
        .then(function(data){
            console.log(data.message.body.lyrics.lyrics_body);
        }).catch(function(err){
            console.log(err);
    });

    res.render("index", {
        success: true
    })
});

app.listen(2000, function(){
    console.log("server running on port 3000");
});
