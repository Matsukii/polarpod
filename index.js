var express = require("express");
const path = require('path');
const cors = require('cors')
const conf = require('./src/config');


const hasher = require('object-hash');

// 0ac6kh
// 1abz19
console.log(hasher.sha1(''));


var app = express();
var port = process.env.PORT || 3001;

app.use(cors())
app.use(express.urlencoded({ extended: true }));

//* call router
var router = require(`${__dirname}/src/router`) (app, __dirname, conf);

//* start server
var server = app.listen(port, function(){
    var port = server.address().port;
    console.log(`Server started at: http://localhost:${port}`);
});


// https://www.npmjs.com/package/open-graph-scraper