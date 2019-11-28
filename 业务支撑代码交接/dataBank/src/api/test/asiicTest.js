/**
 * Created by jishan.fan on 2016/6/17.
 */
var userName = 'weiqiang.yu';
var pwd = 'yu941103'
//var code = '';
//var encrypStr = '';
//for (var i = 0; i < userName.length; i++) {
//    var code = userName.charCodeAt(i);
//    //console.log(code)
//    encrypStr += String.fromCharCode(parseInt(code, 16).toString(16))
//}
//console.log(encrypStr)
//var code =

var simpleEncode = function (str) {
    var resultString = '';
    for (var i = 0; i < 3; i++) {

        str = gridEncode(str);
        //var reStr=reGridEncode(str);
        console.log('----加密--'+str);
    }
    var restr = reserveStr(str);
    //console.log(restr);
    for(var j=0;j<restr.length;j++){
        //console.log('---'+restr.charCodeAt(j));
        var temp =restr.charCodeAt(j)-1;
        //console.log(temp)
        var encrypTemp = String.fromCharCode((parseInt(temp, 10)).toString(10));
        //console.log(encrypTemp);
        resultString += encrypTemp
    }
    return resultString;
}

var reSimpleEncode = function(str){

    var resultString='';
    var tempStr='';
    for(var i=0;i<str.length;i++){
        var temp =str.charCodeAt(i)+1;
        //console.log(str[i]);
        var encrypTemp = String.fromCharCode((parseInt(temp, 10)).toString(10));
        //console.log(encrypTemp);
        tempStr += encrypTemp
    }
    console.log(tempStr);
    console.log(str);
    resultString = reserveStr(tempStr);
    console.log(resultString);
    for (var i = 0; i < 3; i++) {

        resultString = reGridEncode(resultString);
        console.log('--解密--'+resultString);
        //var reStr=reGridEncode(str);
    }
    return resultString;
}

var gridEncode = function (str) {
    var tem1 = '';
    var tem2 = '';
    var tem3 = '';
    for (var i = 0; i < str.length; i++) {
        if (i % 3 == 0) {
            tem1 += str[i];
        }
        else if (i % 3 == 1) {
            tem2 += str[i];
        }
        else if (i % 3 == 2) {
            tem3 += str[i];
        }
    }
    //console.log('----'+tem1 + tem2 + tem3)
    return  tem1 + tem2 + tem3;
}

var reGridEncode = function(str){
    var reArr =[];
    var temp1 =[];
    var temp2=[];
    var temp3=[];
    var loopCount = parseInt(str.length/3);
    for(var i=0;i<str.length;i++){
            if (i <= loopCount) {
                temp1.push(str[i]);
            } else if (i >= loopCount + 1 && i <= 2 * loopCount + 1) {
                temp2.push(str[i]);
            } else if (i > 2 * loopCount + 1 && i < str.length) {
                temp3.push(str[i]);
            }
    }
    var reStr='';
    console.log(temp1);
    console.log(temp2);
    console.log(temp3);
    for(var i=0;i<temp1.length;i++){
        if(temp1[i] != undefined){
            reStr +=temp1[i]
        }
        if(temp2[i] != undefined){
            reStr +=temp2[i]
        }
        if(temp3[i] != undefined){
            reStr +=temp3[i]
        }
    }
    return reStr;
}
var reserveStr = function(str) {
    var arr = str.split("");
    arr.reverse();
    return arr.join("");
}

//var reSimpleEncode = function(str){}

//console.info('UserName:'+simpleEncode(userName));
//console.info('Password:'+simpleEncode(userName+pwd));
//console.log(parseInt(16/3));
console.info('reUserName:'+reSimpleEncode(simpleEncode(userName)));
console.info('rePassword:'+reSimpleEncode(simpleEncode(userName+pwd)));