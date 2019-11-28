/**
 * Created by linlin.zhang on 2018/2/23/023.
 */

//
var system = require('system');
var page = require('webpage').create();
var url = system.args[1];
var name = system.args[2];

console.log("open " + url + " to " + name);
page.viewportSize = { width: 1024, height: 600 };
page.open(url, function() {
    var bb = page.evaluate(function () { 
        return document.getElementsByTagName('html')[0].getBoundingClientRect(); 
      });
	   page.clipRect = {
        top:    bb.top,
        left:   bb.left,
        width:  bb.width,
        height: bb.height
      };
});
 page.onLoadFinished = function() {
	 window.setTimeout(function () {
        page.render(name);
        phantom.exit();
      }, 3000);
 };

 
 