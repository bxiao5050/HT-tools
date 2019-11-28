export default (options) => {
  let
    body = document.body,
    scrollArr = [],
    goScroll = event => {
      let len = scrollArr.length,
        o,
        e = event || window.event;
      e.preventDefault ? e.preventDefault() : e.returnValue = false;
      while (len--) {
        o = new Function('return ' + scrollArr[len])();
        if (isValid()) {
          runScroll(e);
        }
      }
    },
    runScroll = function(e) {
      _t = this;
      delta = {
        X: e.clientX - start['X'],
        Y: e.clientY - start['Y']
      }
      _top = nowTop + delta['Y'];
      pull();
    },
    isValidDrag = false,
    isValid = function() {
      return isValidDrag;
    },
    wheelScroll = function(event, target, direct) {
      var isFromScroll = false,
        thisScroll,
        o = target,
        e = event;

      while (o.tagName.toUpperCase() !== 'BODY') {
        thisScroll = o.getAttribute('id') === options.contain;
        if (thisScroll) {
          isFromScroll = true;
          break;
        } else {
          o = o.parentNode;
        }
      }
      if (!isFromScroll) return;

      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
      wheelMove((function() {
        return direct < 0 ? -1 : 1;
      })())
    },
    _t,
    cssCore = function(testCss) {
      switch (true) {
        case testCss.webkitTransition === '':
          return 'webkit';
        case testCss['MozTransition'] === '':
          return 'Moz';
        case testCss['msTransition'] === '':
          return 'ms';
        case testCss['OTransition'] === '':
          return 'O';
        default:
          return '';
      }
    }(document.createElement('ComicView').style),
    translate = function() {
      if (cssCore !== '') {
        return function(o, x, y) {
          o[cssCore + 'Transform'] = 'translate(' + x + 'px,' + y + 'px) translateZ(0)';
        }
      } else {
        return function(o, x, y) {
          o.left = x + 'px';
          o.top = y + 'px';
        }
      }
    }(),
    addClass = function(o, cls) {
      var oN = o.className;

      if (oN.indexOf(cls) === -1) {
        o.className = oN + ' ' + cls;
      }
    },
    removeClass = function(o, cls) {
      var oN = o.className,
        arrName,
        arrNow;

      if (oN.indexOf(cls) === -1) return;
      arrName = oN.split(' ');
      arrNow = arrName.length;
      while (arrNow--) {
        if (arrName[arrNow] === cls) {
          arrName.splice(arrNow, 1);
        }
      }
      o.className = arrName.join(' ');
    },
    $$ = function(s) {
      return document.getElementById(s);
    },
    c = $$(options.contain),
    w = $$(options.wrap),
    sb = $$(options.scrollBg),
    sk = $$(options.scrollBlock),
    fd = options.factHeightDiff || 0,
    fh = options.scrollBarHeightDiff || 0,
    fx = options.heightFix || 0,
    H = c.offsetHeight,
    cs = c.style,
    bs = sk.style,
    ws = w.style,
    gs = sb.style,
    start = {},
    delta = {},
    nowTop = 0,
    o = w,
    max, h, S, s, _top, _thisScroll,
    pull = function() {
      if (_top < 0) {
        _top = 0
      } else if (_top > max) {
        _top = max;
      }
      try {
        bs.top = _top + 'px';
        translate(cs, 0, (_top / max * (h - H)) >> 0);
      } catch (e) {

      }
    },
    wheelMove = function(dir) {
      _top = nowTop + ~~(s * .1) * dir;
      pull();
      nowTop = _top;
    },
    reStart = function() {
      isValidDrag = false;
      removeClass(sb, 'scroll-scrolling');
      addClass(c, 'moved');
      if (!delta['Y']) return;
      nowTop = _top;
    }

  cs.position = 'absolute';
  if (o.tagName.toUpperCase() !== 'BODY') {
    _thisScroll = o.getAttribute('id') === options.wrap;
    if (_thisScroll) {
      scrollArr.push(_thisScroll);
    } else {
      o = o.parentNode;
    }
  }
  sk.onmousedown = function(e) {
    isValidDrag = true;
    body.onmousemove = goScroll;
    addClass(sb, 'scroll-scrolling');
    removeClass(c, 'moved');
    var e_ = e || window.event;
    start = {
      X: e_['clientX'],
      Y: e_['clientY'],
      time: +new Date
    }
    delta = {};
  }
  sb.onmousedown = function(e) {
    var e_ = e || window.event;
    if ((e_.target || e_.srcElement) === sk) return;
    _top = e_['offsetY'] < nowTop ? nowTop - (s * .7) >> 0 :
      nowTop + (s * .7) >> 0;
    pull();
    nowTop = _top;
  }
  body.onmouseup = function() {
    body.onmousemove = null;
    if (_t) {
      reStart();
    }
  }

  require(__LIBS__ + '/functions').mouseWheel(function(event, target, direct) {
    wheelScroll(event, target, direct)
  })

  // if (window.addEventListener) {
  //     document.addEventListener('DOMMouseScroll', wheelScroll, false);
  // }
  // window.onmousewheel = document.onmousewheel = wheelScroll;


  return {
    init: function(width, height) {
      H = c.offsetHeight || H;
      h = fx ? fx : height - fd;
      h = H - 1 < h ? H : h;
      S = h - fh;
      s = h / H * S;
      s = s > S ? S + 1 : s;
      ws.width = c.offsetWidth + 'px';
      ws.height = h + 'px';
      try {
        gs.height = S + 'px';
        bs.height = s + 'px';
      } catch (e) {}
      if (H === h) {
        gs.display = 'none';
      } else {
        gs.display = 'block';
      }
      max = ~~(S - s + 1);
      setTimeout(function() {
        pull();
      }, 0);
    },
    set: function(p) {
      _top = ((S - s) * p);
      pull();
      nowTop = _top;
    },
    nowTop: function() {
      return nowTop;
    }
  }
}