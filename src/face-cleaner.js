/**
 * @description extract original link and remove click id param from facebook links
 * @author Matsukii
 * 
 * @param {String} url url from facebook to clean
 */
module.exports = (url) => {

    url = new URL(url);
    
    if(url.pathname == '/l.php' && url.searchParams.get('u')){
        let link = new URL(url.searchParams.get('u'));
        link = `${link.origin}${link.pathname}`
        return link
    }
    else if (url.searchParams.get('fbclid')){
        return `${url.origin}${url.pathname}`
    }
    else{
        return url;
    }

};
