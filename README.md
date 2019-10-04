# PolarPod
A set of useful apis 


# this API uses:
* open-graph-crapper
* word filter [only english support up to now] 
* atob and btoa base64 
* express
* js-video-url-parser

* qrcode-svg

## Inside but not in use:
* metafetch [unused, secondary]
* nano-memoize [unused]
* mysql


# General usage

## Og tag getter

``` 
https://polarpod.herokuapp.com/apis/ogtags?u=[URL]
``` 

parameters:<br>
* u: url<br>

response:<br>
* json

### see samples file or below

 
## SVG QR Code generator

``` 
https://polarpod.herokuapp.com/apis/qr?u=[URL]&d=[true]/[false]&w=[width]&c=[color]&bg=[background]
``` 

parameters:<br>
* u: data<br>
* d: dark/light [true/false] (if true generates a lighet qr)<br>
* w: width<br>
* c: HEX color **(without the #)** _default colors: for dark themes=#CCCCCC and light=#222222_<br>
* bg: background color in HEX **(without the #)** _default is transparent_
*if any param was send, a message will be showed*

response:<br>
* SVG document


## Video URL parser

``` 
http://polarpod.herokuapp.com/apis/vidurl?u=[URL]
``` 

params:<br>
* u: video url

response:<br>
* json

## Bad-word message filter

``` 
https://polarpod.herokuapp.com/apis/filter?msg=[message_to_filter]
``` 

params:<br>
* msg: message

response:<br>
* json


# responses

## og tags response sample:<br>
```
  {
    "name": "GitHub",
    "title": "Build software better, together",
    "desc": "description...",
    "type": "",
    "url": "https://github.com",
    "img": "https://github.githubassets.com/images/modules/open_graph/github-logo.png"
  }
```

## video url parser:<br>
```
  {
    "id": "jYCGSuNDy4M",
    "mediaType": "video",
    "provider": "youtube"
  }
```
## bad-word filter:<br>
```
  {
    "msg":"****"
  }
```

## Modules credits

[qrcode-svg by papnkukn](https://github.com/papnkukn/qrcode-svg)

[bad-words  by web-mech](https://github.com/web-mech/badwords)

[jsVideoUrlParser by Zod-](https://github.com/Zod-/jsVideoUrlParser)

[openGraphScraper by jshemas](https://github.com/jshemas/openGraphScraper)

[metafetch by brahma-dev](https://github.com/brahma-dev/metafetch)

## LICENSE

* MIT
  
