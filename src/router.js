/**
 * 
 * https://og-tagg-getter.herokuapp.com/api?u=<url>
 */
module.exports = (app, dir, config) => {
    const ogs = require('open-graph-scraper');
    const nanoMeme = require('nano-memoize')

    let ogt = require('./ogtags')

    
    
    app.get("/apis/ogtags", async(req, res) => {

        respc = { name: "", title: "", desc: "", type: "", url: "", img: "", }
        let resp;
        let img;
        url = req.query.u;
        
        let ogOps = {
            'url': url,
            'timeout': 2000,
            'followAllRedirects': false,
        }


        ogs(ogOps, function (err, rst) {

            if(rst.data != undefined){

                if(rst.data.ogImage.url != undefined || rst.data.ogImage[0] != undefined){
                    if(rst.data.ogImage[0] != undefined){
                        rst.data.ogImage[0].url != undefined ? img = rst.data.ogImage[0].url : null
                    }
                    else{
                        img = rst.data.ogImage.url
                    }
                }
                else{
                    img = ''
                }
                
                
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
            else{
                return res.status(404).send(respc)
            }
        })
        
        
        
        
        
    });
    // console.log(error);
    // console.log(resp);
    // console.log(resp.data);
    
    
    // {"data":{"ogSiteName":"Twitch","twitterSite":"@twitch","ogTitle":"Twitch","ogDescription":"Twitch is the world's leading video platform and community for gamers.","ogUrl":"https://www.twitch.tv/","ogType":"website","ogImage":{"url":"//www-cdn.jtvnw.net/images/twitch_logo3.jpg","width":null,"height":null,"type":null}},"success":true,"requestUrl":"http://twitch.tv"}
    

    // var options = {'url': 'http://ogp.me/'};
    // var options = {'url': 'http://twitch.tv/'};
    
    // ogs(options, function (error, results) {
    //     console.log('error:', error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
    //     console.log('results:', results);
    // });
    

}