/**
 * @description A toolkit to generate, get, filter and work with data!
 * made with open npm libs and open to use
 * 
 * @author Matsukii
 * 
 * 
 * * Og tag getter
 * https://polarpod.herokuapp.com/apis/ogtags?u=[url]
 * 
 * * SVG QR Code generator
 * https://polarpod.herokuapp.com/apis/qr?u=[url]&d=[true]/[false]&w=[width]&c=[color]&bg=[background]
 * 
 * * video URL parser
 * http://polarpod.herokuapp.com/apis/vidurl?u=[url]
 * 
 * * Bad-word message filter
 * https://polarpod.herokuapp.com/apis/filter?msg=[message_to_filter]
 * 
*/


var express = require("express");
const path = require('path');
const cors = require('cors')
const conf = require('./src/config');


// 0ac6kh - 1abz19
const hasher = require('object-hash');
console.log(hasher.sha1(''));


var app = express();
var port = process.env.PORT || 3001;

app.use(cors())
app.use(express.urlencoded({ extended: true }));

//* call router
var router = require(`${__dirname}/src/router`) (app, __dirname);

//* start server
var server = app.listen(port, function(){
    var port = server.address().port;
    console.log(`Server started at: http://localhost:${port}`);
});

