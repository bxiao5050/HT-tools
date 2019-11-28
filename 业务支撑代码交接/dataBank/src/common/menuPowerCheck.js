/**
 * Created by linlin.zhang on 2016/9/6.
 */
var routerMenuConfig = require('./routerConfig');
var str = require('string');
var resDataUtil = require('../utils/resDataUtil');
var redisUtil = require('../utils/redisUtil');
exports.checkedMenuPower =  function (req, res,next){
    var urlPos = req.url.indexOf('?');
    var route = "";
    if(urlPos >= 0) route = str(req.url).left(urlPos).s;
    else route = req.url;
    var menuInfo = routerMenuConfig.getMenuIdByUrl(route);
    var game_id = req.query['game_id'];
   redisUtil.getRedisKey(0,req.sessionID).then(function(perm){
       var isPass = false;

       if(perm){
           perm = JSON.parse(perm);
           perm.forEach(function(sys){
               if(sys.system_id == menuInfo.system_id){
                   if(menuInfo.system_id == 2){
                       if(sys.menus.indexOf(menuInfo.menu_id) > -1) {
                           isPass = true;
                           return false;
                       }
                       else isPass = false;
                   }else{
                       sys.games.forEach(function(game){
                           if(game.game_id == game_id ) {
                               if (game.menus.indexOf(menuInfo.menu_id) > -1) {
                                   isPass = true;
                                   return true;
                               }
                               else isPass = false;
                           }
                       });
                   }
               }
           });
       }
       else{
           isPass = false;
       }
       if(isPass){
           next();
       }else{
           console.error('非法请求path:' + route);
           res.writeHead(403, "NO This request {" + route+"} Access");
           res.end(resDataUtil.accessError('relogin','非法请求！'));
       }
   });

}