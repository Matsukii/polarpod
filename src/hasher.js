module.exports = (params, warns, raw) => {
    const hasher = require('object-hash');
    const sha2xx = require('js-sha256');

    let alg = params.alg;
    let dat = params.dat;

    /**
     * @description send a bad querry construction warining
     * @param {String} warining response warning @see responseMessages.js
     */
    const badQuery = (status = 400, warning) =>{
        return {
            status: status,
            success: false,
            original: dat,
            algorithm: alg,
            hash: '',
            warning: warning,
            date: Date.now()
        }
    }

    /** 
     * @description preformed successfull response object
    */
    let preform = {
        status: 200,
        success: true,
        algorithm: alg,
        original: dat,
        date: Date.now()
    }


    // missing params
    if(!dat || !alg){ return raw ? 'missing params' : badQuery(warns.missing) }
    
    // SHA1
    if(/sha1/gi.test(alg)){
        preform.hash = hasher(dat, {algorithm:'sha1'});
        preform.warning = warns.object;
        return raw ? preform.hash : preform;
    }

    // SHA224
    else if(/sha224/gi.test(alg)){
        preform.hash = sha2xx.sha224(dat);
        return raw ? preform.hash : preform;
    }

    // SHA256
    else if(/sha256/gi.test(alg)){
        preform.hash = sha2xx.sha256(dat);
        return raw ? preform.hash : preform;
    }

    // MD5
    else if(/md5/gi.test(alg)){
        preform.hash = hasher(dat, {algorithm:'md5'});
        preform.warning = warns.object;
        return raw ? preform.hash : preform;
    }

    // UNSUPORTED
    else{ return raw ? "unsuported algorithm" : badQuery(422, warns.unsuported) }

};
