module.exports = (params, saveFile = false) => {
    qrcode = require('qrcode-svg');

    // url ? dat = dat.split('*').join('/') : null
    // url ? console.log(dat) : null


    let colod = '#646464';

    if(params.dark){
        colod = '#CCCCCC'
    }
    else{
        if(params.color != undefined){
            colod = `#${params.color}`;
        }
        else{
            colod = '#222222';
        }
    }

    let bcg = 'transparent';
    if(params.bg != undefined){
        bcg = `#${params.bg}`;
    }
    else{
        bcg = 'transparent'
    }


    let config = {
        content: params.url,
        padding: 1,
        width: params.width || 100,
        height: params.width || 100,
        color: colod,
        background:  bcg,
    }

    var qr = new qrcode(config);

    // if(saveFile){
    //     qr.save("sample.svg", function(error) {
    //         if (error) throw error;
    //         console.log("Done!");
    //     });
    // }

    return qr.svg()
}
