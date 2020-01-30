
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
                    console.warn("fetching");
                    this.clearURL(val);
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