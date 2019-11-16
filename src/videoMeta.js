module.exports = async(params) => {
    const parser = require('js-video-url-parser');
    const fetch  = require('node-fetch');
    const conf   = require('./config').vid;
    // console.log(parser.parse(params.url));

    let metadata = parser.parse(params.url);
    let onlyThumb = params.thumb;

    /**
     * @descrioption try get thumbnail for youtube and vimeo videos
     * 
     * ! other platforms may be added later
     * 
     * current avaliable: 
     * * youtube (url completation based)
     * * vimeo (vimeo api based) (replaces largest thumbnail resolution value with '1920')
     * 
     * in progress:
     * 
     */
    if(metadata.provider == 'youtube'){
        let tURL = `${conf.youtube.apis.thumbnailsUrl}/${metadata.id}`;

        await fetch(`${tURL}/maxresdefault.jpg`, {
            method: 'GET'
        }).then(r => {
            if(r.status == 200){
                metadata.thumb = `${tURL}/maxresdefault.jpg`;
            }
            else{
                metadata.thumb = `${tURL}/0.jpg`;
            }
        })
    }
    else if(metadata.provider == 'vimeo'){
        await fetch(`${conf.vimeo.apis.url}/${metadata.id}.json`, {
            method: 'GET'
        }).then(r => r.json()).then(r => {
            let thum = r[0].thumbnail_large.replace(/_[0-9]{1,4}/gi, '_1920');
            metadata.thumb = thum;
            metadata.thumbOriginal = r[0].thumbnail_large;
        });
    }

    if(onlyThumb){
        return {thumb: metadata.thumb, originalSize: metadata.thumbOriginal};
    }
    else{ return metadata }

};
