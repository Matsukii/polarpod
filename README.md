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
https://open-toolkit-api-tolls.herokuapp.com/apis/ogtags?u=[URL]<br><br>

parameters:<br>
* u: url<br>

response:<br>
* json

### see samples file or below

 
## SVG QR Code generator
https://open-toolkit-api-tolls.herokuapp.com/apis/qr?u=[URL]&d=[true]/[false]&w=[width]&c=[color]&bg=[background]<br><br>
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
http://opentk-apis.herokuapp.com/apis/vidurl?u=[URL]<br>
params:<br>
* u: video url

response:<br>
* json

## Bad-word message filter
https://open-toolkit-api-tolls.herokuapp.com/apis/filter?msg=[message_to_filter]<br><br>
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


# Modules credits
[qrcode-svg by papnkukn](https://github.com/papnkukn/qrcode-svg)<br>
[bad-words  by web-mech](https://github.com/web-mech/badwords)<br>
[jsVideoUrlParser by Zod-](https://github.com/Zod-/jsVideoUrlParser)<br>
[openGraphScraper by jshemas](https://github.com/jshemas/openGraphScraper)<br>
[metafetch by brahma-dev](https://github.com/brahma-dev/metafetch)<br>


# LICENSE
* MIT



