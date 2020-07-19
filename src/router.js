/**
 * @author Matsukii
 * 
 * @description A toolkit to generate, get, filter and work with data!
 * made with open npm libs and open to use
 * 
 */
module.exports = (app, dir) => {
    const conf = require('./config');
    const resMsgs = require('./responseMessages');

    const qrc = require('./qrgen');
    const ops = require('metafetch');
    const ogs = require('open-graph-scraper');
    const hashs = require('./hasher');
    const vidMeta = require('./videoMeta');
    const validUrl = require('valid-url');
    const wordFilter = require('./word-filter');
    const fbCleanLink = require('./face-cleaner');
    


    /**
     * @description redirect to project repo
     */
    app.get('/', (req, res) => res.redirect('https://github.com/Matsukii/polarpod'))

    // Video 
    app.get('/video', (req, res) => res.status(200).sendFile(`${dir}/public/video/video.html`))

    // Open graph
    app.get('/ogtags', (req, res) => res.status(200).sendFile(`${dir}/public/openGraph/ogs.html`) )

    // clean facebook url
    app.get('/cleanfb', (req, res) => res.status(200).sendFile(`${dir}/public/face-cleaner/cleanfb.html`))
    
    // clean facebook url api
    app.get('/apis/cleanfb', (req, res) => {
        if(!req.query.u) return res.status(400).send("No params sended, please send url: .../cleanfb?u=[url]")
        try {
            return res.status(200).json({
                original: req.query.u,
                clean: fbCleanLink(req.query.u),
                timestamp: Date.now(),
                success: true
            });
        } catch (e) {
            return res.status(500).send({
                original: req.query.u,
                clean: 'error',
                timestamp: Date.now(),
                success: false,
                error: e
            })
        }
    })

    //* clean facebook url api with redirect
    // ! this may not work sometimes
    app.get('/apis/cleanfb/redirect', (req, res) => {
        if(!req.query.u){return res.status(400).send('No params sended, please send url: .../cleanfb?u=[url]')}
        try {
            res.redirect(fbCleanLink(req.query.u))
        } catch (e) {
            return res.status(500).send({
                original: url,
                clean: fbCleanLink(req.query.u),
                timestamp: Date.now(),
                success: false,
                error: 'error - cant redirect'
            })
        }
    });


    /**
     * @description og tag getter
     */
    app.get("/apis/ogtags", async(req, res) => {
        let url = req.query.u;
        if(!url){ return res.status(400).send('No params sended, please send url: .../ogtags?u=[url]')}
        // if(!validUrl.isUri(url)){ return res.status(406).send('Not a URL')}

        //* decode url, recomended but not necessary at most cases
        //* and, the enc flag isn't mandatory, it should work without
        //* this is just a redundant thing :)
        if(req.query.enc){
            url = decodeURIComponent(url)
        }

        ogs({'url': url, ...conf.og.cfg}, (e, tags) => {
            let img;


            if(tags != undefined && !e){

                if(tags.ogImage != undefined && (tags.ogImage.url != undefined || tags.ogImage[0] != undefined)){
                    if(tags.ogImage[0] != undefined){
                        tags.ogImage[0].url != undefined ? img = tags.ogImage[0].url : null
                    }
                    else{img = tags.ogImage.url}
                }
                else{img = ''}

                
                return res.status(200).json({
                    name    : tags.ogSiteName || '',
                    title   : tags.ogTitle || '',
                    desc    : tags.ogDescription || '',
                    type    : tags.ogType || '',
                    url     : tags.ogUrl  || tags.requestUrl || '',
                    img     : img,
                    success : tags.success,
                });

            }
            else{return res.status(404).json({...resMsgs.og.defaultRes, success:false})}
        })
    });


    /**
     * @description get meta tags from url using metafetch module
     * ! not pre-processed data, sends back all the metadata.
     */
    app.get('/apis/op', (req, res) => {
        let url = req.query.u;
        if(!url){ return res.status(400).send('No params sended, please send url: .../op?u=[url]')}
        // if(!validUrl.isUri(url)){ return res.status(406).send('Not a URL')}

        ops.fetch(url, function(err, meta){
            if(!err){
                return res.status(200).send({...meta, success: true})
            }
            else{
                return res.status(400).send({warn: 'Some error occured during fetching', success: false})
            }
        })
    })



    /**
     * @description svg qr code generator
     */
    app.get('/apis/qr', function(req, res){
        params = {
            data   : req.query.u,
            dark   : req.query.d,
            width  : req.query.w,
            color  : req.query.c,
            bg     : req.query.bg
        }

        if(params.data == undefined){ res.status(400).send(resMsgs.qr.noParams) }
        else{ qrc(params).then(r => {
            res.setHeader('Content-Type', 'image/svg+xml');
            return res.status(200).send(r);
        }).catch(e => {
            return res.status(500).send("Somethis goes wrong");
        })}
    })


    /**
     * @description svg qr code generator AS FILE RETURN (open /code.svg)
     * @deprecated use /apis/qr that returns as svg file...
     */
    app.get('/apis/qr/file', function(req, res){
        params = {
            data   : req.query.u,
            dark   : req.query.d,
            width  : req.query.w,
            color  : req.query.c,
            bg     : req.query.bg
        }

        if(params.data == undefined){ res.status(400).send(resMsgs.qr.noParams) }
        else{ 
            qrc(params, true).then(r => {
                return res.status(200).json({status: 200, success: true, url: `${dir}/code.svg`});
            }).catch(e => {
                return res.status(500).send("Somethis goes wrong");
            });
        }
    });

    

    /**
     * 
     * @description get video params from given URL, same thins as .../apis/vidurl
     * @returns {Object} video metadata (mediaType, provider, type, chanel, id...)
     */
    app.get('/apis/video/meta', function(req, res){
        let params = {
            url: req.query.u
        }

        // if(!validUrl.isUri(params.url)){ return res.status(406).send('Not a URL')}
        if(params.url == undefined){ return res.status(400).send('no URL informed, please send url: .../meta?u=[url]')}
        else{
            vidMeta(params).then(r => {
                try {
                    ogs({'url': params.url, timeout: 2000}, (e, re) => {
                        if(re.data != undefined && !e){
                            return res.status(200).send({
                                ...r,
                                title: re.data.ogTitle,
                                description: re.data.ogDescription
                            })
                        }
                        else{
                            return res.status(200).send(r)
                        }
                    })
                } catch (e) {
                    return res.status(200).send(r)
                }
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
        
        // if(!validUrl.isUri(params.url)){ return res.status(406).send('Not a URL')}
        if(params.url == undefined){ return res.status(400).send('no URL informed')}
        else{
            vidMeta(params).then(r => {
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
     * @returns the hash from given data
     */
    app.get('/apis/hash/:alg', (req, res, next)=>{
       
        let dat = req.query.d;
        let alg = req.params.alg;

        let hashed = hashs({dat, alg}, resMsgs.warnings.hash, false);

        if(hashed){
            return res.status(hashed.status).send(hashed);
        }
        else{
            return res.status(500).send('some internal error occurred');
        }

    });


    /**
     * @description same as other hash but return plain text response ans support only sha256/224
     */
    app.get("/apis/hash/raw/:alg", (req, res) => {
            
        let dat = req.query.d;
        let alg = req.params.alg;

        if(/(sha256|sha224)/gi.test(alg)){
            let hashed = hashs({dat, alg}, resMsgs.warnings.hash, true);
            if(hashed){
                return res.status(202).send(hashed);
            }
            else{
                return res.status(500).send('some error occurred');
            }
        }
        else{ return res.status(422).send("Unsuported") }
    })


}