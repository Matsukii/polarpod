/**
 * @description app configs
 */
module.exports = {
    app:{
        port: process.env.PORT || 3001,
    },
    og: {
        cfg:{
            'timeout': 2000,
            'followAllRedirects': false
        }
    },
    vid: {
        vimeo:{
            apis:{
                url: `https://vimeo.com/api/v2/video`
            }
        },
        youtube:{
            apis:{
                thumbnailsUrl: `https://img.youtube.com/vi`,
            }
        }
    }
    
}