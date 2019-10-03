let cfg = require('./config');
var mysql = require('mysql');
var c = mysql.createConnection({
    host     : cfg.codestorage.host,
    user     : cfg.codestorage.usr,
    password : cfg.codestorage.pass,
    database : cfg.codestorage.db,
});


/**
 * !DEPRECATED
 * @deprecated unused module
 * @param {String} key private keys to send use this code
 * @param {Array/object} data data
 */
module.exports = (key = null, data) => {
    const h = require('object-hash');

    // ..pretty shitty way
    // ! isn't a problem if any one knows
    if(h.sha1(key) == cfg.pk){
        
        if(data != null || data != undefined){
            c.connect()
            c.query(`INSERT INTO ${cfg.codestorage.dbtable} (code, date) VALUES (${data.code}, ${Date.now()})`, 
            function (error, results, fields) {
                if (error) throw error;
                console.log('The solution is: ', results[0].solution);
                return results[0].solution
            });
            
        }
    }
};
