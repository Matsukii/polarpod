/**
 * @description A toolkit to generate, get, filter and work with data!
 * made with open npm libs and open to use
 * 
 * * Og tag getter
 * https://open-toolkit-api-tolls.herokuapp.com/apis/ogtags?u=<url>
 * 
 * * SVG QR Code generator
 * https://open-toolkit-api-tolls.herokuapp.com/apis/qr?u=[url]&d=[true]/[false]&w=[width]&c=[color]&bg=[background]
 */
module.exports = (app, dir, config) => {
    const ogs = require('open-graph-scraper');
    const qrc = require('./qrgen');

    /**
     * @description og tag getter api
     */
    app.get("/apis/ogtags", async(req, res) => {
        url = req.query.u;
        
        let resp;
        let img;
        
        respc = {name: "", title: "", desc: "", type: "", url: "", img: ""}
        let ogOps = {'url': url, 'timeout': 2000, 'followAllRedirects': false}

        ogs(ogOps, function (err, rst) {
            if(rst.data != undefined){
                if(rst.data.ogImage.url != undefined || rst.data.ogImage[0] != undefined){
                    if(rst.data.ogImage[0] != undefined){
                        rst.data.ogImage[0].url != undefined ? img = rst.data.ogImage[0].url : null
                    }
                    else{img = rst.data.ogImage.url}
                }
                else{img = ''}
                resp = {
                    name: rst.data.ogSiteName || '',
                    title: rst.data.ogTitle || '',
                    desc: rst.data.ogDescription || '',
                    type: rst.data.ogType || '',
                    url: rst.data.ogUrl || rst.requestUrl || '',
                    img: img,
                }
                return res.status(200).send(resp);
            }
            else{return res.status(404).send(respc)}
        })
    });



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


}