const express = require("express"); 
const path = require("path");
const bodyParser = require("body-parser"); 
const ejs = require("ejs");
const https = require("https");
const {config} = require('./config.js'); 
const mykey = config.MY_KEY;

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

    res.render("index", {
        success: true
    })
});

app.listen(5000, function(){
    console.log("server running on port 3000");
});
