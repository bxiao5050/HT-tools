// IE9及以下添加classList支持
if (!("classList" in document.documentElement)) {
  Object.defineProperty(HTMLElement.prototype, 'classList', {
    get: function () {
      var self = this;
      function update(fn) {
        return function (value) {
          var classes = self.className.split(/\s+/g),
            index = classes.indexOf(value);

          fn(classes, index, value);
          self.className = classes.join(" ");
        }
      }

      return {
        add: update(function (classes, index, value) {
          if (!~index) classes.push(value);
        }),

        remove: update(function (classes, index) {
          if (~index) classes.splice(index, 1);
        }),

        toggle: update(function (classes, index, value) {
          if (~index)
            classes.splice(index, 1);
          else
            classes.push(value);
        }),

        contains: function (value) {
          return !!~self.className.split(/\s+/g).indexOf(value);
        },

        item: function (i) {
          return self.className.split(/\s+/g)[i] || null;
        }
      };
    }
  });
}

// IE9及以下console支持  (无效果，推测是错误出现得太早了，在主文件加载前)
//兼容IE8的无console问题
if (!window.console) {
  window._console = window.console;//将原始console对象缓存
  alert('修改console')
  window.console = (function (orgConsole) {
    var consoleObj = {};//最终被替换的console对象
    var consoleFnArr = ["log", "debug", "info", "warn", "exception", "assert",
      "dir", "dirxml", "trace", "group", "groupCollapsed", "groupEnd", "profile",
      "profileEnd", "count", "clear", "time", "timeEnd", "timeStamp", "table",
      "error", "memory", "markTimeline", "timeline", "timelineEnd"];
    $.each(consoleFnArr, function (i, n) {
      consoleObj[n] = function actionConsole() {
        if (typeof (orgConsole) !== "object") return;//IE8不开控制台时console为undefined
        if (typeof (orgConsole[n]) === "function") {//调用标准浏览器内部console函数
          return orgConsole[n].apply(orgConsole, Array.prototype.slice.call(arguments));
        } else {
          //IE8下开启控制台时且console.log可用的情况下，执行typeof console.log返回"object"而不是"function"
          try {
            return orgConsole[n].apply(orgConsole, Array.prototype.slice.call(arguments));
          } catch (ex) {
            return null;
          }
        }
      };
    });
    return consoleObj;
  }(window._console));
}