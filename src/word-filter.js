module.exports = (params) => {
    var Filter = require('bad-words');
    // var words = require('badwords-list');

    filter = new Filter();
    if(params.msg != null || params.msg != undefined){
        cleaned = filter.clean(params.msg);
        return cleaned;
    }
    else{ return undefined }
}
