
let get;
let app = new Vue({
    el:'#polar',
    data:{
        dataIn: '',
        dataLabel: 'Video URL',
        showRaw: false,
        urlPattern: new RegExp('(http||https):\/\/[0-9a-zA-Z]*.'),
        res:{
            id:"",
            mediaType:"",
            provider:"",
            thumb:""
        }
    },
    created(){
        if(window.location.search){
            setTimeout(()=>{
                let url = new URL(window.location.href).searchParams.get('url');
                this.getVideoMeta(url)
                this.dataIn = url
            }, 100);
            
        }
    },
    watch:{
        dataIn(val){
            if(this.urlPattern.test(val)){
                if(get){clearTimeout(get)}
                get = setTimeout(() => {
                    console.warn("fetching");
                    this.getVideoMeta(val);
                }, 500);
            }
            else{
                if(get){clearTimeout(get)}

            }
        }
    },
    methods:{
        getVideoMeta: async function(url){
            fetch(`/apis/video/meta?u=${url}`, {
                method: 'GET'
            }).then(r => r.json()).then(r => {
                app.res = r;
                console.log(r);
            })
        }
    }
});