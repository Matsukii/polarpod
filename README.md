# Polarpod

<img src="http://polarpod.herokuapp.com/logo/POLARPOD.svg" width="500px">

Polarpod is a set of useful APIs for data extraction and processing, with a little focus to be an alternative to paid services but for use in smaller projects. Is based on Node.js public avaliable modules.

(caution, the next part may contain THE100 spoilers!) <br>
The name came from "Polaris", "Escape-pod" and a a bit of 'south/north pole signs', Polaris is a space station from THE100 series.

## We also have a chrome extension (in development)!!
### Check it out: [Polarpod-extension](https://github.com/matsukii/polarpod-extension)


## this API uses

* open-graph-crapper
* word filter [only english support up to now]
* atob and btoa base64
* express
* js-video-url-parser
* qrcode-svg
* object-hash
* js-sha256

## Inside but not in use

* metafetch [unused, secondary]
* nano-memoize [unused]
* mysql

# General usage

## Facebook Url 'cleaner'

Extract original url from facebook links before redirect (any click redrects to facebook(dot)com/l.php, this extract)

### Page
```http
https://polarpod.herokuapp.com/cleanfb?url=[URL]
```

### API
```http
https://polarpod.herokuapp.com/apis/cleanfb?u=[URL]
```
OR with redirect after extract original url
```http
https://polarpod.herokuapp.com/apis/cleanfb/redirect?u=[URL]
```

parameters:

* u: url

response:

* json

## Og tag getter

### Page
``` http
https://polarpod.herokuapp.com/ogtags?url=[URL]
```


### API
``` http
https://polarpod.herokuapp.com/apis/ogtags?u=[URL]&enc=[true|false]
```

parameters:

* u: url
* enc: (optional) if the url is encoded or not. flag not mandatory even if is encoded

response:

* json


## SHA1/MD5/SHA256/SHA224 hashes

```http
https://polarpod.herokuapp.com/apis/hash/[sha1|md5|sha256|sha224]?d=[data]
```

### Raw hash - ONLY FOR SHA256 and SHA224 (temporarily)

```http
https://polarpod.herokuapp.com/apis/hash/rar/[sha256|sha224]?d=[data]
```

parameters

* d: data
* ...apis/hash/[algorithm]: hash algorithm

responses

* json
* text (if algorithm is missing)

example

```http
https://polarpod.herokuapp.com/apis/hash/sha256?d=test
```

```http
https://polarpod.herokuapp.com/apis/hash/raw/sha256?d=test
```

### Warning(known issue that will not be corrected soon): MD5 and SHA1 - do not expect the same hash from given text to be equal to other hash generators

## SVG QR Code generator

```http
https://polarpod.herokuapp.com/apis/qr?u=[URL]&d=[true|false]&w=[width]&c=[color]&bg=[background]
```

parameters:

* u: data
* d: dark/light [true|false] (if true generates a lighet qr)
* w: width
* c: HEX color **(without the #)** _default colors: for dark themes=#CCCCCC and light=#222222_
* bg: background color in HEX **(without the #)** _default is transparent_
*if any param was send, a message will be showed*

response:

* SVG document

### SVG file return

_same as above just add /file, the code will be saved and avaliable at ... .com/code.svg_

**this is for a specific use case that i needed**

```http
https://polarpod.herokuapp.com/apis/qr/file?u=[URL]&d=[true|false]&w=[width]&c=[color]&bg=[background]
```

## Video URL parser

### Page
``` http
http://polarpod.herokuapp.com/video/meta?url=[URL]
```

### API
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

## hasher

```json
  {
    "status":200,
    "success":true,
    "algorithm":"sha256",
    "original":"test",
    "date":"Fri, 25 Oct 2019 03:30:52 GMT",
    "hash":"9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
  }

```


## facebook url 'cleaner'

```json
  {
    "original":"some link copied from fb",
    "clean":"extracted",
    "timestamp":1580420810267,
    "success":true
  }
```

## Modules credits

[qrcode-svg by papnkukn](https://github.com/papnkukn/qrcode-svg)

[bad-words  by web-mech](https://github.com/web-mech/badwords)

[jsVideoUrlParser by Zod-](https://github.com/Zod-/jsVideoUrlParser)

[openGraphScraper by jshemas](https://github.com/jshemas/openGraphScraper)

[metafetch by brahma-dev](https://github.com/brahma-dev/metafetch)

[object-hash by puleos](https://github.com/puleos/object-hash)

[js-sha256 by emn178](https://github.com/emn178/js-sha256)

## LICENSE

* MIT
