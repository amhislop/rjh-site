// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"OMwT":[function(require,module,exports) {
var define;
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* breakpoints.js v1.0 | @ajlkn | MIT licensed */
var breakpoints = function () {
  "use strict";

  function e(e) {
    t.init(e);
  }

  var t = {
    list: null,
    media: {},
    events: [],
    init: function init(e) {
      t.list = e, window.addEventListener("resize", t.poll), window.addEventListener("orientationchange", t.poll), window.addEventListener("load", t.poll), window.addEventListener("fullscreenchange", t.poll);
    },
    active: function active(e) {
      var n, a, s, i, r, d, c;

      if (!(e in t.media)) {
        if (">=" == e.substr(0, 2) ? (a = "gte", n = e.substr(2)) : "<=" == e.substr(0, 2) ? (a = "lte", n = e.substr(2)) : ">" == e.substr(0, 1) ? (a = "gt", n = e.substr(1)) : "<" == e.substr(0, 1) ? (a = "lt", n = e.substr(1)) : "!" == e.substr(0, 1) ? (a = "not", n = e.substr(1)) : (a = "eq", n = e), n && n in t.list) if (i = t.list[n], Array.isArray(i)) {
          if (r = parseInt(i[0]), d = parseInt(i[1]), isNaN(r)) {
            if (isNaN(d)) return;
            c = i[1].substr(String(d).length);
          } else c = i[0].substr(String(r).length);

          if (isNaN(r)) switch (a) {
            case "gte":
              s = "screen";
              break;

            case "lte":
              s = "screen and (max-width: " + d + c + ")";
              break;

            case "gt":
              s = "screen and (min-width: " + (d + 1) + c + ")";
              break;

            case "lt":
              s = "screen and (max-width: -1px)";
              break;

            case "not":
              s = "screen and (min-width: " + (d + 1) + c + ")";
              break;

            default:
              s = "screen and (max-width: " + d + c + ")";
          } else if (isNaN(d)) switch (a) {
            case "gte":
              s = "screen and (min-width: " + r + c + ")";
              break;

            case "lte":
              s = "screen";
              break;

            case "gt":
              s = "screen and (max-width: -1px)";
              break;

            case "lt":
              s = "screen and (max-width: " + (r - 1) + c + ")";
              break;

            case "not":
              s = "screen and (max-width: " + (r - 1) + c + ")";
              break;

            default:
              s = "screen and (min-width: " + r + c + ")";
          } else switch (a) {
            case "gte":
              s = "screen and (min-width: " + r + c + ")";
              break;

            case "lte":
              s = "screen and (max-width: " + d + c + ")";
              break;

            case "gt":
              s = "screen and (min-width: " + (d + 1) + c + ")";
              break;

            case "lt":
              s = "screen and (max-width: " + (r - 1) + c + ")";
              break;

            case "not":
              s = "screen and (max-width: " + (r - 1) + c + "), screen and (min-width: " + (d + 1) + c + ")";
              break;

            default:
              s = "screen and (min-width: " + r + c + ") and (max-width: " + d + c + ")";
          }
        } else s = "(" == i.charAt(0) ? "screen and " + i : i;
        t.media[e] = !!s && s;
      }

      return t.media[e] !== !1 && window.matchMedia(t.media[e]).matches;
    },
    on: function on(e, n) {
      t.events.push({
        query: e,
        handler: n,
        state: !1
      }), t.active(e) && n();
    },
    poll: function poll() {
      var e, n;

      for (e = 0; e < t.events.length; e++) {
        n = t.events[e], t.active(n.query) ? n.state || (n.state = !0, n.handler()) : n.state && (n.state = !1);
      }
    }
  };
  return e._ = t, e.on = function (e, n) {
    t.on(e, n);
  }, e.active = function (e) {
    return t.active(e);
  }, e;
}();

