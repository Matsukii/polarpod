
let get;
let app = new Vue({
    el:'#polar',
    data:{
        apiLink: `https://${window.location.host}/apis/cleanfb?u=`,
        dataIn: '',
        dataInCut:'',
        dataOut: '',
        dataLabel:'Link to clear',
        showRaw: false,
        useApiFetch: false,
        urlPattern: new RegExp('(http||https):\/\/[0-9a-zA-Z]*.'),
        res:{
            original:'',
            clean:'',
            timestamp: Date.now(),
        }
    },
    watch:{
        dataIn(val){
            if(this.urlPattern.test(val)){
                if(get){clearTimeout(get)}
                get = setTimeout(() => {
                    if(this.useApiFetch){
                        console.warn("fetching");
                        this.clearURL(val);
                    }
                    else {
                        this.clearURLLocal(val).then(v => {
                            this.dataOut = v;
                            
                        })
                    }
                }, 500);
            }
            else{
                if(get){clearTimeout(get)}
            }
            if(val.length > 20){
                this.dataInCut = `${this.dataIn.slice(0, 30)}...`
            }
        }
    },
    methods:{
        clearURLLocal: async function(url){
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
        },
        clearURL: async function(url){
            fetch(`/apis/cleanfb?u=${url}`, {
                method: 'GET'
            }).then(r => r.json()).then(r => {
                app.res = r;
                this.dataOut = r.clean;
                console.log(r);
            })
        }
    }
});