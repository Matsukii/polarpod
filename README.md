# PolarPod

A set of useful apis

## this API uses

* open-graph-crapper
* word filter [only english support up to now]
* atob and btoa base64
* express
* js-video-url-parser
* qrcode-svg

## Inside but not in use

* metafetch [unused, secondary]
* nano-memoize [unused]
* mysql

# General usage

## Og tag getter

``` http
https://polarpod.herokuapp.com/apis/ogtags?u=[URL]
```

parameters:

* u: url

response:

* json

### see samples file or below

## SVG QR Code generator

``` http
https://polarpod.herokuapp.com/apis/qr?u=[URL]&d=[true]/[false]&w=[width]&c=[color]&bg=[background]
```

parameters:

* u: data
* d: dark/light [true/false] (if true generates a lighet qr)
* w: width
* c: HEX color **(without the #)** _default colors: for dark themes=#CCCCCC and light=#222222_
* bg: background color in HEX **(without the #)** _default is transparent_
*if any param was send, a message will be showed*

response:

* SVG document

## Video URL parser

``` http
http://polarpod.herokuapp.com/apis/video/meta?u=[URL]
```

params:

* u: video url

response:

* json

## Video thumbnail

**same as video url parser, but with different response and url**

``` http
http://polarpod.herokuapp.com/apis/video/thumb?u=[URL]
```

supported platforms

* youtube
* vimeo

params:

* u: video url

response:

* json

## Bad-word message filter

``` http
https://polarpod.herokuapp.com/apis/filter?msg=[message_to_filter]
```

params:

* msg: message

response:

* json

# responses

## og tags response sample

``` json
  {
    "name": "GitHub",
    "title": "Build software better, together",
    "desc": "description...",
    "type": "",
    "url": "https://github.com",
    "img": "https://github.githubassets.com/images/modules/open_graph/github-logo.png"
  }
```

## video url parser

_thumbnails is currently avaliable for youtube and vimeo only_
_for youtube, maxresdefault will be retuned if avaliable, else will return '0.jpg', the same as hqdefault.jpg_
_for vimeo thumbails the image size '_640' is replaced by '_1920'_

``` json
  {
    "id": "jYCGSuNDy4M",
    "mediaType": "video",
    "provider": "youtube",
    "thumb":"https://img.youtube.com/vi/jYCGSuNDy4M/maxresdefault.jpg"
  },

 {
    "id": "76979871",
    "mediaType": "video",
    "provider": "vimeo",
    "thumb":"https://i.vimeocdn.com/video/452001751_1920.jpg",
    "thumbOriginal":"https://i.vimeocdn.com/video/452001751_640.jpg"
  },
```

## bad-word filter

``` json
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
