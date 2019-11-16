/**
 * @description A set of useful APIs do extract and process data,
 * made with open npm libs and open to use
 * 
 * @author Matsukii
 * 
 * * Hashers
 * https://polarpod.herokuapp.com/apis/hash/[SHA256|SHA224|SHA1|MD5]?d=[data]
 * 
 * * Og tag getter
 * https://polarpod.herokuapp.com/apis/ogtags?u=[url]
 * 
 * * SVG QR Code generator
 * https://polarpod.herokuapp.com/apis/qr?u=[data]&d=[true]/[false]&w=[width]&c=[color]&bg=[background]
 * 
 * * video URL parser
 * http://polarpod.herokuapp.com/apis/vidurl?u=[url]
 * 
 * * Bad-word message filter
 * https://polarpod.herokuapp.com/apis/filter?msg=[message_to_filter]
 * 
*/

var express = require("express");
const cors = require('cors')
const conf = require('./src/config');

var app = express();
app.use(cors())
app.use(express.static('public'));
app.use(express.static('assets'));
app.use(express.urlencoded({ extended: true }));

//* call router
var router = require(`${__dirname}/src/router`) (app, __dirname);

//* start server
var server = app.listen(conf.app.port, () => {
    console.log(`Server started at http://localhost:${conf.app.port}`);
});

