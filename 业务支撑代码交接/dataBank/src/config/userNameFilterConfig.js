//jishan.fan,roy.xu,yuru.chen,jing,kenny,robert,ben,ada.jing,linlin.zhang
var menuFilter = [{
    menu_id:201,
    userName:['linlin.zhang','eva','roy.xu','yuru.chen','jing','kenny','robert','ben','ada.jing'],
    to:'app.oas5MinData'
},{
    menu_id:202,
    userName:['linlin.zhang','eva','roy.xu','yuru.chen','jing','kenny','robert','ben','ada.jing'],
    to:'app.fiveForcesModel'
},{
    menu_id:207,
    userName:['linlin.zhang','eva','roy.xu','yuru.chen','jing','kenny','robert','ben','ada.jing'],
    to:'app.loginRate'
}];
var getMenu = function(menu,userName){
    var returnMenu = menu;
    menuFilter.forEach(function(menuFilt){
        if(menuFilt.menu_id == menu.menu_id) {
            menuFilt.userName.forEach(function (user) {
                if (user == userName) {
                    returnMenu.menu_url = menuFilt.to;
                    return false;
                }
            });
            return false;
        }
    });
    if(returnMenu.children){
        returnMenu.children.forEach(function(subMenu){
            getMenu(subMenu,userName);
        });
    }
}
module.exports = {
    getMenu:getMenu
};