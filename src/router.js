/**
 * @description A toolkit to generate, get, filter and work with data!
 * made with open npm libs and open to use
 * 
 * metafetch -> nice og tag getter
 * 
 * 
 * https://player.twitch.tv/?channel=gabepeixe&autoplay=false
 * 
 * * Og tag getter
 * https://open-toolkit-api-tolls.herokuapp.com/apis/ogtags?u=<url>
 * 
 * * SVG QR Code generator
 * https://open-toolkit-api-tolls.herokuapp.com/apis/qr?u=[url]&d=[true]/[false]&w=[width]&c=[color]&bg=[background]
 * 
 * * video URL parser
 * http://opentk-apis.herokuapp.com/apis/vidurl?u=[url]
 * 
 * sample vid URL for testing:
 * https://www.youtube.com/watch?v=4EL4U99yU2U&list=PLKHM_FaE3DS_oPGjhOkkT94K4OtUGl8tk
 * 
 * * Bad-word message filter
 * https://open-toolkit-api-tolls.herokuapp.com/apis/filter?msg=[message_to_filter]
 * 
 */
module.exports = (app, dir, config) => {
    const ogs = require('open-graph-scraper');
    const qrc = require('./qrgen');
    const urlp = require('./urlVideoParser');
    const ops = require('metafetch');
    const wordFilter = require('./word-filter');

    /**
     * @description og tag getter api
     */
    app.get("/apis/ogtags", async(req, res) => {
        url = req.query.u;
        
        let resp;
        let img;
        
        respc = {name: "", title: "", desc: "", type: "", url: "", img: ""}
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
            else{return res.status(404).send(respc)}
        })
    });


    /**
     * @description og tag getter from metafetch library
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

        if(params.url == undefined){
            res.status(400).send(`<title>qr gen API - Please send the params!</title>
                                Please send params:<br>
                                (need url/data at least)<br>
                                corection level = M, padding = 1 (unavaliable to set)
                                u: url<br>
                                d: dark (color = #cccccc, overrides color and bg param)<br>
                                w: width and height<br>
                                c: color (HEX, without the '#'), the default is #222222 and #CCCCCC<br>
                                bg: background color (HEX, without the '#'), the default is transparent`
            )
        }
        else{ return res.status(200).send(qrc(params)) }
    })



    /**
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
            return res.status(400).send('No message given <br>use ?msg=(your_message_here)')
        }
    });



}