!function (e, t) {
  "function" == typeof define && define.amd ? define([], t) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = t() : e.breakpoints = t();
}(this, function () {
  return breakpoints;
});
},{}],"B3ra":[function(require,module,exports) {
var define;
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* browser.js v1.0 | @ajlkn | MIT licensed */
var browser = function () {
  var e = {
    name: null,
    version: null,
    os: null,
    osVersion: null,
    touch: null,
    mobile: null,
    _canUse: null,
    canUse: function canUse(n) {
      e._canUse || (e._canUse = document.createElement('div'));
      var o = e._canUse.style,
          r = n.charAt(0).toUpperCase() + n.slice(1);
      return n in o || 'Moz' + r in o || 'Webkit' + r in o || 'O' + r in o || 'ms' + r in o;
    },
    init: function init() {
      var n,
          o,
          r,
          i,
          t = navigator.userAgent;

      for (n = 'other', o = 0, r = [['firefox', /Firefox\/([0-9\.]+)/], ['bb', /BlackBerry.+Version\/([0-9\.]+)/], ['bb', /BB[0-9]+.+Version\/([0-9\.]+)/], ['opera', /OPR\/([0-9\.]+)/], ['opera', /Opera\/([0-9\.]+)/], ['edge', /Edge\/([0-9\.]+)/], ['safari', /Version\/([0-9\.]+).+Safari/], ['chrome', /Chrome\/([0-9\.]+)/], ['ie', /MSIE ([0-9]+)/], ['ie', /Trident\/.+rv:([0-9]+)/]], i = 0; i < r.length; i++) {
        if (t.match(r[i][1])) {
          n = r[i][0], o = parseFloat(RegExp.$1);
          break;
        }
      }

      for (e.name = n, e.version = o, n = 'other', o = 0, r = [['ios', /([0-9_]+) like Mac OS X/, function (e) {
        return e.replace('_', '.').replace('_', '');
      }], ['ios', /CPU like Mac OS X/, function (e) {
        return 0;
      }], ['wp', /Windows Phone ([0-9\.]+)/, null], ['android', /Android ([0-9\.]+)/, null], ['mac', /Macintosh.+Mac OS X ([0-9_]+)/, function (e) {
        return e.replace('_', '.').replace('_', '');
      }], ['windows', /Windows NT ([0-9\.]+)/, null], ['bb', /BlackBerry.+Version\/([0-9\.]+)/, null], ['bb', /BB[0-9]+.+Version\/([0-9\.]+)/, null], ['linux', /Linux/, null], ['bsd', /BSD/, null], ['unix', /X11/, null]], i = 0; i < r.length; i++) {
        if (t.match(r[i][1])) {
          n = r[i][0], o = parseFloat(r[i][2] ? r[i][2](RegExp.$1) : RegExp.$1);
          break;
        }
      }

      e.os = n, e.osVersion = o, e.touch = 'wp' == e.os ? navigator.msMaxTouchPoints > 0 : !!('ontouchstart' in window), e.mobile = 'wp' == e.os || 'android' == e.os || 'ios' == e.os || 'bb' == e.os;
    }
  };
  return e.init(), e;
}();

!function (e, n) {
  typeof define == 'function' && define.amd ? define([], n) : (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == 'object' ? module.exports = n() : e.browser = n();
}(this, function () {
  return browser;
});
},{}],"GYmZ":[function(require,module,exports) {
/* Adapted from Strata by HTML5 UP */
var breakpoints = require('./breakpoints.min.js');

var browser = require('./browser.min.js');

var version = 1.0;

(function () {
  console.log("Version: ".concat(version));
  var header = document.getElementById('header');
  var footer = document.getElementById('footer');
  var main = document.getElementById('main');
  var settings = {
    // Parallax background effect?
    parallax: true,
    // Parallax factor (lower = more intense, higher = less intense).
    parallaxFactor: 20
  }; // Breakpoints.

  breakpoints({
    xlarge: ['1281px', '1800px'],
    large: ['981px', '1280px'],
    medium: ['737px', '980px'],
    small: ['481px', '736px'],
    xsmall: [null, '480px']
  }); // Play initial animations on page load.

  window.addEventListener('DOMContentLoaded', function () {
    window.setTimeout(function () {
      document.body.classList.remove('is-preload');
    }, 100);
  }); // Touch?

  if (browser.mobile) {
    // Turn on touch mode.
    document.body.classList.add('is-touch'); // Height fix (mostly for iOS).

    window.setTimeout(function () {
      window.scrollTo(0, window.pageYOffest + 1);
    }, 0);
  } // Footer.


  breakpoints.on('<=medium', function () {
    document.body.insertBefore(footer, main.nextElementSibling);
  });
  breakpoints.on('>medium', function () {
    header.insertBefore(footer, header.lastElementChild.nextElementSibling);
  }); // Header.
  // Parallax background.
  // Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).

  if (browser.name === 'ie' || browser.mobile) settings.parallax = false;

  if (settings.parallax) {
    var strataParallax = function strataParallax() {
      header.style.backgroundPosition = "left ".concat(-1 * (parseInt(window.pageYOffset) / settings.parallaxFactor), "px");
    };

    breakpoints.on('<=medium', function () {
      window.removeEventListener('scroll', strataParallax, false);
      header.style.backgroundPosition = null;
    });
    breakpoints.on('>medium', function () {
      header.style.backgroundPosition = 'left 0px';
      window.addEventListener('scroll', strataParallax);
    });
  }
})();
},{"./breakpoints.min.js":"OMwT","./browser.min.js":"B3ra"}]},{},["GYmZ"], null)