/**
 * Created by jishan.fan on 2016/7/13.
 */
"use strict";
var crypto = require('crypto');
var key = new Buffer.from("hlib1234");
var md5 = function (str) {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
}
var encode = function (content) {
    //var key = new Buffer('12345670');
    var iv = new Buffer.from('hlib1234');
    var cipher = crypto.createCipheriv('des-cbc', key,iv);
    cipher.setAutoPadding(true);

    var  bf = cipher.update(content,'utf8','base64');
    bf += cipher.final('base64');
    return bf;
}
var decode = function (content) {
    var iv = new Buffer.from('hlib1234');
    var decipher = crypto.createDecipheriv('des-cbc',key,iv);
    decipher.setAutoPadding(true);
    try {
        var txt =decipher.update(content,'base64','utf8');
        txt += decipher.final('utf8');
        return txt;
    } catch (e) {
        throw Error('decode error:', e.message);
        return null;
    }
};
var crypUtil ={
    md5 : md5,
    encode : encode,
    decode: decode
}

module.exports = crypUtil;
