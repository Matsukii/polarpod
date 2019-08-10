let oglist = [{url: 'null', data: `null`}]

const saveOg = (url, data) => {
    oglist.push({url: url, data: data})
    console.log("saved");
    return true
}

const getOg = (url) => {
    let u;
    // oglist.forEach(el => {

    // })
}

module.exports = (url, data = '') => {
    let reqOg;
    // console.log(oglist);
    console.log(oglist.length);

    // oglist.push({url: url, data: data})

    oglist.forEach((el, i) => {
        console.log(`index: ${i}`);
        if(el.url != undefined && el.url == url){
            // console.log(el);
            // console.log("aaaa");
            return el
        }
        else{
            // console.log(el);
            if(el.url != url && oglist.length == i){

                elm = saveOg(url, data);
                console.log(`element: ${elm}`);
                return elm;
            }
        }
    })
}