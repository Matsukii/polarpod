/**
 * @author Matsukii
 * 
 * @description A toolkit to generate, get, filter and work with data!
 * made with open npm libs and open to use
 * 
 */
module.exports = (app, dir) => {
    const ogs = require('open-graph-scraper');
    const qrc = require('./qrgen');
    const urlp = require('./urlVideoParser');
    const ops = require('metafetch');
    const wordFilter = require('./word-filter');
    const resMsgs = require('./responseMessages');
    const conf = require('./config');
    const hasher = require('object-hash');
    const sha2xx = require('js-sha256');


    /**
     * @description redirect to project repo
     */
    app.get('/', (req, res) =>{
        res.redirect('https://github.com/Matsukii/polarpod');
    })

    /**
     * @description og tag getter api
     */
    app.get("/apis/ogtags", async(req, res) => {
        url = req.query.u;
        
        let resp;
        let img;
        
        
        let ogOps = {'url': url, 'timeout': 2000, 'followAllRedirects': false}

        ogs(ogOps, function (err, rst, repso) {
            if(rst.data != undefined){
                if(rst.data.ogImage.url != undefined || rst.data.ogImage[0] != undefined){
                    if(rst.data.ogImage[0] != undefined){
                        rst.data.ogImage[0].url != undefined ? img = rst.data.ogImage[0].url : null
                    }
                    else{img = rst.data.ogImage.url}
                }
                else{img = ''}
                
                // ! aditional treatment to imgs like /path/to/image.png
                // if(img != ''){
                //     if(img.startsWith('/')){
                //         img = `${rst.data.ogUrl}${img}`
                //     }
                // }

                resp = {
                    name: rst.data.ogSiteName || '',
                    title: rst.data.ogTitle || '',
                    desc: rst.data.ogDescription || '',
                    type: rst.data.ogType || '',
                    url: rst.data.ogUrl || rst.requestUrl || '',
                    img: img,
                }
                // resp = rst;
                return res.status(200).send(resp);
            }
            else{return res.status(404).send(conf.ogTags.defaultResponse)}
        })
    });


    /**
     * @description og tag getter from metafetch library
     * @deprecated use ogtags option 
     */
    app.get('/apis/op', function(req, res){
        url = req.query.u;

        ops.fetch(url, function(err, meta){
            // console.log(meta);
            if(!err){
                return res.status(200).send(meta)
            }
            else{
                return res.status(400).send('Some error occured during fetching')
            }
        })
    })



    /**
     * @description svg qr code generator api
     */
    app.get('/apis/qr', function(req, res){
        params = {
            url    : req.query.u,
            dark   : req.query.d,
            width  : req.query.w,
            color  : req.query.c,
            bg     : req.query.bg
        }

        if(params.url == undefined){ res.status(400).send(resMsgs.qrNoParams) }
        else{ qrc(params).then(r => {
            res.setHeader('Content-Type', 'image/svg+xml');
            return res.status(200).send(r);
        })}
    })


    /**
     * @description svg qr code generator api AS FILE RETURN
     */
    app.get('/apis/qr/file', function(req, res){
        params = {
            url    : req.query.u,
            dark   : req.query.d,
            width  : req.query.w,
            color  : req.query.c,
            bg     : req.query.bg
        }

        if(params.url == undefined){ res.status(400).send(resMsgs.qrNoParams) }
        else{ 
            qrc(params, true).then(r => {
                return res.status(200).json({status: 200, success: true, url: `${dir}/code.svg`});
            });
        }
    });

    



    /**
     * @deprecated this will not be suported on feature, use /apis/video/meta
     * @description get video params from given URL
     * @returns {Object} video metadata (mediaType, provider, type, chanel, id...)
     */
    app.get('/apis/vidurl', function(req, res){
        params = {
            url: req.query.u
        }

        if(params.url == undefined){
            return res.status(400).send('no URL informed');
        }
        else{
            return res.status(200).send(urlp(params))
        }

    })



    /**
     * 
     * @description get video params from given URL, same thins as .../apis/vidurl
     * @returns {Object} video metadata (mediaType, provider, type, chanel, id...)
     */
    app.get('/apis/video/meta', function(req, res){
        let params = {
            url: req.query.u
        }

        if(params.url == undefined){
            return res.status(400).send('no URL informed');
        }
        else{
            urlp(params).then(r => {
                return res.status(200).send(r)
            })
        }
    })


    /**
     * 
     * @description get video thumbnail (is part of .../video/meta but returns only the image(s))
     * @returns {Object} video metadata (mediaType, provider, type, chanel, id...)
     */
    app.get('/apis/video/thumb', function(req, res){
        let params = {
            url: req.query.u,
            thumb: true
        }

        if(params.url == undefined){
            return res.status(400).send('no URL informed');
        }
        else{
            urlp(params).then(r => {
                return res.status(200).send(r)
            })
        }

    })

    /**
     * @description bad word message filter
     * @returns filtered message or bad request error
     */
    app.get('/apis/filter', function(req, res){
        params = {
            msg: req.query.msg
        }
        let cl = wordFilter(params);
        if(cl != undefined){
            return res.status(200).json({msg: cl});
        }
        else{
            return res.status(400).send(resMsgs.filterNoMessage);
        }
    });

   
    

    /**
     * @description hash function
     * 
     * TODO: MOVE THIS CODE TO A NEW FILE
     * 
     * params: d = data/text to hash
     * 
     * @returns the hash from given data
     */
    app.get('/apis/hash/:alg', (req, res, next)=>{
        
        /**
         * @description send a bad querry construction warining
         * @param {String} ori original text to hash 
         * @param {String} alg algorithm
         */
        const malformedQuery = (ori, alg) =>{
            return {
                status: 400,
                success: false,
                original: ori,
                algorithm: alg,
                hash: '',
                warning: 'Missing params',
                date: new Date().toGMTString()
            }
        }

        let dat = req.query.d;
        let alg = req.params.alg;

        if(alg == ''){
            res.send(404).send(resMsgs.hashNoParams);
        }
        else if(!dat || !alg){
            res.status(400).send(malformedQuery(dat, alg));
        }
        else{
            let preform = {
                status: 200,
                success: true,
                algorithm: alg,
                original: dat,
                date: new Date().toGMTString()
            }

            if(alg == 'sha1'){
                preform.hash = hasher(dat, {algorithm:'sha1'});
                preform.warning = resMsgs.hashWarnings.object;
                res.status(200).json(preform);
            }
            else if(alg == 'sha256'){
                preform.hash = sha2xx.sha256(dat);
                res.status(200).json(preform);
            }
            else if(alg == 'sha224'){
                preform.hash = sha2xx.sha224(dat);
                res.status(200).json(preform);
            }
            else if(alg == 'md5'){
                preform.hash = hasher(dat, {algorithm:'md5'});
                preform.warning = resMsgs.hashWarnings.object;
                res.status(200).json(preform);
            }
            else{
                preform.hash = '';
                preform.warning = resMsgs.hashWarnings.unsuported;
                res.status(400).send(malformedQuery(dat, alg));
            }
        }
    });

    app.get("/apis/hash/raw/:alg", (req, res) => {
            
        let dat = req.query.d;
        let alg = req.params.alg;

        if(alg == ''){
            res.send(404).send(resMsgs.hashNoParams);
        }
        else if(!dat || !alg){
            res.status(400).send(malformedQuery(dat, alg));
        }
        else {
            if(alg == 'sha256'){
                let h = sha2xx.sha256(dat);
                res.status(200).send(h);
            }
            else if(alg == 'sha224'){
                let h = sha2xx.sha224(dat);
                res.status(200).send(h);
            }
        }

        
    })


}