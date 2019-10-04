module.exports = (params) => {
    const parser = require('js-video-url-parser');
    // console.log(parser.parse(params.url));
    return parser.parse(params.url)
};
