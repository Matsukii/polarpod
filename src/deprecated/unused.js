
/**
 * @description hash function
 * 
 * params: d = data, m = mode (MD5 or sha1)
 * 
 * @returns the hash from given data
 */
app.get('/apis/hasher', function(req, res, next){
    let mode =  req.query.m;
    let dat = req.query.d;
    dat = {data: dat}

    let mdrgx = new RegExp('MD5', 'gi');
    let shagx = new RegExp('sha1', 'gi');
    let shagx = new RegExp('sha', 'gi');
    if(mode == ''){
        mode = 'SHA';
    }

    if(mdrgx.test(mode)){
        return res.status(200).json({
            success: true,
            type: mode,
            original: dat,
            hash: hasher(dat.data, {algorithm:'md5'})
        });
    }
    else if(shagx.test(mode)){
        return res.status(200).json({
            success: true,
            type: mode,
            original: dat,
            hash: hasher(dat.data, {algorithm:'sha1'})
        });
    }
    else{
        return res.status(400).json({
            success: false,
            type: mode,
            original: dat,
            hash: ''
        })
    }

});