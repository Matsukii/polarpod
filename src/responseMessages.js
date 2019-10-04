/**
 * @description returned messages if any parameter is sended,
 * later should be converted to html and send file instead
 */
module.exports = {
    qrNoParams: `<title>qr gen API - Please send the params!</title> Please send params:<br> (need url/data at least)<br> corection level = M, padding = 1 (unavaliable to set)<br> u: url<br> d: dark (color = #cccccc, overrides color and bg param)<br> w: width and height<br> c: color (HEX, without the '#'), the default is #222222 and #CCCCCC<br> bg: background color (HEX, without the '#'), the default is transparent`,
    filterNoMessage: 'No message given <br>use ?msg=(your_message_here)',

};
