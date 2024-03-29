var MixpanelLib = function (j, n, m) {
    function k(a, c, b) {
      if (a.length) {
        var e;
        for (e = 0; e < a.length; e++) c.call(b || c, a[e], e)
      } else if (typeof a == "object") for (e in a) Object.hasOwnProperty.call(a, e) && c.call(b || c, a[e], e)
    }
    function z(a, c) {
      a.prototype = new c;
      a.prototype.constructor = a;
      a.superclass = c.prototype;
      return a
    }
    function v(a) {
      if (!a) return !1;
      var c = Object.prototype.toString.call(a);
      return c === "[object Array]" || c === "[object HTMLCollection]" || c === "[object NodeList]" || typeof a.jquery !== "undefined" && typeof a.length !== "undefined" || typeof a.length === "number" && typeof a.item === "function" || typeof a.length === "number" && typeof a.item === "string" || typeof a.length === "number" && typeof a.item === "object"
    }
    function s(a) {
      return typeof a === "object" && !v(a)
    }
    function t(a) {
      var c, b = 0,
        e = [];
      if (a === null || a === void 0) return [];
      try {
        return Array.prototype.slice.call(a, 0)
      } catch (f) {
        if (typeof a.length === "number") for (c = a.length; b < c; b++) e[b] = a[b];
        else for (; a[b] !== void 0;) e[b] = a[b], b++;
        return e
      }
    }
    function A(a) {
      if (!a) return !1;
      return a.charAt(0) === "." || a.charAt(0) === "#"
    }
    function B(a) {
      if (!a) return {
        type: "error",
        query: ""
      };
      var c = a.charAt(0),
        c = c === "." ? "class" : c === "#" ? "id" : "error";
      return {
        type: c,
        query: c === "error" ? "" : a.slice(1)
      }
    }
    function C(a) {
      if (typeof document.getElementsByClassName === "undefined") {
        var c = RegExp("(?:^|\\s)" + a + "(?:$|\\s)"),
          b = document.getElementsByTagName("*"),
          e = [],
          f, g;
        for (g = 0;
        (f = b[g]) != null; g++) {
          var h = f.className;
          h && h.indexOf(a) != -1 && c.test(h) && e.push(f)
        }
        return e
      } else return a = document.getElementsByClassName(a), t(a)
    }
    function D(a) {
      if (typeof a !== "string") return a;
      if (document.getElementById === void 0) {
        if (document.all !== void 0) return document.all[a];
        if (document.layers !== void 0) return document.layers[a];
        return null
      } else return document.getElementById(a)
    }
    function w(a, c, b) {
      if (a !== void 0 && a !== null && typeof c === "string") {
        var e = a[c] ? a[c] : function () {};
        a[c] = function (a) {
          e(a);
          return b(a)
        }
      }
    }
    function E(a, c, d, e, f) {
      w(a, c, function (a) {
        var c = !1,
          a = a || window.event,
          i = {
            new_tab_click: H(a)
          },
          k = window.setTimeout(function () {
            c || (c = !0, f(!1, e, i))
          }, b.config.track_links_timeout);
        b.track(d, e, function () {
          c || (c = !0, window.clearTimeout(k), f(!0, e, i))
        });
        if (!i.new_tab_click) return F(a)
      })
    }
    function H(a) {
      if (a && a.type === "click") {
        var c = 0,
          b = a.metaKey || a.ctrlKey;
        a.which === null && a.button !== null ? c = a.button < 2 ? 0 : a.button == 4 ? 1 : 2 : a.which !== null && (c = a.which < 2 ? 0 : a.which == 2 ? 1 : 2);
        return c == 1 || b && c == 0
      }
      return !1
    }
    function F(a) {
      if (a) a.returnValue = !1, a.preventDefault !== void 0 && a.preventDefault();
      return !1
    }
    function q() {
      this.function_name = "track_links";
      this.override_event = "onclick"
    }
    function x() {
      this.function_name = "track_forms";
      this.override_event = "onsubmit"
    }
    function u() {
      if (!r) {
        r = !0;
        document.removeEventListener && (document.removeEventListener("DOMContentLoaded", u, !1), document.removeEventListener("load", u, !1));
        for (; y.length > 0;) {
          var a = y.shift();
          b[a[0]].apply(b, a.slice(1))
        }
      }
    }
    var b = {},
      G = !1,
      r = !1,
      y = [];
    b.config = {
      cross_subdomain_cookie: !0,
      cookie_name: "mp_super_properties",
      test: !1,
      store_google: !1,
      debug: !1,
      track_links_timeout: 300,
      img: !1
    };
    b.jsonp_callback = function () {};
    b.super_properties = {
      all: {},
      events: {},
      funnels: {}
    };
    b.funnels = {};
    var o = {
      log: function () {
        if (typeof window.console !== "undefined" && window.console && b.config.debug) try {
          window.console.log.apply(window.console, arguments)
        } catch (a) {
          var c = Array.prototype.slice.call(arguments);
          window.console.log(c.join("\n"))
        }
      },
      error: function () {
        if (typeof window.console !== "undefined" && window.console && b.config.debug) try {
          window.console.error.apply(window.console, arguments)
        } catch (a) {
          var c = Array.prototype.slice.call(arguments);
          window.console.error(c.join("\n"))
        }
      }
    },
      p = function () {};
    p.prototype.track = function () {
      if (!r) return y.push([this.function_name].concat(t(arguments))), !0;
      var a = arguments.length > 0 ? arguments[0] : void 0;
      if (a === void 0) o.error("Invalid arguments for track_forms:", arguments);
      else if (typeof a === "string" && A(a)) return this.track_query.apply(this, arguments);
      else if (v(a)) return arguments[0] = t(a), this.track_dom.apply(this, arguments);
      else o.error("Invalid arguments for track_links:", arguments);
      return !1
    };
    p.prototype.track_query = function (a, c, b, e) {
      var a = B(a),
        f = null;
      a.type === "class" ? f = C(a.query) : a.type === "id" && (a = D(a.query), f = a !== null ? [a] : []);
      a = f;
      if (a === null) return !1;
      return this.track_dom(a, c, b, e)
    };
    p.prototype.track_dom = function (a, c, b, e) {
      if (!c) return o.error("No event name provided to mpmetrics." + this.function_name), !1;
      b = b || {};
      k(a, function (a) {
        if (typeof a !== "object" || typeof a.nodeName === "undefined") return o.error("Invalid element provided to " + this.function_name, a), !1;
        var g = this.update_properties(a, b);
        E(a, this.override_event, c, g, this.callback_generator(a, e))
      }, this);
      return !0
    };
    p.prototype.update_properties = function (a, c) {
      var b = {};
      k(c, function (a, c) {
        b[c] = a
      });
      return b
    };
    z(q, p);
    q.prototype.callback_generator = function (a, c) {
      return function (b, e, f) {
        c && c(b, e) === !1 || f.new_tab_click || a.href !== void 0 && a.href !== null && setTimeout(function () {
          window.location = a.href
        }, 0)
      }
    };
    q.prototype.update_properties = function (a, c) {
      var b = q.superclass.update_properties.call(this, a, c);
      if (a.href) b.url = a.href;
      return b
    };
    z(x, p);
    x.prototype.callback_generator = function (a, b) {
      return function (d, e) {
        b && b(d, e) === !1 || setTimeout(function () {
          document.createElement("form").submit.call(a)
        }, 0)
      }
    };
    b.track_links = function () {
      var a = new q;
      return a.track.apply(a, arguments)
    };
    b.track_forms = function () {
      var a = new x;
      return a.track.apply(a, arguments)
    };
    b.send_request = function (a, c) {
      var d;
      d = /google web preview/i.test(navigator.userAgent) ? !0 : !1;
      if (!d) {
        if (b.config.test) c.test = 1;
        if (b.config.img) c.img = 1;
        c._ = (new Date).getTime().toString();
        a += "?" + b.http_build_query(c);
        if (b.config.img) d = document.createElement("img"), d.src = a, document.body.appendChild(d);
        else {
          d = document.createElement("script");
          d.type = "text/javascript";
          d.async = !0;
          d.defer = !0;
          d.src = a;
          var e = document.getElementsByTagName("script")[0];
          e.parentNode.insertBefore(d, e)
        }
      }
    };
    b.get_query_param = function (a, b) {
      var b = b.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"),
        d = RegExp("[\\?&]" + b + "=([^&#]*)").exec(a);
      return d === null || d && typeof d[1] !== "string" && d[1].length ? "" : unescape(d[1]).replace(/\+/g, " ")
    };
    b.track = function (a, c, d, e) {
      if (a) {
        b.load_super_once();
        e = e || "events";
        c = c || {};
        c.token = c.token || b.token;
        var f = Math.floor(Math.random() * 1E4),
          g = b.callback_fn;
        d !== void 0 && (b.jsonp_callback["" + f] = d, g += '["' + f + '"]');
        c.time = b.get_unixtime();
        b.save_campaign_params();
        b.save_search_keyword(document.referrer);
        e != "all" && k(b.super_properties[e], function (a, b) {
          b in c || (c[b] = a)
        });
        k(b.super_properties.all, function (a, b) {
          b in c || (c[b] = a)
        });
        d = {
          event: a,
          properties: c
        };
        e = b.base64_encode(b.json_encode(d));
        b.config.debug && (o.log("-------------- REQUEST --------------"), o.log(d));
        b.send_request(b.api_host + "/track/", {
          data: e,
          ip: 1,
          callback: g
        });
        b.track_predefined_funnels(a, c);
        return d
      } else o.error("No event name provided to mpmetrics.track")
    };
    b.track_funnel = function (a, c, d, e, f) {
      e = e || {};
      e.funnel = a;
      e.step = parseInt(c, 10);
      e.goal = d;
      return b.track("mp_funnel", e, f, "funnels")
    };
    b.track_pageview = function () {
      b.track("mp_page_view", b.get_pageview_info())
    };
    b.identify = function (a) {
      b.register_once({
        distinct_id: a
      }, "all", null, 30)
    };
    b.name_tag = function (a) {
      b.register({
        mp_name_tag: a
      }, "all", 30)
    };
    b.register_once = function (a, c, d, e) {
      if (s(a)) {
        b.load_super_once();
        c = c || "all";
        d === void 0 && (d = "None");
        e === void 0 && (e = 7);
        if (b.super_properties.hasOwnProperty(c)) {
          var f = b.super_properties[c];
          k(a, function (a, e) {
            if (!f[e] || f[e] === d) b.super_properties[c][e] = a
          })
        }
        b.config.cross_subdomain_cookie && b.clear_old_cookie();
        b.set_cookie(b.config.cookie_name, b.json_encode(b.super_properties), e, b.config.cross_subdomain_cookie);
        return !0
      } else return !1
    };
    b.register = function (a, c, d) {
      return s(a) ? (b.load_super_once(), c = c || "all", d === void 0 && (d = 7), b.super_properties.hasOwnProperty(c) && k(a, function (a, d) {
        b.super_properties[c][d] = a
      }), b.config.cross_subdomain_cookie && b.clear_old_cookie(), b.set_cookie(b.config.cookie_name, b.json_encode(b.super_properties), d, b.config.cross_subdomain_cookie), !0) : !1
    };
    b.http_build_query = function (a, b) {
      var d, e, f = [];
      b || (b = "&");
      k(a, function (a, b) {
        d = encodeURIComponent(a.toString());
        e = encodeURIComponent(b);
        f[f.length] = e + "=" + d
      });
      return f.join(b)
    };
    b.get_unixtime = function () {
      return parseInt((new Date).getTime().toString().substring(0, 10), 10)
    };
    b.json_encode = function (a) {
      var b = function (a) {
          var b = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            c = {
              "\u0008": "\\b",
              "\t": "\\t",
              "\n": "\\n",
              "\u000c": "\\f",
              "\r": "\\r",
              '"': '\\"',
              "\\": "\\\\"
            };
          b.lastIndex = 0;
          return b.test(a) ? '"' + a.replace(b, function (a) {
            var b = c[a];
            return typeof b === "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
          }) + '"' : '"' + a + '"'
        },
        d = function (a, f) {
          var g = "",
            h = 0,
            i = h = "",
            i = 0,
            k = g,
            j = [],
            l = f[a];
          l && typeof l === "object" && typeof l.toJSON === "function" && (l = l.toJSON(a));
          switch (typeof l) {
          case "string":
            return b(l);
          case "number":
            return isFinite(l) ? String(l) : "null";
          case "boolean":
          case "null":
            return String(l);
          case "object":
            if (!l) return "null";
            g += "    ";
            j = [];
            if (Object.prototype.toString.apply(l) === "[object Array]") {
              i = l.length;
              for (h = 0; h < i; h += 1) j[h] = d(h, l) || "null";
              return i = j.length === 0 ? "[]" : g ? "[\n" + g + j.join(",\n" + g) + "\n" + k + "]" : "[" + j.join(",") + "]"
            }
            for (h in l) Object.hasOwnProperty.call(l, h) && (i = d(h, l)) && j.push(b(h) + (g ? ": " : ":") + i);
            return i = j.length === 0 ? "{}" : g ? "{" + j.join(",") + "" + k + "}" : "{" + j.join(",") + "}"
          }
        };
      return d("", {
        "": a
      })
    };
    b.base64_encode = function (a) {
      var c, d, e, f, g = 0,
        h = 0,
        i = "",
        i = [];
      if (!a) return a;
      a = b.utf8_encode(a + "");
      do c = a.charCodeAt(g++), d = a.charCodeAt(g++), e = a.charCodeAt(g++), f = c << 16 | d << 8 | e, c = f >> 18 & 63, d = f >> 12 & 63, e = f >> 6 & 63, f &= 63, i[h++] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(c) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(d) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(e) + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(f);
      while (g < a.length);
      i = i.join("");
      switch (a.length % 3) {
      case 1:
        i = i.slice(0, -2) + "==";
        break;
      case 2:
        i = i.slice(0, -1) + "="
      }
      return i
    };
    b.utf8_encode = function (a) {
      var a = (a + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n"),
        b = "",
        d, e, f = 0,
        g;
      d = e = 0;
      f = a.length;
      for (g = 0; g < f; g++) {
        var h = a.charCodeAt(g),
          i = null;
        h < 128 ? e++ : i = h > 127 && h < 2048 ? String.fromCharCode(h >> 6 | 192) + String.fromCharCode(h & 63 | 128) : String.fromCharCode(h >> 12 | 224) + String.fromCharCode(h >> 6 & 63 | 128) + String.fromCharCode(h & 63 | 128);
        i !== null && (e > d && (b += a.substring(d, e)), b += i, d = e = g + 1)
      }
      e > d && (b += a.substring(d, a.length));
      return b
    };
    b.set_cookie = function (a, c, d, e) {
      var f = new Date,
        e = e ? b.parse_domain(document.location.hostname) : "",
        a = a + "=" + escape(c);
      f.setDate(f.getDate() + d);
      a += d === null ? "" : ";expires=" + f.toGMTString();
      a += "; path=/";
      a += e ? ";domain=." + e : "";
      document.cookie = a
    };
    b.get_cookie = function (a) {
      var b;
      if (document.cookie.length > 0 && (document.cookie.match("^" + a + "=") ? b = 0 : (b = document.cookie.search("; " + a + "="), b !== -1 && (b += 2)), b !== -1)) {
        b = b + a.length + 1;
        a = document.cookie.indexOf(";", b);
        if (a == -1) a = document.cookie.length;
        return unescape(document.cookie.substring(b, a))
      }
      return ""
    };
    b.delete_cookie = function (a, c) {
      b.set_cookie(a, "", -1, c)
    };
    b.parse_domain = function (a) {
      return (a = a.match(/[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i)) ? a[0] : ""
    };
    b.get_super = function () {
      var a = eval("(" + b.get_cookie(b.config.cookie_name) + ")") || {};
      k(a, function (a, d) {
        b.super_properties[d] = a
      });
      return b.super_properties
    };
    b.load_super_once = function () {
      if (!G) try {
        b.get_super(), G = !0
      } catch (a) {}
    };
    b.register_funnel = function (a, c) {
      b.funnels[a] = c
    };
    b.track_predefined_funnels = function (a, c) {
      var d, e;
      if (a && b.funnels) for (d in b.funnels) if (b.funnels.hasOwnProperty(d)) for (e = 0; e < b.funnels[d].length; ++e) b.funnels[d][e] && b.funnels[d][e] == a && b.track_funnel(d, e + 1, a, c)
    };
    b.save_campaign_params = function () {
      b.campaign_params_saved = b.campaign_params_saved || !1;
      if (b.config.store_google && !b.campaign_params_saved) {
        var a = "",
          c = {};
        k(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"], function (d) {
          a = b.get_query_param(document.URL, d);
          a.length && (c[d] = a)
        });
        b.register_once(c);
        b.campaign_params_saved = !0
      }
    };
    b.save_search_keyword = function (a) {
      var c = "";
      a.search("https?://(.*)google.([^/?]*)") === 0 ? c = b.get_query_param(a, "q") : a.search("https?://(.*)bing.com") === 0 ? c = b.get_query_param(a, "q") : a.search("https?://(.*)yahoo.com") === 0 ? c = b.get_query_param(a, "p") : a.search("https?://(.*)duckduckgo.com") === 0 && (c = b.get_query_param(a, "q"));
      c.length && b.register({
        mp_keyword: c
      }, "all")
    };
    b.get_pageview_info = function () {
      var a = document.referrer,
        b;
      b = navigator.userAgent;
      b = window.opera ? "Opera" : /chrom/i.test(b) ? "Chrome" : /msie/i.test(b) ? "Internet Explorer" : /AppleWebKit/.test(navigator.appVersion) ? "Safari" : /mozilla/i.test(b) && !/compatible|webkit/i.test(b) ? "Firefox" : "";
      var d;
      d = navigator.userAgent;
      d = /Windows/i.test(d) ? "Windows" : /iPhone/.test(d) ? "iPhone" : /Android/.test(d) ? "Android" : /Mac/i.test(d) ? "Mac OS X" : /X11/.test(d) || /Linux/.test(d) ? "Linux" : "";
      var e = document.location.href,
        f = {};
      if (a.length) f.mp_referrer = a;
      if (b.length) f.mp_browser = b;
      if (d.length) f.mp_platform = d;
      if (e.length) f.mp_page = e;
      return f
    };
    b.clear_old_cookie = function () {
      b.delete_cookie(b.config.cookie_name, !1);
      b.set_cookie(b.config.cookie_name, b.json_encode(b.super_properties), 7, !0)
    };
    b.set_config = function (a) {
      s(a) && k(a, function (a, d) {
        b.config[d] = a
      })
    };
    (function (a) {
      var b = navigator.userAgent.toLowerCase();
      /webkit/.test(b) ? timeout = setTimeout(function () {
        document.readyState === "loaded" || document.readyState === "complete" ? a() : setTimeout(arguments.callee, 10)
      }, 10) : /mozilla/.test(b) && !/(compatible)/.test(b) || /opera/.test(b) ? document.addEventListener("DOMContentLoaded", a, !1) : w(window, "onload", a)
    })(u);
    b._private = {
      dom_loaded: function (a) {
        if (typeof a !== "undefined") r = a;
        else return r
      },
      is_list: v,
      is_object: s,
      is_dom_query: A,
      parse_dom_query: B,
      to_array: t,
      get_elements_by_class_name: C,
      get_element_by_id: D,
      register_event: w,
      register_tracking_event: E,
      prevent_default: F,
      process_dom_loaded_queue: u
    };
    b.set_config(m || {});
    m = "https:" == document.location.protocol ? "https://" : "http://";
    b.token = j;
    b.api_host = m + "api.mixpanel.com";
    b.callback_fn = n ? n + ".jsonp_callback" : "mpmetrics.jsonp_callback";
    b.track_pageview();
    return b
  };
typeof mpq != "undefined" && mpq && mpq[0] && mpq[0][0] == "init" &&
function (j) {
  j.metrics = new MixpanelLib(j[0][1], "mpq.metrics");
  j.push = function (m) {
    if (m) if (typeof m == "function") m();
    else if (m.constructor == Array) {
      var k = j.metrics[m[0]];
      typeof k == "function" && k.apply(j.metrics, m.slice(1))
    }
  };
  var n;
  for (n = 1; n < j.length; n++) j.push(j[n]);
  j.length = 0
}(mpq);