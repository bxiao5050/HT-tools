/**
 * Created by linlin.zhang on 2017/2/10.
 */
var mailer = require("nodemailer");
var reportData = require('./reportMapData');
var when = require('when');
var fs = require("fs");
var ejs = require('ejs');
var arrayUtil = require("../perm/ArrayUtil");
var moment = require("moment");
var webshot = require('webshot');
var userList = 
     ['PGM<PGM@7road.com>',
 'OOG<OOG@7road.com>',
 '余科立<kenny@9266.com>',
 '叶远<snail@9266.com>',
 '封谨<michael@9266.com>',
 '刘涛<robert.liu@9266.com>',
 '刘子靖<jing@9266.com>',
 '王松涛<xiaoyi@9266.com>',
 '张林林<linlin.zhang@7road.com>'];
var master = {
    userName:'jessie@7road.com',
    password:'a123456!'
}
var getUserList = function() {
    return mailer.createTransport({
        host: 'mail.7road.com',
        port: 25,
        secure: false,
        auth: {
            user: master.userName,
            pass: master.password
        }
    });
};
var options = {
    siteType:'html',
    quality:120,
    screenSize: {
        width: 1248
        , height: 480
    },
    shotSize: {
        width: 1248,
        height: 'all'
    }
}

var baseDir = 'src/../public/oasDownExcel/image/';
var template = fs.readFileSync('./src/mail/emailTemplate.html','utf-8')
var reportApp = [41,43,36,38,24,19,33,34];
var _ph, _page, _outObj;
var getSendUser = function(count_date){
    var deffed = when.defer();

    reportData.getGameInfo().then(function(data){
        var selectedGame = [];
        data.forEach(function(item){

            if(arrayUtil.contain(reportApp,item.unite_id))
                 selectedGame.push(reportData.getGameData(count_date,item.unite_id,item.area_app_name));
        });
        when.all(selectedGame).then(function(data){
            reportData.getTotalData(count_date,reportApp.join()).then(function (totalData) {
                var html = ejs.render(template,{
                    games:data,
                    totalData:totalData
                }) // html body;
                //D:\\linlin.zhang\\x项目\\手游运营系统\\SVN_Project(2016-08)\\src\\mail\\html\\'+moment().format("YYYY-MM-DD")+'.html
                var htmlFile = baseDir+moment(count_date).format("YYYY-MM-DD")+'.jpeg';
                webshot(html, htmlFile,options, function(err) {
                    if (err) {
                        deffed.reject({
                            state:'failure',
                            error:err
                        })
                    }
                    else deffed.resolve({
                        state:'successed',
                        path:'/oasDownExcel/image/'+count_date+".jpeg"
                    })
                });
            });


        });
    });
    return deffed.promise;

};

var sendMail = function(count_date){
    var deffed = when.defer();
    var result =  {
        from: master.userName,
        to: userList.join(), // list of receivers
        subject: count_date+'投放数据', // Subject line
        text: count_date+'投放数据', // plain text body
        html:'Dear All： <br/><img src="cid:content.data"/><br/><img src="cid:log.img"/>' , // html body
        attachments: [{
            filename: 'image.jpeg',
            path: baseDir+count_date+".jpeg",
            cid: 'content.data' //same cid value as in the html img src
        },{
            filename: 'log.png',
            path: baseDir+'road.png',
            cid: 'log.img' //same cid value as in the html img src
        }]
    };
    getUserList().sendMail(result, function(error, info) {
        if(error)
            deffed.reject("发送失败");
        else
        deffed.resolve("发送成功");
    });
    return deffed.promise;
}

module.exports = {
    getMail:getSendUser,
    sendMail:sendMail
};
