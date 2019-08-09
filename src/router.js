module.exports = (app, dir, config) => {
    const ogs = require('open-graph-scraper');

    let resp;

    
    app.get("/api", async(req, res) => {
        url = req.query.u;
        
        let options = {
            'url': url,
            'timeout': 5000,
            'followAllRedirects': true,
            'maxRedirects': 10,
        }

        ogs(options, function (error, rst) {
            
            resp = {
                name: rst.data.ogSiteName,
                title: rst.data.ogTitle,
                desc: rst.data.ogDescription,
                type: rst.data.ogType,
                url: rst.data.ogUrl || rst.requestUrl,
                img: rst.data.ogImage.url || rst.data.ogImage[0].url || 'none',
            }
            
            return res.send(resp);
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