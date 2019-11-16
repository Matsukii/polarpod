module.exports = async(params, saveFile = false) => {
    qrcode = require('qrcode-svg');

    let colod = '#646464';

    if(params.dark){
        colod = '#CCCCCC'
    }
    else{
        params.color != undefined ? colod = `#${params.color}` : colod = '#222222';
    }

    let bcg = 'transparent';
    params.bg != undefined ? bcg = `#${params.bg}` : bcg = 'transparent';

    let config = {
        padding    : 1,
        color      : colod,
        background : bcg,
        content    : params.data,
        width      : params.width || 100,
        height     : params.width || 100,
    }

    var qr = new qrcode(config);

    if(saveFile){
        qr.save("public/code.svg", (e) => { if (e) throw e });
    }

    return qr.svg();
}
