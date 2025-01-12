function X2JS(a, b, c) {
  function d(a) {
    var b = a.localName;
    return null == b && (b = a.baseName), (null == b || "" == b) && (b = a.nodeName), b
  }

  function e(a) {
    return a.prefix
  }

  function f(a) {
    return "string" == typeof a ? a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;") : a
  }

  function g(a) {
    return a.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#x2F;/g, "/")
  }

  function h(f) {
    if (f.nodeType == u.DOCUMENT_NODE) {
      var i, j, k, l = f.firstChild;
      for (j = 0, k = f.childNodes.length; k > j; j += 1)
        if (f.childNodes[j].nodeType !== u.COMMENT_NODE) {
          l = f.childNodes[j];
          break
        } if (c) i = h(l);
      else {
        i = {};
        var m = d(l);
        i[m] = h(l)
      }
      return i
    }
    if (f.nodeType == u.ELEMENT_NODE) {
      var i = new Object;
      i.__cnt = 0;
      for (var n = [], o = f.childNodes, p = 0; p < o.length; p++) {
        var l = o.item(p),
          m = d(l);
        if (i.__cnt++, null == i[m]) {
          var q = h(l);
          if ("#text" != m || /[^\s]/.test(q)) {
            var r = {};
            r[m] = q, n.push(r)
          }
          i[m] = q, i[m + "_asArray"] = new Array(1), i[m + "_asArray"][0] = i[m]
        } else {
          if (null != i[m] && !(i[m] instanceof Array)) {
            var s = i[m];
            i[m] = new Array, i[m][0] = s, i[m + "_asArray"] = i[m]
          }
          for (var v = 0; null != i[m][v];) v++;
          var q = h(l);
          if ("#text" != m || /[^\s]/.test(q)) {
            var r = {};
            r[m] = q, n.push(r)
          }
          i[m][v] = q
        }
      }
      i.__children = n;
      for (var w = 0; w < f.attributes.length; w++) {
        var x = f.attributes.item(w);
        i.__cnt++;
        for (var y = x.value, z = 0, A = a.length; A > z; z++) {
          var B = a[z];
          B.test.call(this, x) && (y = B.converter.call(this, x.value))
        }
        i[b + x.name] = y
      }
      var C = e(f);
      return null != C && "" != C && (i.__cnt++, i.__prefix = C), 1 == i.__cnt && null != i["#text"] && (i = i["#text"]), null != i["#text"] && (i.__text = i["#text"], t && (i.__text = g(i.__text)), delete i["#text"], delete i["#text_asArray"]), null != i["#cdata-section"] && (i.__cdata = i["#cdata-section"], delete i["#cdata-section"], delete i["#cdata-section_asArray"]), (null != i.__text || null != i.__cdata) && (i.toString = function() {
        return (null != this.__text ? this.__text : "") + (null != this.__cdata ? this.__cdata : "")
      }), i
    }
    return f.nodeType == u.TEXT_NODE || f.nodeType == u.CDATA_SECTION_NODE ? f.nodeValue : f.nodeType == u.COMMENT_NODE ? null : void 0
  }

  function i(a, b, c, d) {
    var e = "<" + (null != a && null != a.__prefix ? a.__prefix + ":" : "") + b;
    if (null != c)
      for (var f = 0; f < c.length; f++) {
        var g = c[f],
          h = a[g];
        e += " " + g.substr(1) + "='" + h + "'"
      }
    return e += d ? "/>" : ">"
  }

  function j(a, b) {
    return "</" + (null != a.__prefix ? a.__prefix + ":" : "") + b + ">"
  }

  function k(a, b) {
    return -1 !== a.indexOf(b, a.length - b.length)
  }

  function l(a, b) {
    return k(b.toString(), "_asArray") || 0 == b.toString().indexOf("_") || a[b] instanceof Function ? !0 : !1
  }

  function m(a) {
    var b = 0;
    if (a instanceof Object)
      for (var c in a) l(a, c) || b++;
    return b
  }

  function n(a) {
    var b = [];
    if (a instanceof Object)
      for (var c in a) - 1 == c.toString().indexOf("__") && 0 == c.toString().indexOf("_") && b.push(c);
    return b
  }

  function o(a) {
    var b = "";
    return null != a.__cdata && (b += "<![CDATA[" + a.__cdata + "]]>"), null != a.__text && (b += t ? f(a.__text) : a.__text), b
  }

  function p(a) {
    var b = "";
    return a instanceof Object ? b += o(a) : null != a && (b += t ? f(a) : a), b
  }

  function q(a, b, c) {
    var d = "";
    if (0 == a.length) d += i(a, b, c, !0);
    else
      for (var e = 0; e < a.length; e++) d += i(a[e], b, n(a[e]), !1), d += r(a[e]), d += j(a[e], b);
    return d
  }

  function r(a) {
    var b = "",
      c = m(a);
    if (c > 0)
      for (var d in a)
        if (!l(a, d)) {
          var e = a[d],
            f = n(e);
          if (null == e || void 0 == e) b += i(e, d, f, !0);
          else if (e instanceof Object)
            if (e instanceof Array) b += q(e, d, f);
            else {
              var g = m(e);
              g > 0 || null != e.__text || null != e.__cdata ? (b += i(e, d, f, !1), b += r(e), b += j(e, d)) : b += i(e, d, f, !0)
            }
          else b += i(e, d, f, !1), b += p(e), b += j(e, d)
        } return b += p(a)
  }(null === b || void 0 === b) && (b = "_"), (null === c || void 0 === c) && (c = !1);
  var s = "1.0.11",
    t = !1,
    u = {
      ELEMENT_NODE: 1,
      TEXT_NODE: 3,
      CDATA_SECTION_NODE: 4,
      COMMENT_NODE: 8,
      DOCUMENT_NODE: 9
    };
  this.parseXmlString = function(a) {
    var b, c, d;
    if (window.DOMParser) {
      c = new window.DOMParser;
      try {
        d = c.parseFromString("<", "text/xml").getElementsByTagName("parsererror")[0].namespaceURI
      } catch (e) {}
      try {
        b = c.parseFromString(a, "text/xml"), d && b.getElementsByTagNameNS(d, "parsererror").length && (b = void 0)
      } catch (e) {}
    } else 0 == a.indexOf("<?") && (a = a.substr(a.indexOf("?>") + 2)), b = new ActiveXObject("Microsoft.XMLDOM"), b.async = "false", b.loadXML(a);
    return b
  }, this.xml2json = function(a) {
    return h(a)
  }, this.xml_str2json = function(a) {
    var b = this.parseXmlString(a);
    return b ? this.xml2json(b) : void 0
  }, this.json2xml_str = function(a) {
    return r(a)
  }, this.json2xml = function(a) {
    var b = this.json2xml_str(a);
    return this.parseXmlString(b)
  }, this.getVersion = function() {
    return s
  }, this.escapeMode = function(a) {
    t = a
  }
}

function ObjectIron(a) {
  var b;
  for (b = [], i = 0, len = a.length; i < len; i += 1) a[i].isRoot ? b.push("root") : b.push(a[i].name);
  var c = function(a, b) {
      var c;
      if (null !== a && null !== b)
        for (c in a) a.hasOwnProperty(c) && (b.hasOwnProperty(c) || (b[c] = a[c]))
    },
    d = function(a, b, d) {
      var e, f, g, h, i;
      if (null !== a && 0 !== a.length)
        for (e = 0, f = a.length; f > e; e += 1) g = a[e], b.hasOwnProperty(g.name) && (d.hasOwnProperty(g.name) ? g.merge && (h = b[g.name], i = d[g.name], "object" == typeof h && "object" == typeof i ? c(h, i) : null != g.mergeFunction ? d[g.name] = g.mergeFunction(h, i) : d[g.name] = h + i) : d[g.name] = b[g.name])
    },
    e = function(a, b) {
      var c, f, g, h, i, j, k, l = a;
      if (null !== l.children && 0 !== l.children.length)
        for (c = 0, f = l.children.length; f > c; c += 1)
          if (j = l.children[c], b.hasOwnProperty(j.name))
            if (j.isArray)
              for (i = b[j.name + "_asArray"], g = 0, h = i.length; h > g; g += 1) k = i[g], d(l.properties, b, k), e(j, k);
            else k = b[j.name], d(l.properties, b, k), e(j, k)
    },
    f = function(c) {
      var d, g, h, i, j, k, l;
      if (null === c) return c;
      if ("object" != typeof c) return c;
      for (d = 0, g = b.length; g > d; d += 1) "root" === b[d] && (j = a[d], k = c, e(j, k));
      for (i in c)
        if (c.hasOwnProperty(i) && "__children" != i) {
          if (h = b.indexOf(i), -1 !== h)
            if (j = a[h], j.isArray)
              for (l = c[i + "_asArray"], d = 0, g = l.length; g > d; d += 1) k = l[d], e(j, k);
            else k = c[i], e(j, k);
          f(c[i])
        } return c
    };
  return {
    run: f
  }
}
if (function(a) {
    "use strict";
    var b = {
      VERSION: "0.5.3"
    };
    b.System = function() {
      this._mappings = {}, this._outlets = {}, this._handlers = {}, this.strictInjections = !0, this.autoMapOutlets = !1, this.postInjectionHook = "setup"
    }, b.System.prototype = {
      _createAndSetupInstance: function(a, b) {
        var c = new b;
        return this.injectInto(c, a), c
      },
      _retrieveFromCacheOrCreate: function(a, b) {
        "undefined" == typeof b && (b = !1);
        var c;
        if (!this._mappings.hasOwnProperty(a)) throw new Error(1e3);
        var d = this._mappings[a];
        return !b && d.isSingleton ? (null == d.object && (d.object = this._createAndSetupInstance(a, d.clazz)), c = d.object) : c = d.clazz ? this._createAndSetupInstance(a, d.clazz) : d.object, c
      },
      mapOutlet: function(a, b, c) {
        if ("undefined" == typeof a) throw new Error(1010);
        return b = b || "global", c = c || a, this._outlets.hasOwnProperty(b) || (this._outlets[b] = {}), this._outlets[b][c] = a, this
      },
      getObject: function(a) {
        if ("undefined" == typeof a) throw new Error(1020);
        return this._retrieveFromCacheOrCreate(a)
      },
      mapValue: function(a, b) {
        if ("undefined" == typeof a) throw new Error(1030);
        return this._mappings[a] = {
          clazz: null,
          object: b,
          isSingleton: !0
        }, this.autoMapOutlets && this.mapOutlet(a), this.hasMapping(a) && this.injectInto(b, a), this
      },
      hasMapping: function(a) {
        if ("undefined" == typeof a) throw new Error(1040);
        return this._mappings.hasOwnProperty(a)
      },
      mapClass: function(a, b) {
        if ("undefined" == typeof a) throw new Error(1050);
        if ("undefined" == typeof b) throw new Error(1051);
        return this._mappings[a] = {
          clazz: b,
          object: null,
          isSingleton: !1
        }, this.autoMapOutlets && this.mapOutlet(a), this
      },
      mapSingleton: function(a, b) {
        if ("undefined" == typeof a) throw new Error(1060);
        if ("undefined" == typeof b) throw new Error(1061);
        return this._mappings[a] = {
          clazz: b,
          object: null,
          isSingleton: !0
        }, this.autoMapOutlets && this.mapOutlet(a), this
      },
      instantiate: function(a) {
        if ("undefined" == typeof a) throw new Error(1070);
        return this._retrieveFromCacheOrCreate(a, !0)
      },
      injectInto: function(a, b) {
        if ("undefined" == typeof a) throw new Error(1080);
        if ("object" == typeof a) {
          var c = [];
          this._outlets.hasOwnProperty("global") && c.push(this._outlets.global), "undefined" != typeof b && this._outlets.hasOwnProperty(b) && c.push(this._outlets[b]);
          for (var d in c) {
            var e = c[d];
            for (var f in e) {
              var g = e[f];
              (!this.strictInjections || f in a) && (a[f] = this.getObject(g))
            }
          }
          "setup" in a && a.setup.call(a)
        }
        return this
      },
      unmap: function(a) {
        if ("undefined" == typeof a) throw new Error(1090);
        return delete this._mappings[a], this
      },
      unmapOutlet: function(a, b) {
        if ("undefined" == typeof a) throw new Error(1100);
        if ("undefined" == typeof b) throw new Error(1101);
        return delete this._outlets[a][b], this
      },
      mapHandler: function(a, b, c, d, e) {
        if ("undefined" == typeof a) throw new Error(1110);
        return b = b || "global", c = c || a, "undefined" == typeof d && (d = !1), "undefined" == typeof e && (e = !1), this._handlers.hasOwnProperty(a) || (this._handlers[a] = {}), this._handlers[a].hasOwnProperty(b) || (this._handlers[a][b] = []), this._handlers[a][b].push({
          handler: c,
          oneShot: d,
          passEvent: e
        }), this
      },
      unmapHandler: function(a, b, c) {
        if ("undefined" == typeof a) throw new Error(1120);
        if (b = b || "global", c = c || a, this._handlers.hasOwnProperty(a) && this._handlers[a].hasOwnProperty(b)) {
          var d = this._handlers[a][b];
          for (var e in d) {
            var f = d[e];
            if (f.handler === c) {
              d.splice(e, 1);
              break
            }
          }
        }
        return this
      },
      notify: function(a) {
        if ("undefined" == typeof a) throw new Error(1130);
        var b = Array.prototype.slice.call(arguments),
          c = b.slice(1);
        if (this._handlers.hasOwnProperty(a)) {
          var d = this._handlers[a];
          for (var e in d) {
            var f, g = d[e];
            "global" !== e && (f = this.getObject(e));
            var h, i, j = [];
            for (h = 0, i = g.length; i > h; h++) {
              var k, l = g[h];
              k = f && "string" == typeof l.handler ? f[l.handler] : l.handler, l.oneShot && j.unshift(h), l.passEvent ? k.apply(f, b) : k.apply(f, c)
            }
            for (h = 0, i = j.length; i > h; h++) g.splice(j[h], 1)
          }
        }
        return this
      }
    }, a.dijon = b
  }(this), "undefined" == typeof utils) var utils = {};
"undefined" == typeof utils.Math && (utils.Math = {}), utils.Math.to64BitNumber = function(a, b) {
  var c, d, e;
  return c = new goog.math.Long(0, b), d = new goog.math.Long(a, 0), e = c.add(d), e.toNumber()
}, goog = {}, goog.math = {}, goog.math.Long = function(a, b) {
  this.low_ = 0 | a, this.high_ = 0 | b
}, goog.math.Long.IntCache_ = {}, goog.math.Long.fromInt = function(a) {
  if (a >= -128 && 128 > a) {
    var b = goog.math.Long.IntCache_[a];
    if (b) return b
  }
  var c = new goog.math.Long(0 | a, 0 > a ? -1 : 0);
  return a >= -128 && 128 > a && (goog.math.Long.IntCache_[a] = c), c
}, goog.math.Long.fromNumber = function(a) {
  return isNaN(a) || !isFinite(a) ? goog.math.Long.ZERO : a <= -goog.math.Long.TWO_PWR_63_DBL_ ? goog.math.Long.MIN_VALUE : a + 1 >= goog.math.Long.TWO_PWR_63_DBL_ ? goog.math.Long.MAX_VALUE : 0 > a ? goog.math.Long.fromNumber(-a).negate() : new goog.math.Long(a % goog.math.Long.TWO_PWR_32_DBL_ | 0, a / goog.math.Long.TWO_PWR_32_DBL_ | 0)
}, goog.math.Long.fromBits = function(a, b) {
  return new goog.math.Long(a, b)
}, goog.math.Long.fromString = function(a, b) {
  if (0 == a.length) throw Error("number format error: empty string");
  var c = b || 10;
  if (2 > c || c > 36) throw Error("radix out of range: " + c);
  if ("-" == a.charAt(0)) return goog.math.Long.fromString(a.substring(1), c).negate();
  if (a.indexOf("-") >= 0) throw Error('number format error: interior "-" character: ' + a);
  for (var d = goog.math.Long.fromNumber(Math.pow(c, 8)), e = goog.math.Long.ZERO, f = 0; f < a.length; f += 8) {
    var g = Math.min(8, a.length - f),
      h = parseInt(a.substring(f, f + g), c);
    if (8 > g) {
      var i = goog.math.Long.fromNumber(Math.pow(c, g));
      e = e.multiply(i).add(goog.math.Long.fromNumber(h))
    } else e = e.multiply(d), e = e.add(goog.math.Long.fromNumber(h))
  }
  return e
}, goog.math.Long.TWO_PWR_16_DBL_ = 65536, goog.math.Long.TWO_PWR_24_DBL_ = 1 << 24, goog.math.Long.TWO_PWR_32_DBL_ = goog.math.Long.TWO_PWR_16_DBL_ * goog.math.Long.TWO_PWR_16_DBL_, goog.math.Long.TWO_PWR_31_DBL_ = goog.math.Long.TWO_PWR_32_DBL_ / 2, goog.math.Long.TWO_PWR_48_DBL_ = goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_16_DBL_, goog.math.Long.TWO_PWR_64_DBL_ = goog.math.Long.TWO_PWR_32_DBL_ * goog.math.Long.TWO_PWR_32_DBL_, goog.math.Long.TWO_PWR_63_DBL_ = goog.math.Long.TWO_PWR_64_DBL_ / 2, goog.math.Long.ZERO = goog.math.Long.fromInt(0), goog.math.Long.ONE = goog.math.Long.fromInt(1), goog.math.Long.NEG_ONE = goog.math.Long.fromInt(-1), goog.math.Long.MAX_VALUE = goog.math.Long.fromBits(-1, 2147483647), goog.math.Long.MIN_VALUE = goog.math.Long.fromBits(0, -2147483648), goog.math.Long.TWO_PWR_24_ = goog.math.Long.fromInt(1 << 24), goog.math.Long.prototype.toInt = function() {
  return this.low_
}, goog.math.Long.prototype.toNumber = function() {
  return this.high_ * goog.math.Long.TWO_PWR_32_DBL_ + this.getLowBitsUnsigned()
}, goog.math.Long.prototype.toString = function(a) {
  var b = a || 10;
  if (2 > b || b > 36) throw Error("radix out of range: " + b);
  if (this.isZero()) return "0";
  if (this.isNegative()) {
    if (this.equals(goog.math.Long.MIN_VALUE)) {
      var c = goog.math.Long.fromNumber(b),
        d = this.div(c),
        e = d.multiply(c).subtract(this);
      return d.toString(b) + e.toInt().toString(b)
    }
    return "-" + this.negate().toString(b)
  }
  for (var f = goog.math.Long.fromNumber(Math.pow(b, 6)), e = this, g = "";;) {
    var h = e.div(f),
      i = e.subtract(h.multiply(f)).toInt(),
      j = i.toString(b);
    if (e = h, e.isZero()) return j + g;
    for (; j.length < 6;) j = "0" + j;
    g = "" + j + g
  }
}, goog.math.Long.prototype.getHighBits = function() {
  return this.high_
}, goog.math.Long.prototype.getLowBits = function() {
  return this.low_
}, goog.math.Long.prototype.getLowBitsUnsigned = function() {
  return this.low_ >= 0 ? this.low_ : goog.math.Long.TWO_PWR_32_DBL_ + this.low_
}, goog.math.Long.prototype.getNumBitsAbs = function() {
  if (this.isNegative()) return this.equals(goog.math.Long.MIN_VALUE) ? 64 : this.negate().getNumBitsAbs();
  for (var a = 0 != this.high_ ? this.high_ : this.low_, b = 31; b > 0 && 0 == (a & 1 << b); b--);
  return 0 != this.high_ ? b + 33 : b + 1
}, goog.math.Long.prototype.isZero = function() {
  return 0 == this.high_ && 0 == this.low_
}, goog.math.Long.prototype.isNegative = function() {
  return this.high_ < 0
}, goog.math.Long.prototype.isOdd = function() {
  return 1 == (1 & this.low_)
}, goog.math.Long.prototype.equals = function(a) {
  return this.high_ == a.high_ && this.low_ == a.low_
}, goog.math.Long.prototype.notEquals = function(a) {
  return this.high_ != a.high_ || this.low_ != a.low_
}, goog.math.Long.prototype.lessThan = function(a) {
  return this.compare(a) < 0
}, goog.math.Long.prototype.lessThanOrEqual = function(a) {
  return this.compare(a) <= 0
}, goog.math.Long.prototype.greaterThan = function(a) {
  return this.compare(a) > 0
}, goog.math.Long.prototype.greaterThanOrEqual = function(a) {
  return this.compare(a) >= 0
}, goog.math.Long.prototype.compare = function(a) {
  if (this.equals(a)) return 0;
  var b = this.isNegative(),
    c = a.isNegative();
  return b && !c ? -1 : !b && c ? 1 : this.subtract(a).isNegative() ? -1 : 1
}, goog.math.Long.prototype.negate = function() {
  return this.equals(goog.math.Long.MIN_VALUE) ? goog.math.Long.MIN_VALUE : this.not().add(goog.math.Long.ONE)
}, goog.math.Long.prototype.add = function(a) {
  var b = this.high_ >>> 16,
    c = 65535 & this.high_,
    d = this.low_ >>> 16,
    e = 65535 & this.low_,
    f = a.high_ >>> 16,
    g = 65535 & a.high_,
    h = a.low_ >>> 16,
    i = 65535 & a.low_,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
  return m += e + i, l += m >>> 16, m &= 65535, l += d + h, k += l >>> 16, l &= 65535, k += c + g, j += k >>> 16, k &= 65535, j += b + f, j &= 65535, goog.math.Long.fromBits(l << 16 | m, j << 16 | k)
}, goog.math.Long.prototype.subtract = function(a) {
  return this.add(a.negate())
}, goog.math.Long.prototype.multiply = function(a) {
  if (this.isZero()) return goog.math.Long.ZERO;
  if (a.isZero()) return goog.math.Long.ZERO;
  if (this.equals(goog.math.Long.MIN_VALUE)) return a.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
  if (a.equals(goog.math.Long.MIN_VALUE)) return this.isOdd() ? goog.math.Long.MIN_VALUE : goog.math.Long.ZERO;
  if (this.isNegative()) return a.isNegative() ? this.negate().multiply(a.negate()) : this.negate().multiply(a).negate();
  if (a.isNegative()) return this.multiply(a.negate()).negate();
  if (this.lessThan(goog.math.Long.TWO_PWR_24_) && a.lessThan(goog.math.Long.TWO_PWR_24_)) return goog.math.Long.fromNumber(this.toNumber() * a.toNumber());
  var b = this.high_ >>> 16,
    c = 65535 & this.high_,
    d = this.low_ >>> 16,
    e = 65535 & this.low_,
    f = a.high_ >>> 16,
    g = 65535 & a.high_,
    h = a.low_ >>> 16,
    i = 65535 & a.low_,
    j = 0,
    k = 0,
    l = 0,
    m = 0;
  return m += e * i, l += m >>> 16, m &= 65535, l += d * i, k += l >>> 16, l &= 65535, l += e * h, k += l >>> 16, l &= 65535, k += c * i, j += k >>> 16, k &= 65535, k += d * h, j += k >>> 16, k &= 65535, k += e * g, j += k >>> 16, k &= 65535, j += b * i + c * h + d * g + e * f, j &= 65535, goog.math.Long.fromBits(l << 16 | m, j << 16 | k)
}, goog.math.Long.prototype.div = function(a) {
  if (a.isZero()) throw Error("division by zero");
  if (this.isZero()) return goog.math.Long.ZERO;
  if (this.equals(goog.math.Long.MIN_VALUE)) {
    if (a.equals(goog.math.Long.ONE) || a.equals(goog.math.Long.NEG_ONE)) return goog.math.Long.MIN_VALUE;
    if (a.equals(goog.math.Long.MIN_VALUE)) return goog.math.Long.ONE;
    var b = this.shiftRight(1),
      c = b.div(a).shiftLeft(1);
    if (c.equals(goog.math.Long.ZERO)) return a.isNegative() ? goog.math.Long.ONE : goog.math.Long.NEG_ONE;
    var d = this.subtract(a.multiply(c)),
      e = c.add(d.div(a));
    return e
  }
  if (a.equals(goog.math.Long.MIN_VALUE)) return goog.math.Long.ZERO;
  if (this.isNegative()) return a.isNegative() ? this.negate().div(a.negate()) : this.negate().div(a).negate();
  if (a.isNegative()) return this.div(a.negate()).negate();
  for (var f = goog.math.Long.ZERO, d = this; d.greaterThanOrEqual(a);) {
    for (var c = Math.max(1, Math.floor(d.toNumber() / a.toNumber())), g = Math.ceil(Math.log(c) / Math.LN2), h = 48 >= g ? 1 : Math.pow(2, g - 48), i = goog.math.Long.fromNumber(c), j = i.multiply(a); j.isNegative() || j.greaterThan(d);) c -= h, i = goog.math.Long.fromNumber(c), j = i.multiply(a);
    i.isZero() && (i = goog.math.Long.ONE), f = f.add(i), d = d.subtract(j)
  }
  return f
}, goog.math.Long.prototype.modulo = function(a) {
  return this.subtract(this.div(a).multiply(a))
}, goog.math.Long.prototype.not = function() {
  return goog.math.Long.fromBits(~this.low_, ~this.high_)
}, goog.math.Long.prototype.and = function(a) {
  return goog.math.Long.fromBits(this.low_ & a.low_, this.high_ & a.high_)
}, goog.math.Long.prototype.or = function(a) {
  return goog.math.Long.fromBits(this.low_ | a.low_, this.high_ | a.high_)
}, goog.math.Long.prototype.xor = function(a) {
  return goog.math.Long.fromBits(this.low_ ^ a.low_, this.high_ ^ a.high_)
}, goog.math.Long.prototype.shiftLeft = function(a) {
  if (a &= 63, 0 == a) return this;
  var b = this.low_;
  if (32 > a) {
    var c = this.high_;
    return goog.math.Long.fromBits(b << a, c << a | b >>> 32 - a)
  }
  return goog.math.Long.fromBits(0, b << a - 32)
}, goog.math.Long.prototype.shiftRight = function(a) {
  if (a &= 63, 0 == a) return this;
  var b = this.high_;
  if (32 > a) {
    var c = this.low_;
    return goog.math.Long.fromBits(c >>> a | b << 32 - a, b >> a)
  }
  return goog.math.Long.fromBits(b >> a - 32, b >= 0 ? 0 : -1)
}, goog.math.Long.prototype.shiftRightUnsigned = function(a) {
  if (a &= 63, 0 == a) return this;
  var b = this.high_;
  if (32 > a) {
    var c = this.low_;
    return goog.math.Long.fromBits(c >>> a | b << 32 - a, b >>> a)
  }
  return 32 == a ? goog.math.Long.fromBits(b, 0) : goog.math.Long.fromBits(b >>> a - 32, 0)
};
var UTF8 = {};
UTF8.encode = function(a) {
  for (var b = [], c = 0; c < a.length; ++c) {
    var d = a.charCodeAt(c);
    128 > d ? b.push(d) : 2048 > d ? (b.push(192 | d >> 6), b.push(128 | 63 & d)) : 65536 > d ? (b.push(224 | d >> 12), b.push(128 | 63 & d >> 6), b.push(128 | 63 & d)) : (b.push(240 | d >> 18), b.push(128 | 63 & d >> 12), b.push(128 | 63 & d >> 6), b.push(128 | 63 & d))
  }
  return b
}, UTF8.decode = function(a) {
  for (var b = [], c = 0; c < a.length;) {
    var d = a[c++];
    128 > d || (224 > d ? (d = (31 & d) << 6, d |= 63 & a[c++]) : 240 > d ? (d = (15 & d) << 12, d |= (63 & a[c++]) << 6, d |= 63 & a[c++]) : (d = (7 & d) << 18, d |= (63 & a[c++]) << 12, d |= (63 & a[c++]) << 6, d |= 63 & a[c++])), b.push(String.fromCharCode(d))
  }
  return b.join("")
};
var BASE64 = {};
if (function(b) {
    var c = function(a) {
        for (var c = 0, d = [], e = 0 | a.length / 3; 0 < e--;) {
          var f = (a[c] << 16) + (a[c + 1] << 8) + a[c + 2];
          c += 3, d.push(b.charAt(63 & f >> 18)), d.push(b.charAt(63 & f >> 12)), d.push(b.charAt(63 & f >> 6)), d.push(b.charAt(63 & f))
        }
        if (2 == a.length - c) {
          var f = (a[c] << 16) + (a[c + 1] << 8);
          d.push(b.charAt(63 & f >> 18)), d.push(b.charAt(63 & f >> 12)), d.push(b.charAt(63 & f >> 6)), d.push("=")
        } else if (1 == a.length - c) {
          var f = a[c] << 16;
          d.push(b.charAt(63 & f >> 18)), d.push(b.charAt(63 & f >> 12)), d.push("==")
        }
        return d.join("")
      },
      d = function() {
        for (var a = [], c = 0; c < b.length; ++c) a[b.charCodeAt(c)] = c;
        return a["=".charCodeAt(0)] = 0, a
      }(),
      e = function(a) {
        for (var b = 0, c = [], e = 0 | a.length / 4; 0 < e--;) {
          var f = (d[a.charCodeAt(b)] << 18) + (d[a.charCodeAt(b + 1)] << 12) + (d[a.charCodeAt(b + 2)] << 6) + d[a.charCodeAt(b + 3)];
          c.push(255 & f >> 16), c.push(255 & f >> 8), c.push(255 & f), b += 4
        }
        return c && ("=" == a.charAt(b - 2) ? (c.pop(), c.pop()) : "=" == a.charAt(b - 1) && c.pop()), c
      },
      f = {};
    f.encode = function(a) {
      for (var b = [], c = 0; c < a.length; ++c) b.push(a.charCodeAt(c));
      return b
    }, f.decode = function(b) {
      for (var c = 0; c < s.length; ++c) a[c] = String.fromCharCode(a[c]);
      return a.join("")
    }, BASE64.decodeArray = function(a) {
      var b = e(a);
      return new Uint8Array(b)
    }, BASE64.encodeASCII = function(a) {
      var b = f.encode(a);
      return c(b)
    }, BASE64.decodeASCII = function(a) {
      var b = e(a);
      return f.decode(b)
    }, BASE64.encode = function(a) {
      var b = UTF8.encode(a);
      return c(b)
    }, BASE64.decode = function(a) {
      var b = e(a);
      return UTF8.decode(b)
    }
  }("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"), void 0 === btoa) var btoa = BASE64.encode;
if (void 0 === atob) var atob = BASE64.decode;
var ISOBoxer = ISOBoxer || {};
ISOBoxer.Cursor = function(a) {
  this.offset = "undefined" == typeof a ? 0 : a
};
var ISOBox = function() {
  this._cursor = new ISOBoxer.Cursor
};
ISOBox.parse = function(a) {
  var b = new ISOBox;
  return b._offset = a._cursor.offset, b._root = a._root ? a._root : a, b._raw = a._raw, b._parent = a, b._parseBox(), a._cursor.offset = b._raw.byteOffset + b._raw.byteLength, b
}, ISOBox.prototype._readInt = function(a) {
  var b = null;
  switch (a) {
    case 8:
      b = this._raw.getInt8(this._cursor.offset - this._raw.byteOffset);
      break;
    case 16:
      b = this._raw.getInt16(this._cursor.offset - this._raw.byteOffset);
      break;
    case 32:
      b = this._raw.getInt32(this._cursor.offset - this._raw.byteOffset)
  }
  return this._cursor.offset += a >> 3, b
}, ISOBox.prototype._readUint = function(a) {
  var b = null;
  switch (a) {
    case 8:
      b = this._raw.getUint8(this._cursor.offset - this._raw.byteOffset);
      break;
    case 16:
      b = this._raw.getUint16(this._cursor.offset - this._raw.byteOffset);
      break;
    case 24:
      var c = this._raw.getUint16(this._cursor.offset - this._raw.byteOffset),
        d = this._raw.getUint8(this._cursor.offset - this._raw.byteOffset + 2);
      b = (c << 8) + d;
      break;
    case 32:
      b = this._raw.getUint32(this._cursor.offset - this._raw.byteOffset);
      break;
    case 64:
      var c = this._raw.getUint32(this._cursor.offset - this._raw.byteOffset),
        d = this._raw.getUint32(this._cursor.offset - this._raw.byteOffset + 4);
      b = c * Math.pow(2, 32) + d
  }
  return this._cursor.offset += a >> 3, b
}, ISOBox.prototype._readString = function(a) {
  for (var b = "", c = 0; a > c; c++) {
    var d = this._readUint(8);
    b += String.fromCharCode(d)
  }
  return b
}, ISOBox.prototype._readTerminatedString = function() {
  for (var a = "";;) {
    var b = this._readUint(8);
    if (0 == b) break;
    a += String.fromCharCode(b)
  }
  return a
}, ISOBox.prototype._readTemplate = function(a) {
  var b = this._readUint(a / 2),
    c = this._readUint(a / 2);
  return b + c / Math.pow(2, a / 2)
}, ISOBox.prototype._parseBox = function() {
  if (this._cursor.offset = this._offset, this._offset + 8 > this._raw.buffer.byteLength) return void(this._root._incomplete = !0);
  switch (this.size = this._readUint(32), this.type = this._readString(4), 1 == this.size && (this.largesize = this._readUint(64)), "uuid" == this.type && (this.usertype = this._readString(16)), this.size) {
    case 0:
      this._raw = new DataView(this._raw.buffer, this._offset, this._raw.byteLength - this._cursor.offset);
      break;
    case 1:
      this._offset + this.size > this._raw.buffer.byteLength ? (this._incomplete = !0, this._root._incomplete = !0) : this._raw = new DataView(this._raw.buffer, this._offset, this.largesize);
      break;
    default:
      this._offset + this.size > this._raw.buffer.byteLength ? (this._incomplete = !0, this._root._incomplete = !0) : this._raw = new DataView(this._raw.buffer, this._offset, this.size)
  }!this._incomplete && this._boxParsers[this.type] && this._boxParsers[this.type].call(this)
}, ISOBox.prototype._parseFullBox = function() {
  this.version = this._readUint(8), this.flags = this._readUint(24)
}, ISOBox.prototype._boxParsers = {}, ["moov", "trak", "tref", "mdia", "minf", "stbl", "edts", "dinf", "mvex", "moof", "traf", "mfra", "udta", "meco", "strk"].forEach(function(a) {
  ISOBox.prototype._boxParsers[a] = function() {
    for (this.boxes = []; this._cursor.offset - this._raw.byteOffset < this._raw.byteLength;) this.boxes.push(ISOBox.parse(this))
  }
}), ISOBox.prototype._boxParsers.emsg = function() {
  this._parseFullBox(), this.scheme_id_uri = this._readTerminatedString(), this.value = this._readTerminatedString(), this.timescale = this._readUint(32), this.presentation_time_delta = this._readUint(32), this.event_duration = this._readUint(32), this.id = this._readUint(32), this.message_data = new DataView(this._raw.buffer, this._cursor.offset, this._raw.byteLength - (this._cursor.offset - this._offset))
}, ISOBox.prototype._boxParsers.free = ISOBox.prototype._boxParsers.skip = function() {
  this.data = new DataView(this._raw.buffer, this._cursor.offset, this._raw.byteLength - (this._cursor.offset - this._offset))
}, ISOBox.prototype._boxParsers.ftyp = ISOBox.prototype._boxParsers.styp = function() {
  for (this.major_brand = this._readString(4), this.minor_versions = this._readUint(32), this.compatible_brands = []; this._cursor.offset - this._raw.byteOffset < this._raw.byteLength;) this.compatible_brands.push(this._readString(4))
}, ISOBox.prototype._boxParsers.mdat = function() {
  this.data = new DataView(this._raw.buffer, this._cursor.offset, this._raw.byteLength - (this._cursor.offset - this._offset))
}, ISOBox.prototype._boxParsers.mdhd = function() {
  this._parseFullBox(), 1 == this.version ? (this.creation_time = this._readUint(64), this.modification_time = this._readUint(64), this.timescale = this._readUint(32), this.duration = this._readUint(64)) : (this.creation_time = this._readUint(32), this.modification_time = this._readUint(32), this.timescale = this._readUint(32), this.duration = this._readUint(32));
  var a = this._readUint(16);
  this.pad = a >> 15, this.language = String.fromCharCode((a >> 10 & 31) + 96, (a >> 5 & 31) + 96, (31 & a) + 96), this.pre_defined = this._readUint(16)
}, ISOBox.prototype._boxParsers.mfhd = function() {
  this._parseFullBox(), this.sequence_number = this._readUint(32)
}, ISOBox.prototype._boxParsers.mvhd = function() {
  this._parseFullBox(), 1 == this.version ? (this.creation_time = this._readUint(64), this.modification_time = this._readUint(64), this.timescale = this._readUint(32), this.duration = this._readUint(64)) : (this.creation_time = this._readUint(32), this.modification_time = this._readUint(32), this.timescale = this._readUint(32), this.duration = this._readUint(32)), this.rate = this._readTemplate(32), this.volume = this._readTemplate(16), this.reserved1 = this._readUint(16), this.reserved2 = [this._readUint(32), this._readUint(32)], this.matrix = [];
  for (var a = 0; 9 > a; a++) this.matrix.push(this._readTemplate(32));
  this.pre_defined = [];
  for (var a = 0; 6 > a; a++) this.pre_defined.push(this._readUint(32));
  this.next_track_ID = this._readUint(32)
}, ISOBox.prototype._boxParsers.sidx = function() {
  this._parseFullBox(), this.reference_ID = this._readUint(32), this.timescale = this._readUint(32), 0 == this.version ? (this.earliest_presentation_time = this._readUint(32), this.first_offset = this._readUint(32)) : (this.earliest_presentation_time = this._readUint(64), this.first_offset = this._readUint(64)), this.reserved = this._readUint(16), this.reference_count = this._readUint(16), this.references = [];
  for (var a = 0; a < this.reference_count; a++) {
    var b = {},
      c = this._readUint(32);
    b.reference_type = c >> 31 & 1, b.referenced_size = 2147483647 & c, b.subsegment_duration = this._readUint(32);
    var d = this._readUint(32);
    b.starts_with_SAP = d >> 31 & 1, b.SAP_type = d >> 28 & 7, b.SAP_delta_time = 268435455 & d, this.references.push(b)
  }
}, ISOBox.prototype._boxParsers.ssix = function() {
  this._parseFullBox(), this.subsegment_count = this._readUint(32), this.subsegments = [];
  for (var a = 0; a < this.subsegment_count; a++) {
    var b = {};
    b.ranges_count = this._readUint(32), b.ranges = [];
    for (var c = 0; c < b.ranges_count; c++) {
      var d = {};
      d.level = this._readUint(8), d.range_size = this._readUint(24), b.ranges.push(d)
    }
    this.subsegments.push(b)
  }
}, ISOBox.prototype._boxParsers.tkhd = function() {
  this._parseFullBox(), 1 == this.version ? (this.creation_time = this._readUint(64), this.modification_time = this._readUint(64), this.track_ID = this._readUint(32), this.reserved1 = this._readUint(32), this.duration = this._readUint(64)) : (this.creation_time = this._readUint(32), this.modification_time = this._readUint(32), this.track_ID = this._readUint(32), this.reserved1 = this._readUint(32), this.duration = this._readUint(32)), this.reserved2 = [this._readUint(32), this._readUint(32)], this.layer = this._readUint(16), this.alternate_group = this._readUint(16), this.volume = this._readTemplate(16), this.reserved3 = this._readUint(16), this.matrix = [];
  for (var a = 0; 9 > a; a++) this.matrix.push(this._readTemplate(32));
  this.width = this._readUint(32), this.height = this._readUint(32)
}, ISOBox.prototype._boxParsers.tfdt = function() {
  this._parseFullBox(), this.baseMediaDecodeTime = this._readUint(1 == this.version ? 64 : 32)
}, ISOBox.prototype._boxParsers.tfhd = function() {
  this._parseFullBox(), this.track_ID = this._readUint(32), 1 & this.flags && (this.base_data_offset = this._readUint(64)), 2 & this.flags && (this.sample_description_offset = this._readUint(32)), 8 & this.flags && (this.default_sample_duration = this._readUint(32)), 16 & this.flags && (this.default_sample_size = this._readUint(32)), 32 & this.flags && (this.default_sample_flags = this._readUint(32))
}, ISOBox.prototype._boxParsers.trun = function() {
  this._parseFullBox(), this.sample_count = this._readUint(32), 1 & this.flags && (this.data_offset = this._readInt(32)), 4 & this.flags && (this.first_sample_flags = this._readUint(32)), this.samples = [];
  for (var a = 0; a < this.sample_count; a++) {
    var b = {};
    256 & this.flags && (b.sample_duration = this._readUint(32)), 512 & this.flags && (b.sample_size = this._readUint(32)), 1024 & this.flags && (b.sample_flags = this._readUint(32)), 2048 & this.flags && (b.sample_composition_time_offset = 0 == this.version ? this._readUint(32) : this._readInt(32)), this.samples.push(b)
  }
};
var ISOBoxer = ISOBoxer || {};
ISOBoxer.parseBuffer = function(a) {
  return new ISOFile(a).parse()
}, ISOBoxer.Utils = {}, ISOBoxer.Utils.dataViewToString = function(a, b) {
  if ("undefined" != typeof TextDecoder) return new TextDecoder(b || "utf-8").decode(a);
  for (var c = "", d = 0; d < a.byteLength; d++) c += String.fromCharCode(a.getUint8(d));
  return c
}, "undefined" != typeof exports && (exports.parseBuffer = ISOBoxer.parseBuffer, exports.Utils = ISOBoxer.Utils);
var ISOFile = function(a) {
  this._raw = new DataView(a), this._cursor = new ISOBoxer.Cursor, this.boxes = []
};
ISOFile.prototype.fetch = function(a) {
    var b = this.fetchAll(a, !0);
    return b.length ? b[0] : null
  }, ISOFile.prototype.fetchAll = function(a, b) {
    var c = [];
    return ISOFile._sweep.call(this, a, c, b), c
  }, ISOFile.prototype.parse = function() {
    for (this._cursor.offset = 0, this.boxes = []; this._cursor.offset < this._raw.byteLength;) {
      var a = ISOBox.parse(this);
      if ("undefined" == typeof a.type) break;
      this.boxes.push(a)
    }
    return this
  }, ISOFile._sweep = function(a, b, c) {
    this.type && this.type == a && b.push(this);
    for (var d in this.boxes) {
      if (b.length && c) return;
      ISOFile._sweep.call(this.boxes[d], a, b, c)
    }
  }, MediaPlayer = function(a) {
    "use strict";
    var b, c, d, e, f, g, h, i, j, k, l, m, n, o = "1.5.1",
      p = 0,
      q = null,
      r = null,
      s = !1,
      t = !1,
      u = !1,
      v = !0,
      w = !1,
      x = MediaPlayer.dependencies.BufferController.BUFFER_SIZE_REQUIRED,
      y = !0,
      z = [],
      A = 4,
      B = !1,
      C = function() {
        return !!e && !!f && !t
      },
      D = function() {
        if (!s) throw "MediaPlayer not initialized!";
        if (!this.capabilities.supportsMediaSource()) return void this.errHandler.capabilityError("mediasource");
        if (!e || !f) throw "Missing view or source.";
        u = !0, this.debug.log("Playback initiated!"), g = b.getObject("streamController"), i.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING, g), i.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_TIME_UPDATED, g), i.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_CAN_PLAY, g), i.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_ERROR, g), i.setLiveDelayAttributes(A, B), b.mapValue("liveDelayFragmentCount", A), b.mapOutlet("liveDelayFragmentCount", "trackController"), g.initialize(v, q, r), n.checkInitialBitrate(), "string" == typeof f ? g.load(f) : g.loadWithManifest(f), g.setUTCTimingSources(z, y), b.mapValue("scheduleWhilePaused", w), b.mapOutlet("scheduleWhilePaused", "stream"), b.mapOutlet("scheduleWhilePaused", "scheduleController"), b.mapValue("numOfParallelRequestAllowed", p), b.mapOutlet("numOfParallelRequestAllowed", "scheduleController"), b.mapValue("bufferMax", x), b.mapOutlet("bufferMax", "bufferController"), h.initialize()
      },
      E = function() {
        C() && D.call(this)
      },
      F = function() {
        var a = k.getReadOnlyMetricsFor("video") || k.getReadOnlyMetricsFor("audio");
        return j.getCurrentDVRInfo(a)
      },
      G = function() {
        return F.call(this).manifestInfo.DVRWindowSize
      },
      H = function(a) {
        var b = F.call(this),
          c = b.range.start + a;
        return c > b.range.end && (c = b.range.end), c
      },
      I = function(a) {
        var b = i.getIsDynamic() ? this.getDVRSeekOffset(a) : a;
        this.getVideoModel().setCurrentTime(b)
      },
      J = function() {
        var a = l.getCurrentTime();
        if (i.getIsDynamic()) {
          var b = F.call(this);
          a = null === b ? 0 : this.duration() - (b.range.end - b.time)
        }
        return a
      },
      K = function() {
        var a = l.getElement().duration;
        if (i.getIsDynamic()) {
          var b, c = F.call(this);
          if (null === c) return 0;
          b = c.range.end - c.range.start, a = b < c.manifestInfo.DVRWindowSize ? b : c.manifestInfo.DVRWindowSize
        }
        return a
      },
      L = function(a) {
        var b, c, d = F.call(this);
        return null === d ? 0 : (b = d.manifestInfo.availableFrom.getTime() / 1e3, c = a + (b + d.range.start))
      },
      M = function() {
        return L.call(this, this.time())
      },
      N = function() {
        return L.call(this, this.duration())
      },
      O = function(a, b, c) {
        var d = new Date(1e3 * a),
          e = d.toLocaleDateString(b),
          f = d.toLocaleTimeString(b, {
            hour12: c
          });
        return f + " " + e
      },
      P = function(a) {
        a = Math.max(a, 0);
        var b = Math.floor(a / 3600),
          c = Math.floor(a % 3600 / 60),
          d = Math.floor(a % 3600 % 60);
        return (0 === b ? "" : 10 > b ? "0" + b.toString() + ":" : b.toString() + ":") + (10 > c ? "0" + c.toString() : c.toString()) + ":" + (10 > d ? "0" + d.toString() : d.toString());
      },
      Q = function(a, b, c) {
        b && void 0 !== a && null !== a && (c ? h.setRules(a, b) : h.addRules(a, b))
      },
      R = function() {
        var a = g.getActiveStreamInfo();
        return a ? g.getStreamById(a.id) : null
      },
      S = function() {
        if (this.adapter.reset(), u && g) {
          if (!t) {
            t = !0, i.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING, g), i.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_TIME_UPDATED, g), i.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_CAN_PLAY, g), i.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_ERROR, g);
            var a = {},
              b = this;
            a[MediaPlayer.dependencies.StreamController.eventList.ENAME_TEARDOWN_COMPLETE] = function() {
              c.reset(), h.reset(), i.reset(), d.reset(), g = null, u = !1, t = !1, C.call(b) && E.call(b)
            }, g.subscribe(MediaPlayer.dependencies.StreamController.eventList.ENAME_TEARDOWN_COMPLETE, a, void 0, !0), g.reset()
          }
        } else C.call(this) && E.call(this)
      },
      T = dijon.System.prototype.getObject;
    dijon.System.prototype.getObject = function(a) {
      var b = T.call(this, a);
      return "object" != typeof b || b.getName || (b.getName = function() {
        return a
      }, b.setMediaType = function(a) {
        b.mediaType = a
      }, b.getMediaType = function() {
        return b.mediaType
      }), b
    }, b = new dijon.System, b.mapValue("system", b), b.mapOutlet("system"), b.mapValue("eventBus", new MediaPlayer.utils.EventBus), b.mapOutlet("eventBus");
    var U = new MediaPlayer.utils.Debug;
    return b.mapValue("debug", U), b.mapOutlet("debug"), b.injectInto(U), U.setup(), b.injectInto(a), {
      notifier: void 0,
      debug: void 0,
      eventBus: void 0,
      capabilities: void 0,
      adapter: void 0,
      errHandler: void 0,
      uriQueryFragModel: void 0,
      videoElementExt: void 0,
      setup: function() {
        j = b.getObject("metricsExt"), c = b.getObject("abrController"), h = b.getObject("rulesController"), k = b.getObject("metricsModel"), n = b.getObject("DOMStorage"), i = b.getObject("playbackController"), d = b.getObject("mediaController"), this.restoreDefaultUTCTimingSources(), this.debug.log("[dash.js " + o + "] new MediaPlayer instance has been created")
      },
      addEventListener: function(a, b, c) {
        a = a.toLowerCase(), this.eventBus.addEventListener(a, b, c)
      },
      removeEventListener: function(a, b, c) {
        a = a.toLowerCase(), this.eventBus.removeEventListener(a, b, c)
      },
      getVersion: function() {
        return o
      },
      getObjectByContextName: function(a) {
        return b.getObject(a)
      },
      startup: function() {
        s || (b.injectInto(this), s = !0)
      },
      getDebug: function() {
        return this.debug
      },
      getVideoModel: function() {
        return l
      },
      getVideoContainer: function() {
        return l ? l.getVideoContainer() : null
      },
      setLiveDelayFragmentCount: function(a) {
        A = a
      },
      useSuggestedPresentationDelay: function(a) {
        B = a
      },
      enableLastBitrateCaching: function(a, b) {
        n.enableLastBitrateCaching(a, b)
      },
      enableLastMediaSettingsCaching: function(a, b) {
        n.enableLastMediaSettingsCaching(a, b)
      },
      setNumOfParallelRequestAllowed: function(a) {
        p = a
      },
      setMaxAllowedBitrateFor: function(a, b) {
        c.setMaxAllowedBitrateFor(a, b)
      },
      getMaxAllowedBitrateFor: function(a) {
        return c.getMaxAllowedBitrateFor(a)
      },
      setAutoPlay: function(a) {
        v = a
      },
      getAutoPlay: function() {
        return v
      },
      setScheduleWhilePaused: function(a) {
        w = a
      },
      getScheduleWhilePaused: function() {
        return w
      },
      setBufferMax: function(a) {
        x = a
      },
      getBufferMax: function() {
        return x
      },
      getMetricsExt: function() {
        return j
      },
      getMetricsFor: function(a) {
        return k.getReadOnlyMetricsFor(a)
      },
      getQualityFor: function(a) {
        return c.getQualityFor(a, g.getActiveStreamInfo())
      },
      setQualityFor: function(a, b) {
        c.setPlaybackQuality(a, g.getActiveStreamInfo(), b)
      },
      setTextTrack: function(a) {
        void 0 === m && (m = b.getObject("textSourceBuffer"));
        for (var c = e.textTracks, d = c.length, f = 0; d > f; f++) {
          var g = c[f],
            h = a === f ? "showing" : "hidden";
          g.mode !== h && (g.mode = h)
        }
        m.setTextTrack()
      },
      getBitrateInfoListFor: function(a) {
        var b = R.call(this);
        return b ? b.getBitrateListFor(a) : []
      },
      setInitialBitrateFor: function(a, b) {
        c.setInitialBitrateFor(a, b)
      },
      getInitialBitrateFor: function(a) {
        return c.getInitialBitrateFor(a)
      },
      getStreamsFromManifest: function(a) {
        return this.adapter.getStreamsInfo(a)
      },
      getTracksFor: function(a) {
        var b = g ? g.getActiveStreamInfo() : null;
        return b ? d.getTracksFor(a, b) : []
      },
      getTracksForTypeFromManifest: function(a, b, c) {
        return c = c || this.adapter.getStreamsInfo(b)[0], c ? this.adapter.getAllMediaInfoForType(b, c, a) : []
      },
      getCurrentTrackFor: function(a) {
        var b = g ? g.getActiveStreamInfo() : null;
        return b ? d.getCurrentTrackFor(a, b) : null
      },
      setInitialMediaSettingsFor: function(a, b) {
        d.setInitialSettings(a, b)
      },
      getInitialMediaSettingsFor: function(a) {
        return d.getInitialSettings(a)
      },
      setCurrentTrack: function(a) {
        d.setTrack(a)
      },
      getTrackSwitchModeFor: function(a) {
        return d.getSwitchMode(a)
      },
      setTrackSwitchModeFor: function(a, b) {
        d.setSwitchMode(a, b)
      },
      setSelectionModeForInitialTrack: function(a) {
        d.setSelectionModeForInitialTrack(a)
      },
      getSelectionModeForInitialTrack: function() {
        return d.getSelectionModeForInitialTrack()
      },
      getAutoSwitchQuality: function() {
        return c.getAutoSwitchBitrate()
      },
      setAutoSwitchQuality: function(a) {
        c.setAutoSwitchBitrate(a)
      },
      setSchedulingRules: function(a) {
        Q.call(this, h.SCHEDULING_RULE, a, !0)
      },
      addSchedulingRules: function(a) {
        Q.call(this, h.SCHEDULING_RULE, a, !1)
      },
      setABRRules: function(a) {
        Q.call(this, h.ABR_RULE, a, !0)
      },
      addABRRules: function(a) {
        Q.call(this, h.ABR_RULE, a, !1)
      },
      createProtection: function() {
        return b.getObject("protectionController")
      },
      retrieveManifest: function(a, c) {
        ! function(a) {
          var d = b.getObject("manifestLoader"),
            e = b.getObject("uriQueryFragModel"),
            f = {};
          f[MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED] = function(a) {
            a.error ? c(null, a.error) : c(a.data.manifest), d.unsubscribe(MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED, this)
          }, d.subscribe(MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED, f), d.load(e.parseURI(a))
        }(a)
      },
      addUTCTimingSource: function(a, b) {
        this.removeUTCTimingSource(a, b);
        var c = new Dash.vo.UTCTiming;
        c.schemeIdUri = a, c.value = b, z.push(c)
      },
      removeUTCTimingSource: function(a, b) {
        z.forEach(function(c, d) {
          c.schemeIdUri === a && c.value === b && z.splice(d, 1)
        })
      },
      clearDefaultUTCTimingSources: function() {
        z = []
      },
      restoreDefaultUTCTimingSources: function() {
        this.addUTCTimingSource(MediaPlayer.UTCTimingSources["default"].scheme, MediaPlayer.UTCTimingSources["default"].value)
      },
      enableManifestDateHeaderTimeSource: function(a) {
        y = a
      },
      displayCaptionsOnTop: function(a) {
        var c = b.getObject("textTrackExtensions");
        c.displayCConTop(a)
      },
      attachVideoContainer: function(a) {
        if (!l) throw "Must call attachView with video element before you attach container element";
        l.setVideoContainer(a)
      },
      attachView: function(a) {
        if (!s) throw "MediaPlayer not initialized!";
        e = a, l = null, e && (l = b.getObject("videoModel"), l.setElement(e), e.preload = "auto"), S.call(this)
      },
      attachTTMLRenderingDiv: function(a) {
        if (!l) throw "Must call attachView with video element before you attach TTML Rendering Div";
        l.setTTMLRenderingDiv(a)
      },
      attachSource: function(a, b, c) {
        if (!s) throw "MediaPlayer not initialized!";
        "string" == typeof a ? (this.uriQueryFragModel.reset(), f = this.uriQueryFragModel.parseURI(a)) : f = a, q = b, r = c, S.call(this)
      },
      reset: function() {
        this.attachSource(null), this.attachView(null), q = null, r = null
      },
      play: D,
      isReady: C,
      seek: I,
      time: J,
      duration: K,
      timeAsUTC: M,
      durationAsUTC: N,
      getDVRWindowSize: G,
      getDVRSeekOffset: H,
      formatUTC: O,
      convertToTimeCode: P
    }
  }, MediaPlayer.prototype = {
    constructor: MediaPlayer
  }, MediaPlayer.dependencies = {}, MediaPlayer.dependencies.protection = {}, MediaPlayer.dependencies.protection.servers = {}, MediaPlayer.utils = {}, MediaPlayer.models = {}, MediaPlayer.vo = {}, MediaPlayer.vo.metrics = {}, MediaPlayer.vo.protection = {}, MediaPlayer.rules = {}, MediaPlayer.di = {}, MediaPlayer.UTCTimingSources = {
    "default": {
      scheme: "urn:mpeg:dash:utc:http-xsdate:2014",
      value: "http://time.akamai.com/?iso"
    }
  }, MediaPlayer.events = {
    RESET_COMPLETE: "resetComplete",
    METRICS_CHANGED: "metricschanged",
    METRIC_CHANGED: "metricchanged",
    METRIC_UPDATED: "metricupdated",
    METRIC_ADDED: "metricadded",
    MANIFEST_LOADED: "manifestloaded",
    PROTECTION_CREATED: "protectioncreated",
    PROTECTION_DESTROYED: "protectiondestroyed",
    STREAM_SWITCH_STARTED: "streamswitchstarted",
    STREAM_SWITCH_COMPLETED: "streamswitchcompleted",
    STREAM_INITIALIZED: "streaminitialized",
    TEXT_TRACK_ADDED: "texttrackadded",
    TEXT_TRACKS_ADDED: "alltexttracksadded",
    BUFFER_LOADED: "bufferloaded",
    BUFFER_EMPTY: "bufferstalled",
    ERROR: "error",
    LOG: "log"
  }, MediaPlayer.di.Context = function() {
    "use strict";
    var a = function() {
      var a = document.createElement("video");
      MediaPlayer.models.ProtectionModel_21Jan2015.detect(a) ? this.system.mapClass("protectionModel", MediaPlayer.models.ProtectionModel_21Jan2015) : MediaPlayer.models.ProtectionModel_3Feb2014.detect(a) ? this.system.mapClass("protectionModel", MediaPlayer.models.ProtectionModel_3Feb2014) : MediaPlayer.models.ProtectionModel_01b.detect(a) ? this.system.mapClass("protectionModel", MediaPlayer.models.ProtectionModel_01b) : (this.debug.log("No supported version of EME detected on this user agent!"), this.debug.log("Attempts to play encrypted content will fail!"))
    };
    return {
      system: void 0,
      setup: function() {
        this.system.autoMapOutlets = !0, this.system.mapClass("eventBusCl", MediaPlayer.utils.EventBus), this.system.mapSingleton("capabilities", MediaPlayer.utils.Capabilities), this.system.mapSingleton("DOMStorage", MediaPlayer.utils.DOMStorage), this.system.mapClass("customTimeRanges", MediaPlayer.utils.CustomTimeRanges), this.system.mapSingleton("virtualBuffer", MediaPlayer.utils.VirtualBuffer), this.system.mapClass("isoFile", MediaPlayer.utils.IsoFile), this.system.mapSingleton("textTrackExtensions", MediaPlayer.utils.TextTrackExtensions), this.system.mapSingleton("vttParser", MediaPlayer.utils.VTTParser), this.system.mapSingleton("ttmlParser", MediaPlayer.utils.TTMLParser), this.system.mapSingleton("boxParser", MediaPlayer.utils.BoxParser), this.system.mapSingleton("videoModel", MediaPlayer.models.VideoModel), this.system.mapSingleton("manifestModel", MediaPlayer.models.ManifestModel), this.system.mapSingleton("metricsModel", MediaPlayer.models.MetricsModel), this.system.mapSingleton("uriQueryFragModel", MediaPlayer.models.URIQueryAndFragmentModel), this.system.mapSingleton("ksPlayReady", MediaPlayer.dependencies.protection.KeySystem_PlayReady), this.system.mapSingleton("ksWidevine", MediaPlayer.dependencies.protection.KeySystem_Widevine), this.system.mapSingleton("ksClearKey", MediaPlayer.dependencies.protection.KeySystem_ClearKey), this.system.mapSingleton("serverPlayReady", MediaPlayer.dependencies.protection.servers.PlayReady), this.system.mapSingleton("serverWidevine", MediaPlayer.dependencies.protection.servers.Widevine), this.system.mapSingleton("serverClearKey", MediaPlayer.dependencies.protection.servers.ClearKey), this.system.mapSingleton("serverDRMToday", MediaPlayer.dependencies.protection.servers.DRMToday), this.system.mapSingleton("requestModifierExt", MediaPlayer.dependencies.RequestModifierExtensions), this.system.mapSingleton("textSourceBuffer", MediaPlayer.dependencies.TextSourceBuffer), this.system.mapSingleton("mediaSourceExt", MediaPlayer.dependencies.MediaSourceExtensions), this.system.mapSingleton("sourceBufferExt", MediaPlayer.dependencies.SourceBufferExtensions), this.system.mapSingleton("abrController", MediaPlayer.dependencies.AbrController), this.system.mapSingleton("errHandler", MediaPlayer.dependencies.ErrorHandler), this.system.mapSingleton("videoExt", MediaPlayer.dependencies.VideoModelExtensions), this.system.mapSingleton("protectionExt", MediaPlayer.dependencies.ProtectionExtensions), this.system.mapClass("protectionController", MediaPlayer.dependencies.ProtectionController), this.system.mapSingleton("playbackController", MediaPlayer.dependencies.PlaybackController), a.call(this), this.system.mapSingleton("liveEdgeFinder", MediaPlayer.dependencies.LiveEdgeFinder), this.system.mapClass("metrics", MediaPlayer.models.MetricsList), this.system.mapClass("insufficientBufferRule", MediaPlayer.rules.InsufficientBufferRule), this.system.mapClass("bufferOccupancyRule", MediaPlayer.rules.BufferOccupancyRule), this.system.mapClass("throughputRule", MediaPlayer.rules.ThroughputRule), this.system.mapSingleton("abrRulesCollection", MediaPlayer.rules.ABRRulesCollection), this.system.mapSingleton("rulesController", MediaPlayer.rules.RulesController), this.system.mapClass("bufferLevelRule", MediaPlayer.rules.BufferLevelRule), this.system.mapClass("pendingRequestsRule", MediaPlayer.rules.PendingRequestsRule), this.system.mapClass("playbackTimeRule", MediaPlayer.rules.PlaybackTimeRule), this.system.mapClass("sameTimeRequestRule", MediaPlayer.rules.SameTimeRequestRule), this.system.mapClass("abandonRequestRule", MediaPlayer.rules.AbandonRequestsRule), this.system.mapSingleton("scheduleRulesCollection", MediaPlayer.rules.ScheduleRulesCollection), this.system.mapClass("liveEdgeBinarySearchRule", MediaPlayer.rules.LiveEdgeBinarySearchRule), this.system.mapClass("liveEdgeWithTimeSynchronizationRule", MediaPlayer.rules.LiveEdgeWithTimeSynchronizationRule), this.system.mapSingleton("synchronizationRulesCollection", MediaPlayer.rules.SynchronizationRulesCollection), this.system.mapClass("xlinkController", MediaPlayer.dependencies.XlinkController), this.system.mapClass("xlinkLoader", MediaPlayer.dependencies.XlinkLoader), this.system.mapClass("streamProcessor", MediaPlayer.dependencies.StreamProcessor), this.system.mapClass("eventController", MediaPlayer.dependencies.EventController), this.system.mapClass("textController", MediaPlayer.dependencies.TextController), this.system.mapClass("bufferController", MediaPlayer.dependencies.BufferController), this.system.mapClass("manifestLoader", MediaPlayer.dependencies.ManifestLoader), this.system.mapSingleton("manifestUpdater", MediaPlayer.dependencies.ManifestUpdater), this.system.mapClass("fragmentController", MediaPlayer.dependencies.FragmentController), this.system.mapClass("fragmentLoader", MediaPlayer.dependencies.FragmentLoader), this.system.mapClass("fragmentModel", MediaPlayer.dependencies.FragmentModel), this.system.mapSingleton("streamController", MediaPlayer.dependencies.StreamController), this.system.mapSingleton("mediaController", MediaPlayer.dependencies.MediaController), this.system.mapClass("stream", MediaPlayer.dependencies.Stream), this.system.mapClass("scheduleController", MediaPlayer.dependencies.ScheduleController), this.system.mapSingleton("timeSyncController", MediaPlayer.dependencies.TimeSyncController), this.system.mapSingleton("notifier", MediaPlayer.dependencies.Notifier)
      }
    }
  }, Dash = function() {
    "use strict";
    return {
      modules: {},
      dependencies: {},
      vo: {},
      di: {}
    }
  }(), Dash.di.DashContext = function() {
    "use strict";
    return {
      system: void 0,
      debug: void 0,
      setup: function() {
        Dash.di.DashContext.prototype.setup.call(this), this.system.mapClass("parser", Dash.dependencies.DashParser), this.system.mapClass("indexHandler", Dash.dependencies.DashHandler), this.system.mapSingleton("baseURLExt", Dash.dependencies.BaseURLExtensions), this.system.mapClass("fragmentExt", Dash.dependencies.FragmentExtensions), this.system.mapClass("representationController", Dash.dependencies.RepresentationController), this.system.mapSingleton("manifestExt", Dash.dependencies.DashManifestExtensions), this.system.mapSingleton("metricsExt", Dash.dependencies.DashMetricsExtensions), this.system.mapSingleton("timelineConverter", Dash.dependencies.TimelineConverter), this.system.mapSingleton("adapter", Dash.dependencies.DashAdapter)
      }
    }
  }, Dash.di.DashContext.prototype = new MediaPlayer.di.Context, Dash.di.DashContext.prototype.constructor = Dash.di.DashContext, Dash.dependencies.DashAdapter = function() {
    "use strict";
    var a = [],
      b = {},
      c = function(a, b) {
        return b.getRepresentationForQuality(a.quality)
      },
      d = function(a) {
        return b[a.streamInfo.id][a.index]
      },
      e = function(b) {
        var c, d = a.length,
          e = 0;
        for (e; d > e; e += 1)
          if (c = a[e], b.id === c.id) return c;
        return null
      },
      f = function(a, b) {
        var c = new MediaPlayer.vo.TrackInfo,
          d = b.adaptation.period.mpd.manifest.Period_asArray[b.adaptation.period.index].AdaptationSet_asArray[b.adaptation.index],
          e = this.manifestExt.getRepresentationFor(b.index, d);
        return c.id = b.id, c.quality = b.index, c.bandwidth = this.manifestExt.getBandwidth(e), c.DVRWindow = b.segmentAvailabilityRange, c.fragmentDuration = b.segmentDuration || (b.segments && b.segments.length > 0 ? b.segments[0].duration : NaN), c.MSETimeOffset = b.MSETimeOffset, c.useCalculatedLiveEdgeTime = b.useCalculatedLiveEdgeTime, c.mediaInfo = g.call(this, a, b.adaptation), c
      },
      g = function(a, b) {
        var c, d = new MediaPlayer.vo.MediaInfo,
          e = this,
          f = b.period.mpd.manifest.Period_asArray[b.period.index].AdaptationSet_asArray[b.index];
        return d.id = b.id, d.index = b.index, d.type = b.type, d.streamInfo = h.call(this, a, b.period), d.representationCount = this.manifestExt.getRepresentationCount(f), d.lang = this.manifestExt.getLanguageForAdaptation(f), c = this.manifestExt.getViewpointForAdaptation(f), d.viewpoint = c ? c.value : void 0, d.accessibility = this.manifestExt.getAccessibilityForAdaptation(f).map(function(a) {
          return a.value
        }), d.audioChannelConfiguration = this.manifestExt.getAudioChannelConfigurationForAdaptation(f).map(function(a) {
          return a.value
        }), d.roles = this.manifestExt.getRolesForAdaptation(f).map(function(a) {
          return a.value
        }), d.codec = this.manifestExt.getCodec(f), d.mimeType = this.manifestExt.getMimeType(f), d.contentProtection = this.manifestExt.getContentProtectionData(f), d.bitrateList = this.manifestExt.getBitrateListForAdaptation(f), d.contentProtection && d.contentProtection.forEach(function(a) {
          a.KID = e.manifestExt.getKID(a)
        }), d.isText = this.manifestExt.getIsTextTrack(d.mimeType), d
      },
      h = function(a, b) {
        var c = new MediaPlayer.vo.StreamInfo,
          d = 1;
        return c.id = b.id, c.index = b.index, c.start = b.start, c.duration = b.duration, c.manifestInfo = i.call(this, a, b.mpd), c.isLast = 1 === a.Period_asArray.length || Math.abs(c.start + c.duration - c.manifestInfo.duration) < d, c
      },
      i = function(a, b) {
        var c = new MediaPlayer.vo.ManifestInfo;
        return c.DVRWindowSize = b.timeShiftBufferDepth, c.loadedTime = b.manifest.loadedTime, c.availableFrom = b.availabilityStartTime, c.minBufferTime = b.manifest.minBufferTime, c.maxFragmentDuration = b.maxSegmentDuration, c.duration = this.manifestExt.getDuration(a), c.isDynamic = this.manifestExt.getIsDynamic(a), c
      },
      j = function(a, c, d) {
        var f, h = e(c),
          i = h.id,
          j = this.manifestExt.getAdaptationForType(a, c.index, d);
        return j ? (f = this.manifestExt.getIndexForAdaptation(j, a, c.index), b[i] = b[i] || this.manifestExt.getAdaptationsForPeriod(a, h), g.call(this, a, b[i][f])) : null
      },
      k = function(a, c, d) {
        var f, h, i, j = e(c),
          k = j.id,
          l = this.manifestExt.getAdaptationsForType(a, c.index, d),
          m = [];
        if (!l) return m;
        b[k] = b[k] || this.manifestExt.getAdaptationsForPeriod(a, j);
        for (var n = 0, o = l.length; o > n; n += 1) f = l[n], i = this.manifestExt.getIndexForAdaptation(f, a, c.index), h = g.call(this, a, b[k][i]), h && m.push(h);
        return m
      },
      l = function(c) {
        var d, e, f, g = [];
        if (!c) return null;
        for (d = this.manifestExt.getMpd(c), a = this.manifestExt.getRegularPeriods(c, d), d.checkTime = this.manifestExt.getCheckTime(c, a[0]), b = {}, e = a.length, f = 0; e > f; f += 1) g.push(h.call(this, c, a[f]));
        return g
      },
      m = function(a) {
        var b = this.manifestExt.getMpd(a);
        return i.call(this, a, b)
      },
      n = function(a, b) {
        var c = a.representationController.getRepresentationForQuality(b);
        return a.indexHandler.getInitRequest(c)
      },
      o = function(a, b) {
        var d = c(b, a.representationController);
        return a.indexHandler.getNextSegmentRequest(d)
      },
      p = function(a, b, d, e) {
        var f = c(b, a.representationController);
        return a.indexHandler.getSegmentRequestForTime(f, d, e)
      },
      q = function(a, b, d) {
        var e = c(b, a.representationController);
        return a.indexHandler.generateSegmentRequestForTime(e, d)
      },
      r = function(a) {
        return a.indexHandler.getCurrentTime()
      },
      s = function(a, b) {
        return a.indexHandler.setCurrentTime(b)
      },
      t = function(a, b) {
        var c, f, g = e(b.getStreamInfo()),
          h = b.getMediaInfo(),
          i = d(h),
          j = b.getType();
        c = h.id, f = c ? this.manifestExt.getAdaptationForId(c, a, g.index) : this.manifestExt.getAdaptationForIndex(h.index, a, g.index), b.representationController.updateData(f, i, j)
      },
      u = function(a, b, c) {
        var d = b.getRepresentationForQuality(c);
        return d ? f.call(this, a, d) : null
      },
      v = function(a, b) {
        var c = b.getCurrentRepresentation();
        return c ? f.call(this, a, c) : null
      },
      w = function(a, b, c) {
        var d = new Dash.vo.Event,
          e = a.scheme_id_uri,
          f = a.value,
          g = a.timescale,
          h = a.presentation_time_delta,
          i = a.event_duration,
          j = a.id,
          k = a.message_data,
          l = c * g + h;
        return b[e] ? (d.eventStream = b[e], d.eventStream.value = f, d.eventStream.timescale = g, d.duration = i, d.id = j, d.presentationTime = l, d.messageData = k, d.presentationTimeDelta = h, d) : null
      },
      x = function(a, b, f) {
        var g = [];
        return b instanceof MediaPlayer.vo.StreamInfo ? g = this.manifestExt.getEventsForPeriod(a, e(b)) : b instanceof MediaPlayer.vo.MediaInfo ? g = this.manifestExt.getEventStreamForAdaptationSet(a, d(b)) : b instanceof MediaPlayer.vo.TrackInfo && (g = this.manifestExt.getEventStreamForRepresentation(a, c(b, f.representationController))), g
      };
    return {
      system: void 0,
      manifestExt: void 0,
      timelineConverter: void 0,
      metricsList: {
        TCP_CONNECTION: "TcpConnection",
        HTTP_REQUEST: "HttpRequest",
        HTTP_REQUEST_TRACE: "HttpRequestTrace",
        TRACK_SWITCH: "RepresentationSwitch",
        BUFFER_LEVEL: "BufferLevel",
        BUFFER_STATE: "BufferState",
        DVR_INFO: "DVRInfo",
        DROPPED_FRAMES: "DroppedFrames",
        SCHEDULING_INFO: "SchedulingInfo",
        REQUESTS_QUEUE: "RequestsQueue",
        MANIFEST_UPDATE: "ManifestUpdate",
        MANIFEST_UPDATE_STREAM_INFO: "ManifestUpdatePeriodInfo",
        MANIFEST_UPDATE_TRACK_INFO: "ManifestUpdateRepresentationInfo",
        PLAY_LIST: "PlayList",
        PLAY_LIST_TRACE: "PlayListTrace"
      },
      convertDataToTrack: f,
      convertDataToMedia: g,
      convertDataToStream: h,
      getDataForTrack: c,
      getDataForMedia: d,
      getDataForStream: e,
      getStreamsInfo: l,
      getManifestInfo: m,
      getMediaInfoForType: j,
      getAllMediaInfoForType: k,
      getCurrentRepresentationInfo: v,
      getRepresentationInfoForQuality: u,
      updateData: t,
      getInitRequest: n,
      getNextFragmentRequest: o,
      getFragmentRequestForTime: p,
      generateFragmentRequestForTime: q,
      getIndexHandlerTime: r,
      setIndexHandlerTime: s,
      getEventsFor: x,
      getEvent: w,
      reset: function() {
        a = [], b = {}
      }
    }
  }, Dash.dependencies.DashAdapter.prototype = {
    constructor: Dash.dependencies.DashAdapter
  }, Dash.create = function(a, b, c) {
    if ("undefined" == typeof a || "VIDEO" != a.nodeName) return null;
    var d, e = a.id || a.name || "video element";
    if (c = c || new Dash.di.DashContext, b = b || [].slice.call(a.querySelectorAll("source")).filter(function(a) {
        return a.type == Dash.supportedManifestMimeTypes.mimeType
      })[0], void 0 === b && a.src) b = document.createElement("source"), b.src = a.src;
    else if (void 0 === b && !a.src) return null;
    return d = new MediaPlayer(c), d.startup(), d.attachView(a), d.setAutoPlay(a.autoplay), d.attachSource(b.src), d.getDebug().log("Converted " + e + " to dash.js player and added content: " + b.src), d
  }, Dash.createAll = function(a, b, c) {
    var d = [];
    a = a || ".dashjs-player", b = b || document, c = c || new Dash.di.DashContext;
    for (var e = b.querySelectorAll(a), f = 0; f < e.length; f++) {
      var g = Dash.create(e[f], void 0, c);
      d.push(g)
    }
    return d
  }, Dash.supportedManifestMimeTypes = {
    mimeType: "application/dash+xml"
  }, Dash.dependencies.DashHandler = function() {
    "use strict";
    var a, b, c, d = -1,
      e = 0,
      f = new RegExp("^(?:(?:[a-z]+:)?/)?/", "i"),
      g = function(a, b) {
        for (; a.length < b;) a = "0" + a;
        return a
      },
      h = function(a, b, c) {
        for (var d, e, f, h, i, j, k = b.length, l = "%0", m = l.length;;) {
          if (d = a.indexOf("$" + b), 0 > d) return a;
          if (e = a.indexOf("$", d + k), 0 > e) return a;
          if (f = a.indexOf(l, d + k), f > d && e > f) switch (h = a.charAt(e - 1), i = parseInt(a.substring(f + m, e - 1), 10), h) {
            case "d":
            case "i":
            case "u":
              j = g(c.toString(), i);
              break;
            case "x":
              j = g(c.toString(16), i);
              break;
            case "X":
              j = g(c.toString(16), i).toUpperCase();
              break;
            case "o":
              j = g(c.toString(8), i);
              break;
            default:
              return this.log("Unsupported/invalid IEEE 1003.1 format identifier string in URL"), a
          } else j = c;
          a = a.substring(0, d) + j + a.substring(e + 1)
        }
      },
      i = function(a) {
        return a.split("$$").join("$")
      },
      j = function(a, b) {
        if (null === b || -1 === a.indexOf("$RepresentationID$")) return a;
        var c = b.toString();
        return a.split("$RepresentationID$").join(c)
      },
      k = function(a, b) {
        return a.representation.startNumber + b
      },
      l = function(a, b) {
        var c, d = b.adaptation.period.mpd.manifest.Period_asArray[b.adaptation.period.index].AdaptationSet_asArray[b.adaptation.index].Representation_asArray[b.index].BaseURL;
        return c = a === d ? a : f.test(a) ? a : d + a
      },
      m = function(a, c) {
        var d, e, f = this,
          g = new MediaPlayer.vo.FragmentRequest;
        return d = a.adaptation.period, g.mediaType = c, g.type = MediaPlayer.vo.metrics.HTTPRequest.INIT_SEGMENT_TYPE, g.url = l(a.initialization, a), g.range = a.range, e = d.start, g.availabilityStartTime = f.timelineConverter.calcAvailabilityStartTimeFromPresentationTime(e, a.adaptation.period.mpd, b), g.availabilityEndTime = f.timelineConverter.calcAvailabilityEndTimeFromPresentationTime(e + d.duration, d.mpd, b), g.quality = a.index, g.mediaInfo = f.streamProcessor.getMediaInfo(), g
      },
      n = function(a) {
        var b, d = this;
        return a ? b = m.call(d, a, c) : null
      },
      o = function(a) {
        var c, e, f, g = a.adaptation.period,
          h = !1,
          i = a.segmentInfoType;
        return 0 > d ? h = !1 : b || d < a.availableSegmentsNumber ? (e = B(d, a), e && (f = e.presentationStartTime - g.start, c = a.adaptation.period.duration, this.log(a.segmentInfoType + ": " + f + " / " + c), h = "SegmentTimeline" === i ? !1 : f >= c)) : h = !0, h
      },
      p = function(a, c) {
        var d, e, f, g, h = this;
        return e = a.segmentDuration, isNaN(e) && (e = a.adaptation.period.duration), f = a.adaptation.period.start + c * e, g = f + e, d = new Dash.vo.Segment, d.representation = a, d.duration = e, d.presentationStartTime = f, d.mediaStartTime = h.timelineConverter.calcMediaTimeFromPresentationTime(d.presentationStartTime, a), d.availabilityStartTime = h.timelineConverter.calcAvailabilityStartTimeFromPresentationTime(d.presentationStartTime, a.adaptation.period.mpd, b), d.availabilityEndTime = h.timelineConverter.calcAvailabilityEndTimeFromPresentationTime(g, a.adaptation.period.mpd, b), d.wallStartTime = h.timelineConverter.calcWallTimeForSegment(d, b), d.replacementNumber = k(d, c), d.availabilityIdx = c, d
      },
      q = function(c) {
        var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r = this,
          s = c.adaptation.period.mpd.manifest.Period_asArray[c.adaptation.period.index].AdaptationSet_asArray[c.adaptation.index].Representation_asArray[c.index].SegmentTemplate,
          v = s.SegmentTimeline,
          w = c.availableSegmentsNumber > 0,
          x = 10,
          y = [],
          z = 0,
          A = 0,
          B = -1,
          C = !1,
          D = function(a) {
            return u.call(r, c, z, a.d, q, s.media, a.mediaRange, B)
          };
        for (q = c.timescale, d = v.S_asArray, l = t.call(r, c), l ? (o = l.start, p = l.end) : n = r.timelineConverter.calcMediaTimeFromPresentationTime(a || 0, c), f = 0, g = d.length; g > f; f += 1) {
          if (e = d[f], i = 0, e.hasOwnProperty("r") && (i = e.r), e.hasOwnProperty("t") && (z = e.t, A = z / q), 0 > i) {
            if (k = d[f + 1], k && k.hasOwnProperty("t")) j = k.t / q;
            else {
              var E = c.segmentAvailabilityRange ? c.segmentAvailabilityRange.end : this.timelineConverter.calcSegmentAvailabilityRange(c, b).end;
              j = r.timelineConverter.calcMediaTimeFromPresentationTime(E, c), c.segmentDuration = e.d / q
            }
            i = Math.ceil((j - A) / (e.d / q)) - 1
          }
          if (m) {
            if (w) break;
            B += i + 1
          } else
            for (h = 0; i >= h; h += 1) {
              if (B += 1, l) {
                if (B > p) {
                  if (m = !0, w) break;
                  continue
                }
                B >= o && y.push(D.call(r, e))
              } else {
                if (y.length > x) {
                  if (m = !0, w) break;
                  continue
                }
                C ? y.push(D.call(r, e)) : A >= n - e.d / q * 1.5 && (C = !0, y.push(D.call(r, e)))
              }
              z += e.d, A = z / q
            }
        }
        return w || (c.availableSegmentsNumber = B + 1), y
      },
      r = function(a) {
        var c, d, e, f, g, i = [],
          j = this,
          k = a.adaptation.period.mpd.manifest.Period_asArray[a.adaptation.period.index].AdaptationSet_asArray[a.adaptation.index].Representation_asArray[a.index].SegmentTemplate,
          l = a.segmentDuration,
          m = a.segmentAvailabilityRange,
          n = null,
          o = null;
        for (g = a.startNumber, c = isNaN(l) && !b ? {
            start: g,
            end: g
          } : s.call(j, a), e = c.start, f = c.end, d = e; f >= d; d += 1) n = p.call(j, a, d), n.replacementTime = (g + d - 1) * a.segmentDuration, o = k.media, o = h(o, "Number", n.replacementNumber), o = h(o, "Time", n.replacementTime), n.media = o, i.push(n), n = null;
        return isNaN(l) ? a.availableSegmentsNumber = 1 : a.availableSegmentsNumber = Math.ceil((m.end - m.start) / l), i
      },
      s = function(c) {
        var e, f, g, h = this,
          i = c.segmentDuration,
          j = c.adaptation.period.mpd.manifest.minBufferTime,
          k = c.segmentAvailabilityRange,
          l = {
            start: h.timelineConverter.calcPeriodRelativeTimeFromMpdRelativeTime(c, k.start),
            end: h.timelineConverter.calcPeriodRelativeTimeFromMpdRelativeTime(c, k.end)
          },
          m = NaN,
          n = null,
          o = c.segments,
          p = 2 * i,
          q = Math.max(2 * j, 10 * i);
        return l || (l = h.timelineConverter.calcSegmentAvailabilityRange(c, b)), l.start = Math.max(l.start, 0), b && !h.timelineConverter.isTimeSyncCompleted() ? (e = Math.floor(l.start / i), f = Math.floor(l.end / i), g = {
          start: e,
          end: f
        }) : (o && o.length > 0 ? (n = B(d, c), m = n ? h.timelineConverter.calcPeriodRelativeTimeFromMpdRelativeTime(c, n.presentationStartTime) : d > 0 ? d * i : h.timelineConverter.calcPeriodRelativeTimeFromMpdRelativeTime(c, a || o[0].presentationStartTime)) : m = d > 0 ? d * i : b ? l.end : l.start, e = Math.floor(Math.max(m - p, l.start) / i), f = Math.floor(Math.min(e + q / i, l.end / i)), g = {
          start: e,
          end: f
        })
      },
      t = function() {
        var c, e, f, g = 2,
          h = 10,
          i = 0,
          j = Number.POSITIVE_INFINITY;
        return b && !this.timelineConverter.isTimeSyncCompleted() ? f = {
          start: i,
          end: j
        } : !b && a || 0 > d ? null : (c = Math.max(d - g, i), e = Math.min(d + h, j), f = {
          start: c,
          end: e
        })
      },
      u = function(a, c, d, e, f, g, i) {
        var j, l, m, n = this,
          o = c / e,
          p = Math.min(d / e, a.adaptation.period.mpd.maxSegmentDuration);
        return j = n.timelineConverter.calcPresentationTimeFromMediaTime(o, a), l = j + p, m = new Dash.vo.Segment, m.representation = a, m.duration = p, m.mediaStartTime = o, m.presentationStartTime = j, m.availabilityStartTime = a.adaptation.period.mpd.manifest.loadedTime, m.availabilityEndTime = n.timelineConverter.calcAvailabilityEndTimeFromPresentationTime(l, a.adaptation.period.mpd, b), m.wallStartTime = n.timelineConverter.calcWallTimeForSegment(m, b), m.replacementTime = c, m.replacementNumber = k(m, i), f = h(f, "Number", m.replacementNumber), f = h(f, "Time", m.replacementTime), m.media = f, m.mediaRange = g, m.availabilityIdx = i, m
      },
      v = function(a) {
        var b, c, d, e, f, g, h, i = this,
          j = [],
          k = a.adaptation.period.mpd.manifest.Period_asArray[a.adaptation.period.index].AdaptationSet_asArray[a.adaptation.index].Representation_asArray[a.index].SegmentList,
          l = a.adaptation.period.mpd.manifest.Period_asArray[a.adaptation.period.index].AdaptationSet_asArray[a.adaptation.index].Representation_asArray[a.index].BaseURL,
          m = k.SegmentURL_asArray.length;
        for (h = a.startNumber, e = s.call(i, a), f = Math.max(e.start, 0), g = Math.min(e.end, k.SegmentURL_asArray.length - 1), b = f; g >= b; b += 1) d = k.SegmentURL_asArray[b], c = p.call(i, a, b), c.replacementTime = (h + b - 1) * a.segmentDuration, c.media = d.media ? d.media : l, c.mediaRange = d.mediaRange, c.index = d.index, c.indexRange = d.indexRange, j.push(c), c = null;
        return a.availableSegmentsNumber = m, j
      },
      w = function(a) {
        var b, c = this,
          d = a.segmentInfoType;
        return "SegmentBase" !== d && "BaseURL" !== d && C.call(c, a) ? ("SegmentTimeline" === d ? b = q.call(c, a) : "SegmentTemplate" === d ? b = r.call(c, a) : "SegmentList" === d && (b = v.call(c, a)), x.call(c, a, b)) : b = a.segments, b
      },
      x = function(a, c) {
        var d, e, f, g;
        a.segments = c, d = c.length - 1, b && isNaN(this.timelineConverter.getExpectedLiveEdge()) && (g = c[d], e = g.presentationStartTime, f = this.metricsModel.getMetricsFor("stream"), this.timelineConverter.setExpectedLiveEdge(e), this.metricsModel.updateManifestUpdateInfo(this.metricsExt.getCurrentManifestUpdate(f), {
          presentationStartTime: e
        }))
      },
      y = function(a) {
        var b = this;
        if (!a) throw new Error("no representation");
        return a.segments = null, w.call(b, a), a
      },
      z = function(a, e) {
        var f, g = this,
          h = a.initialization,
          i = "BaseURL" !== a.segmentInfoType && "SegmentBase" !== a.segmentInfoType;
        return a.segmentDuration || a.segments || y.call(g, a), a.segmentAvailabilityRange = null, a.segmentAvailabilityRange = g.timelineConverter.calcSegmentAvailabilityRange(a, b), a.segmentAvailabilityRange.end < a.segmentAvailabilityRange.start && !a.useCalculatedLiveEdgeTime ? (f = new MediaPlayer.vo.Error(Dash.dependencies.DashHandler.SEGMENTS_UNAVAILABLE_ERROR_CODE, "no segments are available yet", {
          availabilityDelay: a.segmentAvailabilityRange.start - a.segmentAvailabilityRange.end
        }), void g.notify(Dash.dependencies.DashHandler.eventList.ENAME_REPRESENTATION_UPDATED, {
          representation: a
        }, f)) : (e || (d = -1), a.segmentDuration && y.call(g, a), h || g.baseURLExt.loadInitialization(a), i || g.baseURLExt.loadSegments(a, c, a.indexRange), void(h && i && g.notify(Dash.dependencies.DashHandler.eventList.ENAME_REPRESENTATION_UPDATED, {
          representation: a
        })))
      },
      A = function(a, b, c) {
        var d, e, f, g, h, i = b.segments,
          j = i ? i.length : null,
          k = -1;
        if (i && j > 0)
          for (h = 0; j > h; h += 1)
            if (e = i[h], f = e.presentationStartTime, g = e.duration, d = void 0 === c || null === c ? g / 2 : c, a + d >= f && f + g > a - d) {
              k = e.availabilityIdx;
              break
            } return k
      },
      B = function(a, b) {
        if (!b || !b.segments) return null;
        var c, d, e = b.segments.length;
        for (d = 0; e > d; d += 1)
          if (c = b.segments[d], c.availabilityIdx === a) return c;
        return null
      },
      C = function(a) {
        var b, c, e = !1,
          f = a.segments;
        return f && 0 !== f.length ? (c = f[0].availabilityIdx, b = f[f.length - 1].availabilityIdx, e = c > d || d > b) : e = !0, e
      },
      D = function(a) {
        if (null === a || void 0 === a) return null;
        var b, d = new MediaPlayer.vo.FragmentRequest,
          e = a.representation,
          f = e.adaptation.period.mpd.manifest.Period_asArray[e.adaptation.period.index].AdaptationSet_asArray[e.adaptation.index].Representation_asArray[e.index].bandwidth;
        return b = l(a.media, e), b = h(b, "Number", a.replacementNumber), b = h(b, "Time", a.replacementTime), b = h(b, "Bandwidth", f), b = j(b, e.id), b = i(b), d.mediaType = c, d.type = MediaPlayer.vo.metrics.HTTPRequest.MEDIA_SEGMENT_TYPE, d.url = b, d.range = a.mediaRange, d.startTime = a.presentationStartTime, d.duration = a.duration, d.timescale = e.timescale, d.availabilityStartTime = a.availabilityStartTime, d.availabilityEndTime = a.availabilityEndTime, d.wallStartTime = a.wallStartTime,
          d.quality = e.index, d.index = a.availabilityIdx, d.mediaInfo = this.streamProcessor.getMediaInfo(), d
      },
      E = function(b, e, f) {
        var g, h, i, j = d,
          k = f ? f.keepIdx : !1,
          l = f ? f.timeThreshold : null,
          m = f && f.ignoreIsFinished ? !0 : !1,
          n = this;
        return b ? (a = e, n.log("Getting the request for time: " + e), d = A.call(n, e, b, l), w.call(n, b), 0 > d && (d = A.call(n, e, b, l)), n.log("Index for time " + e + " is " + d), i = m ? !1 : o.call(n, b), i ? (g = new MediaPlayer.vo.FragmentRequest, g.action = g.ACTION_COMPLETE, g.index = d, g.mediaType = c, g.mediaInfo = n.streamProcessor.getMediaInfo(), n.log("Signal complete."), n.log(g)) : (h = B(d, b), g = D.call(n, h)), k && (d = j), g) : null
      },
      F = function(a, b) {
        var c = (a.segmentAvailabilityRange.end - a.segmentAvailabilityRange.start) / 2;
        return a.segments = null, a.segmentAvailabilityRange = {
          start: b - c,
          end: b + c
        }, E.call(this, a, b, {
          keepIdx: !1,
          ignoreIsFinished: !0
        })
      },
      G = function(b) {
        var e, f, g, h, i = this;
        return b ? -1 === d ? null : (a = null, d += 1, h = d, g = o.call(i, b), g ? (e = new MediaPlayer.vo.FragmentRequest, e.action = e.ACTION_COMPLETE, e.index = h, e.mediaType = c, e.mediaInfo = i.streamProcessor.getMediaInfo(), i.log("Signal complete.")) : (w.call(i, b), f = B(h, b), e = D.call(i, f)), e) : null
      },
      H = function(a) {
        var b = a.data.representation;
        b.segments && this.notify(Dash.dependencies.DashHandler.eventList.ENAME_REPRESENTATION_UPDATED, {
          representation: b
        })
      },
      I = function(a) {
        if (!a.error && c === a.data.mediaType) {
          var b, d, e, f, g = this,
            h = a.data.segments,
            i = a.data.representation,
            j = [],
            k = 0;
          for (b = 0, d = h.length; d > b; b += 1) e = h[b], f = u.call(g, i, e.startTime, e.duration, e.timescale, e.media, e.mediaRange, k), j.push(f), f = null, k += 1;
          i.segmentAvailabilityRange = {
            start: j[0].presentationStartTime,
            end: j[d - 1].presentationStartTime
          }, i.availableSegmentsNumber = d, x.call(g, i, j), i.initialization && this.notify(Dash.dependencies.DashHandler.eventList.ENAME_REPRESENTATION_UPDATED, {
            representation: i
          })
        }
      };
    return {
      log: void 0,
      baseURLExt: void 0,
      timelineConverter: void 0,
      metricsModel: void 0,
      metricsExt: void 0,
      notify: void 0,
      subscribe: void 0,
      unsubscribe: void 0,
      setup: function() {
        this[Dash.dependencies.BaseURLExtensions.eventList.ENAME_INITIALIZATION_LOADED] = H, this[Dash.dependencies.BaseURLExtensions.eventList.ENAME_SEGMENTS_LOADED] = I
      },
      initialize: function(a) {
        this.subscribe(Dash.dependencies.DashHandler.eventList.ENAME_REPRESENTATION_UPDATED, a.representationController), c = a.getType(), this.setMediaType(c), b = a.isDynamic(), this.streamProcessor = a
      },
      getType: function() {
        return c
      },
      setType: function(a) {
        c = a
      },
      getIsDynamic: function() {
        return b
      },
      setIsDynamic: function(a) {
        b = a
      },
      setCurrentTime: function(a) {
        e = a
      },
      getCurrentTime: function() {
        return e
      },
      reset: function() {
        e = 0, a = void 0, d = -1, b = void 0, this.unsubscribe(Dash.dependencies.DashHandler.eventList.ENAME_REPRESENTATION_UPDATED, this.streamProcessor.representationController)
      },
      getInitRequest: n,
      getSegmentRequestForTime: E,
      getNextSegmentRequest: G,
      generateSegmentRequestForTime: F,
      updateRepresentation: z
    }
  }, Dash.dependencies.DashHandler.prototype = {
    constructor: Dash.dependencies.DashHandler
  }, Dash.dependencies.DashHandler.SEGMENTS_UNAVAILABLE_ERROR_CODE = 1, Dash.dependencies.DashHandler.eventList = {
    ENAME_REPRESENTATION_UPDATED: "representationUpdated"
  }, Dash.dependencies.DashParser = function() {
    "use strict";
    var a = 31536e3,
      b = 2592e3,
      c = 86400,
      d = 3600,
      e = 60,
      f = 60,
      g = 1e3,
      h = /^([-])?P(([\d.]*)Y)?(([\d.]*)M)?(([\d.]*)D)?T?(([\d.]*)H)?(([\d.]*)M)?(([\d.]*)S)?/,
      i = /^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2})(?::([0-9]*)(\.[0-9]*)?)?(?:([+-])([0-9]{2})([0-9]{2}))?/,
      j = /^[-+]?[0-9]+[.]?[0-9]*([eE][-+]?[0-9]+)?$/,
      k = /^https?:\/\//i,
      l = [{
        type: "duration",
        test: function(a) {
          for (var b = ["minBufferTime", "mediaPresentationDuration", "minimumUpdatePeriod", "timeShiftBufferDepth", "maxSegmentDuration", "maxSubsegmentDuration", "suggestedPresentationDelay", "start", "starttime", "duration"], c = b.length, d = 0; c > d; d++)
            if (a.nodeName === b[d]) return h.test(a.value);
          return !1
        },
        converter: function(f) {
          var g = h.exec(f),
            i = parseFloat(g[2] || 0) * a + parseFloat(g[4] || 0) * b + parseFloat(g[6] || 0) * c + parseFloat(g[8] || 0) * d + parseFloat(g[10] || 0) * e + parseFloat(g[12] || 0);
          return void 0 !== g[1] && (i = -i), i
        }
      }, {
        type: "datetime",
        test: function(a) {
          return i.test(a.value)
        },
        converter: function(a) {
          var b, c = i.exec(a);
          if (b = Date.UTC(parseInt(c[1], 10), parseInt(c[2], 10) - 1, parseInt(c[3], 10), parseInt(c[4], 10), parseInt(c[5], 10), c[6] && parseInt(c[6], 10) || 0, c[7] && parseFloat(c[7]) * g || 0), c[9] && c[10]) {
            var d = parseInt(c[9], 10) * f + parseInt(c[10], 10);
            b += ("+" === c[8] ? -1 : 1) * d * e * g
          }
          return new Date(b)
        }
      }, {
        type: "numeric",
        test: function(a) {
          return j.test(a.value)
        },
        converter: function(a) {
          return parseFloat(a)
        }
      }],
      m = function() {
        var a, b, c, d;
        return d = [{
          name: "profiles",
          merge: !1
        }, {
          name: "width",
          merge: !1
        }, {
          name: "height",
          merge: !1
        }, {
          name: "sar",
          merge: !1
        }, {
          name: "frameRate",
          merge: !1
        }, {
          name: "audioSamplingRate",
          merge: !1
        }, {
          name: "mimeType",
          merge: !1
        }, {
          name: "segmentProfiles",
          merge: !1
        }, {
          name: "codecs",
          merge: !1
        }, {
          name: "maximumSAPPeriod",
          merge: !1
        }, {
          name: "startsWithSap",
          merge: !1
        }, {
          name: "maxPlayoutRate",
          merge: !1
        }, {
          name: "codingDependency",
          merge: !1
        }, {
          name: "scanType",
          merge: !1
        }, {
          name: "FramePacking",
          merge: !0
        }, {
          name: "AudioChannelConfiguration",
          merge: !0
        }, {
          name: "ContentProtection",
          merge: !0
        }], a = {}, a.name = "AdaptationSet", a.isRoot = !1, a.isArray = !0, a.parent = null, a.children = [], a.properties = d, b = {}, b.name = "Representation", b.isRoot = !1, b.isArray = !0, b.parent = a, b.children = [], b.properties = d, a.children.push(b), c = {}, c.name = "SubRepresentation", c.isRoot = !1, c.isArray = !0, c.parent = b, c.children = [], c.properties = d, b.children.push(c), a
      },
      n = function() {
        var a, b, c, d;
        return d = [{
          name: "SegmentBase",
          merge: !0
        }, {
          name: "SegmentTemplate",
          merge: !0
        }, {
          name: "SegmentList",
          merge: !0
        }], a = {}, a.name = "Period", a.isRoot = !1, a.isArray = !0, a.parent = null, a.children = [], a.properties = d, b = {}, b.name = "AdaptationSet", b.isRoot = !1, b.isArray = !0, b.parent = a, b.children = [], b.properties = d, a.children.push(b), c = {}, c.name = "Representation", c.isRoot = !1, c.isArray = !0, c.parent = b, c.children = [], c.properties = d, b.children.push(c), a
      },
      o = function() {
        var a, b, c, d, e;
        return e = [{
          name: "BaseURL",
          merge: !0,
          mergeFunction: function(a, b) {
            var c;
            return c = k.test(b) ? b : a + b
          }
        }], a = {}, a.name = "mpd", a.isRoot = !0, a.isArray = !0, a.parent = null, a.children = [], a.properties = e, b = {}, b.name = "Period", b.isRoot = !1, b.isArray = !0, b.parent = null, b.children = [], b.properties = e, a.children.push(b), c = {}, c.name = "AdaptationSet", c.isRoot = !1, c.isArray = !0, c.parent = b, c.children = [], c.properties = e, b.children.push(c), d = {}, d.name = "Representation", d.isRoot = !1, d.isArray = !0, d.parent = c, d.children = [], d.properties = e, c.children.push(d), a
      },
      p = function() {
        var a = [];
        return a.push(m()), a.push(n()), a.push(o()), a
      },
      q = function(a, b, c) {
        var d, e = new X2JS(l, "", !0),
          f = new ObjectIron(p()),
          g = new Date,
          h = null,
          i = null;
        try {
          if (d = e.xml_str2json(a), !d) throw "parser error";
          h = new Date, d.hasOwnProperty("BaseURL") ? (d.BaseURL = d.BaseURL_asArray[0], 0 !== d.BaseURL.toString().indexOf("http") && (d.BaseURL = b + d.BaseURL)) : d.BaseURL = b, d.hasOwnProperty("Location") && (d.Location = d.Location_asArray[0]), f.run(d), i = new Date, c.setMatchers(l), c.setIron(f), this.log("Parsing complete: ( xml2json: " + (h.getTime() - g.getTime()) + "ms, objectiron: " + (i.getTime() - h.getTime()) + "ms, total: " + (i.getTime() - g.getTime()) / 1e3 + "s)")
        } catch (j) {
          return this.errHandler.manifestError("parsing the manifest failed", "parse", a), null
        }
        return d
      },
      r = function(a, b, c) { //DIFF1: JSON Parser - object extension of the MPD-Parser?
        var d,
            e = new ObjectIron(p()),
            f = new Date,
            g = null,
            h = null;
        try {
          if (d = a, !d) throw "parser error";
          g = new Date,
          d.hasOwnProperty("BaseURL") ? (d.BaseURL = d.BaseURL_asArray[0], 0 === d.BaseURL.toString().indexOf("www") && (d.BaseURL = "http://" + d.BaseURL), "/" !== d.BaseURL.toString().slice(-1) && (d.BaseURL = d.BaseURL + "/"), 0 !== d.BaseURL.toString().indexOf("http") && (d.BaseURL = b + d.BaseURL)) : d.BaseURL = b,
          d.hasOwnProperty("Location") && (d.Location = d.Location_asArray[0]), e.run(d), h = new Date, c.setMatchers(l), c.setIron(e),
          this.log("Parsing complete: ( xml2json: " + (g.getTime() - f.getTime()) + "ms, objectiron: " + (h.getTime() - g.getTime()) + "ms, total: " + (h.getTime() - f.getTime()) / 1e3 + "s)")
        } catch (i) {
          return this.errHandler.manifestError("parsing the manifest failed", "parse", a), null
        }
        return d
      };
    return {
      log: void 0,
      errHandler: void 0,
      parse: q,
      parseJSON: r  //DIFF2: export Method parseJSON of the MPDparser?
    }
  }, Dash.dependencies.DashParser.prototype = {
    constructor: Dash.dependencies.DashParser
  }, Dash.dependencies.TimelineConverter = function() {
    "use strict";
    var a = 0,
      b = !1,
      c = NaN,
      d = function(b, c, d, e) {
        var f = NaN;
        return f = e ? d && c.timeShiftBufferDepth != Number.POSITIVE_INFINITY ? new Date(c.availabilityStartTime.getTime() + 1e3 * (b + c.timeShiftBufferDepth)) : c.availabilityEndTime : d ? new Date(c.availabilityStartTime.getTime() + 1e3 * (b - a)) : c.availabilityStartTime
      },
      e = function(a, b, c) {
        return d.call(this, a, b, c)
      },
      f = function(a, b, c) {
        return d.call(this, a, b, c, !0)
      },
      g = function(b, c) {
        return (b.getTime() - c.mpd.availabilityStartTime.getTime() + 1e3 * a) / 1e3
      },
      h = function(a, b) {
        var c = b.adaptation.period.start,
          d = b.presentationTimeOffset;
        return a + (c - d)
      },
      i = function(a, b) {
        var c = b.adaptation.period.start,
          d = b.presentationTimeOffset;
        return a - c + d
      },
      j = function(a, b) {
        var c, d, e;
        return b && (c = a.representation.adaptation.period.mpd.suggestedPresentationDelay, d = a.presentationStartTime + c, e = new Date(a.availabilityStartTime.getTime() + 1e3 * d)), e
      },
      k = function(a, c) {
        var d, e, f = a.adaptation.period.start,
          h = f + a.adaptation.period.duration,
          i = {
            start: f,
            end: h
          },
          j = a.segmentDuration || (a.segments && a.segments.length ? a.segments[a.segments.length - 1].duration : 0);
        if (!c) return i;
        if (!b && a.segmentAvailabilityRange) return a.segmentAvailabilityRange;
        d = a.adaptation.period.mpd.checkTime, e = g(new Date, a.adaptation.period), f = Math.max(e - a.adaptation.period.mpd.timeShiftBufferDepth, a.adaptation.period.start);
        var k = isNaN(d) ? e : Math.min(d, e),
          l = a.adaptation.period.start + a.adaptation.period.duration;
        return h = (k >= l && l > k - j ? l : k) - j, i = {
          start: f,
          end: h
        }
      },
      l = function(a, b) {
        var c = a.adaptation.period.start;
        return b - c
      },
      m = function(a, b) {
        var c = a.adaptation.period.start;
        return b + c
      },
      n = function(d) {
        b || d.error || (a += d.data.liveEdge - (c + d.data.searchTime), b = !0)
      },
      o = function(c) {
        b || c.error || (a = c.data.offset / 1e3, b = !0)
      },
      p = function(a) {
        var b = a.presentationTimeOffset,
          c = a.adaptation.period.start;
        return c - b
      },
      q = function() {
        a = 0, b = !1, c = NaN
      };
    return {
      setup: function() {
        this[MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED] = n, this[MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED] = o
      },
      calcAvailabilityStartTimeFromPresentationTime: e,
      calcAvailabilityEndTimeFromPresentationTime: f,
      calcPresentationTimeFromWallTime: g,
      calcPresentationTimeFromMediaTime: h,
      calcPeriodRelativeTimeFromMpdRelativeTime: l,
      calcMpdRelativeTimeFromPeriodRelativeTime: m,
      calcMediaTimeFromPresentationTime: i,
      calcSegmentAvailabilityRange: k,
      calcWallTimeForSegment: j,
      calcMSETimeOffset: p,
      reset: q,
      isTimeSyncCompleted: function() {
        return b
      },
      setTimeSyncCompleted: function(a) {
        b = a
      },
      getClientTimeOffset: function() {
        return a
      },
      getExpectedLiveEdge: function() {
        return c
      },
      setExpectedLiveEdge: function(a) {
        c = a
      }
    }
  }, Dash.dependencies.TimelineConverter.prototype = {
    constructor: Dash.dependencies.TimelineConverter
  }, Dash.dependencies.RepresentationController = function() {
    "use strict";
    var a, b = null,
      c = -1,
      d = !0,
      e = [],
      f = function(c, f, g) {
        var h, j, k = this,
          m = null,
          n = k.streamProcessor.getStreamInfo(),
          o = k.abrController.getTopQualityIndexFor(g, n.id);
        if (d = !0, k.notify(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_STARTED), e = l.call(k, f), null === b ? (j = k.abrController.getAverageThroughput(g), m = j || k.abrController.getInitialBitrateFor(g, n), h = k.abrController.getQualityForBitrate(k.streamProcessor.getMediaInfo(), m)) : h = k.abrController.getQualityFor(g, n), h > o && (h = o), a = i.call(k, h), b = c, "video" !== g && "audio" !== g && "fragmentedText" !== g) return d = !1, void k.notify(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, {
          data: b,
          currentRepresentation: a
        });
        for (var p = 0; p < e.length; p += 1) k.indexHandler.updateRepresentation(e[p], !0)
      },
      g = function() {
        var a = new Date,
          b = this.getCurrentRepresentation(),
          c = this.streamProcessor.playbackController.getTime();
        this.metricsModel.addRepresentationSwitch(b.adaptation.type, a, c, b.id)
      },
      h = function() {
        var b = this.streamProcessor,
          c = this.timelineConverter.calcSegmentAvailabilityRange(a, b.isDynamic());
        this.metricsModel.addDVRInfo(b.getType(), b.playbackController.getTime(), b.getStreamInfo().manifestInfo, c)
      },
      i = function(a) {
        return e[a]
      },
      j = function(a) {
        return e.indexOf(a)
      },
      k = function() {
        for (var a = 0, b = e.length; b > a; a += 1) {
          var c = e[a].segmentInfoType;
          if (null === e[a].segmentAvailabilityRange || null === e[a].initialization || ("SegmentBase" === c || "BaseURL" === c) && !e[a].segments) return !1
        }
        return !0
      },
      l = function(a) {
        var d, e = this,
          f = e.manifestModel.getValue();
        return c = e.manifestExt.getIndexForAdaptation(b, f, a.period.index), d = e.manifestExt.getRepresentationsForAdaptation(f, a)
      },
      m = function(a) {
        for (var b, c = this, d = 0, f = e.length; f > d; d += 1) b = e[d], b.segmentAvailabilityRange = c.timelineConverter.calcSegmentAvailabilityRange(b, a)
      },
      n = function(b) {
        var c = this,
          f = 1e3 * (b + a.segmentDuration * this.liveDelayFragmentCount),
          g = function() {
            if (!this.isUpdating()) {
              d = !0, c.notify(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_STARTED);
              for (var a = 0; a < e.length; a += 1) c.indexHandler.updateRepresentation(e[a], !0)
            }
          };
        d = !1, setTimeout(g.bind(this), f)
      },
      o = function(c) {
        if (this.isUpdating()) {
          var e, f, i, l = this,
            m = c.data.representation,
            o = l.metricsModel.getMetricsFor("stream"),
            p = l.metricsModel.getMetricsFor(this.getCurrentRepresentation().adaptation.type),
            q = l.metricsExt.getCurrentManifestUpdate(o),
            r = !1;
          if (c.error && c.error.code === Dash.dependencies.DashHandler.SEGMENTS_UNAVAILABLE_ERROR_CODE) return h.call(this), n.call(this, c.error.data.availabilityDelay), f = new MediaPlayer.vo.Error(Dash.dependencies.RepresentationController.SEGMENTS_UPDATE_FAILED_ERROR_CODE, "Segments update failed", null), void this.notify(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, {
            data: b,
            currentRepresentation: a
          }, f);
          if (q) {
            for (var s = 0; s < q.trackInfo.length; s += 1)
              if (e = q.trackInfo[s], e.index === m.index && e.mediaType === l.streamProcessor.getType()) {
                r = !0;
                break
              } r || l.metricsModel.addManifestUpdateRepresentationInfo(q, m.id, m.index, m.adaptation.period.index, l.streamProcessor.getType(), m.presentationTimeOffset, m.startNumber, m.segmentInfoType)
          }
          k() && (d = !1, l.abrController.setPlaybackQuality(l.streamProcessor.getType(), l.streamProcessor.getStreamInfo(), j.call(this, a)), l.metricsModel.updateManifestUpdateInfo(q, {
            latency: a.segmentAvailabilityRange.end - l.streamProcessor.playbackController.getTime()
          }), i = l.metricsExt.getCurrentRepresentationSwitch(p), i || g.call(l), this.notify(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, {
            data: b,
            currentRepresentation: a
          }))
        }
      },
      p = function(a) {
        m.call(this, a.data.isDynamic)
      },
      q = function(b) {
        if (!b.error) {
          m.call(this, !0), this.indexHandler.updateRepresentation(a, !1);
          var c = this.manifestModel.getValue(),
            d = a.adaptation.period,
            e = this.streamController.getActiveStreamInfo();
          e.isLast && (d.mpd.checkTime = this.manifestExt.getCheckTime(c, d), d.duration = this.manifestExt.getEndTimeForLastPeriod(this.manifestModel.getValue(), d) - d.start, e.duration = d.duration)
        }
      },
      r = function() {
        h.call(this)
      },
      s = function(b) {
        var c = this;
        b.data.mediaType === c.streamProcessor.getType() && c.streamProcessor.getStreamInfo().id === b.data.streamInfo.id && (a = c.getRepresentationForQuality(b.data.newQuality), t.call(c, b.data.mediaType, a.bandwidth), g.call(c))
      },
      t = function(a, b) {
        !this.DOMStorage.isSupported(MediaPlayer.utils.DOMStorage.STORAGE_TYPE_LOCAL) || "video" !== a && "audio" !== a || localStorage.setItem(MediaPlayer.utils.DOMStorage["LOCAL_STORAGE_" + a.toUpperCase() + "_BITRATE_KEY"], JSON.stringify({
          bitrate: b / 1e3,
          timestamp: (new Date).getTime()
        }))
      };
    return {
      system: void 0,
      log: void 0,
      manifestExt: void 0,
      manifestModel: void 0,
      metricsModel: void 0,
      metricsExt: void 0,
      abrController: void 0,
      streamController: void 0,
      timelineConverter: void 0,
      notify: void 0,
      subscribe: void 0,
      unsubscribe: void 0,
      DOMStorage: void 0,
      liveDelayFragmentCount: void 0,
      setup: function() {
        this[MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED] = s, this[Dash.dependencies.DashHandler.eventList.ENAME_REPRESENTATION_UPDATED] = o, this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED] = p, this[MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED] = q, this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_UPDATED] = r
      },
      initialize: function(a) {
        this.streamProcessor = a, this.indexHandler = a.indexHandler
      },
      getData: function() {
        return b
      },
      getDataIndex: function() {
        return c
      },
      isUpdating: function() {
        return d
      },
      updateData: f,
      getRepresentationForQuality: i,
      getCurrentRepresentation: function() {
        return a
      }
    }
  }, Dash.dependencies.RepresentationController.prototype = {
    constructor: Dash.dependencies.RepresentationController
  }, Dash.dependencies.RepresentationController.SEGMENTS_UPDATE_FAILED_ERROR_CODE = 1, Dash.dependencies.RepresentationController.eventList = {
    ENAME_DATA_UPDATE_COMPLETED: "dataUpdateCompleted",
    ENAME_DATA_UPDATE_STARTED: "dataUpdateStarted"
  }, Dash.dependencies.BaseURLExtensions = function() {
    "use strict";
    var a = function(a, b) {
        for (var c, d, e, f, g = a.references, h = g.length, i = a.timescale, j = a.earliest_presentation_time, k = b.range.start + a.first_offset + a.size, l = [], m = 0; h > m; m += 1) e = g[m].subsegment_duration, f = g[m].referenced_size, c = new Dash.vo.Segment, c.duration = e, c.media = b.url, c.startTime = j, c.timescale = i, d = k + f - 1, c.mediaRange = k + "-" + d, l.push(c), j += e, k += f;
        return l
      },
      b = function(a) {
        var b, c, d = a.getBox("ftyp"),
          e = a.getBox("moov"),
          f = null;
        return this.log("Searching for initialization."), e && e.isComplete && (b = d ? d.offset : e.offset, c = e.offset + e.size - 1, f = b + "-" + c, this.log("Found the initialization.  Range: " + f)), f
      },
      c = function(a, d) {
        var f = new XMLHttpRequest,
          g = !0,
          h = this,
          i = null,
          j = null,
          k = a.adaptation.period.mpd.manifest.Period_asArray[a.adaptation.period.index].AdaptationSet_asArray[a.adaptation.index].Representation_asArray[a.index].BaseURL,
          l = d || {
            url: k,
            range: {
              start: 0,
              end: 1500
            },
            searching: !1,
            bytesLoaded: 0,
            bytesToLoad: 1500,
            request: f
          };
        h.log("Start searching for initialization."), f.onload = function() {
          f.status < 200 || f.status > 299 || (g = !1, l.bytesLoaded = l.range.end, j = h.boxParser.parse(f.response), i = b.call(h, j), i ? (a.range = i, a.initialization = k, h.notify(Dash.dependencies.BaseURLExtensions.eventList.ENAME_INITIALIZATION_LOADED, {
            representation: a
          })) : (l.range.end = l.bytesLoaded + l.bytesToLoad, c.call(h, a, l)))
        }, f.onloadend = f.onerror = function() {
          g && (g = !1, h.errHandler.downloadError("initialization", l.url, f), h.notify(Dash.dependencies.BaseURLExtensions.eventList.ENAME_INITIALIZATION_LOADED, {
            representation: a
          }))
        }, e.call(h, f, l), h.log("Perform init search: " + l.url)
      },
      d = function(b, c, f, g, h) {
        var i = this,
          j = null !== f,
          k = new XMLHttpRequest,
          l = b.adaptation.period.mpd.manifest.Period_asArray[b.adaptation.period.index].AdaptationSet_asArray[b.adaptation.index].Representation_asArray[b.index].BaseURL,
          m = !0,
          n = null,
          o = null,
          p = {
            url: l,
            range: j ? f : {
              start: 0,
              end: 1500
            },
            searching: !j,
            bytesLoaded: g ? g.bytesLoaded : 0,
            bytesToLoad: 1500,
            request: k
          };
        k.onload = function() {
          if (!(k.status < 200 || k.status > 299)) {
            var e = p.bytesToLoad,
              f = k.response.byteLength;
            if (m = !1, p.bytesLoaded = p.range.end - p.range.start, n = i.boxParser.parse(k.response), o = n.getBox("sidx"), o && o.isComplete) {
              var g, j, l = o.references;
              if (null !== l && void 0 !== l && l.length > 0 && (g = 1 === l[0].reference_type), g) {
                i.log("Initiate multiple SIDX load."), p.range.end = p.range.start + o.size;
                var q, r, s, t, u, v = [],
                  w = 0,
                  x = (o.offset || p.range.start) + o.size,
                  y = function(a) {
                    a ? (v = v.concat(a), w += 1, w >= r && h.call(i, v, b, c)) : h.call(i, null, b, c)
                  };
                for (q = 0, r = l.length; r > q; q += 1) s = x, t = x + l[q].referenced_size - 1, x += l[q].referenced_size, u = {
                  start: s,
                  end: t
                }, d.call(i, b, null, u, p, y)
              } else i.log("Parsing segments from SIDX."), j = a.call(i, o, p), h.call(i, j, b, c)
            } else {
              if (o) p.range.start = o.offset || p.range.start, p.range.end = p.range.start + (o.size || e);
              else {
                if (f < p.bytesLoaded) return void h.call(i, null, b, c);
                var z = n.getLastBox();
                z && z.size ? (p.range.start = z.offset + z.size, p.range.end = p.range.start + e) : p.range.end += e
              }
              d.call(i, b, c, p.range, p, h)
            }
          }
        }, k.onloadend = k.onerror = function() {
          m && (m = !1, i.errHandler.downloadError("SIDX", p.url, k), h.call(i, null, b, c))
        }, e.call(i, k, p), i.log("Perform SIDX load: " + p.url)
      },
      e = function(a, b) {
        a.open("GET", this.requestModifierExt.modifyRequestURL(b.url)), a.responseType = "arraybuffer", a.setRequestHeader("Range", "bytes=" + b.range.start + "-" + b.range.end), a = this.requestModifierExt.modifyRequestHeader(a), a.send(null)
      },
      f = function(a, b, c) {
        var d = this;
        a ? d.notify(Dash.dependencies.BaseURLExtensions.eventList.ENAME_SEGMENTS_LOADED, {
          segments: a,
          representation: b,
          mediaType: c
        }) : d.notify(Dash.dependencies.BaseURLExtensions.eventList.ENAME_SEGMENTS_LOADED, {
          segments: null,
          representation: b,
          mediaType: c
        }, new MediaPlayer.vo.Error(null, "error loading segments", null))
      };
    return {
      log: void 0,
      errHandler: void 0,
      requestModifierExt: void 0,
      boxParser: void 0,
      notify: void 0,
      subscribe: void 0,
      unsubscribe: void 0,
      loadSegments: function(a, b, c) {
        var e = c ? c.split("-") : null;
        c = e ? {
          start: parseFloat(e[0]),
          end: parseFloat(e[1])
        } : null, d.call(this, a, b, c, null, f.bind(this))
      },
      loadInitialization: c
    }
  }, Dash.dependencies.BaseURLExtensions.prototype = {
    constructor: Dash.dependencies.BaseURLExtensions
  }, Dash.dependencies.BaseURLExtensions.eventList = {
    ENAME_INITIALIZATION_LOADED: "initializationLoaded",
    ENAME_SEGMENTS_LOADED: "segmentsLoaded"
  }, Dash.dependencies.DashManifestExtensions = function() {
    "use strict";
    this.timelineConverter = void 0
  }, Dash.dependencies.DashManifestExtensions.prototype = {
    constructor: Dash.dependencies.DashManifestExtensions,
    getIsTypeOf: function(a, b) {
      "use strict";
      var c, d, e, f = a.ContentComponent_asArray,
        g = "text" !== b ? new RegExp(b) : new RegExp("(vtt|ttml)"),
        h = !1,
        i = !1;
      if (a.Representation_asArray.length > 0 && a.Representation_asArray[0].hasOwnProperty("codecs") && "stpp" == a.Representation_asArray[0].codecs) return "fragmentedText" == b;
      if (f) {
        if (f.length > 1) return "muxed" == b;
        f[0] && f[0].contentType === b && (h = !0, i = !0)
      }
      if (a.hasOwnProperty("mimeType") && (h = g.test(a.mimeType), i = !0), !i)
        for (c = 0, d = a.Representation_asArray.length; !i && d > c;) e = a.Representation_asArray[c], e.hasOwnProperty("mimeType") && (h = g.test(e.mimeType), i = !0), c += 1;
      return h
    },
    getIsAudio: function(a) {
      "use strict";
      return this.getIsTypeOf(a, "audio")
    },
    getIsVideo: function(a) {
      "use strict";
      return this.getIsTypeOf(a, "video")
    },
    getIsFragmentedText: function(a) {
      "use strict";
      return this.getIsTypeOf(a, "fragmentedText")
    },
    getIsText: function(a) {
      "use strict";
      return this.getIsTypeOf(a, "text")
    },
    getIsMuxed: function(a) {
      return this.getIsTypeOf(a, "muxed")
    },
    getIsTextTrack: function(a) {
      return "text/vtt" === a || "application/ttml+xml" === a
    },
    getLanguageForAdaptation: function(a) {
      var b = "";
      return a.hasOwnProperty("lang") && (b = a.lang.replace(/[^A-Za-z0-9-]/g, "")), b
    },
    getViewpointForAdaptation: function(a) {
      return a.hasOwnProperty("Viewpoint") ? a.Viewpoint : null
    },
    getRolesForAdaptation: function(a) {
      return a.hasOwnProperty("Role_asArray") ? a.Role_asArray : []
    },
    getAccessibilityForAdaptation: function(a) {
      return a.hasOwnProperty("Accessibility_asArray") ? a.Accessibility_asArray : []
    },
    getAudioChannelConfigurationForAdaptation: function(a) {
      return a.hasOwnProperty("AudioChannelConfiguration_asArray") ? a.AudioChannelConfiguration_asArray : []
    },
    getIsMain: function(a) {
      "use strict";
      return this.getRolesForAdaptation(a).filter(function(a) {
        return "main" === a.value
      })[0]
    },
    processAdaptation: function(a) {
      "use strict";
      return void 0 !== a.Representation_asArray && null !== a.Representation_asArray && a.Representation_asArray.sort(function(a, b) {
        return a.bandwidth - b.bandwidth
      }), a
    },
    getAdaptationForId: function(a, b, c) {
      "use strict";
      var d, e, f = b.Period_asArray[c].AdaptationSet_asArray;
      for (d = 0, e = f.length; e > d; d += 1)
        if (f[d].hasOwnProperty("id") && f[d].id === a) return f[d];
      return null
    },
    getAdaptationForIndex: function(a, b, c) {
      "use strict";
      var d = b.Period_asArray[c].AdaptationSet_asArray;
      return d[a]
    },
    getIndexForAdaptation: function(a, b, c) {
      "use strict";
      var d, e, f = b.Period_asArray[c].AdaptationSet_asArray;
      for (d = 0, e = f.length; e > d; d += 1)
        if (f[d] === a) return d;
      return -1
    },
    getAdaptationsForType: function(a, b, c) {
      "use strict";
      var d, e, f = this,
        g = a.Period_asArray[b].AdaptationSet_asArray,
        h = [];
      for (d = 0, e = g.length; e > d; d += 1) this.getIsTypeOf(g[d], c) && h.push(f.processAdaptation(g[d]));
      return h
    },
    getAdaptationForType: function(a, b, c) {
      "use strict";
      var d, e, f, g = this;
      if (f = this.getAdaptationsForType(a, b, c), !f || 0 === f.length) return null;
      for (d = 0, e = f.length; e > d; d += 1)
        if (g.getIsMain(f[d])) return f[d];
      return f[0]
    },
    getCodec: function(a) {
      "use strict";
      var b = a.Representation_asArray[0];
      return b.mimeType + ';codecs="' + b.codecs + '"'
    },
    getMimeType: function(a) {
      "use strict";
      return a.Representation_asArray[0].mimeType
    },
    getKID: function(a) {
      "use strict";
      return a && a.hasOwnProperty("cenc:default_KID") ? a["cenc:default_KID"] : null
    },
    getContentProtectionData: function(a) {
      "use strict";
      return a && a.hasOwnProperty("ContentProtection_asArray") && 0 !== a.ContentProtection_asArray.length ? a.ContentProtection_asArray : null
    },
    getIsDynamic: function(a) {
      "use strict";
      var b = !1,
        c = "dynamic";
      return a.hasOwnProperty("type") && (b = a.type === c), b
    },
    getIsDVR: function(a) {
      "use strict";
      var b, c, d = this.getIsDynamic(a);
      return b = !isNaN(a.timeShiftBufferDepth), c = d && b
    },
    getIsOnDemand: function(a) {
      "use strict";
      var b = !1;
      return a.profiles && a.profiles.length > 0 && (b = -1 !== a.profiles.indexOf("urn:mpeg:dash:profile:isoff-on-demand:2011")), b
    },
    getDuration: function(a) {
      var b;
      return b = a.hasOwnProperty("mediaPresentationDuration") ? a.mediaPresentationDuration : Number.MAX_VALUE
    },
    getBandwidth: function(a) {
      "use strict";
      return a.bandwidth
    },
    getRefreshDelay: function(a) {
      "use strict";
      var b = NaN,
        c = 2;
      return a.hasOwnProperty("minimumUpdatePeriod") && (b = Math.max(parseFloat(a.minimumUpdatePeriod), c)), b
    },
    getRepresentationCount: function(a) {
      "use strict";
      return a.Representation_asArray.length
    },
    getBitrateListForAdaptation: function(a) {
      if (!a || !a.Representation_asArray || !a.Representation_asArray.length) return null;
      for (var b = this.processAdaptation(a), c = b.Representation_asArray, d = c.length, e = [], f = 0; d > f; f += 1) e.push(c[f].bandwidth);
      return e
    },
    getRepresentationFor: function(a, b) {
      "use strict";
      return b.Representation_asArray[a]
    },
    getRepresentationsForAdaptation: function(a, b) {
      for (var c, d, e, f, g, h = this, i = h.processAdaptation(a.Period_asArray[b.period.index].AdaptationSet_asArray[b.index]), j = [], k = 0; k < i.Representation_asArray.length; k += 1) f = i.Representation_asArray[k], c = new Dash.vo.Representation, c.index = k, c.adaptation = b, f.hasOwnProperty("id") && (c.id = f.id), f.hasOwnProperty("bandwidth") && (c.bandwidth = f.bandwidth), f.hasOwnProperty("maxPlayoutRate") && (c.maxPlayoutRate = f.maxPlayoutRate), f.hasOwnProperty("SegmentBase") ? (e = f.SegmentBase, c.segmentInfoType = "SegmentBase") : f.hasOwnProperty("SegmentList") ? (e = f.SegmentList, c.segmentInfoType = "SegmentList", c.useCalculatedLiveEdgeTime = !0) : f.hasOwnProperty("SegmentTemplate") ? (e = f.SegmentTemplate, e.hasOwnProperty("SegmentTimeline") ? (c.segmentInfoType = "SegmentTimeline", g = e.SegmentTimeline.S_asArray[e.SegmentTimeline.S_asArray.length - 1], (!g.hasOwnProperty("r") || g.r >= 0) && (c.useCalculatedLiveEdgeTime = !0)) : c.segmentInfoType = "SegmentTemplate", e.hasOwnProperty("initialization") && (c.initialization = e.initialization.split("$Bandwidth$").join(f.bandwidth).split("$RepresentationID$").join(f.id))) : (e = f.BaseURL, c.segmentInfoType = "BaseURL"), e.hasOwnProperty("Initialization") ? (d = e.Initialization, d.hasOwnProperty("sourceURL") ? c.initialization = d.sourceURL : d.hasOwnProperty("range") && (c.initialization = f.BaseURL, c.range = d.range)) : f.hasOwnProperty("mimeType") && h.getIsTextTrack(f.mimeType) && (c.initialization = f.BaseURL, c.range = 0), e.hasOwnProperty("timescale") && (c.timescale = e.timescale), e.hasOwnProperty("duration") && (c.segmentDuration = e.duration / c.timescale), e.hasOwnProperty("startNumber") && (c.startNumber = e.startNumber), e.hasOwnProperty("indexRange") && (c.indexRange = e.indexRange), e.hasOwnProperty("presentationTimeOffset") && (c.presentationTimeOffset = e.presentationTimeOffset / c.timescale), c.MSETimeOffset = h.timelineConverter.calcMSETimeOffset(c), j.push(c);
      return j
    },
    getAdaptationsForPeriod: function(a, b) {
      for (var c, d, e = a.Period_asArray[b.index], f = [], g = 0; g < e.AdaptationSet_asArray.length; g += 1) d = e.AdaptationSet_asArray[g], c = new Dash.vo.AdaptationSet, d.hasOwnProperty("id") && (c.id = d.id), c.index = g, c.period = b, this.getIsMuxed(d) ? c.type = "muxed" : this.getIsAudio(d) ? c.type = "audio" : this.getIsVideo(d) ? c.type = "video" : this.getIsFragmentedText(d) ? c.type = "fragmentedText" : c.type = "text", f.push(c);
      return f
    },
    getRegularPeriods: function(a, b) {
      var c, d, e = this,
        f = [],
        g = e.getIsDynamic(a),
        h = null,
        i = null,
        j = null,
        k = null;
      for (c = 0, d = a.Period_asArray.length; d > c; c += 1) i = a.Period_asArray[c], i.hasOwnProperty("start") ? (k = new Dash.vo.Period, k.start = i.start) : null !== h && i.hasOwnProperty("duration") && null !== j ? (k = new Dash.vo.Period, k.start = j.start + j.duration, k.duration = i.duration) : 0 !== c || g || (k = new Dash.vo.Period, k.start = 0), null !== j && isNaN(j.duration) && (j.duration = k.start - j.start), null !== k && (k.id = this.getPeriodId(i)), null !== k && i.hasOwnProperty("duration") && (k.duration = i.duration), null !== k && (k.index = c, k.mpd = b, f.push(k), h = i, j = k), i = null, k = null;
      return 0 === f.length ? f : (null !== j && isNaN(j.duration) && (j.duration = e.getEndTimeForLastPeriod(a, j) - j.start), f)
    },
    getPeriodId: function(a) {
      if (!a) throw new Error("Period cannot be null or undefined");
      var b = Dash.vo.Period.DEFAULT_ID;
      return a.hasOwnProperty("id") && "__proto__" !== a.id && (b = a.id), b
    },
    getMpd: function(a) {
      var b = new Dash.vo.Mpd;
      return b.manifest = a, a.hasOwnProperty("availabilityStartTime") ? b.availabilityStartTime = new Date(a.availabilityStartTime.getTime()) : b.availabilityStartTime = new Date(a.loadedTime.getTime()), a.hasOwnProperty("availabilityEndTime") && (b.availabilityEndTime = new Date(a.availabilityEndTime.getTime())), a.hasOwnProperty("suggestedPresentationDelay") && (b.suggestedPresentationDelay = a.suggestedPresentationDelay), a.hasOwnProperty("timeShiftBufferDepth") && (b.timeShiftBufferDepth = a.timeShiftBufferDepth), a.hasOwnProperty("maxSegmentDuration") && (b.maxSegmentDuration = a.maxSegmentDuration), b
    },
    getFetchTime: function(a, b) {
      return this.timelineConverter.calcPresentationTimeFromWallTime(a.loadedTime, b)
    },
    getCheckTime: function(a, b) {
      var c, d = this,
        e = NaN;
      return a.hasOwnProperty("minimumUpdatePeriod") && (c = d.getFetchTime(a, b), e = c + a.minimumUpdatePeriod), e
    },
    getEndTimeForLastPeriod: function(a, b) {
      var c, d = this.getCheckTime(a, b);
      if (a.mediaPresentationDuration) c = a.mediaPresentationDuration;
      else {
        if (isNaN(d)) throw new Error("Must have @mediaPresentationDuration or @minimumUpdatePeriod on MPD or an explicit @duration on the last period.");
        c = d
      }
      return c
    },
    getEventsForPeriod: function(a, b) {
      var c = a.Period_asArray,
        d = c[b.index].EventStream_asArray,
        e = [];
      if (d)
        for (var f = 0; f < d.length; f += 1) {
          var g = new Dash.vo.EventStream;
          if (g.period = b, g.timescale = 1, !d[f].hasOwnProperty("schemeIdUri")) throw "Invalid EventStream. SchemeIdUri has to be set";
          g.schemeIdUri = d[f].schemeIdUri, d[f].hasOwnProperty("timescale") && (g.timescale = d[f].timescale), d[f].hasOwnProperty("value") && (g.value = d[f].value);
          for (var h = 0; h < d[f].Event_asArray.length; h += 1) {
            var i = new Dash.vo.Event;
            i.presentationTime = 0, i.eventStream = g, d[f].Event_asArray[h].hasOwnProperty("presentationTime") && (i.presentationTime = d[f].Event_asArray[h].presentationTime), d[f].Event_asArray[h].hasOwnProperty("duration") && (i.duration = d[f].Event_asArray[h].duration), d[f].Event_asArray[h].hasOwnProperty("id") && (i.id = d[f].Event_asArray[h].id), e.push(i)
          }
        }
      return e
    },
    getEventStreams: function(a, b) {
      var c = [];
      if (!a) return c;
      for (var d = 0; d < a.length; d++) {
        var e = new Dash.vo.EventStream;
        if (e.timescale = 1, e.representation = b, !a[d].hasOwnProperty("schemeIdUri")) throw "Invalid EventStream. SchemeIdUri has to be set";
        e.schemeIdUri = a[d].schemeIdUri, a[d].hasOwnProperty("timescale") && (e.timescale = a[d].timescale), a[d].hasOwnProperty("value") && (e.value = a[d].value), c.push(e)
      }
      return c
    },
    getEventStreamForAdaptationSet: function(a, b) {
      var c = a.Period_asArray[b.period.index].AdaptationSet_asArray[b.index].InbandEventStream_asArray;
      return this.getEventStreams(c, null)
    },
    getEventStreamForRepresentation: function(a, b) {
      var c = a.Period_asArray[b.adaptation.period.index].AdaptationSet_asArray[b.adaptation.index].Representation_asArray[b.index].InbandEventStream_asArray;
      return this.getEventStreams(c, b)
    },
    getUTCTimingSources: function(a) {
      "use strict";
      var b = this,
        c = b.getIsDynamic(a),
        d = a.hasOwnProperty("availabilityStartTime"),
        e = a.UTCTiming_asArray,
        f = [];
      return (c || d) && e && e.forEach(function(a) {
        var b = new Dash.vo.UTCTiming;
        a.hasOwnProperty("schemeIdUri") && (b.schemeIdUri = a.schemeIdUri, a.hasOwnProperty("value") && (b.value = a.value.toString(), f.push(b)))
      }), f
    }
  }, Dash.dependencies.DashMetricsExtensions = function() {
    "use strict";
    var a = function(a, b) {
        var c, d, e, f, g, h;
        for (d = a.AdaptationSet_asArray, g = 0; g < d.length; g += 1)
          for (c = d[g], f = c.Representation_asArray, h = 0; h < f.length; h += 1)
            if (e = f[h], b === e.id) return h;
        return -1
      },
      b = function(a, b) {
        var c, d, e, f, g, h;
        for (d = a.AdaptationSet_asArray, g = 0; g < d.length; g += 1)
          for (c = d[g], f = c.Representation_asArray, h = 0; h < f.length; h += 1)
            if (e = f[h], b === e.id) return e;
        return null
      },
      c = function(a, b) {
        return this.manifestExt.getIsTypeOf(a, b)
      },
      d = function(a, b) {
        var d, e, f, g;
        if (!a || !b) return -1;
        for (e = a.AdaptationSet_asArray, g = 0; g < e.length; g += 1)
          if (d = e[g], f = d.Representation_asArray, c.call(this, d, b)) return f.length;
        return -1
      },
      e = function(a, c) {
        var d, e = this,
          f = e.manifestModel.getValue(),
          g = f.Period_asArray[c];
        return d = b.call(e, g, a), null === d ? null : d.bandwidth
      },
      f = function(b, c) {
        var d, e = this,
          f = e.manifestModel.getValue(),
          g = f.Period_asArray[c];
        return d = a.call(e, g, b)
      },
      g = function(a, b) {
        var c, e = this,
          f = e.manifestModel.getValue(),
          g = f.Period_asArray[b];
        return c = d.call(this, g, a)
      },
      h = function(a, b) {
        var c = this.system.getObject("abrController"),
          d = 0;
        return c && (d = c.getTopQualityIndexFor(a, b)), d
      },
      i = function(a) {
        if (null === a) return null;
        var b, c, d, e = a.RepSwitchList;
        return null === e || e.length <= 0 ? null : (b = e.length, c = b - 1, d = e[c])
      },
      j = function(a) {
        if (null === a) return null;
        var b, c, d, e = a.BufferLevel;
        return null === e || e.length <= 0 ? null : (b = e.length, c = b - 1, d = e[c])
      },
      k = function(a) {
        return a.RequestsQueue
      },
      l = function(a) {
        if (null === a) return null;
        var b, c, d = a.PlayList;
        return null === d || d.length <= 0 ? null : (b = d[d.length - 1].trace, null === b || b.length <= 0 ? null : c = b[b.length - 1].playbackspeed)
      },
      m = function(a) {
        if (null === a) return null;
        var b, c, d = a.HttpList,
          e = null;
        if (null === d || d.length <= 0) return null;
        for (b = d.length, c = b - 1; c >= 0;) {
          if (d[c].responsecode) {
            e = d[c];
            break
          }
          c -= 1
        }
        return e
      },
      n = function(a) {
        return null === a ? [] : a.HttpList ? a.HttpList : []
      },
      o = function(a) {
        if (null === a) return null;
        var b, c, d, e = a.DroppedFrames;
        return null === e || e.length <= 0 ? null : (b = e.length, c = b - 1, d = e[c])
      },
      p = function(a) {
        if (null === a) return null;
        var b, c, d, e = a.SchedulingInfo;
        return null === e || e.length <= 0 ? null : (b = e.length, c = b - 1, d = e[c])
      },
      q = function(a) {
        if (null === a) return null;
        var b, c, d, e = a.ManifestUpdate;
        return null === e || e.length <= 0 ? null : (b = e.length, c = b - 1, d = e[c])
      },
      r = function(a) {
        if (null === a) return null;
        var b, c, d = a.DVRInfo;
        return null === d || d.length <= 0 ? null : (b = d.length - 1, c = d[b])
      },
      s = function(a, b) {
        var c, d, e, f = {};
        if (null === a) return null;
        for (c = n(a), e = c.length - 1; e >= 0; e -= 1)
          if (d = c[e], d.type === MediaPlayer.vo.metrics.HTTPRequest.MPD_TYPE) {
            f = u(d.responseHeaders);
            break
          } return void 0 === f[b] ? null : f[b]
      },
      t = function(a, b) {
        if (null === a) return null;
        var c, d = m(a);
        return null === d || null === d.responseHeaders ? null : (c = u(d.responseHeaders), void 0 === c[b] ? null : c[b])
      },
      u = function(a) {
        var b = {};
        if (!a) return b;
        for (var c = a.split("\r\n"), d = 0, e = c.length; e > d; d++) {
          var f = c[d],
            g = f.indexOf(": ");
          g > 0 && (b[f.substring(0, g)] = f.substring(g + 2))
        }
        return b
      };
    return {
      manifestModel: void 0,
      manifestExt: void 0,
      system: void 0,
      getBandwidthForRepresentation: e,
      getIndexForRepresentation: f,
      getMaxIndexForBufferType: g,
      getMaxAllowedIndexForBufferType: h,
      getCurrentRepresentationSwitch: i,
      getCurrentBufferLevel: j,
      getCurrentPlaybackRate: l,
      getCurrentHttpRequest: m,
      getHttpRequests: n,
      getCurrentDroppedFrames: o,
      getCurrentSchedulingInfo: p,
      getCurrentDVRInfo: r,
      getCurrentManifestUpdate: q,
      getLatestFragmentRequestHeaderValueByID: t,
      getLatestMPDRequestHeaderValueByID: s,
      getRequestsQueue: k
    }
  }, Dash.dependencies.DashMetricsExtensions.prototype = {
    constructor: Dash.dependencies.DashMetricsExtensions
  }, Dash.dependencies.FragmentExtensions = function() {
    "use strict";
    var a = function(a) {
        var b, c, d, e, f, g, h, i, j, k = this.boxParser.parse(a),
          l = k.getBox("tfhd"),
          m = k.getBox("tfdt"),
          n = k.getBox("trun"),
          o = k.getBox("moof");
        for (d = n.sample_count, f = m.baseMediaDecodeTime, j = (l.base_data_offset || 0) + (n.data_offset || 0), g = [], i = 0; d > i; i++) h = n.samples[i], b = void 0 !== h.sample_duration ? h.sample_duration : l.default_sample_duration, e = void 0 !== h.sample_size ? h.sample_size : l.default_sample_size, c = void 0 !== h.sample_composition_time_offset ? h.sample_composition_time_offset : 0, g.push({
          dts: f,
          cts: f + c,
          duration: b,
          offset: o.offset + j,
          size: e
        }), j += e, f += b;
        return g
      },
      b = function(a) {
        var b = this.boxParser.parse(a),
          c = b.getBox("mdhd");
        return c ? c.timescale : NaN
      };
    return {
      log: void 0,
      notify: void 0,
      subscribe: void 0,
      unsubscribe: void 0,
      boxParser: void 0,
      getSamplesInfo: a,
      getMediaTimescaleFromMoov: b
    }
  }, Dash.dependencies.FragmentExtensions.prototype = {
    constructor: Dash.dependencies.FragmentExtensions
  }, Dash.dependencies.FragmentExtensions.eventList = {
    ENAME_FRAGMENT_LOADING_COMPLETED: "fragmentLoadingCompleted"
  }, Dash.vo.AdaptationSet = function() {
    "use strict";
    this.period = null, this.index = -1, this.type = null
  }, Dash.vo.AdaptationSet.prototype = {
    constructor: Dash.vo.AdaptationSet
  }, Dash.vo.Event = function() {
    "use strict";
    this.duration = NaN, this.presentationTime = NaN, this.id = NaN, this.messageData = "", this.eventStream = null, this.presentationTimeDelta = NaN
  }, Dash.vo.Event.prototype = {
    constructor: Dash.vo.Event
  }, Dash.vo.EventStream = function() {
    "use strict";
    this.adaptionSet = null, this.representation = null, this.period = null, this.timescale = 1, this.value = "", this.schemeIdUri = ""
  }, Dash.vo.EventStream.prototype = {
    constructor: Dash.vo.EventStream
  }, Dash.vo.Mpd = function() {
    "use strict";
    this.manifest = null, this.suggestedPresentationDelay = 0, this.availabilityStartTime = null, this.availabilityEndTime = Number.POSITIVE_INFINITY, this.timeShiftBufferDepth = Number.POSITIVE_INFINITY, this.maxSegmentDuration = Number.POSITIVE_INFINITY, this.checkTime = NaN, this.clientServerTimeShift = 0, this.isClientServerTimeSyncCompleted = !1
  }, Dash.vo.Mpd.prototype = {
    constructor: Dash.vo.Mpd
  }, Dash.vo.Period = function() {
    "use strict";
    this.id = null, this.index = -1, this.duration = NaN, this.start = NaN, this.mpd = null
  }, Dash.vo.Period.prototype = {
    constructor: Dash.vo.Period
  }, Dash.vo.Period.DEFAULT_ID = "defaultId", Dash.vo.Representation = function() {
    "use strict";
    this.id = null, this.index = -1, this.adaptation = null, this.segmentInfoType = null, this.initialization = null, this.segmentDuration = NaN, this.timescale = 1, this.startNumber = 1, this.indexRange = null, this.range = null, this.presentationTimeOffset = 0, this.MSETimeOffset = NaN, this.segmentAvailabilityRange = null, this.availableSegmentsNumber = 0, this.bandwidth = NaN, this.maxPlayoutRate = NaN
  }, Dash.vo.Representation.prototype = {
    constructor: Dash.vo.Representation
  }, Dash.vo.Segment = function() {
    "use strict";
    this.indexRange = null, this.index = null, this.mediaRange = null, this.media = null, this.duration = NaN, this.replacementTime = null, this.replacementNumber = NaN, this.mediaStartTime = NaN, this.presentationStartTime = NaN, this.availabilityStartTime = NaN, this.availabilityEndTime = NaN, this.availabilityIdx = NaN, this.wallStartTime = NaN, this.representation = null
  }, Dash.vo.Segment.prototype = {
    constructor: Dash.vo.Segment
  }, Dash.vo.UTCTiming = function() {
    "use strict";
    this.schemeIdUri = "", this.value = ""
  }, Dash.vo.UTCTiming.prototype = {
    constructor: Dash.vo.UTCTiming
  }, MediaPlayer.dependencies.ErrorHandler = function() {
    "use strict";
    var a = MediaPlayer.events.ERROR;
    return {
      eventBus: void 0,
      capabilityError: function(b) {
        this.eventBus.dispatchEvent({
          type: a,
          error: "capability",
          event: b
        })
      },
      downloadError: function(b, c, d) {
        this.eventBus.dispatchEvent({
          type: a,
          error: "download",
          event: {
            id: b,
            url: c,
            request: d
          }
        })
      },
      manifestError: function(b, c, d) {
        this.eventBus.dispatchEvent({
          type: a,
          error: "manifestError",
          event: {
            message: b,
            id: c,
            manifest: d
          }
        })
      },
      closedCaptionsError: function(b, c, d) {
        this.eventBus.dispatchEvent({
          type: a,
          error: "cc",
          event: {
            message: b,
            id: c,
            cc: d
          }
        })
      },
      mediaSourceError: function(b) {
        this.eventBus.dispatchEvent({
          type: a,
          error: "mediasource",
          event: b
        })
      },
      mediaKeySessionError: function(b) {
        this.eventBus.dispatchEvent({
          type: a,
          error: "key_session",
          event: b
        })
      },
      mediaKeyMessageError: function(b) {
        this.eventBus.dispatchEvent({
          type: a,
          error: "key_message",
          event: b
        })
      },
      mediaKeySystemSelectionError: function(b) {
        this.eventBus.dispatchEvent({
          type: a,
          error: "key_system_selection",
          event: b
        })
      }
    }
  }, MediaPlayer.dependencies.ErrorHandler.prototype = {
    constructor: MediaPlayer.dependencies.ErrorHandler
  }, MediaPlayer.dependencies.FragmentLoader = function() {
    "use strict";
    var a = MediaPlayer.dependencies.FragmentLoader.RETRY_ATTEMPTS,
      b = MediaPlayer.dependencies.FragmentLoader.RETRY_INTERVAL,
      c = [],
      d = function(a, e) {
        var f = new XMLHttpRequest,
          g = [],
          h = !0,
          i = !0,
          j = null,
          k = this,
          l = function(b, c) {
            i = !1;
            var d, e, h = new Date,
              l = f.response,
              m = null;
            g.push({
              s: h,
              d: h.getTime() - j.getTime(),
              b: [l ? l.byteLength : 0]
            }), b.firstByteDate || (b.firstByteDate = b.requestStartDate), b.requestEndDate = h, d = b.firstByteDate.getTime() - b.requestStartDate.getTime(), e = b.requestEndDate.getTime() - b.firstByteDate.getTime(), k.log((c ? "loaded " : "failed ") + b.mediaType + ":" + b.type + ":" + b.startTime + " (" + f.status + ", " + d + "ms, " + e + "ms)"), m = k.metricsModel.addHttpRequest(a.mediaType, null, a.type, a.url, f.responseURL || null, a.range, a.requestStartDate, b.firstByteDate, b.requestEndDate, f.status, a.duration, f.getAllResponseHeaders()), c && g.forEach(function(a) {
              k.metricsModel.appendHttpTrace(m, a.s, a.d, a.b)
            })
          };
        c.push(f), a.requestStartDate = new Date, g.push({
          s: a.requestStartDate,
          d: 0,
          b: [0]
        }), j = a.requestStartDate, f.open("GET", k.requestModifierExt.modifyRequestURL(a.url), !0), f.responseType = "arraybuffer", f = k.requestModifierExt.modifyRequestHeader(f), a.range && f.setRequestHeader("Range", "bytes=" + a.range), f.onprogress = function(b) {
          var c = new Date;
          h && (h = !1, (!b.lengthComputable || b.lengthComputable && b.total != b.loaded) && (a.firstByteDate = c)), b.lengthComputable && (a.bytesLoaded = b.loaded, a.bytesTotal = b.total), g.push({
            s: c,
            d: c.getTime() - j.getTime(),
            b: [f.response ? f.response.byteLength : 0]
          }), j = c, k.notify(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_PROGRESS, {
            request: a
          })
        }, f.onload = function() {
          f.status < 200 || f.status > 299 || (l(a, !0), k.notify(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_COMPLETED, {
            request: a,
            response: f.response
          }))
        }, f.onloadend = f.onerror = function() {
          -1 !== c.indexOf(f) && (c.splice(c.indexOf(f), 1), i && (l(a, !1), e > 0 ? (k.log("Failed loading fragment: " + a.mediaType + ":" + a.type + ":" + a.startTime + ", retry in " + b + "ms attempts: " + e), e--, setTimeout(function() {
            d.call(k, a, e)
          }, b)) : (k.log("Failed loading fragment: " + a.mediaType + ":" + a.type + ":" + a.startTime + " no retry attempts left"), k.errHandler.downloadError("content", a.url, f), k.notify(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_COMPLETED, {
            request: a,
            bytes: null
          }, new MediaPlayer.vo.Error(null, "failed loading fragment", null)))))
        }, f.send()
      },
      e = function(a) {
        var b = this,
          c = new XMLHttpRequest,
          d = !1;
        c.open("HEAD", a.url, !0), c.onload = function() {
          c.status < 200 || c.status > 299 || (d = !0, b.notify(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_CHECK_FOR_EXISTENCE_COMPLETED, {
            request: a,
            exists: !0
          }))
        }, c.onloadend = c.onerror = function() {
          d || b.notify(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_CHECK_FOR_EXISTENCE_COMPLETED, {
            request: a,
            exists: !1
          })
        }, c.send()
      };
    return {
      metricsModel: void 0,
      errHandler: void 0,
      log: void 0,
      requestModifierExt: void 0,
      notify: void 0,
      subscribe: void 0,
      unsubscribe: void 0,
      load: function(b) {
        b ? d.call(this, b, a) : this.notify(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_COMPLETED, {
          request: b,
          bytes: null
        }, new MediaPlayer.vo.Error(null, "request is null", null))
      },
      checkForExistence: function(a) {
        return a ? void e.call(this, a) : void this.notify(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_CHECK_FOR_EXISTENCE_COMPLETED, {
          request: a,
          exists: !1
        })
      },
      abort: function() {
        var a, b, d = c.length;
        for (a = 0; d > a; a += 1) b = c[a], c[a] = null, b.abort(), b = null;
        c = []
      }
    }
  }, MediaPlayer.dependencies.FragmentLoader.RETRY_ATTEMPTS = 3, MediaPlayer.dependencies.FragmentLoader.RETRY_INTERVAL = 500, MediaPlayer.dependencies.FragmentLoader.prototype = {
    constructor: MediaPlayer.dependencies.FragmentLoader
  }, MediaPlayer.dependencies.FragmentLoader.eventList = {
    ENAME_LOADING_COMPLETED: "loadingCompleted",
    ENAME_LOADING_PROGRESS: "loadingProgress",
    ENAME_CHECK_FOR_EXISTENCE_COMPLETED: "checkForExistenceCompleted"
  }, MediaPlayer.dependencies.LiveEdgeFinder = function() {
    "use strict";
    var a, b = !1,
      c = NaN,
      d = null,
      e = MediaPlayer.rules.SynchronizationRulesCollection.prototype.BEST_GUESS_RULES,
      f = function(a) {
        var b = ((new Date).getTime() - c) / 1e3;
        d = a.value, this.notify(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED, {
          liveEdge: d,
          searchTime: b
        }, null === d ? new MediaPlayer.vo.Error(MediaPlayer.dependencies.LiveEdgeFinder.LIVE_EDGE_NOT_FOUND_ERROR_CODE, "live edge has not been found", null) : null)
      },
      g = function(d) {
        var g = this;
        !g.streamProcessor.isDynamic() || b || d.error || (a = g.synchronizationRulesCollection.getRules(e), b = !0, c = (new Date).getTime(), g.rulesController.applyRules(a, g.streamProcessor, f.bind(g), null, function(a, b) {
          return b
        }))
      },
      h = function(a) {
        e = a.error ? MediaPlayer.rules.SynchronizationRulesCollection.prototype.BEST_GUESS_RULES : MediaPlayer.rules.SynchronizationRulesCollection.prototype.TIME_SYNCHRONIZED_RULES
      };
    return {
      system: void 0,
      synchronizationRulesCollection: void 0,
      rulesController: void 0,
      notify: void 0,
      subscribe: void 0,
      unsubscribe: void 0,
      setup: function() {
        this[MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED] = g, this[MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED] = h
      },
      initialize: function(a) {
        this.streamProcessor = a, this.fragmentLoader = a.fragmentLoader
      },
      abortSearch: function() {
        b = !1, c = NaN
      },
      getLiveEdge: function() {
        return d
      },
      reset: function() {
        this.abortSearch(), d = null
      }
    }
  }, MediaPlayer.dependencies.LiveEdgeFinder.prototype = {
    constructor: MediaPlayer.dependencies.LiveEdgeFinder
  }, MediaPlayer.dependencies.LiveEdgeFinder.eventList = {
    ENAME_LIVE_EDGE_SEARCH_COMPLETED: "liveEdgeFound"
  }, MediaPlayer.dependencies.LiveEdgeFinder.LIVE_EDGE_NOT_FOUND_ERROR_CODE = 1, MediaPlayer.dependencies.ManifestLoader = function() {
    "use strict";
    var a = 3,
      b = 500,
      c = function(a) {
        var b = "";
        return -1 !== a.indexOf("/") && (-1 !== a.indexOf("?") && (a = a.substring(0, a.indexOf("?"))), b = a.substring(0, a.lastIndexOf("/") + 1)), b
      },
      d = function(a, e) { // doLoad, a = url, e = retry attempts
        var f, g, h, i, j, k = c(a),
          l = new XMLHttpRequest,
          m = new Date,
          n = null,
          o = !0,
          p = this;
        g = function() { // onload
          var b, d = null;
          l.status < 200 || l.status > 299 || (o = !1, n = new Date, l.responseURL && l.responseURL !== a && (k = c(l.responseURL), d = l.responseURL), p.metricsModel.addHttpRequest("stream", null, MediaPlayer.vo.metrics.HTTPRequest.MPD_TYPE, a, d, null, m, l.firstByteDate || null, n, l.status, null, l.getAllResponseHeaders()), f = p.parser.parse(l.responseText, k, p.xlinkController), f ? (f.url = d || a, f.loadedTime = n, p.metricsModel.addManifestUpdate("stream", f.type, m, n, f.availabilityStartTime), p.xlinkController.resolveManifestOnLoad(f)) : (b = "Failed loading manifest: " + a + ", parsing failed", p.notify(MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED, {
            manifest: null
          }, new MediaPlayer.vo.Error(MediaPlayer.dependencies.ManifestLoader.PARSERERROR_ERROR_CODE, b, null)), p.log(b)))
        }, h = function() { // report
          o && (o = !1, p.metricsModel.addHttpRequest("stream", null, MediaPlayer.vo.metrics.HTTPRequest.MPD_TYPE, a, l.responseURL || null, null, m, l.firstByteDate || null, new Date, l.status, null, l.getAllResponseHeaders()), e > 0 ? (p.log("Failed loading manifest: " + a + ", retry in " + b + "ms attempts: " + e), e--, setTimeout(function() {
            d.call(p, a, e)
          }, b)) : (p.log("Failed loading manifest: " + a + " no retry attempts left"), p.errHandler.downloadError("manifest", a, l), p.notify(MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED, null, new Error("Failed loading manifest: " + a + " no retry attempts left"))))
        }, i = function(a) {
          j && (j = !1, (!a.lengthComputable || a.lengthComputable && a.total != a.loaded) && (l.firstByteDate = new Date))
        };
        try {
          l.onload = g, l.onloadend = h, l.onerror = h, l.onprogress = i, l.open("GET", p.requestModifierExt.modifyRequestURL(a), !0), l.send()
        } catch (q) {
          l.onerror()
        }
      },
      e = function(a, b) { //DIFF3: Object Extension of d(), calls the JSON-Parser via DIFF2, defined as a method in DIFF1. a is arg[0] from load(arg), b is arg[1]
        var d, e, f = c(a),
          g = new Date,
          h = null,
          i = this;
        h = new Date, e = i.parser.parseJSON(b, f, i.xlinkController), e ? (e.url = a, e.loadedTime = h, i.metricsModel.addManifestUpdate("stream", e.type, g, h, e.availabilityStartTime), i.xlinkController.resolveManifestOnLoad(e)) : (d = "Failed loading manifest: " + a + ", parsing failed", i.notify(MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED, {
          manifest: null
        }, new MediaPlayer.vo.Error(MediaPlayer.dependencies.ManifestLoader.PARSERERROR_ERROR_CODE, d, null)), i.log(d))
      },
      f = function(a) {
        this.notify(MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED, {
          manifest: a.data.manifest
        })
      };
    return {
      log: void 0,
      parser: void 0,
      errHandler: void 0,
      metricsModel: void 0,
      requestModifierExt: void 0,
      notify: void 0,
      subscribe: void 0,
      unsubscribe: void 0,
      system: void 0,
      load: function(b) {
        if ("string" == typeof b) d.call(this, b, a);
        else if ("object" == typeof b) {//DIFF4: if the given b is an object, call e() from DIFF3 to parse it, otherwise call the regular parser from d()
          var c = b[0],
              f = b[1];
          e.call(this, c, f)
        }
      },
      setup: function() {
        f = f.bind(this), this.xlinkController = this.system.getObject("xlinkController"), this.xlinkController.subscribe(MediaPlayer.dependencies.XlinkController.eventList.ENAME_XLINK_READY, this, f)
      }
    }
  }, MediaPlayer.dependencies.ManifestLoader.prototype = {
    constructor: MediaPlayer.dependencies.ManifestLoader
  }, MediaPlayer.dependencies.ManifestLoader.PARSERERROR_ERROR_CODE = 1, MediaPlayer.dependencies.ManifestLoader.eventList = {
    ENAME_MANIFEST_LOADED: "manifestLoaded"
  }, MediaPlayer.dependencies.ManifestUpdater = function() {
    "use strict";
    var a, b = NaN,
      c = null,
      d = !0,
      e = !1,
      f = function() {
        null !== c && (clearInterval(c), c = null)
      },
      g = function() {
        f.call(this), isNaN(b) || (this.log("Refresh manifest in " + b + " seconds."), c = setTimeout(i.bind(this), Math.min(1e3 * b, Math.pow(2, 31) - 1), this))
      },
      h = function(a) {
        var c, e, f = new Date;
        this.manifestModel.setValue(a), this.log("Manifest has been refreshed at " + f + "[" + f.getTime() + "] "), c = this.manifestExt.getRefreshDelay(a), e = ((new Date).getTime() - a.loadedTime.getTime()) / 1e3, b = Math.max(c - e, 0), this.notify(MediaPlayer.dependencies.ManifestUpdater.eventList.ENAME_MANIFEST_UPDATED, {
          manifest: a
        }), d || g.call(this)
      },
      i = function() {
        var b, c, f = this;
        d || e || (e = !0, b = f.manifestModel.getValue(), c = b.url, b.hasOwnProperty("Location") && (c = b.Location), a.load(c))
      },
      j = function(a) {
        a.error || h.call(this, a.data.manifest)
      },
      k = function() {
        d = !1, g.call(this)
      },
      l = function() {
        d = !0, f.call(this)
      },
      m = function() {
        e = !1
      };
    return {
      log: void 0,
      system: void 0,
      subscribe: void 0,
      unsubscribe: void 0,
      notify: void 0,
      manifestModel: void 0,
      manifestExt: void 0,
      setup: function() {
        this[MediaPlayer.dependencies.StreamController.eventList.ENAME_STREAMS_COMPOSED] = m, this[MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED] = j, this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_STARTED] = k, this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PAUSED] = l
      },
      initialize: function(b) {
        e = !1, d = !0, a = b, a.subscribe(MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED, this)
      },
      setManifest: function(a) {
        h.call(this, a)
      },
      getManifestLoader: function() {
        return a
      },
      reset: function() {
        d = !0, e = !1, f.call(this), a.unsubscribe(MediaPlayer.dependencies.ManifestLoader.eventList.ENAME_MANIFEST_LOADED, this), b = NaN
      }
    }
  }, MediaPlayer.dependencies.ManifestUpdater.prototype = {
    constructor: MediaPlayer.dependencies.ManifestUpdater
  }, MediaPlayer.dependencies.ManifestUpdater.eventList = {
    ENAME_MANIFEST_UPDATED: "manifestUpdated"
  }, MediaPlayer.dependencies.Notifier = function() {
    "use strict";
    var a, b = "observableId",
      c = 0,
      d = function() {
        return this[b] || (c += 1, this[b] = "_id_" + c), this[b]
      };
    return {
      system: void 0,
      setup: function() {
        a = this.system, a.mapValue("notify", this.notify), a.mapValue("subscribe", this.subscribe), a.mapValue("unsubscribe", this.unsubscribe)
      },
      notify: function() {
        var b = arguments[0] + d.call(this),
          c = new MediaPlayer.vo.Event;
        c.sender = this, c.type = arguments[0], c.data = arguments[1], c.error = arguments[2], c.timestamp = (new Date).getTime(), a.notify.call(a, b, c)
      },
      subscribe: function(b, c, e, f) {
        if (!e && c[b] && (e = c[b] = c[b].bind(c)), !c) throw "observer object cannot be null or undefined";
        if (!e) throw "event handler cannot be null or undefined";
        b += d.call(this), a.mapHandler(b, void 0, e, f)
      },
      unsubscribe: function(b, c, e) {
        e = e || c[b], b += d.call(this), a.unmapHandler(b, void 0, e)
      }
    }
  }, MediaPlayer.dependencies.Notifier.prototype = {
    constructor: MediaPlayer.dependencies.Notifier
  }, MediaPlayer.dependencies.Stream = function() {
    "use strict";
    var a, b, c = [],
      d = !1,
      e = !1,
      f = null,
      g = {},
      h = !1,
      i = !1,
      j = null,
      k = function(a) {
        a.error && (this.errHandler.mediaKeySessionError(a.error), this.log(a.error), this.reset())
      },
      l = function(a) {
        return "text" === a.type ? a.mimeType : a.type
      },
      m = function(a, b, c) {
        var d, e, f = this,
          g = a.type;
        if ("muxed" === g && a) return e = "Multiplexed representations are intentionally not supported, as they are not compliant with the DASH-AVC/264 guidelines", this.log(e), this.errHandler.manifestError(e, "multiplexedrep", this.manifestModel.getValue()), !1;
        if ("text" === g || "fragmentedText" === g) return !0;
        if (d = a.codec, f.log(g + " codec: " + d), a.contentProtection && !f.capabilities.supportsEncryptedMedia()) f.errHandler.capabilityError("encryptedmedia");
        else if (!f.capabilities.supportsCodec(f.videoModel.getElement(), d)) return e = g + "Codec (" + d + ") is not supported.", f.errHandler.manifestError(e, "codec", c), f.log(e), !1;
        return !0
      },
      n = function(a) {
        var b = w.call(this, a.data.oldMediaInfo);
        if (b) {
          var d = this.playbackController.getTime(),
            e = b.getBuffer(),
            f = a.data.newMediaInfo,
            g = this.manifestModel.getValue(),
            h = c.indexOf(b),
            i = b.getMediaSource();
          "fragmentedText" !== f.type ? (b.reset(!0), o.call(this, f, g, i, {
            buffer: e,
            replaceIdx: h,
            currentTime: d
          }), this.playbackController.seek(this.playbackController.getTime())) : (b.setIndexHandlerTime(d), b.updateMediaInfo(g, f))
        }
      },
      o = function(a, b, d, e) {
        var g = this,
          h = g.system.getObject("streamProcessor"),
          i = this.adapter.getAllMediaInfoForType(b, f, a.type);
        if (h.initialize(l.call(g, a), g.fragmentController, d, g, j), g.abrController.updateTopQualityIndex(a), e ? (h.setBuffer(e.buffer), c[e.replaceIdx] = h, h.setIndexHandlerTime(e.currentTime)) : c.push(h), "text" === a.type || "fragmentedText" === a.type) {
          for (var k, m = 0; m < i.length; m++) i[m].index === a.index && (k = m), h.updateMediaInfo(b, i[m]);
          "fragmentedText" === a.type && h.updateMediaInfo(b, i[k])
        } else h.updateMediaInfo(b, a);
        return h
      },
      p = function(a, b) {
        var c, d = this,
          e = d.manifestModel.getValue(),
          g = this.adapter.getAllMediaInfoForType(e, f, a),
          h = null;
        if (!g || 0 === g.length) return void d.log("No " + a + " data.");
        for (var i = 0, j = g.length; j > i; i += 1) h = g[i], m.call(d, h, b, e) && d.mediaController.isMultiTrackSupportedByType(h.type) && d.mediaController.addTrack(h, f);
        0 !== this.mediaController.getTracksFor(a, f).length && (this.mediaController.checkInitialMediaSettings(f), c = this.mediaController.getCurrentTrackFor(a, f), o.call(this, c, e, b))
      },
      q = function(a) {
        var b, d = this,
          g = d.manifestModel.getValue();
        if (j = d.system.getObject("eventController"), b = d.adapter.getEventsFor(g, f), j.addInlineEvents(b), h = !0, p.call(d, "video", a), p.call(d, "audio", a), p.call(d, "text", a), p.call(d, "fragmentedText", a), p.call(d, "muxed", a), t.call(d), e = !0, h = !1, 0 === c.length) {
          var i = "No streams to play.";
          d.errHandler.manifestError(i, "nostreams", g), d.log(i)
        } else d.liveEdgeFinder.initialize(c[0]), d.liveEdgeFinder.subscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED, d.playbackController), r.call(this)
      },
      r = function() {
        var b = this,
          j = c.length,
          k = !!g.audio || !!g.video,
          l = k ? new MediaPlayer.vo.Error(MediaPlayer.dependencies.Stream.DATA_UPDATE_FAILED_ERROR_CODE, "Data update failed", null) : null,
          m = 0;
        for (m; j > m; m += 1)
          if (c[m].isUpdating() || h) return;
        i = !0, b.eventBus.dispatchEvent({
          type: MediaPlayer.events.STREAM_INITIALIZED,
          data: {
            streamInfo: f
          }
        }), b.notify(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED, {
          streamInfo: f
        }, l), e && !d && (a.init(b.manifestModel.getValue(), s.call(this, "audio"), s.call(this, "video")), d = !0)
      },
      s = function(a) {
        for (var b = c.length, d = null, e = 0; b > e; e += 1)
          if (d = c[e], d.getType() === a) return d.getMediaInfo();
        return null
      },
      t = function() {
        for (var a = 0, b = c.length; b > a; a += 1) c[a].createBuffer()
      },
      u = function() {
        var a = x(),
          b = a.length,
          c = 0;
        for (c; b > c; c += 1)
          if (!a[c].isBufferingCompleted()) return;
        this.notify(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_BUFFERING_COMPLETED, {
          streamInfo: f
        })
      },
      v = function(a) {
        var b = a.sender.streamProcessor.getType();
        g[b] = a.error, r.call(this)
      },
      w = function(a) {
        if (!a) return !1;
        var b = x.call(this);
        return b.filter(function(b) {
          return b.getType() === a.type
        })[0]
      },
      x = function() {
        var a, b, d = [],
          e = 0,
          f = c.length;
        for (e; f > e; e += 1) b = c[e], a = b.getType(), ("audio" === a || "video" === a || "fragmentedText" === a) && d.push(b);
        return d
      },
      y = function(a) {
        var b, e, g, k = this,
          l = c.length,
          m = k.manifestModel.getValue(),
          n = 0;
        for (d = !1, f = a, k.log("Manifest updated... set new data on buffers."), j && (e = k.adapter.getEventsFor(m, f), j.addInlineEvents(e)), h = !0, i = !1, n; l > n; n += 1) g = c[n], b = k.adapter.getMediaInfoForType(m, f, g.getType()), this.abrController.updateTopQualityIndex(b), g.updateMediaInfo(m, b);
        h = !1, r.call(k)
      };
    return {
      system: void 0,
      eventBus: void 0,
      manifestModel: void 0,
      sourceBufferExt: void 0,
      adapter: void 0,
      videoModel: void 0,
      fragmentController: void 0,
      playbackController: void 0,
      mediaController: void 0,
      capabilities: void 0,
      log: void 0,
      errHandler: void 0,
      liveEdgeFinder: void 0,
      abrController: void 0,
      notify: void 0,
      subscribe: void 0,
      unsubscribe: void 0,
      setup: function() {
        this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFERING_COMPLETED] = u, this[Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED] = v, this[MediaPlayer.dependencies.MediaController.eventList.CURRENT_TRACK_CHANGED] = n
      },
      initialize: function(c, d) {
        f = c, a = d, b = k.bind(this), a.addEventListener(MediaPlayer.dependencies.ProtectionController.events.KEY_SYSTEM_SELECTED, b), a.addEventListener(MediaPlayer.dependencies.ProtectionController.events.SERVER_CERTIFICATE_UPDATED, b), a.addEventListener(MediaPlayer.dependencies.ProtectionController.events.KEY_ADDED, b), a.addEventListener(MediaPlayer.dependencies.ProtectionController.events.KEY_SESSION_CREATED, b), a.addEventListener(MediaPlayer.dependencies.ProtectionController.events.KEY_SYSTEM_SELECTED, b), a.addEventListener(MediaPlayer.dependencies.ProtectionController.events.KEY_SYSTEM_SELECTED, b), a.addEventListener(MediaPlayer.dependencies.ProtectionController.events.LICENSE_REQUEST_COMPLETE, b)
      },
      activate: function(a) {
        d ? t.call(this) : q.call(this, a)
      },
      deactivate: function() {
        var a = c.length,
          b = 0;
        for (b; a > b; b += 1) c[b].reset();
        c = [], d = !1, e = !1, this.resetEventController()
      },
      reset: function(f) {
        this.playbackController.pause();
        var k, l = c.length,
          m = 0;
        for (m; l > m; m += 1) k = c[m], k.reset(f), k = null;
        j && j.reset(), c = [], h = !1, i = !1, this.fragmentController && this.fragmentController.reset(), this.fragmentController = void 0, this.liveEdgeFinder.abortSearch(), this.liveEdgeFinder.unsubscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED, this.playbackController), a.removeEventListener(MediaPlayer.dependencies.ProtectionController.events.KEY_SYSTEM_SELECTED, b), a.removeEventListener(MediaPlayer.dependencies.ProtectionController.events.SERVER_CERTIFICATE_UPDATED, b), a.removeEventListener(MediaPlayer.dependencies.ProtectionController.events.KEY_ADDED, b), a.removeEventListener(MediaPlayer.dependencies.ProtectionController.events.KEY_SESSION_CREATED, b), a.removeEventListener(MediaPlayer.dependencies.ProtectionController.events.KEY_SYSTEM_SELECTED, b), a.removeEventListener(MediaPlayer.dependencies.ProtectionController.events.KEY_SYSTEM_SELECTED, b), a.removeEventListener(MediaPlayer.dependencies.ProtectionController.events.LICENSE_REQUEST_COMPLETE, b), e = !1, d = !1, g = {}
      },
      getDuration: function() {
        return f.duration
      },
      getStartTime: function() {
        return f.start
      },
      getStreamIndex: function() {
        return f.index
      },
      getId: function() {
        return f.id
      },
      getStreamInfo: function() {
        return f
      },
      hasMedia: function(a) {
        return null !== s.call(this, a)
      },
      getBitrateListFor: function(a) {
        var b = s.call(this, a);
        return this.abrController.getBitrateList(b)
      },
      startEventController: function() {
        j.start()
      },
      resetEventController: function() {
        j.reset()
      },
      isActivated: function() {
        return d
      },
      isInitialized: function() {
        return i
      },
      updateData: y
    }
  }, MediaPlayer.dependencies.Stream.prototype = {
    constructor: MediaPlayer.dependencies.Stream
  }, MediaPlayer.dependencies.Stream.DATA_UPDATE_FAILED_ERROR_CODE = 1, MediaPlayer.dependencies.Stream.eventList = {
    ENAME_STREAM_UPDATED: "streamUpdated",
    ENAME_STREAM_BUFFERING_COMPLETED: "streamBufferingCompleted"
  }, MediaPlayer.dependencies.StreamProcessor = function() {
    "use strict";
    var a, b = null,
      c = null,
      d = null,
      e = null,
      f = [],
      g = function(a) {
        var b = this,
          c = "video" === a || "audio" === a || "fragmentedText" === a ? "bufferController" : "textController";
        return b.system.getObject(c)
      };
    return {
      system: void 0,
      videoModel: void 0,
      indexHandler: void 0,
      liveEdgeFinder: void 0,
      timelineConverter: void 0,
      abrController: void 0,
      playbackController: void 0,
      baseURLExt: void 0,
      adapter: void 0,
      manifestModel: void 0,
      initialize: function(c, f, h, i, j) {
        var k, l = this,
          m = l.system.getObject("representationController"),
          n = l.system.getObject("scheduleController"),
          o = l.liveEdgeFinder,
          p = l.abrController,
          q = l.indexHandler,
          r = l.baseURLExt,
          s = l.playbackController,
          t = l.system.getObject("mediaController"),
          u = this.system.getObject("fragmentLoader"),
          v = g.call(l, c);
          b = i, d = c, e = j, a = b.getStreamInfo().manifestInfo.isDynamic, l.bufferController = v, l.scheduleController = n, l.representationController = m, l.fragmentController = f, l.fragmentLoader = u, m.subscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, v), f.subscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_INIT_FRAGMENT_LOADED, v), "video" === d || "audio" === d || "fragmentedText" === d ? (p.subscribe(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED, v), p.subscribe(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED, m), p.subscribe(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED, n), o.subscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED, this.timelineConverter), o.subscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED, m), o.subscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED, n), m.subscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_STARTED, n), m.subscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, n), b.subscribe(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED, n), m.subscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, s), f.subscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADED, v), f.subscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADING_START, n), f.subscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED, n), f.subscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED, v), f.subscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED, n.scheduleRulesCollection.bufferLevelRule), v.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_STATE_CHANGED, s), v.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_CLEARED, n), v.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_APPENDED, n), v.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_UPDATED, n), v.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_UPDATED, m), v.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_STATE_CHANGED, n), v.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_INIT_REQUESTED, n), v.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFERING_COMPLETED, b), v.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_QUOTA_EXCEEDED, n), v.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_OUTRUN, n.scheduleRulesCollection.bufferLevelRule), v.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED, n.scheduleRulesCollection.bufferLevelRule), v.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_APPENDED, s), s.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PROGRESS, v), s.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_TIME_UPDATED, v), s.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_RATE_CHANGED, v), s.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_RATE_CHANGED, n), s.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING, v), s.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING, n), s.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_STARTED, n), s.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING, n.scheduleRulesCollection.playbackTimeRule), s.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING, p.abrRulesCollection.insufficientBufferRule), a && s.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED, m), s.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED, v), s.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED, n), r.subscribe(Dash.dependencies.BaseURLExtensions.eventList.ENAME_INITIALIZATION_LOADED, q), r.subscribe(Dash.dependencies.BaseURLExtensions.eventList.ENAME_SEGMENTS_LOADED, q), ("video" === d || "audio" === d) && t.subscribe(MediaPlayer.dependencies.MediaController.eventList.CURRENT_TRACK_CHANGED, v)) : v.subscribe(MediaPlayer.dependencies.TextController.eventList.ENAME_CLOSED_CAPTIONING_REQUESTED, n), m.subscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, b), q.initialize(this), q.setCurrentTime(s.getStreamStartTime(this.getStreamInfo())), v.initialize(d, h, l), n.initialize(d, this), p.initialize(d, this), k = this.getFragmentModel(), k.setLoader(u), k.subscribe(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_STARTED, f), k.subscribe(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_COMPLETED, f), k.subscribe(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_STREAM_COMPLETED, f), k.subscribe(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_COMPLETED, n), u.subscribe(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_COMPLETED, k), u.subscribe(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_PROGRESS, p), ("video" === d || "audio" === d || "fragmentedText" === d) && (v.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_OUTRUN, k), v.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED, k), v.subscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_REJECTED, k)), m.initialize(this)
      },
      isUpdating: function() {
        return this.representationController.isUpdating()
      },
      getType: function() {
        return d
      },
      getABRController: function() {
        return this.abrController
      },
      getFragmentLoader: function() {
        return this.fragmentLoader
      },
      getBuffer: function() {
        return this.bufferController.getBuffer()
      },
      setBuffer: function(a) {
        this.bufferController.setBuffer(a)
      },
      getFragmentModel: function() {
        return this.scheduleController.getFragmentModel()
      },
      getStreamInfo: function() {
        return b.getStreamInfo()
      },
      updateMediaInfo: function(a, b) {
        b === c || b && c && b.type !== c.type || (c = b), -1 === f.indexOf(b) && f.push(b), this.adapter.updateData(a, this)
      },
      getMediaInfoArr: function() {
        return f
      },
      getMediaInfo: function() {
        return c
      },
      getMediaSource: function() {
        return this.bufferController.getMediaSource()
      },
      getScheduleController: function() {
        return this.scheduleController
      },
      getEventController: function() {
        return e
      },
      start: function() {
        this.scheduleController.start()
      },
      stop: function() {
        this.scheduleController.stop()
      },
      getIndexHandlerTime: function() {
        return this.adapter.getIndexHandlerTime(this)
      },
      setIndexHandlerTime: function(a) {
        this.adapter.setIndexHandlerTime(this, a)
      },
      getCurrentRepresentationInfo: function() {
        return this.adapter.getCurrentRepresentationInfo(this.manifestModel.getValue(), this.representationController)
      },
      getRepresentationInfoForQuality: function(a) {
        return this.adapter.getRepresentationInfoForQuality(this.manifestModel.getValue(), this.representationController, a)
      },
      isBufferingCompleted: function() {
        return this.bufferController.isBufferingCompleted()
      },
      createBuffer: function() {
        return this.bufferController.getBuffer() || this.bufferController.createBuffer(c)
      },
      isDynamic: function() {
        return a
      },
      reset: function(f) {
        var g = this,
          h = g.bufferController,
          i = g.representationController,
          j = g.scheduleController,
          k = g.liveEdgeFinder,
          l = g.fragmentController,
          m = g.abrController,
          n = g.playbackController,
          o = this.system.getObject("mediaController"),
          p = this.indexHandler,
          q = this.baseURLExt,
          r = this.getFragmentModel(),
          s = this.fragmentLoader;
        m.unsubscribe(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED, h), m.unsubscribe(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED, i), m.unsubscribe(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED, j), k.unsubscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED, this.timelineConverter), k.unsubscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED, j), k.unsubscribe(MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED, i), i.unsubscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_STARTED, j), i.unsubscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, h), i.unsubscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, j), i.unsubscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, b), i.unsubscribe(Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED, n), b.unsubscribe(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED, j), l.unsubscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_INIT_FRAGMENT_LOADED, h), l.unsubscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADED, h), l.unsubscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADING_START, j), l.unsubscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED, j), l.unsubscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED, h), l.unsubscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED, j.scheduleRulesCollection.bufferLevelRule), h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_STATE_CHANGED, n), h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_CLEARED, j), h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_APPENDED, j), h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_UPDATED, j), h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_UPDATED, i), h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_STATE_CHANGED, j), h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_INIT_REQUESTED, j), h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFERING_COMPLETED, b), h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_CLOSED_CAPTIONING_REQUESTED, j), h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_OUTRUN, j.scheduleRulesCollection.bufferLevelRule), h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED, j.scheduleRulesCollection.bufferLevelRule), h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_APPENDED, n), n.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PROGRESS, h), n.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_TIME_UPDATED, h), n.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_RATE_CHANGED, h), n.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_RATE_CHANGED, j), n.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING, h), n.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING, j), n.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_STARTED, j), n.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED, i), n.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED, h), n.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED, j), n.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING, j.scheduleRulesCollection.playbackTimeRule), n.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING, m.abrRulesCollection.insufficientBufferRule), q.unsubscribe(Dash.dependencies.BaseURLExtensions.eventList.ENAME_INITIALIZATION_LOADED, p), q.unsubscribe(Dash.dependencies.BaseURLExtensions.eventList.ENAME_SEGMENTS_LOADED, p), h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_OUTRUN, r), h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED, r), h.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_REJECTED, r), r.unsubscribe(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_STARTED, l), r.unsubscribe(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_COMPLETED, l), r.unsubscribe(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_STREAM_COMPLETED, l), r.unsubscribe(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_COMPLETED, j), s.unsubscribe(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_COMPLETED, r), s.unsubscribe(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_PROGRESS, m), r.reset(), ("video" === d || "audio" === d) && o.unsubscribe(MediaPlayer.dependencies.MediaController.eventList.CURRENT_TRACK_CHANGED, h), p.reset(), this.bufferController.reset(f), this.scheduleController.reset(), this.bufferController = null, this.scheduleController = null, this.representationController = null, this.videoModel = null, this.fragmentController = null, a = void 0, b = null, c = null, d = null, e = null
      }
    }
  }, MediaPlayer.dependencies.StreamProcessor.prototype = {
    constructor: MediaPlayer.dependencies.StreamProcessor
  }, MediaPlayer.utils.TTMLParser = function() {
    "use strict";
    var a, b, c, d = 3600,
      e = 60,
      f = /^([0-9][0-9]+):([0-5][0-9]):([0-5][0-9])|(60)(\.([0-9])+)?$/,
      g = {},
      h = {},
      i = {},
      j = {
        top: "85%;",
        left: "5%;",
        width: "90%;",
        height: "10%;",
        "align-items": "flex-start;",
        overflow: "visible;",
        "-ms-writing-mode": "lr-tb, horizontal-tb;;",
        "-webkit-writing-mode": "horizontal-tb;",
        "-moz-writing-mode": "horizontal-tb;",
        "writing-mode": "horizontal-tb;"
      },
      k = {
        color: "rgb(255,255,255);",
        direction: "ltr;",
        "font-family": "monospace, sans-serif;",
        "font-style": "normal;",
        "line-height": "normal;",
        "font-weight": "normal;",
        "text-align": "start;",
        "justify-content": "flex-start;",
        "text-decoration": "none;",
        "unicode-bidi": "normal;",
        "white-space": "normal;",
        width: "100%;"
      },
      l = {
        monospace: "font-family: monospace;",
        sansSerif: "font-family: sans-serif;",
        serif: "font-family: serif;",
        monospaceSansSerif: "font-family: monospace, sans-serif;",
        monospaceSerif: "font-family: monospace, serif;",
        proportionalSansSerif: "font-family: Arial;",
        proportionalSerif: "font-family: Times New Roman;",
        "default": "font-family: monospace, sans-serif;"
      },
      m = {
        right: ["justify-content: flex-end;", "text-align: right;"],
        start: ["justify-content: flex-start;", "text-align: start;"],
        center: ["justify-content: center;", "text-align: center;"],
        end: ["justify-content: flex-end;", "text-align: end;"],
        left: ["justify-content: flex-start;", "text-align: left;"]
      },
      n = {
        start: "text-align: start;",
        center: "text-align: center;",
        end: "text-align: end;",
        auto: ""
      },
      o = {
        wrap: "white-space: normal;",
        noWrap: "white-space: nowrap;"
      },
      p = {
        normal: "unicode-bidi: normal;",
        embed: "unicode-bidi: embed;",
        bidiOverride: "unicode-bidi: bidi-override;"
      },
      q = {
        before: "align-items: flex-start;",
        center: "align-items: center;",
        after: "align-items: flex-end;"
      },
      r = {
        lrtb: "-webkit-writing-mode: horizontal-tb;writing-mode: horizontal-tb;",
        rltb: "-webkit-writing-mode: horizontal-tb;writing-mode: horizontal-tb;direction: rtl;unicode-bidi: bidi-override;",
        tbrl: "-webkit-writing-mode: vertical-rl;writing-mode: vertical-rl;-webkit-text-orientation: upright;text-orientation: upright;",
        tblr: "-webkit-writing-mode: vertical-lr;writing-mode: vertical-lr;-webkit-text-orientation: upright;text-orientation: upright;",
        lr: "-webkit-writing-mode: horizontal-tb;writing-mode: horizontal-tb;",
        rl: "-webkit-writing-mode: horizontal-tb;writing-mode: horizontal-tb;direction: rtl;",
        tb: "-webkit-writing-mode: vertical-rl;writing-mode: vertical-rl;-webkit-text-orientation: upright;text-orientation: upright;"
      },
      s = function(b) {
        var c, g, h, i = f.test(b);
        if (!i) return NaN;
        if (c = b.split(":"), g = parseFloat(c[0]) * d + parseFloat(c[1]) * e + parseFloat(c[2]), c[3]) {
          if (h = a.tt.frameRate, !h || isNaN(h)) return NaN;
          g += parseFloat(c[3]) / h
        }
        return g
      },
      t = function() {
        var b = a.hasOwnProperty("tt"),
          c = b ? a.tt.hasOwnProperty("head") : !1,
          d = c ? a.tt.head.hasOwnProperty("layout") : !1,
          e = c ? a.tt.head.hasOwnProperty("styling") : !1,
          f = b ? a.tt.hasOwnProperty("body") : !1;
        return b && c && d && e && f
      },
      u = function(a, b) {
        var c = Object.keys(a).filter(function(c) {
          return ("xmlns" === c.split(":")[0] || "xmlns" === c.split(":")[1]) && a[c] === b
        }).map(function(a) {
          return a.split(":")[2] || a.split(":")[1]
        });
        return 1 != c.length ? null : c[0]
      },
      v = function(a, b) {
        for (var c in a)
          if (a.hasOwnProperty(c)) {
            if (("object" == typeof a[c] || a[c] instanceof Object) && !Array.isArray(a[c])) v(a[c], b);
            else if (Array.isArray(a[c]))
              for (var d = 0; d < a[c].length; d++) v(a[c][d], b);
            var e = c.slice(c.indexOf(b) + b.length + 1);
            a[e] = a[c], delete a[c]
          }
      },
      w = function(a) {
        return a.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
      },
      x = function(a) {
        var b = a.slice(1),
          c = b.match(/.{2}/g),
          d = parseFloat(parseInt(parseInt(c[3], 16) / 255 * 1e3) / 1e3),
          e = c.slice(0, 3).map(function(a) {
            return parseInt(a, 16)
          });
        return "rgba(" + e.join(",") + "," + d + ");"
      },
      y = function(a, b) {
        for (var c = 0; c < b.length; c++)
          if (b[c].indexOf(a) > -1) return !0;
        return !1
      },
      z = function(a, b) {
        for (var c = 0; c < b.length; c++)
          if (b[c].indexOf(a) > -1) return b[c];
        return null
      },
      A = function(a, b) {
        b.splice(b.indexOf(z(a, b)), 1)
      },
      B = function(a, b) {
        for (var c = 0; c < a.length; c++)
          for (var d = 0; d < b.length; d++) a[c] && a[c].split(":")[0].indexOf(b[d].split(":")[0]) > -1 && a.splice(c, 1);
        return a.concat(b)
      },
      C = function(b, c) {
        var d = [];
        for (var e in b)
          if (b.hasOwnProperty(e)) {
            var f = e.replace("ebutts:", "");
            f = f.replace("xml:", ""), f = f.replace("tts:", ""), f = w(f), b[f] = b[e], delete b[e]
          } if ("line-padding" in b) {
          var j = parseFloat(b["line-padding"].slice(b["line-padding"].indexOf(":") + 1, b["line-padding"].indexOf("c")));
          "id" in b && (i[b.id] = j);
          var k = j * c[0] + "px;";
          d.push("padding-left:" + k), d.push("padding-right:" + k)
        }
        if ("font-size" in b) {
          var q = parseFloat(b["font-size"].slice(b["font-size"].indexOf(":") + 1, b["font-size"].indexOf("%")));
          "id" in b && (g[b.id] = q);
          var r = q / 100 * c[1] + "px;";
          d.push("font-size:" + r)
        }
        if ("line-heigt" in b)
          if ("normal" === b["line-height"]) d.push("line-heigth: normal;");
          else {
            var s = parseFloat(b["line-heigt"].slice(b["line-heigt"].indexOf(":") + 1, b["line-heigt"].indexOf("%")));
            "id" in b && (h[b.id] = s);
            var t = s / 100 * c[1] + "px;";
            d.push(e + ":" + t)
          }
        "font-family" in b && (b["font-family"] in l ? d.push(l[b["font-family"]]) : d.push("font-family:" + b["font-family"] + ";")), "text-align" in b && b["text-align"] in m && (d.push(m[b["text-align"]][0]), d.push(m[b["text-align"]][1])), "multi-row-align" in b && (y("text-align", d) && "auto" != b["multi-row-align"] && A("text-align", d), b["multi-row-align"] in n && d.push(n[b["multi-row-align"]]));
        var u;
        return "background-color" in b && (b["background-color"].indexOf("#") > -1 && b["background-color"].length - 1 === 8 ? (u = x(b["background-color"]), d.push("background-color: " + u)) : d.push("background-color:" + b["background-color"] + ";")), "color" in b && (b.color.indexOf("#") > -1 && b.color.length - 1 === 8 ? (u = x(b.color), d.push("color: " + u)) : d.push("color:" + b.color + ";")), "wrap-option" in b && (b["wrap-option"] in o ? d.push(o[b["wrap-option"]]) : d.push("white-space:" + b["wrap-option"])), "unicode-bidi" in b && (b["unicode-bidi"] in p ? d.push(p[b["unicode-bidi"]]) : d.push("unicode-bidi:" + b["unicode-bidi"])), "font-style" in b && d.push("font-style:" + b["font-style"] + ";"), "font-weight" in b && d.push("font-weight:" + b["font-weight"] + ";"), "direction" in b && d.push("direction:" + b.direction + ";"), "text-decoration" in b && d.push("text-decoration:" + b["text-decoration"] + ";"), a.tt.hasOwnProperty("xml:space") && "preserve" === a.tt["xml:space"] && d.push("white-space: pre;"), d
      },
      D = function(a, b) {
        for (var c = 0; c < a.length; c++) {
          var d = a[c];
          if (d["xml:id"] === b || d.id === b) return d
        }
        return null
      },
      E = function(a, c) {
        var d = [],
          e = a.match(/\S+/g);
        return e.forEach(function(a) {
          var e = D(b, a);
          if (e) {
            var f = C(JSON.parse(JSON.stringify(e)), c);
            d = d.concat(f)
          }
        }), d
      },
      F = function(a, b) {
        var c = [];
        for (var d in a) {
          var e = d.replace("tts:", "");
          e = e.replace("xml:", ""), e = w(e), a[e] = a[d], e !== d && delete a[d]
        }
        if ("extent" in a) {
          var f = a.extent.split(/\s/);
          c.push("width: " + f[0] + ";"), c.push("height: " + f[1] + ";")
        }
        if ("origin" in a) {
          var g = a.origin.split(/\s/);
          c.push("left: " + g[0] + ";"), c.push("top: " + g[1] + ";")
        }
        if ("display-align" in a && c.push(q[a["display-align"]]), "writing-mode" in a && c.push(r[a["writing-mode"]]), "style" in a) {
          var h = E(a.style, b);
          c = c.concat(h)
        }
        return "padding" in a && c.push("padding:" + a.padding + ";"), "overflow" in a && c.push("overflow:" + a.overflow + ";"), "show-background" in a && c.push("show-background:" + a["show-background"] + ";"), "id" in a && c.push("regionID:" + a.id + ";"), c
      },
      G = function(a, b) {
        for (var c = 0; c < a.length; c++) {
          var d = a[c];
          if (d["xml:id"] === b || d.id === b) return d
        }
        return null
      },
      H = function(a, b) {
        var d = [],
          e = a.match(/\S+/g);
        return e.forEach(function(a) {
          var e = G(c, a);
          if (e) {
            var f = F(JSON.parse(JSON.stringify(e)), b);
            d = d.concat(f)
          }
        }), d
      },
      I = function() {
        var b = [32, 15];
        return a.tt.hasOwnProperty("ttp:cellResolution") ? a.tt["ttp:cellResolution"].split(" ").map(parseFloat) : b
      },
      J = function(a, b) {
        for (var c = z("padding-left", b), d = z("padding-right", b), e = c.concat(" " + d), f = "", g = "", h = "", i = Array.prototype.slice.call(a.children), j = a.getElementsByClassName("lineBreak")[0], k = i.indexOf(j), l = []; - 1 != k;) l.push(k), k = i.indexOf(j, k + 1);
        var m = "</span>",
          n = "<br>",
          o = '<span class="spanPadding" style="-webkit-box-decoration-break: clone; ';
        if (l.length) l.forEach(function(a, b) {
          if (0 === b) {
            for (var c = "", d = 0; a > d; d++) f += i[d].outerHTML, 0 === d && (c = e.concat(i[d].style.cssText));
            f = o + c + '">' + f
          }
          for (var j = "", k = a + 1; k < i.length; k++) g += i[k].outerHTML, k === i.length - 1 && (j += e.concat(i[k].style.cssText));
          g = o + j + '">' + g, f && g && b === l.length - 1 ? h += f + m + n + g + m : f && g && b !== l.length - 1 ? h += f + m + n + g + m + n : f && !g ? h += f + m : !f && g && b === l.length - 1 ? h += g + m : !f && g && b !== l.length - 1 && (h += g + m + n)
        });
        else {
          for (var p = "", q = 0; q < i.length; q++) p += i[q].style.cssText;
          h = o + e + p + '">' + a.innerHTML + m
        }
        return h
      },
      K = function(a, b) {
        var c = document.createElement("div");
        return a.forEach(function(a) {
          if (!a.hasOwnProperty("metadata"))
            if (a.hasOwnProperty("span")) {
              var d = a.span.__children,
                e = document.createElement("span");
              if (a.span.hasOwnProperty("style")) {
                var f = E(a.span.style, b);
                e.className = "spanPadding " + a.span.style, e.style.cssText = f.join(" ")
              }
              d.forEach(function(a) {
                if (!d.hasOwnProperty("metadata"))
                  if (a.hasOwnProperty("#text")) {
                    var b = document.createTextNode(a["#text"]);
                    e.appendChild(b)
                  } else if ("br" in a) {
                  e.hasChildNodes() && c.appendChild(e);
                  var f = document.createElement("br");
                  f.className = "lineBreak", c.appendChild(f);
                  var g = document.createElement("span");
                  g.className = e.className, g.style.cssText = e.style.cssText, e = g
                }
              }), c.appendChild(e)
            } else if (a.hasOwnProperty("br")) {
            var g = document.createElement("br");
            g.className = "lineBreak", c.appendChild(g)
          } else if (a.hasOwnProperty("#text")) {
            var h = document.createElement("span");
            h.textContent = a["#text"], c.appendChild(h)
          }
        }), c
      },
      L = function(a, b, c) {
        var d, e, f = [],
          g = a.region,
          h = b.region;
        return h && (d = H(h, c)), g ? (e = f.concat(H(g, c)), f = d ? B(d, e) : e) : d && (f = d), N(f, j), f
      },
      M = function(b, c) {
        var d, e, f, g = [],
          h = b.style,
          i = a.tt.body.style,
          j = a.tt.body.div.style,
          l = "";
        return i && (d = E(i, c), l = "paragraph " + i), j && (e = E(j, c), d ? (e = B(d, e), l += " " + j) : l = "paragraph " + j), h ? (f = E(h, c), d && e ? (g = B(e, f), l += " " + h) : d ? (g = B(d, f), l += " " + h) : e ? (g = B(e, f), l += " " + h) : (g = f, l = "paragraph " + h)) : d && !e ? g = d : !d && e && (g = e), N(g, k), [g, l]
      },
      N = function(a, b) {
        for (var c in b) b.hasOwnProperty(c) && (y(c, a) || a.push(c + ":" + b[c]))
      },
      O = function(d) {
        var e, f = this,
          j = new X2JS([], "", !1);
        if (a = j.xml_str2json(d), !a) throw "TTML document could not be parsed";
        f.videoModel.getTTMLRenderingDiv() && (e = "html");
        var l = u(a, "http://www.w3.org/ns/ttml");
        if (l && v(a, l), c = a.tt.head.layout.region_asArray, b = a.tt.head.styling.style_asArray, !t()) {
          var m = "TTML document has incorrect structure";
          throw m
        }
        var n = I(),
          o = f.videoModel.getElement().clientWidth,
          p = f.videoModel.getElement().clientHeight,
          q = [o / n[0], p / n[1]];
        k["font-size"] = q[1] + "px;";
        for (var r = [], w = 0; w < c.length; w++) r.push(F(JSON.parse(JSON.stringify(c[w])), q));
        var x = u(a.tt, "http://www.w3.org/ns/ttml#parameter");
        a.tt.hasOwnProperty(x + ":frameRate") && (a.tt.frameRate = parseInt(a.tt[x + ":frameRate"], 10));
        var B = [],
          C = a.tt.body_asArray[0].__children;
        return C.forEach(function(b) {
          var c = b.div.p_asArray;
          if (!c || 0 === c.length) {
            var d = "TTML document does not contain any cues";
            throw d
          }
          var f, j, k, l;
          c.forEach(function(c) {
            if (c.hasOwnProperty("begin") && c.hasOwnProperty("end")) f = s(c.begin), j = s(c.end);
            else {
              if (!c.span.hasOwnProperty("begin") || !c.span.hasOwnProperty("end")) throw d = "TTML document has incorrect timing value";
              k = s(c.span.begin), l = s(c.span.end)
            }
            if (void 0 !== c["smpte:backgroundImage"])
              for (var m = a.tt.head.metadata.image_asArray, t = 0; t < m.length; t += 1) "#" + m[t]["xml:id"] == c["smpte:backgroundImage"] && B.push({
                start: k || f,
                end: l || j,
                id: m[t]["xml:id"],
                data: "data:image/" + m[t].imagetype.toLowerCase() + ";base64, " + m[t].__text,
                type: "image"
              });
            else if ("html" === e) {
              h = {}, i = {}, g = {};
              var u = "";
              if ((c.hasOwnProperty("id") || c.hasOwnProperty("xml:id")) && (u = c["xml:id"] || c.id), (isNaN(f) || isNaN(j)) && (isNaN(k) || isNaN(l))) throw d = "TTML document has incorrect timing value";
              var v = L(c, b.div, q),
                w = M(c, q),
                x = w[1];
              w = w[0];
              var C = document.createElement("div");
              C.className = x;
              var D = c.__children,
                E = K(D, q);
              E.className = "cueDirUniWrapper", y("unicode-bidi", w) && (E.style.cssText += z("unicode-bidi", w), A("unicode-bidi", w)), y("direction", w) && (E.style.cssText += z("direction", w), A("direction", w)), y("padding-left", w) && y("padding-right", w) && (E.innerHTML = J(E, w)), y("padding-left", w) && y("padding-right", w) && (A("padding-left", w), A("padding-right", w));
              var F = "";
              if (y("regionID", v)) {
                var G = z("regionID", v);
                F = G.slice(G.indexOf(":") + 1, G.length - 1)
              }
              w && (C.style.cssText = w.join(" ") + "display:flex;"), v && (v = v.join(" ")), C.appendChild(E);
              var H = document.createElement("div");
              H.appendChild(C), H.id = "subtitle_" + u, H.style.cssText = "position: absolute; margin: 0; display: flex; box-sizing: border-box; pointer-events: none;" + v, 0 === Object.keys(g).length && (g.defaultFontSize = "100"), B.push({
                start: k || f,
                end: l || j,
                type: "html",
                cueHTMLElement: H,
                regions: r,
                regionID: F,
                cueID: u,
                videoHeight: p,
                videoWidth: o,
                cellResolution: n,
                fontSize: g || {
                  defaultFontSize: "100"
                },
                lineHeight: h,
                linePadding: i
              })
            } else {
              var I = "",
                N = c.__children;
              N.length && N.forEach(function(a) {
                if (a.hasOwnProperty("span")) {
                  var b = a.span.__children;
                  b.forEach(function(a) {
                    b.hasOwnProperty("metadata") || (a.hasOwnProperty("#text") ? I += a["#text"].replace(/[\r\n]+/gm, " ").trim() : "br" in a && (I += "\n"))
                  })
                } else I += a.hasOwnProperty("br") ? "\n" : a["#text"].replace(/[\r\n]+/gm, " ").trim()
              }), B.push({
                start: k || f,
                end: l || j,
                data: I,
                type: "text"
              })
            }
          })
        }), B
      };
    return {
      parse: O,
      videoModel: void 0
    }
  }, MediaPlayer.dependencies.TextSourceBuffer = function() {
    var a = !1,
      b = null,
      c = function() {
        for (var b = this.videoModel.getElement(), c = b.textTracks, d = c.length, e = this, f = 0; d > f; f++) {
          var g = c[f];
          if (a = "showing" !== g.mode, "showing" === g.mode) {
            e.textTrackExtensions.getCurrentTrackIdx() !== f && (e.textTrackExtensions.setCurrentTrackIdx(f), e.isFragmented && (e.mediaController.isCurrentTrack(e.allTracks[f]) || (e.textTrackExtensions.deleteTrackCues(e.textTrackExtensions.getCurrentTextTrack()), e.fragmentModel.cancelPendingRequests(), e.fragmentModel.abortRequests(), e.buffered.clear(), e.mediaController.setTrack(e.allTracks[f]))));
            break
          }
        }
        a && e.textTrackExtensions.setCurrentTrackIdx(-1)
      };
    return {
      system: void 0,
      videoModel: void 0,
      errHandler: void 0,
      adapter: void 0,
      manifestExt: void 0,
      mediaController: void 0,
      streamController: void 0,
      initialize: function(a, b) {
        this.sp = b.streamProcessor, this.mediaInfos = this.sp.getMediaInfoArr(), this.textTrackExtensions = this.system.getObject("textTrackExtensions"), this.isFragmented = !this.manifestExt.getIsTextTrack(a), this.isFragmented && (this.fragmentModel = this.sp.getFragmentModel(), this.buffered = this.system.getObject("customTimeRanges"), this.initializationSegmentReceived = !1, this.timescale = 9e4, this.allTracks = this.mediaController.getTracksFor("fragmentedText", this.streamController.getActiveStreamInfo()))
      },
      append: function(a, c) {
        function d(a, b) {
          var c = new MediaPlayer.vo.TextTrackInfo,
            d = {
              subtitle: "subtitles",
              caption: "captions"
            },
            e = function() {
              var a = b.roles.length > 0 ? d[b.roles[0]] : d.caption;
              return a = a === d.caption || a === d.subtitle ? a : d.caption
            },
            f = function() {
              var a = !1;
              return b.codec && b.codec.search("stpp") >= 0 && (a = !0), b.mimeType && b.mimeType.search("ttml") >= 0 && (a = !0), a
            };
          c.captionData = a, c.lang = b.lang, c.label = b.id, c.index = b.index, c.isTTML = f(), c.video = i.videoModel.getElement(), c.defaultTrack = i.getIsDefault(b), c.isFragmented = i.isFragmented, c.kind = e(), i.textTrackExtensions.addTextTrack(c, i.mediaInfos.length)
        }
        var e, f, g, h, i = this,
          j = c.mediaInfo,
          k = j.type,
          l = j.mimeType;
        if ("fragmentedText" === k) {
          var m = i.system.getObject("fragmentExt");
          if (this.initializationSegmentReceived)
            for (f = m.getSamplesInfo(a), g = 0; g < f.length; g++) {
              this.firstSubtitleStart || (this.firstSubtitleStart = f[0].cts - c.start * this.timescale), f[g].cts -= this.firstSubtitleStart, this.buffered.add(f[g].cts / this.timescale, (f[g].cts + f[g].duration) / this.timescale), h = window.UTF8.decode(new Uint8Array(a.slice(f[g].offset, f[g].offset + f[g].size))), b = null !== b ? b : i.getParser(l);
              try {
                e = b.parse(h), this.textTrackExtensions.addCaptions(this.firstSubtitleStart / this.timescale, e)
              } catch (n) {}
            } else {
              for (this.initializationSegmentReceived = !0, g = 0; g < this.mediaInfos.length; g++) d(null, this.mediaInfos[g]);
              this.timescale = m.getMediaTimescaleFromMoov(a)
            }
        } else {
          a = new Uint8Array(a), h = window.UTF8.decode(a);
          try {
            e = i.getParser(l).parse(h), d(e, j)
          } catch (n) {
            i.errHandler.closedCaptionsError(n, "parse", h)
          }
        }
      },
      getIsDefault: function(a) {
        return a.index === this.mediaInfos[0].index
      },
      abort: function() {
        this.textTrackExtensions.deleteAllTextTracks(), a = !1, b = null
      },
      getParser: function(a) {
        var b;
        return "text/vtt" === a ? b = this.system.getObject("vttParser") : ("application/ttml+xml" === a || "application/mp4" === a) && (b = this.system.getObject("ttmlParser")), b
      },
      getAllTracksAreDisabled: function() {
        return a
      },
      setTextTrack: c
    }
  }, MediaPlayer.dependencies.TextSourceBuffer.prototype = {
    constructor: MediaPlayer.dependencies.TextSourceBuffer
  }, MediaPlayer.dependencies.TimeSyncController = function() {
    "use strict";
    var a, b = 5e3,
      c = 0,
      d = !1,
      e = !1,
      f = function(a) {
        d = a
      },
      g = function() {
        return d
      },
      h = function(a) {
        e = a
      },
      i = function(a) {
        c = a
      },
      j = function() {
        return c
      },
      k = function(a) {
        var b, c, d = 60,
          e = 60,
          f = 1e3,
          g = /^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2})(?::([0-9]*)(\.[0-9]*)?)?(?:([+\-])([0-9]{2})([0-9]{2}))?/,
          h = g.exec(a);
        return b = Date.UTC(parseInt(h[1], 10), parseInt(h[2], 10) - 1, parseInt(h[3], 10), parseInt(h[4], 10), parseInt(h[5], 10), h[6] && (parseInt(h[6], 10) || 0), h[7] && parseFloat(h[7]) * f || 0), h[9] && h[10] && (c = parseInt(h[9], 10) * e + parseInt(h[10], 10), b += ("+" === h[8] ? -1 : 1) * c * d * f), new Date(b).getTime()
      },
      l = function(a) {
        var b = Date.parse(a);
        return isNaN(b) && (b = k(a)), b
      },
      m = function(a) {
        return Date.parse(a)
      },
      n = function(a) {
        return Date.parse(a)
      },
      o = function(a, b, c) {
        c()
      },
      p = function(a, b, c) {
        var d = l(a);
        return isNaN(d) ? void c() : void b(d)
      },
      q = function(a, c, d, e, f) {
        var g, h, i = !1,
          j = new XMLHttpRequest,
          k = f ? "HEAD" : "GET",
          l = c.match(/\S+/g);
        c = l.shift(), g = function() {
          i || (i = !0, l.length ? q(a, l.join(" "), d, e, f) : e())
        }, h = function() {
          var b, c;
          200 === j.status && (b = f ? j.getResponseHeader("Date") : j.response, c = a(b), isNaN(c) || (d(c), i = !0))
        }, j.open(k, c), j.timeout = b || 0, j.onload = h, j.onloadend = g, j.send()
      },
      r = function(a, b, c) {
        q.call(this, n, a, b, c, !0)
      },
      s = {
        "urn:mpeg:dash:utc:http-head:2014": r,
        "urn:mpeg:dash:utc:http-xsdate:2014": q.bind(null, l),
        "urn:mpeg:dash:utc:http-iso:2014": q.bind(null, m),
        "urn:mpeg:dash:utc:direct:2014": p,
        "urn:mpeg:dash:utc:http-head:2012": r,
        "urn:mpeg:dash:utc:http-xsdate:2012": q.bind(null, l),
        "urn:mpeg:dash:utc:http-iso:2012": q.bind(null, m),
        "urn:mpeg:dash:utc:direct:2012": p,
        "urn:mpeg:dash:utc:http-ntp:2014": o,
        "urn:mpeg:dash:utc:ntp:2014": o,
        "urn:mpeg:dash:utc:sntp:2014": o
      },
      t = function() {
        var a = this.metricsModel.getReadOnlyMetricsFor("stream"),
          b = this.metricsExt.getLatestMPDRequestHeaderValueByID(a, "Date"),
          d = null !== b ? new Date(b).getTime() : Number.NaN;
        isNaN(d) ? u.call(this, !0) : (i(d - (new Date).getTime()), u.call(this, !1, d / 1e3, c))
      },
      u = function(a, b, c) {
        f(!1), this.notify(MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED, {
          time: b,
          offset: c
        }, a ? new MediaPlayer.vo.Error(MediaPlayer.dependencies.TimeSyncController.TIME_SYNC_FAILED_ERROR_CODE) : null)
      },
      v = function(b, c) {
        var d = this,
          e = c || 0,
          g = b[e],
          h = function(b, c) {
            var e = !b || !c;
            e && a ? t.call(d) : u.call(d, e, b, c)
          };
        f(!0), g ? s.hasOwnProperty(g.schemeIdUri) ? s[g.schemeIdUri](g.value, function(a) {
          var b = (new Date).getTime(),
            c = a - b;
          i(c), d.log("Local time:      " + new Date(b)), d.log("Server time:     " + new Date(a)), d.log("Difference (ms): " + c), h.call(d, a, c)
        }, function() {
          v.call(d, b, e + 1)
        }) : v.call(d, b, e + 1) : (i(0), h.call(d))
      };
    return {
      log: void 0,
      notify: void 0,
      subscribe: void 0,
      unsubscribe: void 0,
      metricsModel: void 0,
      metricsExt: void 0,
      getOffsetToDeviceTimeMs: function() {
        return j()
      },
      initialize: function(b, c) {
        a = c, g() || (v.call(this, b), h(!0))
      },
      reset: function() {
        h(!1), f(!1)
      }
    }
  }, MediaPlayer.dependencies.TimeSyncController.prototype = {
    constructor: MediaPlayer.dependencies.TimeSyncController
  }, MediaPlayer.dependencies.TimeSyncController.eventList = {
    ENAME_TIME_SYNCHRONIZATION_COMPLETED: "timeSynchronizationComplete"
  }, MediaPlayer.dependencies.TimeSyncController.TIME_SYNC_FAILED_ERROR_CODE = 1, MediaPlayer.utils.VTTParser = function() {
    "use strict";
    var a = /(?:\r\n|\r|\n)/gm,
      b = /-->/,
      c = /(^[\s]+|[\s]+$)/g,
      d = /\s\b/g,
      e = function(a) {
        var b = a.split(":"),
          c = b.length - 1;
        return a = 60 * parseInt(b[c - 1], 10) + parseFloat(b[c]), 2 === c && (a += 3600 * parseInt(b[0], 10)), a
      },
      f = function(a) {
        var c = a.split(b),
          e = c[1].split(d);
        return e.shift(), c[1] = e[0], e.shift(), {
          cuePoints: c,
          styles: g(e)
        }
      },
      g = function(a) {
        var b = {};
        return a.forEach(function(a) {
          if (a.split(/:/).length > 1) {
            var c = a.split(/:/)[1];
            c && -1 != c.search(/%/) && (c = parseInt(c.replace(/%/, ""))), (a.match(/align/) || a.match(/A/)) && (b.align = c), (a.match(/line/) || a.match(/L/)) && (b.line = c), (a.match(/position/) || a.match(/P/)) && (b.position = c), (a.match(/size/) || a.match(/S/)) && (b.size = c)
          }
        }), b
      },
      h = function(a, c) {
        for (var d, e = c, f = "", g = "";
          "" !== a[e] && e < a.length;) e++;
        if (d = e - c, d > 1)
          for (var h = 0; d > h; h++) {
            if (g = a[c + h], g.match(b)) {
              f = "";
              break
            }
            f += g, h !== d - 1 && (f += "\n")
          } else g = a[c], g.match(b) || (f = g);
        return decodeURI(f)
      };
    return {
      log: void 0,
      parse: function(d) {
        var g, i, j = [];
        d = d.split(a), g = d.length, i = -1;
        for (var k = 0; g > k; k++) {
          var l = d[k];
          if (l.length > 0 && "WEBVTT" !== l && l.match(b)) {
            var m = f(l),
              n = m.cuePoints,
              o = m.styles,
              p = h(d, k + 1),
              q = e(n[0].replace(c, "")),
              r = e(n[1].replace(c, ""));
            !isNaN(q) && !isNaN(r) && q >= i && r > q ? "" !== p ? (i = q, j.push({
              start: q,
              end: r,
              data: p,
              styles: o
            })) : this.log("Skipping cue due to empty/malformed cue text") : this.log("Skipping cue due to incorrect cue timing")
          }
        }
        return j
      }
    }
  }, MediaPlayer.dependencies.XlinkLoader = function() {
    "use strict";
    var a = 1,
      b = 500,
      c = "urn:mpeg:dash:resolve-to-zero:2013",
      d = function(a, c, e, f) {
        var g, h, i, j, k = new XMLHttpRequest,
          l = this,
          m = !0,
          n = !0,
          o = new Date;
        h = function() {
          k.status < 200 || k.status > 299 || (n = !1, l.metricsModel.addHttpRequest("stream", null, MediaPlayer.vo.metrics.HTTPRequest.XLINK_EXPANSION_TYPE, a, k.responseURL || null, null, o, k.firstByteDate || null, new Date, k.status, null, k.getAllResponseHeaders()), j = k.responseText, c.resolved = !0, j ? (c.resolvedContent = j, l.notify(MediaPlayer.dependencies.XlinkLoader.eventList.ENAME_XLINKELEMENT_LOADED, {
            element: c,
            resolveObject: e
          })) : (c.resolvedContent = null, l.notify(MediaPlayer.dependencies.XlinkLoader.eventList.ENAME_XLINKELEMENT_LOADED, {
            element: c,
            resolveObject: e
          }, new MediaPlayer.vo.Error(null, "Failed loading Xlink element: " + a, null))))
        }, g = function() {
          n && (n = !1, l.metricsModel.addHttpRequest("stream", null, MediaPlayer.vo.metrics.HTTPRequest.XLINK_EXPANSION_TYPE, a, k.responseURL || null, null, o, k.firstByteDate || null, new Date, k.status, null, k.getAllResponseHeaders()), f > 0 ? (console.log("Failed loading xLink content: " + a + ", retry in " + b + "ms attempts: " + f), f--, setTimeout(function() {
            d.call(l, a, c, e, f)
          }, b)) : (console.log("Failed loading Xlink content: " + a + " no retry attempts left"), l.errHandler.downloadError("xlink", a, k), c.resolved = !0, c.resolvedContent = null, l.notify(MediaPlayer.dependencies.XlinkLoader.eventList.ENAME_XLINKELEMENT_LOADED, {
            element: c,
            resolveObject: e
          }, new Error("Failed loading xlink Element: " + a + " no retry attempts left"))))
        }, i = function(a) {
          m && (m = !1, (!a.lengthComputable || a.lengthComputable && a.total != a.loaded) && (k.firstByteDate = new Date))
        };
        try {
          k.onload = h, k.onloadend = g, k.onerror = g, k.onprogress = i, k.open("GET", l.requestModifierExt.modifyRequestURL(a), !0), k.send()
        } catch (p) {
          console.log("Error"), k.onerror()
        }
      };
    return {
      errHandler: void 0,
      metricsModel: void 0,
      requestModifierExt: void 0,
      notify: void 0,
      subscribe: void 0,
      unsubscribe: void 0,
      load: function(b, e, f) {
        b === c ? (e.resolvedContent = null, e.resolved = !0, this.notify(MediaPlayer.dependencies.XlinkLoader.eventList.ENAME_XLINKELEMENT_LOADED, {
          element: e,
          resolveObject: f
        })) : d.call(this, b, e, f, a)
      }
    }
  }, MediaPlayer.dependencies.XlinkLoader.prototype = {
    constructor: MediaPlayer.dependencies.XlinkLoader
  }, MediaPlayer.dependencies.XlinkLoader.eventList = {
    ENAME_XLINKELEMENT_LOADED: "xlinkElementLoaded"
  }, MediaPlayer.dependencies.AbrController = function() {
    "use strict";
    var a, b = !0,
      c = {},
      d = {},
      e = {},
      f = {},
      g = {},
      h = {},
      i = {},
      j = function(a, b) {
        var c;
        return d[b] = d[b] || {}, d[b].hasOwnProperty(a) || (d[b][a] = 0), c = d[b][a]
      },
      k = function(a, b, c) {
        d[b] = d[b] || {}, d[b][a] = c
      },
      l = function(a, b) {
        var c;
        return e[b] = e[b] || {}, e[b].hasOwnProperty(a) || (e[b][a] = 0), c = e[b][a]
      },
      m = function(a, b, c) {
        e[b] = e[b] || {}, e[b][a] = c
      },
      n = function(a, b, d) {
        c[b] = c[b] || {}, c[b][a] = d
      },
      o = function(a) {
        return f[a]
      },
      p = function(a, b) {
        f[a] = b
      },
      q = function(a) {
        return f.hasOwnProperty("max") && f.max.hasOwnProperty(a) ? f.max[a] : NaN
      },
      r = function(a, b) {
        f.max = f.max || {}, f.max[a] = b
      },
      s = function(a, b) {
        var d;
        return c[b] = c[b] || {}, c[b].hasOwnProperty(a) || (c[b][a] = 0), d = t.call(this, c[b][a], a)
      },
      t = function(a, b) {
        var c = q(b);
        if (isNaN(c)) return a;
        var d = this.getQualityForBitrate(h[b].getMediaInfo(), c);
        return Math.min(a, d)
      },
      u = function(c) {
        if (0 === MediaPlayer.dependencies.ScheduleController.LOADING_REQUEST_THRESHOLD && b) {
          var d = this,
            e = c.data.request.mediaType,
            f = d.abrRulesCollection.getRules(MediaPlayer.rules.ABRRulesCollection.prototype.ABANDON_FRAGMENT_RULES),
            g = h[e].getScheduleController(),
            i = g.getFragmentModel(),
            j = function(b) {
              function c(b) {
                a = setTimeout(function() {
                  d.setAbandonmentStateFor(b, MediaPlayer.dependencies.AbrController.ALLOW_LOAD)
                }, MediaPlayer.dependencies.AbrController.ABANDON_TIMEOUT)
              }
              if (b.confidence === MediaPlayer.rules.SwitchRequest.prototype.STRONG) {
                var f = i.getRequests({
                    state: MediaPlayer.dependencies.FragmentModel.states.LOADING
                  }),
                  h = b.value,
                  j = d.getQualityFor(e, d.streamController.getActiveStreamInfo());
                j > h && (i.abortRequests(), d.setAbandonmentStateFor(e, MediaPlayer.dependencies.AbrController.ABANDON_LOAD), d.setPlaybackQuality(e, d.streamController.getActiveStreamInfo(), h), g.replaceCanceledRequests(f), c(e))
              }
            };
          d.rulesController.applyRules(f, h[e], j, c, function(a, b) {
            return b
          })
        }
      };
    return {
      log: void 0,
      abrRulesCollection: void 0,
      rulesController: void 0,
      notify: void 0,
      subscribe: void 0,
      unsubscribe: void 0,
      streamController: void 0,
      setup: function() {
        this[MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_PROGRESS] = u
      },
      initialize: function(a, b) {
        h[a] = b, i[a] = i[a] || {}, i[a].state = MediaPlayer.dependencies.AbrController.ALLOW_LOAD
      },
      getAutoSwitchBitrate: function() {
        return b
      },
      setAutoSwitchBitrate: function(a) {
        b = a
      },
      getPlaybackQuality: function(a) {
        var c, d, e, f, g = this,
          h = a.getType(),
          n = a.getStreamInfo().id,
          o = function(b) {
            var e = s.call(g, h, n);
            c = b.value, f = b.confidence, 0 > c && (c = 0), c > e && (c = e), d = j(h, n), c === d || i[h].state === MediaPlayer.dependencies.AbrController.ABANDON_LOAD && c > d || (k(h, n, c), m(h, n, f), g.notify(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED, {
              mediaType: h,
              streamInfo: a.getStreamInfo(),
              oldQuality: d,
              newQuality: c
            }))
          };
        c = j(h, n), f = l(h, n), b && (e = g.abrRulesCollection.getRules(MediaPlayer.rules.ABRRulesCollection.prototype.QUALITY_SWITCH_RULES), g.rulesController.applyRules(e, a, o.bind(g), c, function(a, b) {
          return a = a === MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE ? 0 : a, Math.max(a, b)
        }))
      },
      setPlaybackQuality: function(a, b, c) {
        var d = b.id,
          e = j(a, d),
          f = null !== c && !isNaN(c) && c % 1 === 0;
        if (!f) throw "argument is not an integer";
        c !== e && c >= 0 && c <= s.call(this, a, d) && (k(a, b.id, c), this.notify(MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED, {
          mediaType: a,
          streamInfo: b,
          oldQuality: e,
          newQuality: c
        }))
      },
      setAbandonmentStateFor: function(a, b) {
        i[a].state = b
      },
      getAbandonmentStateFor: function(a) {
        return i[a].state
      },
      getQualityFor: function(a, b) {
        return j(a, b.id)
      },
      getConfidenceFor: function(a, b) {
        return l(a, b.id)
      },
      setInitialBitrateFor: function(a, b) {
        p(a, b)
      },
      getInitialBitrateFor: function(a) {
        return o(a)
      },
      setMaxAllowedBitrateFor: function(a, b) {
        r(a, b)
      },
      getMaxAllowedBitrateFor: function(a) {
        return q(a)
      },
      getQualityForBitrate: function(a, b) {
        for (var c, d = this.getBitrateList(a), e = d.length, f = 0; e > f; f += 1)
          if (c = d[f], 1e3 * b <= c.bitrate) return Math.max(f - 1, 0);
        return e - 1
      },
      getBitrateList: function(a) {
        if (!a || !a.bitrateList) return null;
        for (var b, c = a.bitrateList, d = a.type, e = [], f = 0, g = c.length; g > f; f += 1) b = new MediaPlayer.vo.BitrateInfo, b.mediaType = d, b.qualityIndex = f, b.bitrate = c[f], e.push(b);
        return e
      },
      setAverageThroughput: function(a, b) {
        g[a] = b
      },
      getAverageThroughput: function(a) {
        return g[a]
      },
      updateTopQualityIndex: function(a) {
        var b, c = a.type,
          d = a.streamInfo.id;
        return b = a.representationCount - 1, n(c, d, b), b
      },
      isPlayingAtTopQuality: function(a) {
        var b, c = this,
          d = a.id,
          e = c.getQualityFor("audio", a),
          f = c.getQualityFor("video", a);
        return b = e === s.call(this, "audio", d) && f === s.call(this, "video", d)
      },
      getTopQualityIndexFor: s,
      reset: function() {
        b = !0, c = {}, d = {}, e = {}, h = {}, i = {}, g = {}, clearTimeout(a), a = null
      }
    }
  }, MediaPlayer.dependencies.AbrController.prototype = {
    constructor: MediaPlayer.dependencies.AbrController
  }, MediaPlayer.dependencies.AbrController.eventList = {
    ENAME_QUALITY_CHANGED: "qualityChanged"
  }, MediaPlayer.dependencies.AbrController.DEFAULT_VIDEO_BITRATE = 1e3, MediaPlayer.dependencies.AbrController.DEFAULT_AUDIO_BITRATE = 100, MediaPlayer.dependencies.AbrController.ABANDON_LOAD = "abandonload", MediaPlayer.dependencies.AbrController.ALLOW_LOAD = "allowload", MediaPlayer.dependencies.AbrController.ABANDON_TIMEOUT = 1e4, MediaPlayer.dependencies.AbrController.BANDWIDTH_SAFETY = .9, MediaPlayer.dependencies.BufferController = function() {
    "use strict";
    var a, b, c, d, e = .5,
      f = 0,
      g = -1,
      h = !1,
      i = 0,
      j = 0,
      k = Number.POSITIVE_INFINITY,
      l = -1,
      m = -1,
      n = null,
      o = null,
      p = 0,
      q = !1,
      r = !1,
      s = !1,
      t = !1,
      u = function(c) {
        if (!c || !a || !this.streamProcessor) return null;
        var d = null;
        try {
          d = this.sourceBufferExt.createSourceBuffer(a, c), d && d.hasOwnProperty("initialize") && d.initialize(b, this)
        } catch (e) {
          this.errHandler.mediaSourceError("Error creating " + b + " source buffer.")
        }
        return this.setBuffer(d), Q.call(this, this.streamProcessor.getRepresentationInfoForQuality(f).MSETimeOffset), d
      },
      v = function() {
        var a = this.streamProcessor.getStreamInfo().id,
          b = this.streamController.getActiveStreamInfo().id;
        return a === b
      },
      w = function() {
        var a = this.streamProcessor.getFragmentModel().getRequests({
            state: MediaPlayer.dependencies.FragmentModel.states.LOADING
          }),
          c = U.call(this),
          d = this.virtualBuffer.getChunks({
            streamId: c,
            mediaType: b,
            segmentType: MediaPlayer.vo.metrics.HTTPRequest.MEDIA_SEGMENT_TYPE,
            quality: g
          });
        return g > f && (x(d, g) || x(a, g)) ? !1 : g !== f
      },
      x = function(a, b) {
        var c = 0,
          d = a.length;
        for (c; d > c; c += 1)
          if (a[c].quality === b) return !0;
        return !1
      },
      y = function(a) {
        var b, c = this;
        a.data.fragmentModel === c.streamProcessor.getFragmentModel() && (c.log("Initialization finished loading"), b = a.data.chunk, this.virtualBuffer.append(b), b.quality === f && w.call(c) && da.call(c))
      },
      z = function(a) {
        if (a.data.fragmentModel === this.streamProcessor.getFragmentModel()) {
          var b, c = a.data.chunk,
            d = c.bytes,
            e = c.quality,
            f = c.index,
            g = this.streamProcessor.getFragmentModel().getRequests({
              state: MediaPlayer.dependencies.FragmentModel.states.EXECUTED,
              quality: e,
              index: f
            })[0],
            h = this.streamProcessor.getRepresentationInfoForQuality(e),
            i = this.manifestModel.getValue(),
            j = this.adapter.getEventsFor(i, h.mediaInfo, this.streamProcessor),
            k = this.adapter.getEventsFor(i, h, this.streamProcessor);
          (j.length > 0 || k.length > 0) && (b = D.call(this, d, g, j, k), this.streamProcessor.getEventController().addInbandEvents(b)), c.bytes = E.call(this, d), this.virtualBuffer.append(c), S.call(this)
        }
      },
      A = function(a) {
        r = !0, d = a;
        var b = this,
          c = a.quality,
          e = isNaN(a.index);
        return c !== f && e || c !== g && !e ? (b.log("reject request - required quality = " + f + " current quality = " + g + " chunk media type = " + a.mediaType + " chunk quality = " + c + " chunk index = " + a.index), void W.call(b, c, a.index, a.start)) : void b.sourceBufferExt.append(n, a)
      },
      B = function(b) {
        if (n === b.data.buffer) {
          this.isBufferingCompleted() && this.streamProcessor.getStreamInfo().isLast && this.mediaSourceExt.signalEndOfStream(a);
          var c, e = this;
          if (b.error) return b.error.code === MediaPlayer.dependencies.SourceBufferExtensions.QUOTA_EXCEEDED_ERROR_CODE && (e.virtualBuffer.append(d), k = .8 * e.sourceBufferExt.getTotalBufferedTime(n), e.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_QUOTA_EXCEEDED, {
            criticalBufferLevel: k
          }), K.call(e, J.call(e))), void(r = !1);
          if (C.call(e), H.call(e) || (e.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_QUOTA_EXCEEDED, {
              criticalBufferLevel: k
            }), K.call(e, J.call(e))), c = e.sourceBufferExt.getAllRanges(n), c && c.length > 0) {
            var f, g;
            for (f = 0, g = c.length; g > f; f += 1) e.log("Buffered Range: " + c.start(f) + " - " + c.end(f))
          }
          e.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_APPENDED, {
            quality: d.quality,
            index: d.index,
            bufferedRanges: c
          }), V.call(e, d.quality, d.index)
        }
      },
      C = function() {
        var a = this,
          b = a.playbackController.getTime(),
          c = this.streamProcessor.getScheduleController().getFragmentToLoadCount(),
          d = this.streamProcessor.getCurrentRepresentationInfo().fragmentDuration;
        return i = a.sourceBufferExt.getBufferLength(n, b), j = c > 0 ? c * d + i : j, T.call(this), a.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_UPDATED, {
          bufferLevel: i
        }), F.call(a), N.call(a), !0
      },
      D = function(a, b, c, d) {
        var e, f, g, h, i = [],
          j = Math.max(isNaN(b.startTime) ? 0 : b.startTime, 0),
          k = [];
        t = !1, h = c.concat(d);
        for (var l = 0; l < h.length; l++) k[h[l].schemeIdUri] = h[l];
        g = this.boxParser.parse(a), e = g.getBoxes("emsg");
        for (var m = 0, n = e.length; n > m; m += 1) f = this.adapter.getEvent(e[m], k, j), f && i.push(f);
        return i
      },
      E = function(a) {
        if (!t) return a;
        for (var b, c, d = a.length, e = 0, f = 0, g = Math.pow(256, 2), h = Math.pow(256, 3), i = new Uint8Array(a.length); d > e;) {
          if (b = String.fromCharCode(a[e + 4], a[e + 5], a[e + 6], a[e + 7]), c = a[e] * h + a[e + 1] * g + 256 * a[e + 2] + 1 * a[e + 3], "emsg" != b)
            for (var j = e; e + c > j; j++) i[f] = a[j], f += 1;
          e += c
        }
        return i.subarray(0, f)
      },
      F = function() {
        var a = G.call(this),
          b = 2 * c,
          d = i - a;
        d >= b && !q ? (q = !0, this.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_OUTRUN)) : b / 2 > d && q && (this.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED), q = !1, S.call(this))
      },
      G = function() {
        var a = this.metricsModel.getReadOnlyMetricsFor("video"),
          b = this.metricsExt.getCurrentBufferLevel(a),
          c = this.metricsModel.getReadOnlyMetricsFor("audio"),
          d = this.metricsExt.getCurrentBufferLevel(c),
          e = null;
        return e = null === b || null === d ? null !== d ? d.level : null !== b ? b.level : null : Math.min(d.level, b.level)
      },
      H = function() {
        var a = this,
          b = a.sourceBufferExt.getTotalBufferedTime(n);
        return k > b
      },
      I = function() {
        var b = 0,
          c = this.playbackController.getTime(),
          d = this.sourceBufferExt.getBufferRange(n, c);
        null !== d && (b = c - d.start - MediaPlayer.dependencies.BufferController.BUFFER_TO_KEEP, b > 0 && (s = !0, this.sourceBufferExt.remove(n, 0, Math.round(d.start + b), a)))
      },
      J = function() {
        var a, b, c, d, e, f = this;
        return n ? (a = f.playbackController.getTime(), e = f.streamProcessor.getFragmentModel().getRequests({
          state: MediaPlayer.dependencies.FragmentModel.states.EXECUTED,
          time: a
        })[0], c = e && !isNaN(e.startTime) ? e.startTime : Math.floor(a), d = f.sourceBufferExt.getBufferRange(n, a), null === d && n.buffered.length > 0 && (c = n.buffered.end(n.buffered.length - 1)), b = n.buffered.start(0), {
          start: b,
          end: c
        }) : null
      },
      K = function(b) {
        if (b && n) {
          var c = this,
            d = b.start,
            e = b.end;
          c.sourceBufferExt.remove(n, d, e, a)
        }
      },
      L = function(a) {
        n === a.data.buffer && (s && (s = !1), this.virtualBuffer.updateBufferedRanges({
          streamId: U.call(this),
          mediaType: b
        }, this.sourceBufferExt.getAllRanges(n)), C.call(this), this.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_CLEARED, {
          from: a.data.from,
          to: a.data.to,
          hasEnoughSpaceToAppend: H.call(this)
        }), H.call(this) || setTimeout(K.bind(this, J.call(this)), 1e3 * c))
      },
      M = function() {
        var a = l === m - 1;
        a && !h && (h = !0, this.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFERING_COMPLETED))
      },
      N = function() {
        e > i && !h ? P.call(this, !1) : P.call(this, !0)
      },
      O = function() {
        return o ? MediaPlayer.dependencies.BufferController.BUFFER_LOADED : MediaPlayer.dependencies.BufferController.BUFFER_EMPTY
      },
      P = function(a) {
        if (!(o === a || "fragmentedText" === b && this.textSourceBuffer.getAllTracksAreDisabled())) {
          o = a;
          var c = O(),
            d = c === MediaPlayer.dependencies.BufferController.BUFFER_LOADED ? MediaPlayer.events.BUFFER_LOADED : MediaPlayer.events.BUFFER_EMPTY;
          T.call(this), this.eventBus.dispatchEvent({
            type: d,
            data: {
              bufferType: b
            }
          }), this.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_STATE_CHANGED, {
            hasSufficientBuffer: a
          }), this.log(o ? "Got enough buffer to start." : "Waiting for more buffer before starting playback.")
        }
      },
      Q = function(a) {
        n && n.timestampOffset !== a && !isNaN(a) && (n.timestampOffset = a)
      },
      R = function() {
        if (n) {
          var a = this;
          C.call(a), S.call(a)
        }
      },
      S = function() {
        w.call(this) ? da.call(this) : $.call(this)
      },
      T = function() {
        if (v.call(this)) {
          this.metricsModel.addBufferState(b, O(), j);
          var a, c = i;
          a = this.virtualBuffer.getTotalBufferLevel(this.streamProcessor.getMediaInfo()), a && (c += a), this.metricsModel.addBufferLevel(b, new Date, c)
        }
      },
      U = function() {
        return this.streamProcessor.getStreamInfo().id
      },
      V = function(a, b) {
        r = !1, isNaN(b) ? X.call(this, a) : Y.call(this, b), S.call(this)
      },
      W = function(a, b, c) {
        r = !1, this.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_REJECTED, {
          quality: a,
          index: b,
          start: c
        }), S.call(this)
      },
      X = function(a) {
        g = a
      },
      Y = function(a) {
        this.virtualBuffer.storeAppendedChunk(d, n), Z.call(this), l = Math.max(a, l), M.call(this)
      },
      Z = function() {
        var a, c, d, e = this,
          f = this.virtualBuffer.getChunks({
            streamId: U.call(this),
            mediaType: b,
            segmentType: MediaPlayer.vo.metrics.HTTPRequest.MEDIA_SEGMENT_TYPE,
            appended: !0
          }),
          g = new MediaPlayer.utils.CustomTimeRanges,
          h = new MediaPlayer.utils.CustomTimeRanges,
          i = this.playbackController.getTime(),
          j = 2 * this.streamProcessor.getCurrentRepresentationInfo().fragmentDuration;
        if (f.forEach(function(a) {
            c = e.mediaController.isCurrentTrack(a.mediaInfo) ? h : g, c.add(a.bufferedRange.start, a.bufferedRange.end)
          }), 0 !== g.length && 0 !== h.length && (a = this.sourceBufferExt.getBufferLength({
            buffered: h
          }, i), !(j > a)))
          for (var k = 0, l = g.length; l > k; k += 1) d = {
            start: g.start(k),
            end: g.end(k)
          }, (e.mediaController.getSwitchMode(b) === MediaPlayer.dependencies.MediaController.trackSwitchModes.ALWAYS_REPLACE || d.start > i) && K.call(e, d)
      },
      $ = function() {
        var a, c = U.call(this);
        !n || s || q || r || w.call(this) || !H.call(this) || (a = this.virtualBuffer.extract({
          streamId: c,
          mediaType: b,
          segmentType: MediaPlayer.vo.metrics.HTTPRequest.MEDIA_SEGMENT_TYPE,
          limit: 1
        })[0], a && A.call(this, a))
      },
      _ = function(a) {
        if (!a.error) {
          var b, d = this;
          Q.call(d, a.data.currentRepresentation.MSETimeOffset), b = d.streamProcessor.getStreamInfo().manifestInfo.minBufferTime, c !== b && (d.setMinBufferTime(b), d.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_MIN_BUFFER_TIME_UPDATED, {
            minBufferTime: b
          }))
        }
      },
      aa = function(a) {
        var b = this;
        a.data.fragmentModel === b.streamProcessor.getFragmentModel() && (m = a.data.request.index, M.call(b))
      },
      ba = function(a) {
        if (b === a.data.mediaType && this.streamProcessor.getStreamInfo().id === a.data.streamInfo.id) {
          var c = this,
            d = a.data.newQuality;
          f !== d && (Q.call(c, c.streamProcessor.getRepresentationInfoForQuality(d).MSETimeOffset), f = d, w.call(c) && da.call(c))
        }
      },
      ca = function() {
        T.call(this)
      },
      da = function() {
        var a = this,
          c = U.call(a),
          d = {
            streamId: c,
            mediaType: b,
            segmentType: MediaPlayer.vo.metrics.HTTPRequest.INIT_SEGMENT_TYPE,
            quality: f
          },
          e = a.virtualBuffer.getChunks(d)[0];
        if (e) {
          if (r || !n) return;
          A.call(a, e)
        } else a.notify(MediaPlayer.dependencies.BufferController.eventList.ENAME_INIT_REQUESTED, {
          requiredQuality: f
        })
      },
      ea = function(a) {
        if (n) {
          var c = this,
            d = a.data.newMediaInfo,
            e = d.type,
            f = a.data.switchMode,
            g = this.playbackController.getTime(),
            h = {
              start: 0,
              end: g
            };
          if (b === e) switch (f) {
            case MediaPlayer.dependencies.MediaController.trackSwitchModes.ALWAYS_REPLACE:
              K.call(c, h);
              break;
            case MediaPlayer.dependencies.MediaController.trackSwitchModes.NEVER_REPLACE:
              break;
            default:
              this.log("track switch mode is not supported: " + f)
          }
        }
      },
      fa = function() {
        S.call(this), p += 1, p % MediaPlayer.dependencies.BufferController.BUFFER_PRUNING_INTERVAL !== 0 || r || I.call(this)
      },
      ga = function() {
        N.call(this)
      };
    return {
      sourceBufferExt: void 0,
      eventBus: void 0,
      bufferMax: void 0,
      manifestModel: void 0,
      errHandler: void 0,
      mediaSourceExt: void 0,
      metricsModel: void 0,
      metricsExt: void 0,
      streamController: void 0,
      playbackController: void 0,
      mediaController: void 0,
      adapter: void 0,
      log: void 0,
      abrController: void 0,
      boxParser: void 0,
      system: void 0,
      notify: void 0,
      subscribe: void 0,
      unsubscribe: void 0,
      virtualBuffer: void 0,
      textSourceBuffer: void 0,
      setup: function() {
        this[Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED] = _, this[MediaPlayer.dependencies.FragmentController.eventList.ENAME_INIT_FRAGMENT_LOADED] = y, this[MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADED] = z, this[MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED] = aa, this[MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED] = ba, this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PROGRESS] = R, this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING] = R, this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_TIME_UPDATED] = R, this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_RATE_CHANGED] = ga, this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED] = fa, this[MediaPlayer.dependencies.MediaController.eventList.CURRENT_TRACK_CHANGED] = ea, B = B.bind(this), L = L.bind(this), ca = ca.bind(this), this.sourceBufferExt.subscribe(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_APPEND_COMPLETED, this, B), this.sourceBufferExt.subscribe(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_REMOVE_COMPLETED, this, L), this.virtualBuffer.subscribe(MediaPlayer.utils.VirtualBuffer.eventList.CHUNK_APPENDED, this, ca)
      },
      initialize: function(a, c, d) {
        var e = this;
        b = a, e.setMediaType(b), e.setMediaSource(c), e.streamProcessor = d, e.fragmentController = d.fragmentController, e.scheduleController = d.scheduleController, f = e.abrController.getQualityFor(b, d.getStreamInfo())
      },
      createBuffer: u,
      getStreamProcessor: function() {
        return this.streamProcessor
      },
      setStreamProcessor: function(a) {
        this.streamProcessor = a
      },
      getBuffer: function() {
        return n
      },
      setBuffer: function(a) {
        n = a
      },
      getBufferLevel: function() {
        return i
      },
      getMinBufferTime: function() {
        return c
      },
      setMinBufferTime: function(a) {
        c = a
      },
      getCriticalBufferLevel: function() {
        return k
      },
      setMediaSource: function(b) {
        a = b
      },
      getMediaSource: function() {
        return a
      },
      isBufferingCompleted: function() {
        return h
      },
      reset: function(b) {
        var e = this;
        k = Number.POSITIVE_INFINITY, o = null, c = null, g = -1, m = -1, l = -1, f = 0, e.sourceBufferExt.unsubscribe(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_APPEND_COMPLETED, e, B), e.sourceBufferExt.unsubscribe(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_REMOVE_COMPLETED, e, L), d = null, this.virtualBuffer.unsubscribe(MediaPlayer.utils.VirtualBuffer.eventList.CHUNK_APPENDED, e, ca), q = !1, r = !1, s = !1, b || (e.sourceBufferExt.abort(a, n), e.sourceBufferExt.removeSourceBuffer(a, n)), n = null
      }
    }
  }, MediaPlayer.dependencies.BufferController.BUFFER_SIZE_REQUIRED = "required", MediaPlayer.dependencies.BufferController.BUFFER_SIZE_MIN = "min", MediaPlayer.dependencies.BufferController.BUFFER_SIZE_INFINITY = "infinity", MediaPlayer.dependencies.BufferController.DEFAULT_MIN_BUFFER_TIME = 12, MediaPlayer.dependencies.BufferController.LOW_BUFFER_THRESHOLD = 4, MediaPlayer.dependencies.BufferController.BUFFER_TIME_AT_TOP_QUALITY = 30, MediaPlayer.dependencies.BufferController.BUFFER_TIME_AT_TOP_QUALITY_LONG_FORM = 300, MediaPlayer.dependencies.BufferController.LONG_FORM_CONTENT_DURATION_THRESHOLD = 600, MediaPlayer.dependencies.BufferController.RICH_BUFFER_THRESHOLD = 20, MediaPlayer.dependencies.BufferController.BUFFER_LOADED = "bufferLoaded", MediaPlayer.dependencies.BufferController.BUFFER_EMPTY = "bufferStalled", MediaPlayer.dependencies.BufferController.BUFFER_TO_KEEP = 30, MediaPlayer.dependencies.BufferController.BUFFER_PRUNING_INTERVAL = 30, MediaPlayer.dependencies.BufferController.prototype = {
    constructor: MediaPlayer.dependencies.BufferController
  }, MediaPlayer.dependencies.BufferController.eventList = {
    ENAME_BUFFER_LEVEL_STATE_CHANGED: "bufferLevelStateChanged",
    ENAME_BUFFER_LEVEL_UPDATED: "bufferLevelUpdated",
    ENAME_QUOTA_EXCEEDED: "quotaExceeded",
    ENAME_BYTES_APPENDED: "bytesAppended",
    ENAME_BYTES_REJECTED: "bytesRejected",
    ENAME_BUFFERING_COMPLETED: "bufferingCompleted",
    ENAME_BUFFER_CLEARED: "bufferCleared",
    ENAME_INIT_REQUESTED: "initRequested",
    ENAME_BUFFER_LEVEL_OUTRUN: "bufferLevelOutrun",
    ENAME_BUFFER_LEVEL_BALANCED: "bufferLevelBalanced",
    ENAME_MIN_BUFFER_TIME_UPDATED: "minBufferTimeUpdated"
  }, MediaPlayer.dependencies.EventController = function() {
    "use strict";
    var a = {},
      b = {},
      c = {},
      d = null,
      e = 100,
      f = e / 1e3,
      g = "urn:mpeg:dash:event:2012",
      h = 1,
      i = function() {
        j(), a = null, b = null, c = null
      },
      j = function() {
        null !== d && (clearInterval(d), d = null)
      },
      k = function() {
        var a = this;
        a.log("Start Event Controller"), isNaN(e) || (d = setInterval(n.bind(this), e))
      },
      l = function(b) {
        var c = this;
        if (a = {}, b)
          for (var d = 0; d < b.length; d++) {
            var e = b[d];
            a[e.id] = e, c.log("Add inline event with id " + e.id)
          }
        c.log("Added " + b.length + " inline events")
      },
      m = function(a) {
        for (var c = this, d = 0; d < a.length; d++) {
          var e = a[d];
          e.id in b ? c.log("Repeated event with id " + e.id) : (b[e.id] = e, c.log("Add inband event with id " + e.id))
        }
      },
      n = function() {
        o.call(this, b), o.call(this, a), p.call(this)
      },
      o = function(a) {
        var b, d = this,
          e = this.videoModel.getCurrentTime();
        if (a)
          for (var i = Object.keys(a), j = 0; j < i.length; j++) {
            var k = i[j],
              l = a[k];
            void 0 !== l && (b = l.presentationTime / l.eventStream.timescale, (0 === b || e >= b && b + f > e) && (d.log("Start Event " + k + " at " + e), l.duration > 0 && (c[k] = l), l.eventStream.schemeIdUri == g && l.eventStream.value == h && q.call(this), delete a[k]))
          }
      },
      p = function() {
        var a = this;
        if (c)
          for (var b = this.videoModel.getCurrentTime(), d = Object.keys(c), e = 0; e < d.length; e++) {
            var f = d[e],
              g = c[f];
            null !== g && (g.duration + g.presentationTime) / g.eventStream.timescale < b && (a.log("Remove Event " + f + " at time " + b), g = null, delete c[f])
          }
      },
      q = function() {
        var a = this.manifestModel.getValue(),
          b = a.url;
        a.hasOwnProperty("Location") && (b = a.Location), this.log("Refresh manifest @ " + b), this.manifestUpdater.getManifestLoader().load(b)
      };
    return {
      manifestModel: void 0,
      manifestUpdater: void 0,
      log: void 0,
      system: void 0,
      videoModel: void 0,
      addInlineEvents: l,
      addInbandEvents: m,
      reset: i,
      clear: j,
      start: k
    }
  }, MediaPlayer.dependencies.EventController.prototype = {
    constructor: MediaPlayer.dependencies.EventController
  }, MediaPlayer.dependencies.FragmentController = function() {
    "use strict";
    var a = [],
      b = !1,
      c = function(b) {
        for (var c = a.length, d = 0; c > d; d++)
          if (a[d].getContext() == b) return a[d];
        return null
      },
      d = function(b, c) {
        var d = this,
          e = a[0].getContext().streamProcessor,
          f = e.getStreamInfo().id,
          g = d.scheduleRulesCollection.getRules(MediaPlayer.rules.ScheduleRulesCollection.prototype.FRAGMENTS_TO_EXECUTE_RULES); - 1 !== g.indexOf(this.scheduleRulesCollection.sameTimeRequestRule) && this.scheduleRulesCollection.sameTimeRequestRule.setFragmentModels(a, f), d.rulesController.applyRules(g, e, c, b, function(a, b) {
          return b
        })
      },
      e = function(a, b, c) {
        var d = new MediaPlayer.vo.DataChunk;
        return d.streamId = c, d.mediaInfo = b.mediaInfo, d.segmentType = b.type, d.start = b.startTime, d.duration = b.duration, d.end = d.start + d.duration, d.bytes = a, d.index = b.index, d.quality = b.quality, d
      },
      f = function(a) {
        var b = this,
          c = a.data.request;
        b.isInitializationRequest(c) ? b.notify(MediaPlayer.dependencies.FragmentController.eventList.ENAME_INIT_FRAGMENT_LOADING_START, {
          request: c,
          fragmentModel: a.sender
        }) : b.notify(MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADING_START, {
          request: c,
          fragmentModel: a.sender
        })
      },
      g = function(a) {
        var b, c = this,
          d = a.data.request,
          f = a.data.response,
          g = a.sender.getContext().streamProcessor.getStreamInfo().id,
          h = this.isInitializationRequest(d),
          i = h ? MediaPlayer.dependencies.FragmentController.eventList.ENAME_INIT_FRAGMENT_LOADED : MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADED;
        return f ? (b = e.call(this, f, d, g), c.notify(i, {
          chunk: b,
          fragmentModel: a.sender
        }), void k.call(this)) : void c.log("No " + d.mediaType + " bytes to push.")
      },
      h = function(a) {
        this.notify(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED, {
          request: a.data.request,
          fragmentModel: a.sender
        })
      },
      i = function() {
        k.call(this)
      },
      j = function(c) {
        var d, e, f, g, h, i = c.value;
        for (g = 0; g < i.length; g += 1)
          if (e = i[g])
            for (h = 0; h < a.length; h += 1) f = a[h], d = f.getContext().streamProcessor.getType(), e.mediaType === d && (e instanceof MediaPlayer.vo.FragmentRequest || (e = f.getRequests({
              state: MediaPlayer.dependencies.FragmentModel.states.PENDING,
              time: e.startTime
            })[0]), f.executeRequest(e));
        b = !1
      },
      k = function(a) {
        b || (b = !0, d.call(this, a, j.bind(this)))
      };
    return {
      system: void 0,
      log: void 0,
      scheduleRulesCollection: void 0,
      rulesController: void 0,
      notify: void 0,
      subscribe: void 0,
      unsubscribe: void 0,
      setup: function() {
        this[MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_STARTED] = f, this[MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_COMPLETED] = g, this[MediaPlayer.dependencies.FragmentModel.eventList.ENAME_STREAM_COMPLETED] = h, this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED] = i, this.scheduleRulesCollection.sameTimeRequestRule && this.subscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED, this.scheduleRulesCollection.sameTimeRequestRule)
      },
      process: function(a) {
        var b = null;
        return null !== a && void 0 !== a && a.byteLength > 0 && (b = new Uint8Array(a)), b
      },
      getModel: function(b) {
        if (!b) return null;
        var d = c(b);
        return d || (d = this.system.getObject("fragmentModel"), d.setContext(b), a.push(d)), d
      },
      detachModel: function(b) {
        var c = a.indexOf(b);
        c > -1 && a.splice(c, 1)
      },
      isInitializationRequest: function(a) {
        return a && a.type && a.type === MediaPlayer.vo.metrics.HTTPRequest.INIT_SEGMENT_TYPE
      },
      prepareFragmentForLoading: function(a, b) {
        a && b && a.addRequest(b) && k.call(this, b)
      },
      executePendingRequests: function() {
        k.call(this)
      },
      reset: function() {
        a = [], this.scheduleRulesCollection.sameTimeRequestRule && this.unsubscribe(MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED, this.scheduleRulesCollection.sameTimeRequestRule)
      }
    }
  }, MediaPlayer.dependencies.FragmentController.prototype = {
    constructor: MediaPlayer.dependencies.FragmentController
  }, MediaPlayer.dependencies.FragmentController.eventList = {
    ENAME_STREAM_COMPLETED: "streamCompleted",
    ENAME_INIT_FRAGMENT_LOADING_START: "initFragmentLoadingStart",
    ENAME_MEDIA_FRAGMENT_LOADING_START: "mediaFragmentLoadingStart",
    ENAME_INIT_FRAGMENT_LOADED: "initFragmentLoaded",
    ENAME_MEDIA_FRAGMENT_LOADED: "mediaFragmentLoaded"
  }, MediaPlayer.dependencies.MediaController = function() {
    var a, b, c, d = {},
      e = function(a, b) {
        !this.DOMStorage.isSupported(MediaPlayer.utils.DOMStorage.STORAGE_TYPE_LOCAL) || "video" !== a && "audio" !== a || localStorage.setItem(MediaPlayer.utils.DOMStorage["LOCAL_STORAGE_" + a.toUpperCase() + "_SETTINGS_KEY"], JSON.stringify({
          settings: b,
          timestamp: (new Date).getTime()
        }))
      },
      f = function(a) {
        var b = {
            lang: a.lang,
            viewpoint: a.viewpoint,
            roles: a.roles,
            accessibility: a.accessibility,
            audioChannelConfiguration: a.audioChannelConfiguration
          },
          c = b.lang || b.viewpoint || b.role && b.role.length > 0 || b.accessibility && b.accessibility.length > 0 || b.audioChannelConfiguration && b.audioChannelConfiguration.length > 0;
        return c ? b : null
      },
      g = function(a, b) {
        var c = !a.lang || a.lang === b.lang,
          d = !a.viewpoint || a.viewpoint === b.viewpoint,
          e = !a.role || !!b.roles.filter(function(b) {
            return b === a.role
          })[0],
          f = !a.accessibility || !!b.accessibility.filter(function(b) {
            return b === a.accessibility
          })[0],
          g = !a.audioChannelConfiguration || !!b.audioChannelConfiguration.filter(function(b) {
            return b === a.audioChannelConfiguration
          })[0];
        return c && d && e && f && g
      },
      h = function() {
        c = {
          audio: MediaPlayer.dependencies.MediaController.trackSwitchModes.ALWAYS_REPLACE,
          video: MediaPlayer.dependencies.MediaController.trackSwitchModes.NEVER_REPLACE
        }
      },
      i = function() {
        a = {
          audio: null,
          video: null
        }
      },
      j = function(a) {
        var b = this.getSelectionModeForInitialTrack(),
          c = [],
          d = function(a) {
            var b, c = 0,
              d = [];
            return a.forEach(function(a) {
              b = Math.max.apply(Math, a.bitrateList), b > c ? (c = b, d = [a]) : b === c && d.push(a)
            }), d
          },
          e = function(a) {
            var b, c = 0,
              d = [];
            return a.forEach(function(a) {
              b = a.representationCount, b > c ? (c = b, d = [a]) : b === c && d.push(a)
            }), d
          };
        switch (b) {
          case MediaPlayer.dependencies.MediaController.trackSelectionModes.HIGHEST_BITRATE:
            c = d(a), c.length > 1 && (c = e(c));
            break;
          case MediaPlayer.dependencies.MediaController.trackSelectionModes.WIDEST_RANGE:
            c = e(a), c.length > 1 && (c = d(a));
            break;
          default:
            this.log("track selection mode is not supported: " + b)
        }
        return c[0]
      },
      k = function() {
        return {
          audio: {
            list: [],
            storeLastSettings: !0,
            current: null
          },
          video: {
            list: [],
            storeLastSettings: !0,
            current: null
          },
          text: {
            list: [],
            storeLastSettings: !0,
            current: null
          },
          fragmentedText: {
            list: [],
            storeLastSettings: !0,
            current: null
          }
        }
      };
    return {
      log: void 0,
      system: void 0,
      errHandler: void 0,
      notify: void 0,
      subscribe: void 0,
      unsubscribe: void 0,
      DOMStorage: void 0,
      setup: function() {
        i.call(this), h.call(this)
      },
      checkInitialMediaSettings: function(a) {
        var b = this;
        ["audio", "video", "text", "fragmentedText"].forEach(function(c) {
          var d = b.getInitialSettings(c),
            e = b.getTracksFor(c, a),
            f = !1;
          d || (d = b.DOMStorage.getSavedMediaSettings(c), b.setInitialSettings(c, d)), e && 0 !== e.length && (d && e.forEach(function(a) {
            !f && g.call(b, d, a) && (b.setTrack(a), f = !0)
          }), f || b.setTrack(j.call(b, e)))
        })
      },
      addTrack: function(a) {
        var b = a ? a.type : null,
          c = a ? a.streamInfo.id : null,
          e = this.getInitialSettings(b);
        return a && this.isMultiTrackSupportedByType(b) ? (d[c] = d[c] || k.call(this), d[c][b].list.indexOf(a) >= 0 ? !1 : (d[c][b].list.push(a), e && g.call(this, e, a) && !this.getCurrentTrackFor(b, a.streamInfo) && this.setTrack(a), !0)) : !1
      },
      getTracksFor: function(a, b) {
        if (!a || !b) return [];
        var c = b.id;
        return d[c] && d[c][a] ? d[c][a].list : []
      },
      getCurrentTrackFor: function(a, b) {
        return a && b ? d[b.id][a].current : null
      },
      isCurrentTrack: function(a) {
        var b = a.type,
          c = a.streamInfo.id;
        return d[c] && d[c][b] && this.isTracksEqual(d[c][b].current, a)
      },
      setTrack: function(a) {
        if (a) {
          var b = a.type,
            g = a.streamInfo,
            h = g.id,
            i = this.getCurrentTrackFor(b, g);
          if (d[h] && d[h][b] && (!i || !this.isTracksEqual(a, i))) {
            d[h][b].current = a, i && this.notify(MediaPlayer.dependencies.MediaController.eventList.CURRENT_TRACK_CHANGED, {
              oldMediaInfo: i,
              newMediaInfo: a,
              switchMode: c[b]
            });
            var j = f.call(this, a);
            j && d[h][b].storeLastSettings && (j.roles && (j.role = j.roles[0], delete j.roles), j.accessibility && (j.accessibility = j.accessibility[0]), j.audioChannelConfiguration && (j.audioChannelConfiguration = j.audioChannelConfiguration[0]), e.call(this, b, j))
          }
        }
      },
      setInitialSettings: function(b, c) {
        b && c && (a[b] = c)
      },
      getInitialSettings: function(b) {
        return b ? a[b] : null
      },
      setSwitchMode: function(a, b) {
        var d = !!MediaPlayer.dependencies.MediaController.trackSwitchModes[b];
        return d ? void(c[a] = b) : void this.log("track switch mode is not supported: " + b)
      },
      getSwitchMode: function(a) {
        return c[a]
      },
      setSelectionModeForInitialTrack: function(a) {
        var c = !!MediaPlayer.dependencies.MediaController.trackSelectionModes[a];
        return c ? void(b = a) : void this.log("track selection mode is not supported: " + a)
      },
      getSelectionModeForInitialTrack: function() {
        return b || MediaPlayer.dependencies.MediaController.DEFAULT_INIT_TRACK_SELECTION_MODE
      },
      isMultiTrackSupportedByType: function(a) {
        return "audio" === a || "video" === a || "text" === a || "fragmentedText" === a
      },
      isTracksEqual: function(a, b) {
        var c = a.id === b.id,
          d = a.viewpoint === b.viewpoint,
          e = a.lang === b.lang,
          f = a.roles.toString() == b.roles.toString(),
          g = a.accessibility.toString() == b.accessibility.toString(),
          h = a.audioChannelConfiguration.toString() == b.audioChannelConfiguration.toString();
        return c && d && e && f && g && h
      },
      reset: function() {
        h.call(this), d = {}, a = {
          audio: null,
          video: null
        }
      }
    }
  }, MediaPlayer.dependencies.MediaController.prototype = {
    constructor: MediaPlayer.dependencies.MediaController
  }, MediaPlayer.dependencies.MediaController.eventList = {
    CURRENT_TRACK_CHANGED: "currenttrackchanged"
  }, MediaPlayer.dependencies.MediaController.trackSwitchModes = {
    NEVER_REPLACE: "NEVER_REPLACE",
    ALWAYS_REPLACE: "ALWAYS_REPLACE"
  }, MediaPlayer.dependencies.MediaController.trackSelectionModes = {
    HIGHEST_BITRATE: "HIGHEST_BITRATE",
    WIDEST_RANGE: "WIDEST_RANGE"
  }, MediaPlayer.dependencies.MediaController.DEFAULT_INIT_TRACK_SELECTION_MODE = MediaPlayer.dependencies.MediaController.trackSelectionModes.HIGHEST_BITRATE, MediaPlayer.dependencies.PlaybackController = function() {
    "use strict";
    var a, b, c, d, e = 50,
      f = 0,
      g = NaN,
      h = null,
      i = {},
      j = {},
      k = NaN,
      l = function(a) {
        var b, d = parseInt(this.uriQueryFragModel.getURIFragmentData().s);
        return c ? (!isNaN(d) && d > 1262304e3 && (b = d - a.manifestInfo.availableFrom.getTime() / 1e3, (b > g || b < g - a.manifestInfo.DVRWindowSize) && (b = null)), b = b || g) : b = !isNaN(d) && d < a.duration && d >= 0 ? d : a.start, b
      },
      m = function(b) {
        var c, d = this,
          e = d.metricsModel.getReadOnlyMetricsFor("video") || d.metricsModel.getReadOnlyMetricsFor("audio"),
          f = d.metricsExt.getCurrentDVRInfo(e),
          g = f ? f.range : null;
        return g ? b >= g.start && b <= g.end ? b : c = Math.max(g.end - 2 * a.manifestInfo.minBufferTime, g.start) : NaN
      },
      n = function() {
        if (null === h) {
          var a = this,
            b = function() {
              G.call(a)
            };
          h = setInterval(b, e)
        }
      },
      o = function() {
        clearInterval(h), h = null
      },
      p = function() {
        if (!j[a.id] && !this.isSeeking()) {
          var b = l.call(this, a);
          this.log("Starting playback at offset: " + b), this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING, {
            seekTime: b
          })
        }
      },
      q = function() {
        if (!this.isPaused() && c && 0 !== b.getElement().readyState) {
          var a = this.getTime(),
            d = m.call(this, a),
            e = !isNaN(d) && d !== a;
          e && this.seek(d)
        }
      },
      r = function(b) {
        if (!b.error) {
          var c = this.adapter.convertDataToTrack(this.manifestModel.getValue(), b.data.currentRepresentation),
            d = c.mediaInfo.streamInfo;
          a.id === d.id && (a = c.mediaInfo.streamInfo, q.call(this))
        }
      },
      s = function(a) {
        a.error || 0 === b.getElement().readyState || p.call(this)
      },
      t = function() {
        b && (b.unlisten("canplay", u), b.unlisten("play", v), b.unlisten("playing", w), b.unlisten("pause", x), b.unlisten("error", F), b.unlisten("seeking", y), b.unlisten("seeked", z), b.unlisten("timeupdate", A), b.unlisten("progress", B), b.unlisten("ratechange", C), b.unlisten("loadedmetadata", D), b.unlisten("ended", E))
      },
      u = function() {
        this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_CAN_PLAY)
      },
      v = function() {
        this.log("<video> play"), q.call(this), n.call(this), this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_STARTED, {
          startTime: this.getTime()
        })
      },
      w = function() {
        this.log("<video> playing"), this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PLAYING, {
          playingTime: this.getTime()
        })
      },
      x = function() {
        this.log("<video> pause"), this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PAUSED)
      },
      y = function() {
        this.log("<video> seek"), n.call(this), this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING, {
          seekTime: this.getTime()
        })
      },
      z = function() {
        this.log("<video> seeked"), this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKED)
      },
      A = function() {
        var a = this.getTime();
        a !== f && (f = a, this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_TIME_UPDATED, {
          timeToEnd: this.getTimeToStreamEnd()
        }))
      },
      B = function() {
        var c, d, e, f = b.getElement().buffered;
        f.length && (c = f.length - 1, d = f.end(c), e = l.call(this, a) + a.duration - d), this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PROGRESS, {
          bufferedRanges: b.getElement().buffered,
          remainingUnbufferedDuration: e
        })
      },
      C = function() {
        this.log("<video> ratechange: ", this.getPlaybackRate()), this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_RATE_CHANGED)
      },
      D = function() {
        this.log("<video> loadedmetadata"), (!c || this.timelineConverter.isTimeSyncCompleted()) && p.call(this), this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_METADATA_LOADED), n.call(this)
      },
      E = function() {
        this.log("<video> ended"), o.call(this), this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_ENDED)
      },
      F = function(a) {
        var b = a.target || a.srcElement;
        this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_ERROR, {
          error: b.error
        })
      },
      G = function() {
        this.notify(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED, {
          isDynamic: c,
          time: new Date
        })
      },
      H = function(b) {
        var c, d = b.data.bufferedRanges,
          e = a.id,
          f = this.getTime(),
          g = b.sender.streamProcessor,
          h = g.getType(),
          k = this.system.getObject("streamController").getStreamById(a.id),
          m = l.call(this, a),
          n = this.adapter.getFragmentRequestForTime(g, g.getCurrentRepresentationInfo(), m, {
            ignoreIsFinished: !0
          }),
          o = n ? n.index : null,
          p = i[e];
        b.data.index === o && (j[e] = j[e] || {}, j[e][h] = !0, j[e].ready = !(k.hasMedia("audio") && !j[e].audio || k.hasMedia("video") && !j[e].video)), !d || !d.length || j[e] && j[e].seekCompleted || (c = Math.max(d.start(0), a.start), i[e] = void 0 === i[e] ? c : Math.max(i[e], c), p === i[e] && f === p || !j[e] || !j[e].ready || f > i[e] || (this.isSeeking() ? i = {} : (this.seek(Math.max(i[e], m)), j[e].seekCompleted = !0)))
      },
      I = function(c) {
        var d = c.sender.streamProcessor.getType(),
          e = c.sender.streamProcessor.getStreamInfo();
        e.id === a.id && b.setStallState(d, !c.data.hasSufficientBuffer)
      },
      J = function() {
        b.listen("canplay", u), b.listen("play", v), b.listen("playing", w), b.listen("pause", x), b.listen("error", F), b.listen("seeking", y), b.listen("seeked", z), b.listen("timeupdate", A), b.listen("progress", B), b.listen("ratechange", C), b.listen("loadedmetadata", D), b.listen("ended", E)
      };
    return {
      system: void 0,
      log: void 0,
      timelineConverter: void 0,
      uriQueryFragModel: void 0,
      metricsModel: void 0,
      metricsExt: void 0,
      manifestModel: void 0,
      manifestExt: void 0,
      videoModel: void 0,
      notify: void 0,
      subscribe: void 0,
      unsubscribe: void 0,
      adapter: void 0,
      setup: function() {
        this[Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED] = r, this[MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED] = s, this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_APPENDED] = H, this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_STATE_CHANGED] = I, u = u.bind(this), v = v.bind(this), w = w.bind(this), x = x.bind(this), F = F.bind(this), y = y.bind(this), z = z.bind(this), A = A.bind(this), B = B.bind(this), C = C.bind(this), D = D.bind(this), E = E.bind(this)
      },
      initialize: function(d) {
        b = this.videoModel, a = d, i = {}, t.call(this), J.call(this), c = a.manifestInfo.isDynamic, g = d.start
      },
      getStreamStartTime: l,
      getTimeToStreamEnd: function() {
        var c = b.getCurrentTime();
        return l.call(this, a) + a.duration - c
      },
      isPlaybackStarted: function() {
        return this.getTime() > 0
      },
      getStreamId: function() {
        return a.id
      },
      getStreamDuration: function() {
        return a.duration
      },
      getTime: function() {
        return b.getCurrentTime()
      },
      getPlaybackRate: function() {
        return b.getPlaybackRate()
      },
      getPlayedRanges: function() {
        return b.getElement().played
      },
      getIsDynamic: function() {
        return c
      },
      setLiveStartTime: function(a) {
        g = a
      },
      getLiveStartTime: function() {
        return g
      },
      setLiveDelayAttributes: function(a, b) {
        k = a, d = b
      },
      getLiveDelay: function(b) {
        var c, e = this.manifestExt.getMpd(this.manifestModel.getValue());
        return c = d && e.hasOwnProperty("suggestedPresentationDelay") ? e.suggestedPresentationDelay : isNaN(b) ? 2 * a.manifestInfo.minBufferTime : b * k
      },
      start: function() {
        b.play()
      },
      isPaused: function() {
        return b.isPaused()
      },
      pause: function() {
        b && b.pause()
      },
      isSeeking: function() {
        return b.getElement().seeking
      },
      seek: function(a) {
        b && a !== this.getTime() && (this.log("Do seek: " + a), b.setCurrentTime(a))
      },
      reset: function() {
        o.call(this), t.call(this), b = null, a = null, f = 0, g = NaN, i = {}, j = {}, c = void 0, d = void 0, k = NaN
      }
    }
  }, MediaPlayer.dependencies.PlaybackController.prototype = {
    constructor: MediaPlayer.dependencies.PlaybackController
  }, MediaPlayer.dependencies.PlaybackController.eventList = {
    ENAME_CAN_PLAY: "canPlay",
    ENAME_PLAYBACK_STARTED: "playbackStarted",
    ENAME_PLAYBACK_PLAYING: "playbackPlaying",
    ENAME_PLAYBACK_STOPPED: "playbackStopped",
    ENAME_PLAYBACK_PAUSED: "playbackPaused",
    ENAME_PLAYBACK_ENDED: "playbackEnded",
    ENAME_PLAYBACK_SEEKING: "playbackSeeking",
    ENAME_PLAYBACK_SEEKED: "playbackSeeked",
    ENAME_PLAYBACK_TIME_UPDATED: "playbackTimeUpdated",
    ENAME_PLAYBACK_PROGRESS: "playbackProgress",
    ENAME_PLAYBACK_RATE_CHANGED: "playbackRateChanged",
    ENAME_PLAYBACK_METADATA_LOADED: "playbackMetaDataLoaded",
    ENAME_PLAYBACK_ERROR: "playbackError",
    ENAME_WALLCLOCK_TIME_UPDATED: "wallclockTimeUpdated"
  }, MediaPlayer.dependencies.ProtectionController = function() {
    "use strict";
    var a, b, c, d = null,
      e = [],
      f = !1,
      g = function(a) {
        var b = null,
          d = a.systemString;
        return c && (b = d in c ? c[d] : null), b
      },
      h = function(c, d) {
        var f = this,
          g = [],
          h = [];
        b && h.push(new MediaPlayer.vo.protection.MediaCapability(b.codec)), a && g.push(new MediaPlayer.vo.protection.MediaCapability(a.codec));
        var i, j = new MediaPlayer.vo.protection.KeySystemConfiguration(g, h, "optional", "temporary" === f.sessionType ? "optional" : "required", [f.sessionType]),
          k = [];
        if (this.keySystem) {
          for (i = 0; i < c.length; i++)
            if (this.keySystem === c[i].ks) {
              k.push({
                ks: c[i].ks,
                configs: [j]
              });
              var l = {};
              l[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE] = function(a) {
                a.error ? d || f.eventBus.dispatchEvent({
                  type: MediaPlayer.dependencies.ProtectionController.events.KEY_SYSTEM_SELECTED,
                  error: "DRM: KeySystem Access Denied! -- " + a.error
                }) : (f.log("KeySystem Access Granted"), f.eventBus.dispatchEvent({
                  type: MediaPlayer.dependencies.ProtectionController.events.KEY_SYSTEM_SELECTED,
                  data: a.data
                }), f.createKeySession(c[i].initData))
              }, this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE, l, void 0, !0), this.protectionModel.requestKeySystemAccess(k);
              break
            }
        } else if (void 0 === this.keySystem) {
          this.keySystem = null, e.push(c);
          for (var m = 0; m < c.length; m++) k.push({
            ks: c[m].ks,
            configs: [j]
          });
          var n, o = {};
          o[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE] = function(a) {
            a.error ? (f.keySystem = void 0, f.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED, o), d || f.eventBus.dispatchEvent({
              type: MediaPlayer.dependencies.ProtectionController.events.KEY_SYSTEM_SELECTED,
              error: "DRM: KeySystem Access Denied! -- " + a.error
            })) : (n = a.data, f.log("KeySystem Access Granted (" + n.keySystem.systemString + ")!  Selecting key system..."), f.protectionModel.selectKeySystem(n))
          }, o[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED] = function(a) {
            if (a.error) f.keySystem = void 0, d || f.eventBus.dispatchEvent({
              type: MediaPlayer.dependencies.ProtectionController.events.KEY_SYSTEM_SELECTED,
              error: "DRM: Error selecting key system! -- " + a.error
            });
            else {
              f.keySystem = f.protectionModel.keySystem, f.eventBus.dispatchEvent({
                type: MediaPlayer.dependencies.ProtectionController.events.KEY_SYSTEM_SELECTED,
                data: n
              });
              for (var b = 0; b < e.length; b++)
                for (i = 0; i < e[b].length; i++)
                  if (f.keySystem === e[b][i].ks) {
                    f.createKeySession(e[b][i].initData);
                    break
                  }
            }
          }, this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED, o, void 0, !0), this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE, o, void 0, !0), this.protectionModel.requestKeySystemAccess(k)
        } else e.push(c)
      },
      i = function(a, b) {
        this.eventBus.dispatchEvent({
          type: MediaPlayer.dependencies.ProtectionController.events.LICENSE_REQUEST_COMPLETE,
          data: a,
          error: b
        })
      },
      j = function(a) {
        if (a.error) return void this.log(a.error);
        var b = a.data;
        this.eventBus.dispatchEvent({
          type: MediaPlayer.dependencies.ProtectionController.events.KEY_MESSAGE,
          data: b
        });
        var c = b.messageType ? b.messageType : "license-request",
          d = b.message,
          e = b.sessionToken,
          f = g(this.keySystem),
          h = this.keySystem.systemString,
          j = this.protectionExt.getLicenseServer(this.keySystem, f, c),
          k = i.bind(this),
          l = {
            sessionToken: e,
            messageType: c
          };
        if (!j) return this.log("DRM: License server request not required for this message (type = " + a.data.messageType + ").  Session ID = " + e.getSessionID()), void k(l);
        if (this.protectionExt.isClearKey(this.keySystem)) {
          var m = this.protectionExt.processClearKeyLicenseRequest(f, d);
          if (m) return this.log("DRM: ClearKey license request handled by application!"), k(l), void this.protectionModel.updateKeySession(e, m)
        }
        var n = new XMLHttpRequest,
          o = this,
          p = null;
        if (f)
          if (f.serverURL) {
            var q = f.serverURL;
            "string" == typeof q && "" !== q ? p = q : "object" == typeof q && q.hasOwnProperty(c) && (p = q[c])
          } else f.laURL && "" !== f.laURL && (p = f.laURL);
        else p = this.keySystem.getLicenseServerURLFromInitData(MediaPlayer.dependencies.protection.CommonEncryption.getPSSHData(e.initData)), p || (p = a.data.laURL);
        if (p = j.getServerURLFromMessage(p, d, c), !p) return void k(l, "DRM: No license server URL specified!");
        n.open(j.getHTTPMethod(c), p, !0), n.responseType = j.getResponseType(h, c), n.onload = function() {
          200 == this.status ? (k(l), o.protectionModel.updateKeySession(e, j.getLicenseMessage(this.response, h, c))) : k(l, "DRM: " + h + ' update, XHR status is "' + this.statusText + '" (' + this.status + "), expected to be 200. readyState is " + this.readyState + ".  Response is " + (this.response ? j.getErrorResponse(this.response, h, c) : "NONE"))
        }, n.onabort = function() {
          k(l, "DRM: " + h + ' update, XHR aborted. status is "' + this.statusText + '" (' + this.status + "), readyState is " + this.readyState)
        }, n.onerror = function() {
          k(l, "DRM: " + h + ' update, XHR error. status is "' + this.statusText + '" (' + this.status + "), readyState is " + this.readyState)
        };
        var r = function(a) {
          var b;
          if (a)
            for (b in a) "authorization" === b.toLowerCase() && (n.withCredentials = !0), n.setRequestHeader(b, a[b])
        };
        f && r(f.httpRequestHeaders), r(this.keySystem.getRequestHeadersFromMessage(d)), f && f.withCredentials && (n.withCredentials = !0), n.send(this.keySystem.getLicenseRequestFromMessage(d))
      },
      k = function(a) {
        if ("cenc" !== a.data.initDataType) return void this.log("DRM:  Only 'cenc' initData is supported!  Ignoring initData of type: " + a.data.initDataType);
        var b = a.data.initData;
        ArrayBuffer.isView(b) && (b = b.buffer);
        var c = this.protectionExt.getSupportedKeySystems(b);
        return 0 === c.length ? void this.log("Received needkey event with initData, but we don't support any of the key systems!") : void h.call(this, c, !1)
      },
      l = function(a) {
        a.error ? this.eventBus.dispatchEvent({
          type: MediaPlayer.dependencies.ProtectionController.events.SERVER_CERTIFICATE_UPDATED,
          data: null,
          error: "DRM: Failed to update license server certificate. -- " + a.error
        }) : (this.log("DRM: License server certificate successfully updated."), this.eventBus.dispatchEvent({
          type: MediaPlayer.dependencies.ProtectionController.events.SERVER_CERTIFICATE_UPDATED,
          data: null,
          error: null
        }))
      },
      m = function(a) {
        a.error ? this.eventBus.dispatchEvent({
          type: MediaPlayer.dependencies.ProtectionController.events.KEY_SESSION_CREATED,
          data: null,
          error: "DRM: Failed to create key session. -- " + a.error
        }) : (this.log("DRM: Session created.  SessionID = " + a.data.getSessionID()), this.eventBus.dispatchEvent({
          type: MediaPlayer.dependencies.ProtectionController.events.KEY_SESSION_CREATED,
          data: a.data,
          error: null
        }))
      },
      n = function() {
        this.log("DRM: Key added."), this.eventBus.dispatchEvent({
          type: MediaPlayer.dependencies.ProtectionController.events.KEY_ADDED,
          data: null,
          error: null
        })
      },
      o = function(a) {
        this.eventBus.dispatchEvent({
          type: MediaPlayer.dependencies.ProtectionController.events.KEY_ADDED,
          data: null,
          error: "DRM: MediaKeyError - sessionId: " + a.data.sessionToken.getSessionID() + ".  " + a.data.error
        })
      },
      p = function(a) {
        a.error ? this.eventBus.dispatchEvent({
          type: MediaPlayer.dependencies.ProtectionController.events.KEY_SESSION_CLOSED,
          data: null,
          error: "DRM Failed to close key session. -- " + a.error
        }) : (this.log("DRM: Session closed.  SessionID = " + a.data), this.eventBus.dispatchEvent({
          type: MediaPlayer.dependencies.ProtectionController.events.KEY_SESSION_CLOSED,
          data: a.data,
          error: null
        }))
      },
      q = function(a) {
        a.error ? this.eventBus.dispatchEvent({
          type: MediaPlayer.dependencies.ProtectionController.events.KEY_SESSION_REMOVED,
          data: null,
          error: "DRM Failed to remove key session. -- " + a.error
        }) : (this.log("DRM: Session removed.  SessionID = " + a.data), this.eventBus.dispatchEvent({
          type: MediaPlayer.dependencies.ProtectionController.events.KEY_SESSION_REMOVED,
          data: a.data,
          error: null
        }))
      },
      r = function(a) {
        this.eventBus.dispatchEvent({
          type: MediaPlayer.dependencies.ProtectionController.events.KEY_STATUSES_CHANGED,
          data: a.data,
          error: null
        })
      };
    return {
      system: void 0,
      log: void 0,
      protectionExt: void 0,
      keySystem: void 0,
      sessionType: "temporary",
      setup: function() {
        this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_MESSAGE] = j.bind(this), this[MediaPlayer.models.ProtectionModel.eventList.ENAME_NEED_KEY] = k.bind(this), this[MediaPlayer.models.ProtectionModel.eventList.ENAME_SERVER_CERTIFICATE_UPDATED] = l.bind(this), this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ADDED] = n.bind(this), this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ERROR] = o.bind(this), this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED] = m.bind(this), this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CLOSED] = p.bind(this), this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_REMOVED] = q.bind(this), this[MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_STATUSES_CHANGED] = r.bind(this), d = this.protectionExt.getKeySystems(), this.protectionModel = this.system.getObject("protectionModel"), this.protectionModel.init(), this.eventBus = this.system.getObject("eventBusCl"), this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_SERVER_CERTIFICATE_UPDATED, this), this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ADDED, this), this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ERROR, this), this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED, this), this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CLOSED, this), this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_REMOVED, this), this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_MESSAGE, this), this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_STATUSES_CHANGED, this)
      },
      init: function(c, d, e) {
        if (!f) {
          var g, i;
          d || e || (g = this.system.getObject("adapter"), i = g.getStreamsInfo(c)[0]), a = d || (i ? g.getMediaInfoForType(c, i, "audio") : null), b = e || (i ? g.getMediaInfoForType(c, i, "video") : null);
          var j = b ? b : a,
            k = this.protectionExt.getSupportedKeySystemsFromContentProtection(j.contentProtection);
          k && k.length > 0 && h.call(this, k, !0), f = !0
        }
      },
      addEventListener: function(a, b) {
        this.eventBus.addEventListener(a, b)
      },
      removeEventListener: function(a, b) {
        this.eventBus.removeEventListener(a, b)
      },
      teardown: function() {
        this.setMediaElement(null), this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_MESSAGE, this), this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_SERVER_CERTIFICATE_UPDATED, this), this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ADDED, this), this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ERROR, this), this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED, this), this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CLOSED, this), this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_REMOVED, this), this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_MESSAGE, this), this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_STATUSES_CHANGED, this), this.keySystem = void 0, this.protectionModel.teardown(), this.protectionModel = void 0
      },
      createKeySession: function(a) {
        var b = MediaPlayer.dependencies.protection.CommonEncryption.getPSSHForKeySystem(this.keySystem, a);
        if (b) {
          for (var c = this.protectionModel.getAllInitData(), d = 0; d < c.length; d++)
            if (this.protectionExt.initDataEquals(b, c[d])) return void this.log("Ignoring initData because we have already seen it!");
          try {
            this.protectionModel.createKeySession(b, this.sessionType)
          } catch (e) {
            this.eventBus.dispatchEvent({
              type: MediaPlayer.dependencies.ProtectionController.events.KEY_SESSION_CREATED,
              data: null,
              error: "Error creating key session! " + e.message
            })
          }
        } else this.eventBus.dispatchEvent({
          type: MediaPlayer.dependencies.ProtectionController.events.KEY_SESSION_CREATED,
          data: null,
          error: "Selected key system is " + this.keySystem.systemString + ".  needkey/encrypted event contains no initData corresponding to that key system!"
        })
      },
      loadKeySession: function(a) {
        this.protectionModel.loadKeySession(a)
      },
      removeKeySession: function(a) {
        this.protectionModel.removeKeySession(a)
      },
      closeKeySession: function(a) {
        this.protectionModel.closeKeySession(a)
      },
      setServerCertificate: function(a) {
        this.protectionModel.setServerCertificate(a)
      },
      setMediaElement: function(a) {
        a ? (this.protectionModel.setMediaElement(a), this.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_NEED_KEY, this)) : null === a && (this.protectionModel.setMediaElement(a), this.protectionModel.unsubscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_NEED_KEY, this))
      },
      setSessionType: function(a) {
        this.sessionType = a
      },
      setProtectionData: function(a) {
        c = a
      }
    }
  }, MediaPlayer.dependencies.ProtectionController.events = {
    KEY_SYSTEM_SELECTED: "keySystemSelected",
    SERVER_CERTIFICATE_UPDATED: "serverCertificateUpdated",
    KEY_ADDED: "keyAdded",
    KEY_SESSION_CREATED: "keySessionCreated",
    KEY_SESSION_REMOVED: "keySessionRemoved",
    KEY_SESSION_CLOSED: "keySessionClosed",
    KEY_STATUSES_CHANGED: "keyStatusesChanged",
    KEY_MESSAGE: "keyMessage",
    LICENSE_REQUEST_COMPLETE: "licenseRequestComplete"
  }, MediaPlayer.dependencies.ProtectionController.prototype = {
    constructor: MediaPlayer.dependencies.ProtectionController
  }, MediaPlayer.dependencies.ScheduleController = function() {
    "use strict";
    var a, b, c, d, e, f = 0,
      g = !0,
      h = null,
      i = !1,
      j = null,
      k = null,
      l = !0,
      m = function(a, b) {
        var c = 0,
          d = null;
        l === !1 && (d = k.start, c = a.getTime() - d.getTime(), k.duration = c, k.stopreason = b, l = !0)
      },
      n = function() {
        b && (i = !1, g && (g = !1), this.log("start"), w.call(this))
      },
      o = function() {
        g && (r.call(this, e.quality), K.call(this, MediaPlayer.vo.metrics.PlayList.INITIAL_PLAY_START_REASON)), n.call(this)
      },
      p = function(a) {
        i || (i = !0, this.log("stop"), a && c.cancelPendingRequests(), m(new Date, MediaPlayer.vo.metrics.PlayList.Trace.USER_REQUEST_STOP_REASON))
      },
      q = function(a) {
        var b = this,
          c = b.scheduleRulesCollection.getRules(MediaPlayer.rules.ScheduleRulesCollection.prototype.NEXT_FRAGMENT_RULES);
        b.rulesController.applyRules(c, b.streamProcessor, a, null, function(a, b) {
          return b
        })
      },
      r = function(a) {
        var b, d = this;
        return b = d.adapter.getInitRequest(d.streamProcessor, a), null !== b && d.fragmentController.prepareFragmentForLoading(c, b), b
      },
      s = function(a) {
        var b = this,
          c = b.scheduleRulesCollection.getRules(MediaPlayer.rules.ScheduleRulesCollection.prototype.FRAGMENTS_TO_SCHEDULE_RULES);
        b.rulesController.applyRules(c, b.streamProcessor, a, f, function(a, b) {
          return a = a === MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE ? 0 : a, Math.max(a, b)
        })
      },
      t = function(a) {
        var b, d, f, g = a.length,
          h = .1;
        for (f = 0; g > f; f += 1) b = a[f], d = b.startTime + b.duration / 2 + h, b = this.adapter.getFragmentRequestForTime(this.streamProcessor, e, d, {
          timeThreshold: 0,
          ignoreIsFinished: !0
        }), this.fragmentController.prepareFragmentForLoading(c, b)
      },
      u = function(a) {
        var b = this;
        return f = a.value, 0 >= f ? void b.fragmentController.executePendingRequests() : void q.call(b, v.bind(b))
      },
      v = function(a) {
        var b = a.value;
        null === b || b instanceof MediaPlayer.vo.FragmentRequest || (b = this.adapter.getFragmentRequestForTime(this.streamProcessor, e, b.startTime)), b ? (f--, this.fragmentController.prepareFragmentForLoading(c, b)) : this.fragmentController.executePendingRequests()
      },
      w = function() {
        var a = (new Date).getTime(),
          b = h ? a - h > c.getLoadingTime() : !0;
        this.abrController.getPlaybackQuality(this.streamProcessor), !b || i || this.playbackController.isPaused() && this.playbackController.getPlayedRanges().length > 0 && (!this.scheduleWhilePaused || d) || (h = a, s.call(this, u.bind(this)))
      },
      x = function(a) {
        a.error || (e = this.adapter.convertDataToTrack(this.manifestModel.getValue(), a.data.currentRepresentation))
      },
      y = function(a) {
        a.error || (e = this.streamProcessor.getCurrentRepresentationInfo(), d && null === this.liveEdgeFinder.getLiveEdge() || (b = !0), b && o.call(this))
      },
      z = function(a) {
        a.data.fragmentModel === this.streamProcessor.getFragmentModel() && (this.log("Stream is complete"), m(new Date, MediaPlayer.vo.metrics.PlayList.Trace.END_OF_CONTENT_STOP_REASON))
      },
      A = function(a) {
        var b = this;
        a.data.fragmentModel === b.streamProcessor.getFragmentModel() && w.call(b)
      },
      B = function(a) {
        a.error && p.call(this)
      },
      C = function() {
        L.call(this)
      },
      D = function() {
        p.call(this, !1)
      },
      E = function(a) {
        r.call(this, a.data.requiredQuality)
      },
      F = function(a) {
        c.removeExecutedRequestsBeforeTime(a.data.to), a.data.hasEnoughSpaceToAppend && n.call(this)
      },
      G = function(a) {
        var b = this;
        a.data.hasSufficientBuffer || b.playbackController.isSeeking() || (b.log("Stalling Buffer"), m(new Date, MediaPlayer.vo.metrics.PlayList.Trace.REBUFFERING_REASON))
      },
      H = function() {
        w.call(this)
      },
      I = function() {
        p.call(this, !1)
      },
      J = function(b) {
        if (a === b.data.mediaType && this.streamProcessor.getStreamInfo().id === b.data.streamInfo.id) {
          var d, f = this;
          if (d = c.cancelPendingRequests(b.data.oldQuality), e = f.streamProcessor.getRepresentationInfoForQuality(b.data.newQuality), null === e || void 0 === e) throw "Unexpected error!";
          t.call(f, d), m(new Date, MediaPlayer.vo.metrics.PlayList.Trace.REPRESENTATION_SWITCH_STOP_REASON)
        }
      },
      K = function(b) {
        var c = new Date,
          d = this.playbackController.getTime();
        m(c, MediaPlayer.vo.metrics.PlayList.Trace.USER_REQUEST_STOP_REASON), j = this.metricsModel.addPlayList(a, c, d, b)
      },
      L = function() {
        var a = this,
          b = a.playbackController.getTime(),
          c = a.playbackController.getPlaybackRate(),
          d = new Date;
        l === !0 && e && j && (l = !1, k = a.metricsModel.appendPlayListTrace(j, e.id, null, d, b, null, c, null))
      },
      M = function(a) {
        var b = this,
          d = r.call(b, a.data.CCIndex);
        c.executeRequest(d)
      },
      N = function() {
        n.call(this)
      },
      O = function(a) {
        g || c.cancelPendingRequests();
        var b = this.metricsModel.getMetricsFor("stream"),
          d = this.metricsExt.getCurrentManifestUpdate(b);
        this.log("seek: " + a.data.seekTime), K.call(this, MediaPlayer.vo.metrics.PlayList.SEEK_START_REASON), this.metricsModel.updateManifestUpdateInfo(d, {
          latency: e.DVRWindow.end - this.playbackController.getTime()
        })
      },
      P = function() {
        L.call(this)
      },
      Q = function() {
        w.call(this)
      },
      R = function(a) {
        if (!a.error) {
          var c, d, f = this,
            g = a.data.liveEdge,
            h = e.mediaInfo.streamInfo.manifestInfo,
            i = g - Math.min(f.playbackController.getLiveDelay(e.fragmentDuration), h.DVRWindowSize / 2),
            j = f.metricsModel.getMetricsFor("stream"),
            k = f.metricsExt.getCurrentManifestUpdate(j),
            l = f.playbackController.getLiveStartTime();
          c = f.adapter.getFragmentRequestForTime(f.streamProcessor, e, i, {
            ignoreIsFinished: !0
          }), d = c.startTime, (isNaN(l) || d > l) && f.playbackController.setLiveStartTime(d), f.metricsModel.updateManifestUpdateInfo(k, {
            currentTime: d,
            presentationStartTime: g,
            latency: g - d,
            clientTimeOffset: f.timelineConverter.getClientTimeOffset()
          }), b = !0
        }
      };
    return {
      log: void 0,
      system: void 0,
      metricsModel: void 0,
      manifestModel: void 0,
      metricsExt: void 0,
      scheduleWhilePaused: void 0,
      timelineConverter: void 0,
      abrController: void 0,
      playbackController: void 0,
      adapter: void 0,
      scheduleRulesCollection: void 0,
      rulesController: void 0,
      numOfParallelRequestAllowed: void 0,
      setup: function() {
        this[MediaPlayer.dependencies.LiveEdgeFinder.eventList.ENAME_LIVE_EDGE_SEARCH_COMPLETED] = R, this[MediaPlayer.dependencies.AbrController.eventList.ENAME_QUALITY_CHANGED] = J, this[Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_STARTED] = D, this[Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED] = x, this[MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED] = y, this[MediaPlayer.dependencies.FragmentController.eventList.ENAME_MEDIA_FRAGMENT_LOADING_START] = A, this[MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_COMPLETED] = B, this[MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED] = z, this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_CLEARED] = F, this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_APPENDED] = C, this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_STATE_CHANGED] = G, this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_UPDATED] = H, this[MediaPlayer.dependencies.BufferController.eventList.ENAME_INIT_REQUESTED] = E, this[MediaPlayer.dependencies.BufferController.eventList.ENAME_QUOTA_EXCEEDED] = I, this[MediaPlayer.dependencies.TextController.eventList.ENAME_CLOSED_CAPTIONING_REQUESTED] = M, this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_STARTED] = N, this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING] = O, this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_RATE_CHANGED] = P, this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_WALLCLOCK_TIME_UPDATED] = Q
      },
      initialize: function(b, e) {
        var f = this;
        a = b, f.setMediaType(a), f.streamProcessor = e, f.fragmentController = e.fragmentController, f.liveEdgeFinder = e.liveEdgeFinder, f.bufferController = e.bufferController, d = e.isDynamic(), c = this.fragmentController.getModel(this), MediaPlayer.dependencies.ScheduleController.LOADING_REQUEST_THRESHOLD = f.numOfParallelRequestAllowed, f.scheduleRulesCollection.bufferLevelRule && f.scheduleRulesCollection.bufferLevelRule.setScheduleController(f), f.scheduleRulesCollection.pendingRequestsRule && f.scheduleRulesCollection.pendingRequestsRule.setScheduleController(f), f.scheduleRulesCollection.playbackTimeRule && f.scheduleRulesCollection.playbackTimeRule.setScheduleController(f)
      },
      getFragmentModel: function() {
        return c
      },
      getFragmentToLoadCount: function() {
        return f
      },
      replaceCanceledRequests: t,
      reset: function() {
        var a = this;
        p.call(a, !0), a.bufferController.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_OUTRUN, a.scheduleRulesCollection.bufferLevelRule), a.bufferController.unsubscribe(MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED, a.scheduleRulesCollection.bufferLevelRule), c.abortRequests(), a.fragmentController.detachModel(c), f = 0
      },
      start: n,
      stop: p
    }
  }, MediaPlayer.dependencies.ScheduleController.prototype = {
    constructor: MediaPlayer.dependencies.ScheduleController
  }, MediaPlayer.dependencies.ScheduleController.LOADING_REQUEST_THRESHOLD = 0, MediaPlayer.dependencies.StreamController = function() {
    "use strict";
    var a, b, c, d, e, f, g = [],
      h = !1,
      i = .2,
      j = !0,
      k = !1,
      l = !1,
      m = !1,
      n = !1,
      o = function(a) {
        var b = this.system.getObject("mediaController");
        b.subscribe(MediaPlayer.dependencies.MediaController.eventList.CURRENT_TRACK_CHANGED, a), a.subscribe(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED, this.liveEdgeFinder), a.subscribe(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_BUFFERING_COMPLETED, this)
      },
      p = function(a) {
        a.unsubscribe(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED, this.liveEdgeFinder), a.unsubscribe(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_BUFFERING_COMPLETED, this)
      },
      q = function(a, b, c) {
        this.eventBus.dispatchEvent({
          type: a,
          data: {
            fromStreamInfo: b ? b.getStreamInfo() : null,
            toStreamInfo: c.getStreamInfo()
          }
        })
      },
      r = function() {
        a.isActivated() && k && 0 === a.getStreamInfo().index && (a.startEventController(), j && this.playbackController.start())
      },
      s = function() {
        k = !0, r.call(this)
      },
      t = function(a) {
        var b = a.data.error ? a.data.error.code : 0,
          c = "";
        if (-1 !== b) {
          switch (b) {
            case 1:
              c = "MEDIA_ERR_ABORTED";
              break;
            case 2:
              c = "MEDIA_ERR_NETWORK";
              break;
            case 3:
              c = "MEDIA_ERR_DECODE";
              break;
            case 4:
              c = "MEDIA_ERR_SRC_NOT_SUPPORTED";
              break;
            case 5:
              c = "MEDIA_ERR_ENCRYPTED";
              break;
            default:
              c = "UNKNOWN"
          }
          n = !0, this.log("Video Element Error: " + c), a.error && this.log(a.error), this.errHandler.mediaSourceError(c), this.reset()
        }
      },
      u = function(a) {
        var b = this,
          c = b.videoExt.getPlaybackQuality(b.videoModel.getElement());
        c && b.metricsModel.addDroppedFrames("video", c), b.playbackController.isSeeking() || a.data.timeToEnd < i && this.mediaSourceExt.signalEndOfStream(d)
      },
      v = function() {
        A.call(this, a, y())
      },
      w = function(b) {
        var c = z(b.data.seekTime);
        c && c !== a && A.call(this, a, c, b.data.seekTime)
      },
      x = function(a) {
        var b = y(),
          c = a.data.streamInfo.isLast;
        d && c && this.mediaSourceExt.signalEndOfStream(d), b && b.activate(d)
      },
      y = function() {
        var b = a.getStreamInfo().start,
          c = a.getStreamInfo().duration;
        return g.filter(function(a) {
          return a.getStreamInfo().start === b + c
        })[0]
      },
      z = function(a) {
        var b = 0,
          c = null,
          d = g.length;
        d > 0 && (b += g[0].getStartTime());
        for (var e = 0; d > e; e++)
          if (c = g[e], b += c.getDuration(), b > a) return c;
        return null
      },
      A = function(b, c, d) {
        if (!l && b && c && b !== c) {
          q.call(this, MediaPlayer.events.STREAM_SWITCH_STARTED, b, c), l = !0;
          var e = this,
            f = function() {
              void 0 !== d && e.playbackController.seek(d), e.playbackController.start(), a.startEventController(), l = !1, q.call(e, MediaPlayer.events.STREAM_SWITCH_COMPLETED, b, c)
            };
          setTimeout(function() {
            p.call(e, b), b.deactivate(), a = c, o.call(e, c), e.playbackController.initialize(a.getStreamInfo()), B.call(e, f)
          }, 0)
        }
      },
      B = function(b) {
        var c, e = this,
          f = function(g) {
            e.log("MediaSource is open!"), e.log(g), window.URL.revokeObjectURL(c), d.removeEventListener("sourceopen", f), d.removeEventListener("webkitsourceopen", f), C.call(e), a.activate(d), b && b()
          };
        d ? e.mediaSourceExt.detachMediaSource(e.videoModel) : d = e.mediaSourceExt.createMediaSource(), d.addEventListener("sourceopen", f, !1), d.addEventListener("webkitsourceopen", f, !1), c = e.mediaSourceExt.attachMediaSource(d, e.videoModel);
      },
      C = function() {
        var b, c, e = this;
        b = a.getStreamInfo().manifestInfo.duration, c = e.mediaSourceExt.setDuration(d, b), e.log("Duration successfully set to: " + c)
      },
      D = function() {
        var e, f, i, j, k, l, n, p = this,
          r = p.manifestModel.getValue(),
          s = p.metricsModel.getMetricsFor("stream"),
          t = p.metricsExt.getCurrentManifestUpdate(s),
          u = [];
        if (r) {
          l = p.adapter.getStreamsInfo(r), this.capabilities.supportsEncryptedMedia() && (b || (b = this.system.getObject("protectionController"), this.eventBus.dispatchEvent({
            type: MediaPlayer.events.PROTECTION_CREATED,
            data: {
              controller: b,
              manifest: r
            }
          }), h = !0), b.setMediaElement(this.videoModel.getElement()), c && b.setProtectionData(c));
          try {
            if (0 === l.length) throw new Error("There are no streams");
            for (p.metricsModel.updateManifestUpdateInfo(t, {
                currentTime: p.videoModel.getCurrentTime(),
                buffered: p.videoModel.getElement().buffered,
                presentationStartTime: l[0].start,
                clientTimeOffset: p.timelineConverter.getClientTimeOffset()
              }), m = !0, j = 0, f = l.length; f > j; j += 1) {
              for (e = l[j], k = 0, i = g.length; i > k; k += 1) g[k].getId() === e.id && (n = g[k], u.push(n), n.updateData(e));
              n || (n = p.system.getObject("stream"), n.initialize(e, b, c), n.subscribe(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED, p), u.push(n), a && n.updateData(e)), p.metricsModel.addManifestUpdateStreamInfo(t, e.id, e.index, e.start, e.duration), n = null
            }
            g = u, a || (a = g[0], q.call(p, MediaPlayer.events.STREAM_SWITCH_STARTED, null, a), p.playbackController.initialize(a.getStreamInfo()), o.call(p, a), q.call(p, MediaPlayer.events.STREAM_SWITCH_COMPLETED, null, a)), d || B.call(this), m = !1, E.call(p)
          } catch (v) {
            p.errHandler.manifestError(v.message, "nostreamscomposed", r), p.reset()
          }
        }
      },
      E = function() {
        if (!m) {
          var a = this,
            b = g.length,
            c = 0;
          for (r.call(this), c; b > c; c += 1)
            if (!g[c].isInitialized()) return;
          a.notify(MediaPlayer.dependencies.StreamController.eventList.ENAME_STREAMS_COMPOSED)
        }
      },
      F = function() {
        E.call(this)
      },
      G = function() {
        D.call(this)
      },
      H = function(a) {
        var b = this;
        if (a.error) b.reset();
        else {
          var c, d, g = a.data.manifest,
            h = b.adapter.getStreamsInfo(g)[0],
            i = b.adapter.getMediaInfoForType(g, h, "video") || b.adapter.getMediaInfoForType(g, h, "audio");
          i && (c = b.adapter.getDataForMedia(i), d = b.manifestExt.getRepresentationsForAdaptation(g, c)[0].useCalculatedLiveEdgeTime, d && (b.log("SegmentTimeline detected using calculated Live Edge Time"), f = !1));
          var j = b.manifestExt.getUTCTimingSources(a.data.manifest),
            k = !b.manifestExt.getIsDynamic(g) || d ? j : j.concat(e),
            l = b.uriQueryFragModel.isManifestHTTPS();
          k.forEach(function(a) {
            a.value.replace(/.*?:\/\//g, "") === MediaPlayer.UTCTimingSources["default"].value.replace(/.*?:\/\//g, "") && (a.value = a.value.replace(l ? new RegExp(/^(http:)?\/\//i) : new RegExp(/^(https:)?\/\//i), l ? "https://" : "http://"), b.log("Matching default timing source protocol to manifest protocol: ", a.value))
          }), b.timeSyncController.initialize(k, f)
        }
      };
    return {
      system: void 0,
      capabilities: void 0,
      videoModel: void 0,
      manifestUpdater: void 0,
      manifestLoader: void 0,
      manifestModel: void 0,
      manifestExt: void 0,
      adapter: void 0,
      playbackController: void 0,
      log: void 0,
      metricsModel: void 0,
      metricsExt: void 0,
      videoExt: void 0,
      liveEdgeFinder: void 0,
      mediaSourceExt: void 0,
      timelineConverter: void 0,
      protectionExt: void 0,
      timeSyncController: void 0,
      virtualBuffer: void 0,
      errHandler: void 0,
      eventBus: void 0,
      notify: void 0,
      subscribe: void 0,
      unsubscribe: void 0,
      uriQueryFragModel: void 0,
      setup: function() {
        this[MediaPlayer.dependencies.ManifestUpdater.eventList.ENAME_MANIFEST_UPDATED] = H, this[MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED] = F, this[MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_BUFFERING_COMPLETED] = x, this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING] = w, this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_TIME_UPDATED] = u, this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_ENDED] = v, this[MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED] = G, this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_CAN_PLAY] = s, this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_ERROR] = t
      },
      getAutoPlay: function() {
        return j
      },
      getActiveStreamInfo: function() {
        return a ? a.getStreamInfo() : null
      },
      isStreamActive: function(b) {
        return a.getId() === b.id
      },
      setUTCTimingSources: function(a, b) {
        e = a, f = b
      },
      getStreamById: function(a) {
        return g.filter(function(b) {
          return b.getId() === a
        })[0]
      },
      initialize: function(a, d, e) {
        j = a, b = d, c = e, this.timeSyncController.subscribe(MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED, this.timelineConverter), this.timeSyncController.subscribe(MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED, this.liveEdgeFinder), this.timeSyncController.subscribe(MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED, this), this.playbackController.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_STARTED, this.manifestUpdater), this.playbackController.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PAUSED, this.manifestUpdater), this.playbackController.subscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_ENDED, this), this.subscribe(MediaPlayer.dependencies.StreamController.eventList.ENAME_STREAMS_COMPOSED, this.manifestUpdater), this.manifestUpdater.subscribe(MediaPlayer.dependencies.ManifestUpdater.eventList.ENAME_MANIFEST_UPDATED, this), this.manifestUpdater.initialize(this.manifestLoader)
      },
      load: function(a) {
        this.manifestLoader.load(a)
      },
      loadWithManifest: function(a) {
        a[0].indexOf("http") > -1 ? this.manifestLoader.load(a) : this.manifestUpdater.setManifest(a) //DIFF5: load (parse?) a into the manifest if a[0] contains "http", otherwise set a as the new manifest.
      },
      reset: function() {
        a && p.call(this, a);
        var e, f = this.system.getObject("mediaController");
        this.timeSyncController.unsubscribe(MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED, this.timelineConverter), this.timeSyncController.unsubscribe(MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED, this.liveEdgeFinder), this.timeSyncController.unsubscribe(MediaPlayer.dependencies.TimeSyncController.eventList.ENAME_TIME_SYNCHRONIZATION_COMPLETED, this), this.timeSyncController.reset();
        for (var i = 0, j = g.length; j > i; i++) e = g[i], e.unsubscribe(MediaPlayer.dependencies.Stream.eventList.ENAME_STREAM_UPDATED, this), f.unsubscribe(MediaPlayer.dependencies.MediaController.eventList.CURRENT_TRACK_CHANGED, e), e.reset(n);
        g = [], this.unsubscribe(MediaPlayer.dependencies.StreamController.eventList.ENAME_STREAMS_COMPOSED, this.manifestUpdater), this.playbackController.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_STARTED, this.manifestUpdater), this.playbackController.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_PAUSED, this.manifestUpdater), this.playbackController.unsubscribe(MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_ENDED, this), this.manifestUpdater.unsubscribe(MediaPlayer.dependencies.ManifestUpdater.eventList.ENAME_MANIFEST_UPDATED, this), this.manifestUpdater.reset(), this.metricsModel.clearAllCurrentMetrics();
        var o = this.manifestModel.getValue() ? this.manifestModel.getValue().url : null;
        if (this.manifestModel.setValue(null), this.timelineConverter.reset(), this.liveEdgeFinder.reset(), this.adapter.reset(), this.virtualBuffer.reset(), l = !1, m = !1, a = null, k = !1, n = !1, d && (this.mediaSourceExt.detachMediaSource(this.videoModel), d = null), b)
          if (h) {
            var q = {},
              r = this;
            q[MediaPlayer.models.ProtectionModel.eventList.ENAME_TEARDOWN_COMPLETE] = function() {
              h = !1, b = null, c = null, o && r.eventBus.dispatchEvent({
                type: MediaPlayer.events.PROTECTION_DESTROYED,
                data: o
              }), r.notify(MediaPlayer.dependencies.StreamController.eventList.ENAME_TEARDOWN_COMPLETE)
            }, b.protectionModel.subscribe(MediaPlayer.models.ProtectionModel.eventList.ENAME_TEARDOWN_COMPLETE, q, void 0, !0), b.teardown()
          } else b.setMediaElement(null), b = null, c = null, this.notify(MediaPlayer.dependencies.StreamController.eventList.ENAME_TEARDOWN_COMPLETE);
        else this.notify(MediaPlayer.dependencies.StreamController.eventList.ENAME_TEARDOWN_COMPLETE)
      }
    }
  }, MediaPlayer.dependencies.StreamController.prototype = {
    constructor: MediaPlayer.dependencies.StreamController
  }, MediaPlayer.dependencies.StreamController.eventList = {
    ENAME_STREAMS_COMPOSED: "streamsComposed",
    ENAME_TEARDOWN_COMPLETE: "streamTeardownComplete"
  }, MediaPlayer.dependencies.TextController = function() {
    var a = !1,
      b = null,
      c = null,
      d = null,
      e = function() {
        this.notify(MediaPlayer.dependencies.TextController.eventList.ENAME_CLOSED_CAPTIONING_REQUESTED, {
          CCIndex: 0
        })
      },
      f = function(a) {
        var b = this;
        a.data.fragmentModel === b.streamProcessor.getFragmentModel() && a.data.chunk.bytes && b.sourceBufferExt.append(c, a.data.chunk)
      };
    return {
      sourceBufferExt: void 0,
      log: void 0,
      system: void 0,
      errHandler: void 0,
      videoModel: void 0,
      notify: void 0,
      subscribe: void 0,
      unsubscribe: void 0,
      setup: function() {
        this[Dash.dependencies.RepresentationController.eventList.ENAME_DATA_UPDATE_COMPLETED] = e, this[MediaPlayer.dependencies.FragmentController.eventList.ENAME_INIT_FRAGMENT_LOADED] = f
      },
      initialize: function(a, b, c) {
        var e = this;
        d = a, e.setMediaSource(b), e.representationController = c.representationController, e.streamProcessor = c
      },
      createBuffer: function(e) {
        try {
          c = this.sourceBufferExt.createSourceBuffer(b, e), a || (c.hasOwnProperty("initialize") && c.initialize(d, this), a = !0)
        } catch (f) {
          this.errHandler.mediaSourceError("Error creating " + d + " source buffer.")
        }
        return c
      },
      getBuffer: function() {
        return c
      },
      setBuffer: function(a) {
        c = a
      },
      setMediaSource: function(a) {
        b = a
      },
      reset: function(a) {
        a || (this.sourceBufferExt.abort(b, c), this.sourceBufferExt.removeSourceBuffer(b, c))
      }
    }
  }, MediaPlayer.dependencies.TextController.prototype = {
    constructor: MediaPlayer.dependencies.TextController
  }, MediaPlayer.dependencies.TextController.eventList = {
    ENAME_CLOSED_CAPTIONING_REQUESTED: "closedCaptioningRequested"
  }, MediaPlayer.dependencies.XlinkController = function() {
    "use strict";
    var a, b, c, d, e = "onLoad",
      f = "onActuate",
      g = "Period",
      h = "AdaptationSet",
      i = "EventStream",
      j = "urn:mpeg:dash:resolve-to-zero:2013",
      k = function(b) {
        var f, h = this;
        d = new X2JS(a, "", !0), c = b, f = o(c.Period_asArray, c, g, e), l.call(h, f, g, e)
      },
      l = function(a, b, c) {
        var d, e, f, g = this,
          h = {};
        for (h.elements = a, h.type = b, h.resolveType = c, 0 === h.elements.length && n.call(g, h), f = 0; f < h.elements.length; f += 1) d = h.elements[f], e = -1 !== d.url.indexOf("http://") ? d.url : d.originalContent.BaseURL + d.url, g.xlinkLoader.load(e, d, h)
      },
      m = function(a) {
        var b, c, e, f = "<response>",
          g = "</response>",
          h = "";
        b = a.data.element, c = a.data.resolveObject, b.resolvedContent && (e = b.resolvedContent.indexOf(">") + 1, h = b.resolvedContent.substr(0, e) + f + b.resolvedContent.substr(e) + g, b.resolvedContent = d.xml_str2json(h)), r.call(this, c) && n.call(this, c)
      },
      n = function(a) {
        var b, d, j = [];
        if (p.call(this, a), a.resolveType === f && this.notify(MediaPlayer.dependencies.XlinkController.eventList.ENAME_XLINK_READY, {
            manifest: c
          }), a.resolveType === e) switch (a.type) {
          case g:
            for (b = 0; b < c[g + "_asArray"].length; b++) d = c[g + "_asArray"][b], d.hasOwnProperty(h + "_asArray") && (j = j.concat(o.call(this, d[h + "_asArray"], d, h, e))), d.hasOwnProperty(i + "_asArray") && (j = j.concat(o.call(this, d[i + "_asArray"], d, i, e)));
            l.call(this, j, h, e);
            break;
          case h:
            this.notify(MediaPlayer.dependencies.XlinkController.eventList.ENAME_XLINK_READY, {
              manifest: c
            })
        }
      },
      o = function(a, b, c, d) {
        var e, f, g, h = [];
        for (f = a.length - 1; f >= 0; f -= 1) e = a[f], e.hasOwnProperty("xlink:href") && e["xlink:href"] === j && a.splice(f, 1);
        for (f = 0; f < a.length; f++) e = a[f], e.hasOwnProperty("xlink:href") && e.hasOwnProperty("xlink:actuate") && e["xlink:actuate"] === d && (g = q(e["xlink:href"], b, c, f, d, e), h.push(g));
        return h
      },
      p = function(a) {
        var d, e, f, g, h, i, j = [];
        for (g = a.elements.length - 1; g >= 0; g--) {
          if (d = a.elements[g], e = d.type + "_asArray", !d.resolvedContent || s()) delete d.originalContent["xlink:actuate"], delete d.originalContent["xlink:href"], j.push(d.originalContent);
          else if (d.resolvedContent)
            for (h = 0; h < d.resolvedContent[e].length; h++) f = d.resolvedContent[e][h], j.push(f);
          for (d.parentElement[e].splice(d.index, 1), i = 0; i < j.length; i++) d.parentElement[e].splice(d.index + i, 0, j[i]);
          j = []
        }
        a.elements.length > 0 && b.run(c)
      },
      q = function(a, b, c, d, e, f) {
        return {
          url: a,
          parentElement: b,
          type: c,
          index: d,
          resolveType: e,
          originalContent: f,
          resolvedContent: null,
          resolved: !1
        }
      },
      r = function(a) {
        var b, c;
        for (b = 0; b < a.elements.length; b++)
          if (c = a.elements[b], c.resolved === !1) return !1;
        return !0
      },
      s = function() {
        return !1
      };
    return {
      xlinkLoader: void 0,
      notify: void 0,
      subscribe: void 0,
      unsubscribe: void 0,
      setup: function() {
        m = m.bind(this), this.xlinkLoader.subscribe(MediaPlayer.dependencies.XlinkLoader.eventList.ENAME_XLINKELEMENT_LOADED, this, m)
      },
      resolveManifestOnLoad: function(a) {
        k.call(this, a)
      },
      setMatchers: function(b) {
        a = b
      },
      setIron: function(a) {
        b = a
      }
    }
  }, MediaPlayer.dependencies.XlinkController.prototype = {
    constructor: MediaPlayer.dependencies.XlinkController
  }, MediaPlayer.dependencies.XlinkController.eventList = {
    ENAME_XLINK_ALLELEMENTSLOADED: "xlinkAllElementsLoaded",
    ENAME_XLINK_READY: "xlinkReady"
  }, MediaPlayer.dependencies.MediaSourceExtensions = function() {
    "use strict"
  }, MediaPlayer.dependencies.MediaSourceExtensions.prototype = {
    constructor: MediaPlayer.dependencies.MediaSourceExtensions,
    createMediaSource: function() {
      "use strict";
      var a = "WebKitMediaSource" in window,
        b = "MediaSource" in window;
      return b ? new MediaSource : a ? new WebKitMediaSource : null
    },
    attachMediaSource: function(a, b) {
      "use strict";
      var c = window.URL.createObjectURL(a);
      return b.setSource(c), c
    },
    detachMediaSource: function(a) {
      "use strict";
      a.setSource("")
    },
    setDuration: function(a, b) {
      "use strict";
      return a.duration != b && (a.duration = b), a.duration
    },
    signalEndOfStream: function(a) {
      "use strict";
      var b = a.sourceBuffers,
        c = b.length,
        d = 0;
      if ("open" === a.readyState) {
        for (d; c > d; d += 1)
          if (b[d].updating) return;
        a.endOfStream()
      }
    }
  }, MediaPlayer.dependencies.ProtectionExtensions = function() {
    "use strict";
    this.system = void 0, this.log = void 0, this.keySystems = [], this.notify = void 0, this.subscribe = void 0, this.unsubscribe = void 0, this.clearkeyKeySystem = void 0
  }, MediaPlayer.dependencies.ProtectionExtensions.prototype = {
    constructor: MediaPlayer.dependencies.ProtectionExtensions,
    setup: function() {
      var a;
      a = this.system.getObject("ksPlayReady"), this.keySystems.push(a), a = this.system.getObject("ksWidevine"), this.keySystems.push(a), a = this.system.getObject("ksClearKey"), this.keySystems.push(a), this.clearkeyKeySystem = a
    },
    getKeySystems: function() {
      return this.keySystems
    },
    getKeySystemBySystemString: function(a) {
      for (var b = 0; b < this.keySystems.length; b++)
        if (this.keySystems[b].systemString === a) return this.keySystems[b];
      return null
    },
    isClearKey: function(a) {
      return a === this.clearkeyKeySystem
    },
    initDataEquals: function(a, b) {
      if (a.byteLength === b.byteLength) {
        for (var c = new Uint8Array(a), d = new Uint8Array(b), e = 0; e < c.length; e++)
          if (c[e] !== d[e]) return !1;
        return !0
      }
      return !1
    },
    getSupportedKeySystemsFromContentProtection: function(a) {
      var b, c, d, e, f = [];
      if (a)
        for (d = 0; d < this.keySystems.length; ++d)
          for (c = this.keySystems[d], e = 0; e < a.length; ++e)
            if (b = a[e], b.schemeIdUri.toLowerCase() === c.schemeIdURI) {
              var g = c.getInitData(b);
              g && f.push({
                ks: this.keySystems[d],
                initData: g
              })
            } return f
    },
    getSupportedKeySystems: function(a) {
      var b, c = [],
        d = MediaPlayer.dependencies.protection.CommonEncryption.parsePSSHList(a);
      for (b = 0; b < this.keySystems.length; ++b) this.keySystems[b].uuid in d && c.push({
        ks: this.keySystems[b],
        initData: d[this.keySystems[b].uuid]
      });
      return c
    },
    getLicenseServer: function(a, b, c) {
      if ("license-release" === c || "individualization-request" == c) return null;
      var d = null;
      return b && b.hasOwnProperty("drmtoday") ? d = this.system.getObject("serverDRMToday") : "com.widevine.alpha" === a.systemString ? d = this.system.getObject("serverWidevine") : "com.microsoft.playready" === a.systemString ? d = this.system.getObject("serverPlayReady") : "org.w3.clearkey" === a.systemString && (d = this.system.getObject("serverClearKey")), d
    },
    processClearKeyLicenseRequest: function(a, b) {
      try {
        return MediaPlayer.dependencies.protection.KeySystem_ClearKey.getClearKeysFromProtectionData(a, b)
      } catch (c) {
        return this.log("Failed to retrieve clearkeys from ProtectionData"), null
      }
    }
  }, MediaPlayer.dependencies.RequestModifierExtensions = function() {
    "use strict";
    return {
      modifyRequestURL: function(a) {
        return a
      },
      modifyRequestHeader: function(a) {
        return a
      }
    }
  }, MediaPlayer.dependencies.SourceBufferExtensions = function() {
    "use strict";
    this.system = void 0, this.notify = void 0, this.subscribe = void 0, this.unsubscribe = void 0, this.manifestExt = void 0
  }, MediaPlayer.dependencies.SourceBufferExtensions.prototype = {
    constructor: MediaPlayer.dependencies.SourceBufferExtensions,
    createSourceBuffer: function(a, b) {
      "use strict";
      var c = this,
        d = b.codec,
        e = null;
      try {
        if (d.match(/application\/mp4;\s*codecs="stpp"/i)) throw new Error("not really supported");
        e = a.addSourceBuffer(d)
      } catch (f) {
        if (!b.isText && -1 === d.indexOf('codecs="stpp"')) throw f;
        e = c.system.getObject("textSourceBuffer")
      }
      return e
    },
    removeSourceBuffer: function(a, b) {
      "use strict";
      try {
        a.removeSourceBuffer(b)
      } catch (c) {}
    },
    getBufferRange: function(a, b, c) {
      "use strict";
      var d, e, f = null,
        g = 0,
        h = 0,
        i = null,
        j = null,
        k = 0,
        l = c || .15;
      try {
        f = a.buffered
      } catch (m) {
        return null
      }
      if (null !== f && void 0 !== f) {
        for (e = 0, d = f.length; d > e; e += 1)
          if (g = f.start(e), h = f.end(e), null === i) k = Math.abs(g - b), b >= g && h > b ? (i = g, j = h) : l >= k && (i = g, j = h);
          else {
            if (k = g - j, !(l >= k)) break;
            j = h
          } if (null !== i) return {
          start: i,
          end: j
        }
      }
      return null
    },
    getAllRanges: function(a) {
      var b = null;
      try {
        return b = a.buffered
      } catch (c) {
        return null
      }
    },
    getTotalBufferedTime: function(a) {
      var b, c, d = this.getAllRanges(a),
        e = 0;
      if (!d) return e;
      for (c = 0, b = d.length; b > c; c += 1) e += d.end(c) - d.start(c);
      return e
    },
    getBufferLength: function(a, b, c) {
      "use strict";
      var d, e, f = this;
      return d = f.getBufferRange(a, b, c), e = null === d ? 0 : d.end - b
    },
    getRangeDifference: function(a, b) {
      if (!b) return null;
      var c, d, e, f, g, h, i, j, k, l = this.getAllRanges(b);
      if (!l) return null;
      for (var m = 0, n = l.length; n > m; m += 1) {
        if (j = a.length > m, g = j ? {
            start: a.start(m),
            end: a.end(m)
          } : null, c = l.start(m), d = l.end(m), !g) return k = {
          start: c,
          end: d
        };
        if (e = g.start === c, f = g.end === d, !e || !f) {
          if (e) k = {
            start: g.end,
            end: d
          };
          else {
            if (!f) return k = {
              start: c,
              end: d
            };
            k = {
              start: c,
              end: g.start
            }
          }
          return h = a.length > m + 1 ? {
            start: a.start(m + 1),
            end: a.end(m + 1)
          } : null, i = n > m + 1 ? {
            start: l.start(m + 1),
            end: l.end(m + 1)
          } : null, !h || i && i.start === h.start && i.end === h.end || (k.end = h.start), k
        }
      }
      return null
    },
    waitForUpdateEnd: function(a, b) {
      "use strict";
      var c, d = 50,
        e = function() {
          a.updating || (clearInterval(c), b())
        },
        f = function() {
          a.updating || (a.removeEventListener("updateend", f, !1), b())
        };
      if (!a.updating) return void b();
      if ("function" == typeof a.addEventListener) try {
        a.addEventListener("updateend", f, !1)
      } catch (g) {
        c = setInterval(e, d)
      } else c = setInterval(e, d)
    },
    append: function(a, b) {
      var c = this,
        d = b.bytes,
        e = "append" in a ? "append" : "appendBuffer" in a ? "appendBuffer" : null,
        f = "Object" === Object.prototype.toString.call(a).slice(8, -1);
      if (e) try {
        c.waitForUpdateEnd(a, function() {
          f ? a[e](d, b) : a[e](d), c.waitForUpdateEnd(a, function() {
            c.notify(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_APPEND_COMPLETED, {
              buffer: a,
              bytes: d
            })
          })
        })
      } catch (g) {
        c.notify(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_APPEND_COMPLETED, {
          buffer: a,
          bytes: d
        }, new MediaPlayer.vo.Error(g.code, g.message, null))
      }
    },
    remove: function(a, b, c, d) {
      var e = this;
      try {
        e.waitForUpdateEnd(a, function() {
          b >= 0 && c > b && "ended" !== d.readyState && a.remove(b, c), e.waitForUpdateEnd(a, function() {
            e.notify(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_REMOVE_COMPLETED, {
              buffer: a,
              from: b,
              to: c
            })
          })
        })
      } catch (f) {
        e.notify(MediaPlayer.dependencies.SourceBufferExtensions.eventList.ENAME_SOURCEBUFFER_REMOVE_COMPLETED, {
          buffer: a,
          from: b,
          to: c
        }, new MediaPlayer.vo.Error(f.code, f.message, null))
      }
    },
    abort: function(a, b) {
      "use strict";
      try {
        "open" === a.readyState && b.abort()
      } catch (c) {}
    }
  }, MediaPlayer.dependencies.SourceBufferExtensions.QUOTA_EXCEEDED_ERROR_CODE = 22, MediaPlayer.dependencies.SourceBufferExtensions.eventList = {
    ENAME_SOURCEBUFFER_REMOVE_COMPLETED: "sourceBufferRemoveCompleted",
    ENAME_SOURCEBUFFER_APPEND_COMPLETED: "sourceBufferAppendCompleted"
  }, MediaPlayer.utils.TextTrackExtensions = function() {
    "use strict";
    var a, b, c = [],
      d = [],
      e = -1,
      f = 0,
      g = 0,
      h = 0,
      i = 0,
      j = null,
      k = null,
      l = !1,
      m = !1,
      n = null,
      o = !1,
      p = 2147483647,
      q = function(a) {
        var d = c[a].kind,
          e = void 0 !== c[a].label ? c[a].label : c[a].lang,
          f = c[a].lang,
          g = l ? b.addTextTrack(d, e, f) : document.createElement("track");
        return l || (g.kind = d, g.label = e, g.srclang = f), g
      };
    return {
      mediaController: void 0,
      videoModel: void 0,
      eventBus: void 0,
      setup: function() {
        a = window.VTTCue || window.TextTrackCue, l = !!navigator.userAgent.match(/Trident.*rv[ :]*11\./) || navigator.userAgent.match(/Edge/), m = !!navigator.userAgent.match(/Chrome/) && !navigator.userAgent.match(/Edge/), void 0 !== document.fullscreenElement ? n = "fullscreenElement" : void 0 !== document.webkitIsFullScreen ? n = "webkitIsFullScreen" : document.msFullscreenElement ? n = "msFullscreenElement" : document.mozFullScreen && (n = "mozFullScreen")
      },
      displayCConTop: function(a) {
        o = a, j && !document[n] && (j.style.zIndex = a ? p : null)
      },
      addTextTrack: function(a, f) {
        if (c.push(a), void 0 === b && (b = a.video), c.length === f) {
          c.sort(function(a, b) {
            return a.index - b.index
          }), j = this.videoModel.getTTMLRenderingDiv();
          for (var g = 0, h = 0; h < c.length; h++) {
            var i = q(h);
            e = h, d.push(i), c[h].defaultTrack && (i["default"] = !0, g = h), l || b.appendChild(i);
            var k = b.textTracks[h];
            j && c[h].isTTML ? k.renderingType = "html" : k.renderingType = "default", this.addCaptions(0, c[h].captionData), this.eventBus.dispatchEvent({
              type: MediaPlayer.events.TEXT_TRACK_ADDED
            })
          }
          this.setCurrentTrackIdx(g), this.eventBus.dispatchEvent({
            type: MediaPlayer.events.TEXT_TRACKS_ADDED,
            data: {
              index: e,
              tracks: c
            }
          })
        }
      },
      getVideoVisibleVideoSize: function(a, b, c, d) {
        var e = a / b,
          f = c / d,
          g = 0,
          h = 0,
          i = 0,
          j = 0;
        return e > f ? (j = b, i = j / d * c, g = (a - i) / 2, h = 0) : (i = a, j = i / c * d, g = 0, h = (b - j) / 2), {
          x: g,
          y: h,
          w: i,
          h: j
        }
      },
      checkVideoSize: function() {
        var a = this.getCurrentTextTrack();
        if (a && "html" === a.renderingType) {
          var c = b.clientWidth,
            d = b.clientHeight,
            e = this.getVideoVisibleVideoSize(b.clientWidth, b.clientHeight, b.videoWidth, b.videoHeight);
          if (c = e.w, d = e.h, c != h || d != i) {
            f = e.x, g = e.y, h = c, i = d, j.style.left = f + "px", j.style.top = g + "px", j.style.width = h + "px", j.style.height = i + "px";
            for (var k = 0; k < a.activeCues.length; ++k) {
              var l = a.activeCues[k];
              l.scaleCue(l)
            }
            n && document[n] || o ? j.style.zIndex = p : j.style.zIndex = null
          }
        }
      },
      scaleCue: function(a) {
        var b, c, d, e = h,
          f = i,
          g = [e / a.cellResolution[0], f / a.cellResolution[1]];
        if (a.linePadding)
          for (b in a.linePadding)
            if (a.linePadding.hasOwnProperty(b)) {
              var j = a.linePadding[b];
              c = (j * g[0]).toString();
              for (var k = document.getElementsByClassName("spanPadding"), l = 0; l < k.length; l++) k[l].style.cssText = k[l].style.cssText.replace(/(padding-left\s*:\s*)[\d.,]+(?=\s*px)/gi, "$1" + c), k[l].style.cssText = k[l].style.cssText.replace(/(padding-right\s*:\s*)[\d.,]+(?=\s*px)/gi, "$1" + c)
            } if (a.fontSize)
          for (b in a.fontSize)
            if (a.fontSize.hasOwnProperty(b)) {
              var m = a.fontSize[b] / 100;
              c = (m * g[1]).toString(), d = "defaultFontSize" !== b ? document.getElementsByClassName(b) : document.getElementsByClassName("paragraph");
              for (var n = 0; n < d.length; n++) d[n].style.cssText = d[n].style.cssText.replace(/(font-size\s*:\s*)[\d.,]+(?=\s*px)/gi, "$1" + c)
            } if (a.lineHeight)
          for (b in a.lineHeight)
            if (a.lineHeight.hasOwnProperty(b)) {
              var o = a.lineHeight[b] / 100;
              c = (o * g[1]).toString(), d = document.getElementsByClassName(b);
              for (var p = 0; p < d.length; p++) d[p].style.cssText = d[p].style.cssText.replace(/(line-height\s*:\s*)[\d.,]+(?=\s*px)/gi, "$1" + c)
            }
      },
      addCaptions: function(d, l) {
        var m = this.getCurrentTextTrack();
        if (m) {
          m.mode = "showing";
          for (var n in l) {
            var o, p = l[n];
            k || "html" != p.type || (k = setInterval(this.checkVideoSize.bind(this), 500)), "image" == p.type ? (o = new a(p.start - d, p.end - d, ""), o.image = p.data, o.id = p.id, o.size = 0, o.type = "image", o.onenter = function() {
              var a = new Image;
              a.id = "ttmlImage_" + this.id, a.src = this.image, a.className = "cue-image", j ? j.appendChild(a) : b.parentNode.appendChild(a)
            }, o.onexit = function() {
              var a, c, d;
              for (a = j ? j : b.parentNode, d = a.childNodes, c = 0; c < d.length; c++) d[c].id == "ttmlImage_" + this.id && a.removeChild(d[c])
            }) : "html" === p.type ? (o = new a(p.start - d, p.end - d, ""), o.cueHTMLElement = p.cueHTMLElement, o.regions = p.regions, o.regionID = p.regionID, o.cueID = p.cueID, o.videoWidth = p.videoWidth, o.videoHeight = p.videoHeight, o.cellResolution = p.cellResolution, o.fontSize = p.fontSize, o.lineHeight = p.lineHeight, o.linePadding = p.linePadding, o.scaleCue = this.scaleCue, j.style.left = f + "px", j.style.top = g + "px", j.style.width = h + "px", j.style.height = i + "px", o.onenter = function() {
              "showing" == m.mode && (j.appendChild(this.cueHTMLElement), this.scaleCue(this))
            }, o.onexit = function() {
              for (var a = j.childNodes, b = 0; b < a.length; ++b) a[b].id == "subtitle_" + this.cueID && j.removeChild(a[b])
            }) : (o = new a(p.start - d, p.end - d, p.data), p.styles && (void 0 !== p.styles.align && o.hasOwnProperty("align") && (o.align = p.styles.align), void 0 !== p.styles.line && o.hasOwnProperty("line") && (o.line = p.styles.line), void 0 !== p.styles.position && o.hasOwnProperty("position") && (o.position = p.styles.position), void 0 !== p.styles.size && o.hasOwnProperty("size") && (o.size = p.styles.size))), m.addCue(o)
          }
          c[e].isFragmented || (m.mode = c[e].defaultTrack ? "showing" : "hidden")
        }
      },
      getCurrentTextTrack: function() {
        return e >= 0 ? b.textTracks[e] : null
      },
      getCurrentTrackIdx: function() {
        return e
      },
      setCurrentTrackIdx: function(a) {
        if (e = a, this.clearCues(), a >= 0) {
          var c = b.textTracks[a];
          "html" === c.renderingType ? this.setNativeCueStyle() : this.removeNativeCueStyle()
        } else this.removeNativeCueStyle()
      },
      getTextTrack: function(a) {
        return b.textTracks[a]
      },
      deleteTrackCues: function(a) {
        if (a.cues) {
          for (var b = a.cues, c = b.length - 1, d = c; d >= 0; d--) a.removeCue(b[d]);
          a.mode = "disabled"
        }
      },
      deleteAllTextTracks: function() {
        for (var a = d.length, e = 0; a > e; e++) l ? this.deleteTrackCues(this.getTextTrack(e)) : b.removeChild(d[e]);
        d = [], c = [], k && (clearInterval(k), k = null), this.clearCues()
      },
      deleteTextTrack: function(a) {
        b.removeChild(d[a]), d.splice(a, 1)
      },
      setNativeCueStyle: function() {
        if (m) {
          var a = document.getElementById("native-cue-style");
          if (!a) {
            a = document.createElement("style"), a.id = "native-cue-style", document.head.appendChild(a);
            var c = a.sheet;
            b.id ? c.insertRule("#" + b.id + "::cue {background: transparent}", 0) : 0 !== b.classList.length ? c.insertRule("." + b.className + "::cue {background: transparent}", 0) : c.insertRule("video::cue {background: transparent}", 0)
          }
        }
      },
      removeNativeCueStyle: function() {
        if (m) {
          var a = document.getElementById("native-cue-style");
          a && document.head.removeChild(a)
        }
      },
      clearCues: function() {
        if (j)
          for (; j.firstChild;) j.removeChild(j.firstChild)
      }
    }
  }, MediaPlayer.dependencies.VideoModelExtensions = function() {
    "use strict";
    return {
      getPlaybackQuality: function(a) {
        var b = "webkitDroppedFrameCount" in a,
          c = "getVideoPlaybackQuality" in a,
          d = null;
        return c ? d = a.getVideoPlaybackQuality() : b && (d = {
          droppedVideoFrames: a.webkitDroppedFrameCount,
          creationTime: new Date
        }), d
      }
    }
  }, MediaPlayer.dependencies.VideoModelExtensions.prototype = {
    constructor: MediaPlayer.dependencies.VideoModelExtensions
  }, MediaPlayer.dependencies.FragmentModel = function() {
    "use strict";
    var a = null,
      b = [],
      c = [],
      d = [],
      e = [],
      f = !1,
      g = function(a) {
        var b = this;
        b.notify(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_STARTED, {
          request: a
        }), b.fragmentLoader.load(a)
      },
      h = function(a, b) {
        var c = a.indexOf(b); - 1 !== c && a.splice(c, 1)
      },
      i = function(a, b, c) {
        var d, e = a.length - 1,
          f = NaN,
          g = NaN,
          h = null;
        for (d = e; d >= 0; d -= 1)
          if (h = a[d], f = h.startTime, g = f + h.duration, c = c || h.duration / 2, !isNaN(f) && !isNaN(g) && b + c >= f && g > b - c || isNaN(f) && isNaN(b)) return h;
        return null
      },
      j = function(a, b) {
        return b ? b.hasOwnProperty("time") ? [i.call(this, a, b.time, b.threshold)] : a.filter(function(a) {
          for (var c in b)
            if ("state" !== c && b.hasOwnProperty(c) && a[c] != b[c]) return !1;
          return !0
        }) : a
      },
      k = function(a) {
        var f;
        switch (a) {
          case MediaPlayer.dependencies.FragmentModel.states.PENDING:
            f = c;
            break;
          case MediaPlayer.dependencies.FragmentModel.states.LOADING:
            f = d;
            break;
          case MediaPlayer.dependencies.FragmentModel.states.EXECUTED:
            f = b;
            break;
          case MediaPlayer.dependencies.FragmentModel.states.REJECTED:
            f = e;
            break;
          default:
            f = []
        }
        return f
      },
      l = function(a, f) {
        if (a) {
          var g = a.mediaType,
            h = new Date,
            i = a.type,
            j = a.startTime,
            k = a.availabilityStartTime,
            l = a.duration,
            m = a.quality,
            n = a.range;
          this.metricsModel.addSchedulingInfo(g, h, i, j, k, l, m, n, f), this.metricsModel.addRequestsQueue(g, c, d, b, e)
        }
      },
      m = function(a) {
        var c = a.data.request,
          e = a.data.response,
          f = a.error;
        d.splice(d.indexOf(c), 1), e && !f && b.push(c), l.call(this, c, f ? MediaPlayer.dependencies.FragmentModel.states.FAILED : MediaPlayer.dependencies.FragmentModel.states.EXECUTED), this.notify(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_FRAGMENT_LOADING_COMPLETED, {
          request: c,
          response: e
        }, f)
      },
      n = function(a) {
        var c = this.getRequests({
          state: MediaPlayer.dependencies.FragmentModel.states.EXECUTED,
          quality: a.data.quality,
          time: a.data.start
        })[0];
        c && (h.call(this, b, c), isNaN(a.data.index) || (e.push(c), l.call(this, c, MediaPlayer.dependencies.FragmentModel.states.REJECTED)))
      },
      o = function() {
        f = !0
      },
      p = function() {
        f = !1
      };
    return {
      system: void 0,
      log: void 0,
      metricsModel: void 0,
      notify: void 0,
      subscribe: void 0,
      unsubscribe: void 0,
      manifestExt: void 0,
      setup: function() {
        this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_OUTRUN] = o, this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED] = p, this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BYTES_REJECTED] = n, this[MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_LOADING_COMPLETED] = m
      },
      setLoader: function(a) {
        this.fragmentLoader = a
      },
      setContext: function(b) {
        a = b
      },
      getContext: function() {
        return a
      },
      getIsPostponed: function() {
        return f
      },
      addRequest: function(a) {
        return this.manifestExt.getIsTextTrack(a.mediaType) || a && !this.isFragmentLoadedOrPending(a) ? (c.push(a), l.call(this, a, MediaPlayer.dependencies.FragmentModel.states.PENDING), !0) : !1
      },
      isFragmentLoadedOrPending: function(a) {
        var e = function(a, b) {
            return "complete" === a.action && a.action === b.action
          },
          f = function(a, b) {
            return a.url === b.url && a.startTime === b.startTime
          },
          g = function(a, b) {
            return isNaN(a.index) && isNaN(b.index) && a.quality === b.quality
          },
          h = function(b) {
            var c, d, h = !1,
              i = b.length;
            for (d = 0; i > d; d += 1)
              if (c = b[d], f(a, c) || g(a, c) || e(a, c)) {
                h = !0;
                break
              } return h
          };
        return h(c) || h(d) || h(b)
      },
      getRequests: function(a) {
        var b, c = [],
          d = [],
          e = 1;
        if (!a || !a.state) return c;
        a.state instanceof Array ? (e = a.state.length, b = a.state) : b = [a.state];
        for (var f = 0; e > f; f += 1) c = k.call(this, b[f]), d = d.concat(j.call(this, c, a));
        return d
      },
      getLoadingTime: function() {
        var a, c, d = 0;
        for (c = b.length - 1; c >= 0; c -= 1)
          if (a = b[c], a.requestEndDate instanceof Date && a.firstByteDate instanceof Date) {
            d = a.requestEndDate.getTime() - a.firstByteDate.getTime();
            break
          } return d
      },
      removeExecutedRequest: function(a) {
        h.call(this, b, a)
      },
      removeRejectedRequest: function(a) {
        h.call(this, e, a)
      },
      removeExecutedRequestsBeforeTime: function(a) {
        var c, d = b.length - 1,
          e = NaN,
          f = null;
        for (c = d; c >= 0; c -= 1) f = b[c], e = f.startTime, !isNaN(e) && a > e && h.call(this, b, f)
      },
      cancelPendingRequests: function(a) {
        var b = this,
          d = c,
          e = d;
        return c = [], void 0 !== a && (c = d.filter(function(b) {
          return b.quality === a ? !1 : (e.splice(e.indexOf(b), 1), !0)
        })), e.forEach(function(a) {
          l.call(b, a, MediaPlayer.dependencies.FragmentModel.states.CANCELED)
        }), e
      },
      abortRequests: function() {
        var a = [];
        for (this.fragmentLoader.abort(); d.length > 0;) a.push(d[0]), h.call(this, d, d[0]);
        return d = [], a
      },
      executeRequest: function(a) {
        var e = this,
          f = c.indexOf(a);
        if (a && -1 !== f) switch (c.splice(f, 1), a.action) {
          case "complete":
            b.push(a), l.call(e, a, MediaPlayer.dependencies.FragmentModel.states.EXECUTED), e.notify(MediaPlayer.dependencies.FragmentModel.eventList.ENAME_STREAM_COMPLETED, {
              request: a
            });
            break;
          case "download":
            d.push(a), l.call(e, a, MediaPlayer.dependencies.FragmentModel.states.LOADING), g.call(e, a);
            break;
          default:
            this.log("Unknown request action.")
        }
      },
      reset: function() {
        this.abortRequests(), this.cancelPendingRequests(), a = null, b = [], c = [], d = [], e = [], f = !1
      }
    }
  }, MediaPlayer.dependencies.FragmentModel.prototype = {
    constructor: MediaPlayer.dependencies.FragmentModel
  }, MediaPlayer.dependencies.FragmentModel.eventList = {
    ENAME_STREAM_COMPLETED: "streamCompleted",
    ENAME_FRAGMENT_LOADING_STARTED: "fragmentLoadingStarted",
    ENAME_FRAGMENT_LOADING_COMPLETED: "fragmentLoadingCompleted"
  }, MediaPlayer.dependencies.FragmentModel.states = {
    PENDING: "pending",
    LOADING: "loading",
    EXECUTED: "executed",
    REJECTED: "rejected",
    CANCELED: "canceled",
    FAILED: "failed"
  }, MediaPlayer.models.ManifestModel = function() {
    "use strict";
    var a;
    return {
      system: void 0,
      eventBus: void 0,
      notify: void 0,
      subscribe: void 0,
      unsubscribe: void 0,
      getValue: function() {
        return a
      },
      setValue: function(b) {
        a = b, this.eventBus.dispatchEvent({
          type: MediaPlayer.events.MANIFEST_LOADED,
          data: b
        }), this.notify(MediaPlayer.models.ManifestModel.eventList.ENAME_MANIFEST_UPDATED, {
          manifest: b
        })
      }
    }
  }, MediaPlayer.models.ManifestModel.prototype = {
    constructor: MediaPlayer.models.ManifestModel
  }, MediaPlayer.models.ManifestModel.eventList = {
    ENAME_MANIFEST_UPDATED: "manifestUpdated"
  }, MediaPlayer.models.MetricsModel = function() {
    "use strict";
    return {
      system: void 0,
      eventBus: void 0,
      adapter: void 0,
      streamMetrics: {},
      metricsChanged: function() {
        this.eventBus.dispatchEvent({
          type: MediaPlayer.events.METRICS_CHANGED,
          data: {}
        })
      },
      metricChanged: function(a) {
        this.eventBus.dispatchEvent({
          type: MediaPlayer.events.METRIC_CHANGED,
          data: {
            stream: a
          }
        }), this.metricsChanged()
      },
      metricUpdated: function(a, b, c) {
        this.eventBus.dispatchEvent({
          type: MediaPlayer.events.METRIC_UPDATED,
          data: {
            stream: a,
            metric: b,
            value: c
          }
        }), this.metricChanged(a)
      },
      metricAdded: function(a, b, c) {
        this.eventBus.dispatchEvent({
          type: MediaPlayer.events.METRIC_ADDED,
          data: {
            stream: a,
            metric: b,
            value: c
          }
        }), this.metricChanged(a)
      },
      clearCurrentMetricsForType: function(a) {
        delete this.streamMetrics[a], this.metricChanged(a)
      },
      clearAllCurrentMetrics: function() {
        var a = this;
        this.streamMetrics = {}, this.metricsChanged.call(a)
      },
      getReadOnlyMetricsFor: function(a) {
        return this.streamMetrics.hasOwnProperty(a) ? this.streamMetrics[a] : null
      },
      getMetricsFor: function(a) {
        var b;
        return this.streamMetrics.hasOwnProperty(a) ? b = this.streamMetrics[a] : (b = this.system.getObject("metrics"), this.streamMetrics[a] = b), b
      },
      addTcpConnection: function(a, b, c, d, e, f) {
        var g = new MediaPlayer.vo.metrics.TCPConnection;
        return g.tcpid = b, g.dest = c, g.topen = d, g.tclose = e, g.tconnect = f, this.getMetricsFor(a).TcpList.push(g), this.metricAdded(a, this.adapter.metricsList.TCP_CONNECTION, g), g
      },
      addHttpRequest: function(a, b, c, d, e, f, g, h, i, j, k, l) {
        var m = new MediaPlayer.vo.metrics.HTTPRequest;
        return e && e !== d && (this.addHttpRequest(a, null, c, d, null, f, g, null, null, null, k, null), m.actualurl = e), m.stream = a, m.tcpid = b, m.type = c, m.url = d, m.range = f, m.trequest = g, m.tresponse = h, m.tfinish = i, m.responsecode = j, m.mediaduration = k, m.responseHeaders = l, this.getMetricsFor(a).HttpList.push(m), this.metricAdded(a, this.adapter.metricsList.HTTP_REQUEST, m), m
      },
      appendHttpTrace: function(a, b, c, d) {
        var e = new MediaPlayer.vo.metrics.HTTPRequest.Trace;
        return e.s = b, e.d = c, e.b = d, a.trace.push(e), a.interval || (a.interval = 0), a.interval += c, this.metricUpdated(a.stream, this.adapter.metricsList.HTTP_REQUEST_TRACE, a), e
      },
      addRepresentationSwitch: function(a, b, c, d, e) {
        var f = new MediaPlayer.vo.metrics.RepresentationSwitch;
        return f.t = b, f.mt = c, f.to = d, f.lto = e, this.getMetricsFor(a).RepSwitchList.push(f), this.metricAdded(a, this.adapter.metricsList.TRACK_SWITCH, f), f
      },
      addBufferLevel: function(a, b, c) {
        var d = new MediaPlayer.vo.metrics.BufferLevel;
        return d.t = b, d.level = c, this.getMetricsFor(a).BufferLevel.push(d), this.metricAdded(a, this.adapter.metricsList.BUFFER_LEVEL, d), d
      },
      addBufferState: function(a, b, c) {
        var d = new MediaPlayer.vo.metrics.BufferState;
        return d.target = c, d.state = b, this.getMetricsFor(a).BufferState.push(d), this.metricAdded(a, this.adapter.metricsList.BUFFER_STATE, d), d
      },
      addDVRInfo: function(a, b, c, d) {
        var e = new MediaPlayer.vo.metrics.DVRInfo;
        return e.time = b, e.range = d, e.manifestInfo = c, this.getMetricsFor(a).DVRInfo.push(e), this.metricAdded(a, this.adapter.metricsList.DVR_INFO, e), e
      },
      addDroppedFrames: function(a, b) {
        var c = new MediaPlayer.vo.metrics.DroppedFrames,
          d = this.getMetricsFor(a).DroppedFrames;
        return c.time = b.creationTime, c.droppedFrames = b.droppedVideoFrames, d.length > 0 && d[d.length - 1] == c ? d[d.length - 1] : (d.push(c), this.metricAdded(a, this.adapter.metricsList.DROPPED_FRAMES, c), c)
      },
      addSchedulingInfo: function(a, b, c, d, e, f, g, h, i) {
        var j = new MediaPlayer.vo.metrics.SchedulingInfo;
        return j.mediaType = a, j.t = b, j.type = c, j.startTime = d, j.availabilityStartTime = e, j.duration = f, j.quality = g, j.range = h, j.state = i, this.getMetricsFor(a).SchedulingInfo.push(j), this.metricAdded(a, this.adapter.metricsList.SCHEDULING_INFO, j), j
      },
      addRequestsQueue: function(a, b, c, d, e) {
        var f = new MediaPlayer.vo.metrics.RequestsQueue;
        f.pendingRequests = b, f.loadingRequests = c, f.executedRequests = d, f.rejectedRequests = e, this.getMetricsFor(a).RequestsQueue = f, this.metricAdded(a, this.adapter.metricsList.REQUESTS_QUEUE, f)
      },
      addManifestUpdate: function(a, b, c, d, e, f, g, h, i, j) {
        var k = new MediaPlayer.vo.metrics.ManifestUpdate,
          l = this.getMetricsFor("stream");
        return k.mediaType = a, k.type = b, k.requestTime = c, k.fetchTime = d, k.availabilityStartTime = e, k.presentationStartTime = f, k.clientTimeOffset = g, k.currentTime = h, k.buffered = i, k.latency = j, l.ManifestUpdate.push(k), this.metricAdded(a, this.adapter.metricsList.MANIFEST_UPDATE, k), k
      },
      updateManifestUpdateInfo: function(a, b) {
        if (a) {
          for (var c in b) a[c] = b[c];
          this.metricUpdated(a.mediaType, this.adapter.metricsList.MANIFEST_UPDATE, a)
        }
      },
      addManifestUpdateStreamInfo: function(a, b, c, d, e) {
        if (a) {
          var f = new MediaPlayer.vo.metrics.ManifestUpdate.StreamInfo;
          return f.id = b, f.index = c, f.start = d, f.duration = e, a.streamInfo.push(f), this.metricUpdated(a.mediaType, this.adapter.metricsList.MANIFEST_UPDATE_STREAM_INFO, a), f
        }
        return null
      },
      addManifestUpdateRepresentationInfo: function(a, b, c, d, e, f, g, h) {
        if (a) {
          var i = new MediaPlayer.vo.metrics.ManifestUpdate.TrackInfo;
          return i.id = b, i.index = c, i.streamIndex = d, i.mediaType = e, i.startNumber = g, i.fragmentInfoType = h, i.presentationTimeOffset = f, a.trackInfo.push(i), this.metricUpdated(a.mediaType, this.adapter.metricsList.MANIFEST_UPDATE_TRACK_INFO, a), i
        }
        return null
      },
      addPlayList: function(a, b, c, d) {
        var e = new MediaPlayer.vo.metrics.PlayList;
        return e.stream = a, e.start = b, e.mstart = c, e.starttype = d, this.getMetricsFor(a).PlayList.push(e), this.metricAdded(a, this.adapter.metricsList.PLAY_LIST, e), e
      },
      appendPlayListTrace: function(a, b, c, d, e, f, g, h) {
        var i = new MediaPlayer.vo.metrics.PlayList.Trace;
        return i.representationid = b, i.subreplevel = c, i.start = d, i.mstart = e, i.duration = f, i.playbackspeed = g, i.stopreason = h, a.trace.push(i), this.metricUpdated(a.stream, this.adapter.metricsList.PLAY_LIST_TRACE, a), i
      }
    }
  }, MediaPlayer.models.MetricsModel.prototype = {
    constructor: MediaPlayer.models.MetricsModel
  }, MediaPlayer.models.ProtectionModel = function() {}, MediaPlayer.models.ProtectionModel.eventList = {
    ENAME_NEED_KEY: "needkey",
    ENAME_KEY_SYSTEM_ACCESS_COMPLETE: "keySystemAccessComplete",
    ENAME_KEY_SYSTEM_SELECTED: "keySystemSelected",
    ENAME_VIDEO_ELEMENT_SELECTED: "videoElementSelected",
    ENAME_SERVER_CERTIFICATE_UPDATED: "serverCertificateUpdated",
    ENAME_KEY_MESSAGE: "keyMessage",
    ENAME_KEY_ADDED: "keyAdded",
    ENAME_KEY_ERROR: "keyError",
    ENAME_KEY_SESSION_CREATED: "keySessionCreated",
    ENAME_KEY_SESSION_REMOVED: "keySessionRemoved",
    ENAME_KEY_SESSION_CLOSED: "keySessionClosed",
    ENAME_KEY_STATUSES_CHANGED: "keyStatusesChanged",
    ENAME_TEARDOWN_COMPLETE: "protectionTeardownComplete"
  }, MediaPlayer.models.ProtectionModel_01b = function() {
    var a, b = null,
      c = null,
      d = [],
      e = [],
      f = function() {
        var b = this;
        return {
          handleEvent: function(f) {
            var g = null;
            switch (f.type) {
              case c.needkey:
                var i = ArrayBuffer.isView(f.initData) ? f.initData.buffer : f.initData;
                b.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_NEED_KEY, new MediaPlayer.vo.protection.NeedKey(i, "cenc"));
                break;
              case c.keyerror:
                if (g = h(e, f.sessionId), g || (g = h(d, f.sessionId)), g) {
                  var j = "";
                  switch (f.errorCode.code) {
                    case 1:
                      j += "MEDIA_KEYERR_UNKNOWN - An unspecified error occurred. This value is used for errors that don't match any of the other codes.";
                      break;
                    case 2:
                      j += "MEDIA_KEYERR_CLIENT - The Key System could not be installed or updated.";
                      break;
                    case 3:
                      j += "MEDIA_KEYERR_SERVICE - The message passed into update indicated an error from the license service.";
                      break;
                    case 4:
                      j += "MEDIA_KEYERR_OUTPUT - There is no available output device with the required characteristics for the content protection system.";
                      break;
                    case 5:
                      j += "MEDIA_KEYERR_HARDWARECHANGE - A hardware configuration change caused a content protection error.";
                      break;
                    case 6:
                      j += "MEDIA_KEYERR_DOMAIN - An error occurred in a multi-device domain licensing configuration. The most common error is a failure to join the domain."
                  }
                  j += "  System Code = " + f.systemCode, b.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ERROR, new MediaPlayer.vo.protection.KeyError(g, j))
                } else b.log("No session token found for key error");
                break;
              case c.keyadded:
                g = h(e, f.sessionId), g || (g = h(d, f.sessionId)), g ? b.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ADDED, g) : b.log("No session token found for key added");
                break;
              case c.keymessage:
                if (a = null !== f.sessionId && void 0 !== f.sessionId, a ? (g = h(e, f.sessionId), !g && d.length > 0 && (g = d.shift(), e.push(g), g.sessionID = f.sessionId)) : d.length > 0 && (g = d.shift(), e.push(g), 0 !== d.length && b.errHandler.mediaKeyMessageError("Multiple key sessions were creates with a user-agent that does not support sessionIDs!! Unpredictable behavior ahead!")), g) {
                  var k = ArrayBuffer.isView(f.message) ? f.message.buffer : f.message;
                  g.keyMessage = k, b.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_MESSAGE, new MediaPlayer.vo.protection.KeyMessage(g, k, f.defaultURL))
                } else b.log("No session token found for key message")
            }
          }
        }
      },
      g = null,
      h = function(a, b) {
        if (b && a) {
          for (var c = a.length, d = 0; c > d; d++)
            if (a[d].sessionID == b) return a[d];
          return null
        }
        return null
      },
      i = function() {
        b.removeEventListener(c.keyerror, g), b.removeEventListener(c.needkey, g), b.removeEventListener(c.keymessage, g), b.removeEventListener(c.keyadded, g)
      };
    return {
      system: void 0,
      log: void 0,
      errHandler: void 0,
      notify: void 0,
      subscribe: void 0,
      unsubscribe: void 0,
      protectionExt: void 0,
      keySystem: null,
      setup: function() {
        g = f.call(this)
      },
      init: function() {
        var a = document.createElement("video");
        c = MediaPlayer.models.ProtectionModel_01b.detect(a)
      },
      teardown: function() {
        b && i();
        for (var a = 0; a < e.length; a++) this.closeKeySession(e[a]);
        this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_TEARDOWN_COMPLETE)
      },
      getAllInitData: function() {
        var a, b = [];
        for (a = 0; a < d.length; a++) b.push(d[a].initData);
        for (a = 0; a < e.length; a++) b.push(e[a].initData);
        return b
      },
      requestKeySystemAccess: function(a) {
        var c = b;
        c || (c = document.createElement("video"));
        for (var d = !1, e = 0; e < a.length; e++)
          for (var f = a[e].ks.systemString, g = a[e].configs, h = null, i = null, j = 0; j < g.length; j++) {
            var k = g[j].videoCapabilities;
            if (k && 0 !== k.length) {
              i = [];
              for (var l = 0; l < k.length; l++) "" !== c.canPlayType(k[l].contentType, f) && i.push(k[l])
            }
            if (!(!h && !i || h && 0 === h.length || i && 0 === i.length)) {
              d = !0;
              var m = new MediaPlayer.vo.protection.KeySystemConfiguration(h, i),
                n = this.protectionExt.getKeySystemBySystemString(f),
                o = new MediaPlayer.vo.protection.KeySystemAccess(n, m);
              this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE, o);
              break
            }
          }
        d || this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE, null, "Key system access denied! -- No valid audio/video content configurations detected!")
      },
      selectKeySystem: function(a) {
        this.keySystem = a.keySystem, this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED)
      },
      setMediaElement: function(a) {
        b !== a && (b && i(), b = a, b && (b.addEventListener(c.keyerror, g), b.addEventListener(c.needkey, g), b.addEventListener(c.keymessage, g), b.addEventListener(c.keyadded, g), this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_VIDEO_ELEMENT_SELECTED)))
      },
      createKeySession: function(f) {
        if (!this.keySystem) throw new Error("Can not create sessions until you have selected a key system");
        if (a || 0 === e.length) {
          var g = {
            sessionID: null,
            initData: f,
            getSessionID: function() {
              return this.sessionID
            },
            getExpirationTime: function() {
              return NaN
            },
            getSessionType: function() {
              return "temporary"
            }
          };
          return d.push(g), b[c.generateKeyRequest](this.keySystem.systemString, new Uint8Array(f)), g
        }
        throw new Error("Multiple sessions not allowed!")
      },
      updateKeySession: function(a, d) {
        var e = a.sessionID;
        if (this.protectionExt.isClearKey(this.keySystem))
          for (var f = 0; f < d.keyPairs.length; f++) b[c.addKey](this.keySystem.systemString, d.keyPairs[f].key, d.keyPairs[f].keyID, e);
        else b[c.addKey](this.keySystem.systemString, new Uint8Array(d), a.initData, e)
      },
      closeKeySession: function(a) {
        b[c.cancelKeyRequest](this.keySystem.systemString, a.sessionID)
      },
      setServerCertificate: function() {},
      loadKeySession: function() {},
      removeKeySession: function() {}
    }
  }, MediaPlayer.models.ProtectionModel_01b.prototype = {
    constructor: MediaPlayer.models.ProtectionModel_01b
  }, MediaPlayer.models.ProtectionModel_01b.APIs = [{
    generateKeyRequest: "generateKeyRequest",
    addKey: "addKey",
    cancelKeyRequest: "cancelKeyRequest",
    needkey: "needkey",
    keyerror: "keyerror",
    keyadded: "keyadded",
    keymessage: "keymessage"
  }, {
    generateKeyRequest: "webkitGenerateKeyRequest",
    addKey: "webkitAddKey",
    cancelKeyRequest: "webkitCancelKeyRequest",
    needkey: "webkitneedkey",
    keyerror: "webkitkeyerror",
    keyadded: "webkitkeyadded",
    keymessage: "webkitkeymessage"
  }], MediaPlayer.models.ProtectionModel_01b.detect = function(a) {
    for (var b = MediaPlayer.models.ProtectionModel_01b.APIs, c = 0; c < b.length; c++) {
      var d = b[c];
      if ("function" == typeof a[d.generateKeyRequest] && "function" == typeof a[d.addKey] && "function" == typeof a[d.cancelKeyRequest]) return d
    }
    return null
  }, MediaPlayer.models.ProtectionModel_21Jan2015 = function() {
    var a = null,
      b = null,
      c = [],
      d = function(a, b) {
        var c = this;
        ! function(b) {
          var e = a[b].ks,
            f = a[b].configs;
          navigator.requestMediaKeySystemAccess(e.systemString, f).then(function(a) {
            var b = "function" == typeof a.getConfiguration ? a.getConfiguration() : null,
              d = new MediaPlayer.vo.protection.KeySystemAccess(e, b);
            d.mksa = a, c.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE, d)
          })["catch"](function() {
            ++b < a.length ? d.call(c, a, b) : c.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE, null, "Key system access denied!")
          })
        }(b)
      },
      e = function(a) {
        var b = a.session;
        return b.removeEventListener("keystatuseschange", a), b.removeEventListener("message", a), b.close()
      },
      f = function() {
        var a = this;
        return {
          handleEvent: function(b) {
            switch (b.type) {
              case "encrypted":
                if (b.initData) {
                  var c = ArrayBuffer.isView(b.initData) ? b.initData.buffer : b.initData;
                  a.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_NEED_KEY, new MediaPlayer.vo.protection.NeedKey(c, b.initDataType))
                }
            }
          }
        }
      },
      g = null,
      h = function(a) {
        for (var b = 0; b < c.length; b++)
          if (c[b] === a) {
            c.splice(b, 1);
            break
          }
      },
      i = function(a, b, d) {
        var e = this,
          f = {
            session: a,
            initData: b,
            handleEvent: function(a) {
              switch (a.type) {
                case "keystatuseschange":
                  e.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_STATUSES_CHANGED, this);
                  break;
                case "message":
                  var b = ArrayBuffer.isView(a.message) ? a.message.buffer : a.message;
                  e.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_MESSAGE, new MediaPlayer.vo.protection.KeyMessage(this, b, void 0, a.messageType))
              }
            },
            getSessionID: function() {
              return this.session.sessionId
            },
            getExpirationTime: function() {
              return this.session.expiration
            },
            getKeyStatuses: function() {
              return this.session.keyStatuses
            },
            getSessionType: function() {
              return d
            }
          };
        return a.addEventListener("keystatuseschange", f), a.addEventListener("message", f), a.closed.then(function() {
          h(f), e.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CLOSED, f.getSessionID())
        }), c.push(f), f
      };
    return {
      system: void 0,
      notify: void 0,
      subscribe: void 0,
      unsubscribe: void 0,
      protectionExt: void 0,
      keySystem: null,
      setup: function() {
        g = f.call(this)
      },
      init: function() {},
      teardown: function() {
        var b, d = c.length,
          f = this;
        if (0 !== d)
          for (var i = function(b) {
              h(b), 0 === c.length && (a ? (a.removeEventListener("encrypted", g), a.setMediaKeys(null).then(function() {
                f.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_TEARDOWN_COMPLETE)
              })) : f.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_TEARDOWN_COMPLETE))
            }, j = 0; d > j; j++) b = c[j],
            function(a) {
              b.session.closed.then(function() {
                i(a)
              }), e(b)["catch"](function() {
                i(a)
              })
            }(b);
        else this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_TEARDOWN_COMPLETE)
      },
      getAllInitData: function() {
        for (var a = [], b = 0; b < c.length; b++) a.push(c[b].initData);
        return a
      },
      requestKeySystemAccess: function(a) {
        d.call(this, a, 0)
      },
      selectKeySystem: function(c) {
        var d = this;
        c.mksa.createMediaKeys().then(function(e) {
          d.keySystem = c.keySystem, b = e, a && a.setMediaKeys(b), d.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED)
        })["catch"](function() {
          d.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED, null, "Error selecting keys system (" + c.keySystem.systemString + ")! Could not create MediaKeys -- TODO")
        })
      },
      setMediaElement: function(c) {
        a !== c && (a && (a.removeEventListener("encrypted", g), a.setMediaKeys(null)), a = c, a && (a.addEventListener("encrypted", g), b && a.setMediaKeys(b)))
      },
      setServerCertificate: function(a) {
        if (!this.keySystem || !b) throw new Error("Can not set server certificate until you have selected a key system");
        var c = this;
        b.setServerCertificate(a).then(function() {
          c.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_SERVER_CERTIFICATE_UPDATED)
        })["catch"](function(a) {
          c.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_SERVER_CERTIFICATE_UPDATED, null, "Error updating server certificate -- " + a.name)
        })
      },
      createKeySession: function(a, c) {
        if (!this.keySystem || !b) throw new Error("Can not create sessions until you have selected a key system");
        var d = b.createSession(c),
          e = i.call(this, d, a, c),
          f = this;
        d.generateRequest("cenc", a).then(function() {
          f.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED, e)
        })["catch"](function(a) {
          h(e), f.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED, null, "Error generating key request -- " + a.name)
        })
      },
      updateKeySession: function(a, b) {
        var c = a.session,
          d = this;
        this.protectionExt.isClearKey(this.keySystem) && (b = b.toJWK()), c.update(b)["catch"](function(b) {
          d.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ERROR, new MediaPlayer.vo.protection.KeyError(a, "Error sending update() message! " + b.name))
        })
      },
      loadKeySession: function(a) {
        if (!this.keySystem || !b) throw new Error("Can not load sessions until you have selected a key system");
        var c = b.createSession(),
          d = this;
        c.load(a).then(function(b) {
          if (b) {
            var e = i.call(this, c);
            d.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED, e)
          } else d.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED, null, "Could not load session! Invalid Session ID (" + a + ")")
        })["catch"](function(b) {
          d.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED, null, "Could not load session (" + a + ")! " + b.name)
        })
      },
      removeKeySession: function(a) {
        var b = a.session,
          c = this;
        b.remove().then(function() {
          c.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_REMOVED, a.getSessionID())
        }, function(b) {
          c.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_REMOVED, null, "Error removing session (" + a.getSessionID() + "). " + b.name)
        })
      },
      closeKeySession: function(a) {
        var b = this;
        e(a)["catch"](function(c) {
          h(a), b.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CLOSED, null, "Error closing session (" + a.getSessionID() + ") " + c.name)
        })
      }
    }
  }, MediaPlayer.models.ProtectionModel_21Jan2015.detect = function(a) {
    return void 0 === a.onencrypted || void 0 === a.mediaKeys ? !1 : void 0 === navigator.requestMediaKeySystemAccess || "function" != typeof navigator.requestMediaKeySystemAccess ? !1 : !0
  }, MediaPlayer.models.ProtectionModel_21Jan2015.prototype = {
    constructor: MediaPlayer.models.ProtectionModel_21Jan2015
  }, MediaPlayer.models.ProtectionModel_3Feb2014 = function() {
    var a = null,
      b = null,
      c = null,
      d = null,
      e = [],
      f = function() {
        var a = this;
        return {
          handleEvent: function(b) {
            switch (b.type) {
              case d.needkey:
                if (b.initData) {
                  var c = ArrayBuffer.isView(b.initData) ? b.initData.buffer : b.initData;
                  a.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_NEED_KEY, new MediaPlayer.vo.protection.NeedKey(c, "cenc"))
                }
            }
          }
        }
      },
      g = null,
      h = function() {
        var c = null,
          e = function() {
            a.removeEventListener("loadedmetadata", c), a[d.setMediaKeys](b), this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_VIDEO_ELEMENT_SELECTED)
          };
        a.readyState >= 1 ? e.call(this) : (c = e.bind(this), a.addEventListener("loadedmetadata", c))
      },
      i = function(a, b) {
        var c = this;
        return {
          session: a,
          initData: b,
          handleEvent: function(a) {
            switch (a.type) {
              case d.error:
                var b = "KeyError";
                c.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ERROR, new MediaPlayer.vo.protection.KeyError(this, b));
                break;
              case d.message:
                var e = ArrayBuffer.isView(a.message) ? a.message.buffer : a.message;
                c.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_MESSAGE, new MediaPlayer.vo.protection.KeyMessage(this, e, a.destinationURL));
                break;
              case d.ready:
                c.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_ADDED, this);
                break;
              case d.close:
                c.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CLOSED, this.getSessionID())
            }
          },
          getSessionID: function() {
            return this.session.sessionId
          },
          getExpirationTime: function() {
            return NaN
          },
          getSessionType: function() {
            return "temporary"
          }
        }
      };
    return {
      system: void 0,
      notify: void 0,
      subscribe: void 0,
      unsubscribe: void 0,
      protectionExt: void 0,
      keySystem: null,
      setup: function() {
        g = f.call(this)
      },
      init: function() {
        var a = document.createElement("video");
        d = MediaPlayer.models.ProtectionModel_3Feb2014.detect(a)
      },
      teardown: function() {
        try {
          for (var b = 0; b < e.length; b++) this.closeKeySession(e[b]);
          a && a.removeEventListener(d.needkey, g), this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_TEARDOWN_COMPLETE)
        } catch (c) {
          this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_TEARDOWN_COMPLETE, null, "Error tearing down key sessions and MediaKeys! -- " + c.message)
        }
      },
      getAllInitData: function() {
        for (var a = [], b = 0; b < e.length; b++) a.push(e[b].initData);
        return a
      },
      requestKeySystemAccess: function(a) {
        for (var b = !1, c = 0; c < a.length; c++)
          for (var e = a[c].ks.systemString, f = a[c].configs, g = null, h = null, i = 0; i < f.length; i++) {
            var j = f[i].audioCapabilities,
              k = f[i].videoCapabilities;
            if (j && 0 !== j.length) {
              g = [];
              for (var l = 0; l < j.length; l++) window[d.MediaKeys].isTypeSupported(e, j[l].contentType) && g.push(j[l])
            }
            if (k && 0 !== k.length) {
              h = [];
              for (var m = 0; m < k.length; m++) window[d.MediaKeys].isTypeSupported(e, k[m].contentType) && h.push(k[m])
            }
            if (!(!g && !h || g && 0 === g.length || h && 0 === h.length)) {
              b = !0;
              var n = new MediaPlayer.vo.protection.KeySystemConfiguration(g, h),
                o = this.protectionExt.getKeySystemBySystemString(e),
                p = new MediaPlayer.vo.protection.KeySystemAccess(o, n);
              this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE, p);
              break
            }
          }
        b || this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_ACCESS_COMPLETE, null, "Key system access denied! -- No valid audio/video content configurations detected!")
      },
      selectKeySystem: function(e) {
        try {
          b = e.mediaKeys = new window[d.MediaKeys](e.keySystem.systemString), this.keySystem = e.keySystem, c = e, a && h.call(this), this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED)
        } catch (f) {
          this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SYSTEM_SELECTED, null, "Error selecting keys system (" + this.keySystem.systemString + ")! Could not create MediaKeys -- TODO")
        }
      },
      setMediaElement: function(c) {
        a !== c && (a && a.removeEventListener(d.needkey, g), a = c, a && (a.addEventListener(d.needkey, g), b && h.call(this)))
      },
      createKeySession: function(a) {
        if (!this.keySystem || !b || !c) throw new Error("Can not create sessions until you have selected a key system");
        var f = c.ksConfiguration.videoCapabilities[0].contentType,
          g = b.createSession(f, new Uint8Array(a)),
          h = i.call(this, g, a);
        g.addEventListener(d.error, h), g.addEventListener(d.message, h), g.addEventListener(d.ready, h), g.addEventListener(d.close, h), e.push(h), this.notify(MediaPlayer.models.ProtectionModel.eventList.ENAME_KEY_SESSION_CREATED, h)
      },
      updateKeySession: function(a, b) {
        var c = a.session;
        this.protectionExt.isClearKey(this.keySystem) ? c.update(new Uint8Array(b.toJWK())) : c.update(new Uint8Array(b))
      },
      closeKeySession: function(a) {
        var b = a.session;
        b.removeEventListener(d.error, a), b.removeEventListener(d.message, a), b.removeEventListener(d.ready, a), b.removeEventListener(d.close, a);
        for (var c = 0; c < e.length; c++)
          if (e[c] === a) {
            e.splice(c, 1);
            break
          } b[d.release]()
      },
      setServerCertificate: function() {},
      loadKeySession: function() {},
      removeKeySession: function() {}
    }
  }, MediaPlayer.models.ProtectionModel_3Feb2014.APIs = [{
    setMediaKeys: "setMediaKeys",
    MediaKeys: "MediaKeys",
    release: "close",
    needkey: "needkey",
    error: "keyerror",
    message: "keymessage",
    ready: "keyadded",
    close: "keyclose"
  }, {
    setMediaKeys: "msSetMediaKeys",
    MediaKeys: "MSMediaKeys",
    release: "close",
    needkey: "msneedkey",
    error: "mskeyerror",
    message: "mskeymessage",
    ready: "mskeyadded",
    close: "mskeyclose"
  }], MediaPlayer.models.ProtectionModel_3Feb2014.detect = function(a) {
    for (var b = MediaPlayer.models.ProtectionModel_3Feb2014.APIs, c = 0; c < b.length; c++) {
      var d = b[c];
      if ("function" == typeof a[d.setMediaKeys] && "function" == typeof window[d.MediaKeys]) return d
    }
    return null
  }, MediaPlayer.models.ProtectionModel_3Feb2014.prototype = {
    constructor: MediaPlayer.models.ProtectionModel_3Feb2014
  }, MediaPlayer.models.URIQueryAndFragmentModel = function() {
    "use strict";
    var a = new MediaPlayer.vo.URIFragmentData,
      b = [],
      c = !1,
      d = function(d) {
        function e(a, b, c, d) {
          var e = d[0].split(/[=]/);
          return d.push({
            key: e[0],
            value: e[1]
          }), d.shift(), d
        }

        function f(a, c, d) {
          return c > 0 && (l && 0 === b.length ? b = d[c].split(/[&]/) : m && (h = d[c].split(/[&]/))), d
        }
        if (!d) return null;
        var g, h = [],
          i = new RegExp(/[?]/),
          j = new RegExp(/[#]/),
          k = new RegExp(/^(https:)?\/\//i),
          l = i.test(d),
          m = j.test(d);
        return c = k.test(d), g = d.split(/[?#]/).map(f), b.length > 0 && (b = b.reduce(e, null)), h.length > 0 && (h = h.reduce(e, null), h.forEach(function(b) {
          a[b.key] = b.value
        })), d
      };
    return {
      parseURI: d,
      getURIFragmentData: function() {
        return a
      },
      getURIQueryData: function() {
        return b
      },
      isManifestHTTPS: function() {
        return c
      },
      reset: function() {
        a = new MediaPlayer.vo.URIFragmentData, b = [], c = !1
      }
    }
  }, MediaPlayer.models.URIQueryAndFragmentModel.prototype = {
    constructor: MediaPlayer.models.URIQueryAndFragmentModel
  }, MediaPlayer.models.VideoModel = function() {
    "use strict";
    var a, b, c, d = [],
      e = function() {
        return d.length > 0
      },
      f = function(b) {
        null === b || a.seeking || (this.setPlaybackRate(0), d[b] !== !0 && (d.push(b), d[b] = !0))
      },
      g = function(a) {
        if (null !== a) {
          d[a] = !1;
          var b = d.indexOf(a); - 1 !== b && d.splice(b, 1), e() === !1 && this.setPlaybackRate(1)
        }
      },
      h = function(a, b) {
        b ? f.call(this, a) : g.call(this, a)
      };
    return {
      system: void 0,
      play: function() {
        a.play()
      },
      pause: function() {
        a.pause()
      },
      isPaused: function() {
        return a.paused
      },
      getPlaybackRate: function() {
        return a.playbackRate
      },
      setPlaybackRate: function(b) {
        !a || a.readyState < 2 || (a.playbackRate = b)
      },
      getCurrentTime: function() {
        return a.currentTime
      },
      setCurrentTime: function(b) {
        if (a.currentTime != b) try {
          a.currentTime = b
        } catch (c) {
          0 === a.readyState && c.code === c.INVALID_STATE_ERR && setTimeout(function() {
            a.currentTime = b
          }, 400)
        }
      },
      setStallState: function(a, b) {
        h.call(this, a, b)
      },
      listen: function(b, c) {
        a.addEventListener(b, c, !1)
      },
      unlisten: function(b, c) {
        a.removeEventListener(b, c, !1)
      },
      getElement: function() {
        return a
      },
      setElement: function(b) {
        a = b
      },
      getVideoContainer: function() {
        return c
      },
      setVideoContainer: function(a) {
        c = a
      },
      getTTMLRenderingDiv: function() {
        return b
      },
      setTTMLRenderingDiv: function(a) {
        b = a, b.style.position = "absolute", b.style.display = "flex", b.style.overflow = "hidden", b.style.pointerEvents = "none", b.style.top = 0, b.style.left = 0
      },
      setSource: function(b) {
        a.src = b
      }
    }
  }, MediaPlayer.models.VideoModel.prototype = {
    constructor: MediaPlayer.models.VideoModel
  }, MediaPlayer.dependencies.protection.CommonEncryption = {
    findCencContentProtection: function(a) {
      for (var b = null, c = 0; c < a.length; ++c) {
        var d = a[c];
        "urn:mpeg:dash:mp4protection:2011" === d.schemeIdUri.toLowerCase() && "cenc" === d.value.toLowerCase() && (b = d)
      }
      return b
    },
    getPSSHData: function(a) {
      var b = 8,
        c = new DataView(a),
        d = c.getUint8(b);
      return b += 20, d > 0 && (b += 4 + 16 * c.getUint32(b)), b += 4, a.slice(b)
    },
    getPSSHForKeySystem: function(a, b) {
      var c = MediaPlayer.dependencies.protection.CommonEncryption.parsePSSHList(b);
      return c.hasOwnProperty(a.uuid.toLowerCase()) ? c[a.uuid.toLowerCase()] : null
    },
    parseInitDataFromContentProtection: function(a) {
      return "pssh" in a ? BASE64.decodeArray(a.pssh.__text).buffer : null
    },
    parsePSSHList: function(a) {
      if (null === a) return [];
      for (var b = new DataView(a), c = !1, d = {}, e = 0; !c;) {
        var f, g, h, i, j, k = e;
        if (e >= b.buffer.byteLength) break;
        if (f = b.getUint32(e), g = e + f, e += 4, 1886614376 === b.getUint32(e))
          if (e += 4, h = b.getUint8(e), 0 === h || 1 === h) {
            e += 1, e += 3, i = "";
            var l, m;
            for (l = 0; 4 > l; l++) m = b.getUint8(e + l).toString(16), i += 1 === m.length ? "0" + m : m;
            for (e += 4, i += "-", l = 0; 2 > l; l++) m = b.getUint8(e + l).toString(16), i += 1 === m.length ? "0" + m : m;
            for (e += 2, i += "-", l = 0; 2 > l; l++) m = b.getUint8(e + l).toString(16), i += 1 === m.length ? "0" + m : m;
            for (e += 2, i += "-", l = 0; 2 > l; l++) m = b.getUint8(e + l).toString(16), i += 1 === m.length ? "0" + m : m;
            for (e += 2, i += "-", l = 0; 6 > l; l++) m = b.getUint8(e + l).toString(16), i += 1 === m.length ? "0" + m : m;
            e += 6, i = i.toLowerCase(), j = b.getUint32(e), e += 4, d[i] = b.buffer.slice(k, g), e = g
          } else e = g;
        else e = g
      }
      return d
    }
  }, MediaPlayer.dependencies.protection.KeySystem = function() {}, MediaPlayer.dependencies.protection.KeySystem_Access = function() {
    "use strict"
  }, MediaPlayer.dependencies.protection.KeySystem_Access.prototype = {
    constructor: MediaPlayer.dependencies.protection.KeySystem_Access
  }, MediaPlayer.dependencies.protection.KeySystem_ClearKey = function() {
    "use strict";
    var a = "org.w3.clearkey",
      b = "1077efec-c0b2-4d02-ace3-3c1e52e2fb4b";
    return {
      system: void 0,
      schemeIdURI: "urn:uuid:" + b,
      systemString: a,
      uuid: b,
      getInitData: MediaPlayer.dependencies.protection.CommonEncryption.parseInitDataFromContentProtection,
      getRequestHeadersFromMessage: function() {
        return null
      },
      getLicenseRequestFromMessage: function(a) {
        return new Uint8Array(a)
      },
      getLicenseServerURLFromInitData: function() {
        return null
      }
    }
  }, MediaPlayer.dependencies.protection.KeySystem_ClearKey.prototype = {
    constructor: MediaPlayer.dependencies.protection.KeySystem_ClearKey
  }, MediaPlayer.dependencies.protection.KeySystem_ClearKey.getClearKeysFromProtectionData = function(a, b) {
    var c = null;
    if (a) {
      for (var d = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(b))), e = [], f = 0; f < d.kids.length; f++) {
        var g = d.kids[f],
          h = a.clearkeys.hasOwnProperty(g) ? a.clearkeys[g] : null;
        if (!h) throw new Error("DRM: ClearKey keyID (" + g + ") is not known!");
        e.push(new MediaPlayer.vo.protection.KeyPair(g, h))
      }
      c = new MediaPlayer.vo.protection.ClearKeyKeySet(e)
    }
    return c
  }, MediaPlayer.dependencies.protection.KeySystem_PlayReady = function() {
    "use strict";
    var a = "com.microsoft.playready",
      b = "9a04f079-9840-4286-ab92-e65be0885f95",
      c = "utf16",
      d = function(a) {
        var b, d, e = {},
          f = new DOMParser,
          g = "utf16" === c ? new Uint16Array(a) : new Uint8Array(a);
        b = String.fromCharCode.apply(null, g), d = f.parseFromString(b, "application/xml");
        for (var h = d.getElementsByTagName("name"), i = d.getElementsByTagName("value"), j = 0; j < h.length; j++) e[h[j].childNodes[0].nodeValue] = i[j].childNodes[0].nodeValue;
        return e.hasOwnProperty("Content") && (e["Content-Type"] = e.Content, delete e.Content), e
      },
      e = function(a) {
        var b, d, e = new DOMParser,
          f = null,
          g = "utf16" === c ? new Uint16Array(a) : new Uint8Array(a);
        if (b = String.fromCharCode.apply(null, g), d = e.parseFromString(b, "application/xml"), d.getElementsByTagName("Challenge")[0]) {
          var h = d.getElementsByTagName("Challenge")[0].childNodes[0].nodeValue;
          h && (f = BASE64.decode(h))
        }
        return f
      },
      f = function(a) {
        if (a)
          for (var b = new DataView(a), c = b.getUint16(4, !0), d = 6, e = new DOMParser, f = 0; c > f; f++) {
            var g = b.getUint16(d, !0);
            d += 2;
            var h = b.getUint16(d, !0);
            if (d += 2, 1 === g) {
              var i = a.slice(d, d + h),
                j = String.fromCharCode.apply(null, new Uint16Array(i)),
                k = e.parseFromString(j, "application/xml");
              if (k.getElementsByTagName("LA_URL")[0]) {
                var l = k.getElementsByTagName("LA_URL")[0].childNodes[0].nodeValue;
                if (l) return l
              }
              if (k.getElementsByTagName("LUI_URL")[0]) {
                var m = k.getElementsByTagName("LUI_URL")[0].childNodes[0].nodeValue;
                if (m) return m
              }
            } else d += h
          }
        return null
      },
      g = function(a) {
        var b, c, d, e, f, g = 0,
          h = new Uint8Array([112, 115, 115, 104, 0, 0, 0, 0]),
          i = new Uint8Array([154, 4, 240, 121, 152, 64, 66, 134, 171, 146, 230, 91, 224, 136, 95, 149]),
          j = null;
        if ("pssh" in a) return MediaPlayer.dependencies.protection.CommonEncryption.parseInitDataFromContentProtection(a);
        if ("pro" in a) j = BASE64.decodeArray(a.pro.__text);
        else {
          if (!("prheader" in a)) return null;
          j = BASE64.decodeArray(a.prheader.__text)
        }
        return b = j.length, c = 4 + h.length + i.length + 4 + b, d = new ArrayBuffer(c), e = new Uint8Array(d), f = new DataView(d), f.setUint32(g, c), g += 4, e.set(h, g), g += h.length, e.set(i, g), g += i.length, f.setUint32(g, b), g += 4, e.set(j, g), g += b, e.buffer
      };
    return {
      schemeIdURI: "urn:uuid:" + b,
      systemString: a,
      uuid: b,
      getInitData: g,
      getRequestHeadersFromMessage: d,
      getLicenseRequestFromMessage: e,
      getLicenseServerURLFromInitData: f,
      setPlayReadyMessageFormat: function(a) {
        if ("utf8" !== a && "utf16" !== a) throw new Error("Illegal PlayReady message format! -- " + a);
        c = a
      }
    }
  }, MediaPlayer.dependencies.protection.KeySystem_PlayReady.prototype = {
    constructor: MediaPlayer.dependencies.protection.KeySystem_PlayReady
  }, MediaPlayer.dependencies.protection.KeySystem_Widevine = function() {
    "use strict";
    var a = "com.widevine.alpha",
      b = "edef8ba9-79d6-4ace-a3c8-27dcd51d21ed";
    return {
      schemeIdURI: "urn:uuid:" + b,
      systemString: a,
      uuid: b,
      getInitData: MediaPlayer.dependencies.protection.CommonEncryption.parseInitDataFromContentProtection,
      getRequestHeadersFromMessage: function() {
        return null
      },
      getLicenseRequestFromMessage: function(a) {
        return new Uint8Array(a)
      },
      getLicenseServerURLFromInitData: function() {
        return null
      }
    }
  }, MediaPlayer.dependencies.protection.KeySystem_Widevine.prototype = {
    constructor: MediaPlayer.dependencies.protection.KeySystem_Widevine
  }, MediaPlayer.dependencies.protection.servers.ClearKey = function() {
    "use strict";
    return {
      getServerURLFromMessage: function(a, b) {
        var c = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(b)));
        a += "/?";
        for (var d = 0; d < c.kids.length; d++) a += c.kids[d] + "&";
        return a = a.substring(0, a.length - 1)
      },
      getHTTPMethod: function() {
        return "GET"
      },
      getResponseType: function() {
        return "json"
      },
      getLicenseMessage: function(a) {
        if (!a.hasOwnProperty("keys")) return null;
        var b, c = [];
        for (b = 0; b < a.keys.length; b++) {
          var d = a.keys[b],
            e = d.kid.replace(/=/g, ""),
            f = d.k.replace(/=/g, "");
          c.push(new MediaPlayer.vo.protection.KeyPair(e, f))
        }
        return new MediaPlayer.vo.protection.ClearKeyKeySet(c)
      },
      getErrorResponse: function(a) {
        return String.fromCharCode.apply(null, new Uint8Array(a))
      }
    }
  }, MediaPlayer.dependencies.protection.servers.ClearKey.prototype = {
    constructor: MediaPlayer.dependencies.protection.servers.ClearKey
  }, MediaPlayer.dependencies.protection.servers.DRMToday = function() {
    "use strict";
    var a = {
      "com.widevine.alpha": {
        responseType: "json",
        getLicenseMessage: function(a) {
          return BASE64.decodeArray(a.license)
        },
        getErrorResponse: function(a) {
          return a
        }
      },
      "com.microsoft.playready": {
        responseType: "arraybuffer",
        getLicenseMessage: function(a) {
          return a
        },
        getErrorResponse: function(a) {
          return String.fromCharCode.apply(null, new Uint8Array(a))
        }
      }
    };
    return {
      getServerURLFromMessage: function(a) {
        return a
      },
      getHTTPMethod: function() {
        return "POST"
      },
      getResponseType: function(b) {
        return a[b].responseType
      },
      getLicenseMessage: function(b, c) {
        return a[c].getLicenseMessage(b)
      },
      getErrorResponse: function(b, c) {
        return a[c].getErrorResponse(b)
      }
    }
  }, MediaPlayer.dependencies.protection.servers.DRMToday.prototype = {
    constructor: MediaPlayer.dependencies.protection.servers.DRMToday
  }, MediaPlayer.dependencies.protection.servers.LicenseServer = function() {}, MediaPlayer.dependencies.protection.servers.PlayReady = function() {
    "use strict";
    return {
      getServerURLFromMessage: function(a) {
        return a
      },
      getHTTPMethod: function() {
        return "POST"
      },
      getResponseType: function() {
        return "arraybuffer"
      },
      getLicenseMessage: function(a) {
        return a
      },
      getErrorResponse: function(a) {
        return String.fromCharCode.apply(null, new Uint8Array(a))
      }
    }
  }, MediaPlayer.dependencies.protection.servers.PlayReady.prototype = {
    constructor: MediaPlayer.dependencies.protection.servers.PlayReady
  }, MediaPlayer.dependencies.protection.servers.Widevine = function() {
    "use strict";
    return {
      getServerURLFromMessage: function(a) {
        return a
      },
      getHTTPMethod: function() {
        return "POST"
      },
      getResponseType: function() {
        return "arraybuffer"
      },
      getLicenseMessage: function(a) {
        return a
      },
      getErrorResponse: function(a) {
        return String.fromCharCode.apply(null, new Uint8Array(a))
      }
    }
  }, MediaPlayer.dependencies.protection.servers.Widevine.prototype = {
    constructor: MediaPlayer.dependencies.protection.servers.Widevine
  }, MediaPlayer.rules.ABRRulesCollection = function() {
    "use strict";
    var a = [],
      b = [];
    return {
      insufficientBufferRule: void 0,
      bufferOccupancyRule: void 0,
      throughputRule: void 0,
      abandonRequestRule: void 0,
      getRules: function(c) {
        switch (c) {
          case MediaPlayer.rules.ABRRulesCollection.prototype.QUALITY_SWITCH_RULES:
            return a;
          case MediaPlayer.rules.ABRRulesCollection.prototype.ABANDON_FRAGMENT_RULES:
            return b;
          default:
            return null
        }
      },
      setup: function() {
        a.push(this.insufficientBufferRule), a.push(this.throughputRule), a.push(this.bufferOccupancyRule), b.push(this.abandonRequestRule)
      }
    }
  }, MediaPlayer.rules.ABRRulesCollection.prototype = {
    constructor: MediaPlayer.rules.ABRRulesCollection,
    QUALITY_SWITCH_RULES: "qualitySwitchRules",
    ABANDON_FRAGMENT_RULES: "abandonFragmentRules"
  }, MediaPlayer.rules.AbandonRequestsRule = function() {
    "use strict";
    var a = 500,
      b = 1.5,
      c = {},
      d = {},
      e = function(a, b) {
        c[a] = c[a] || {}, c[a][b] = c[a][b] || {}
      };
    return {
      metricsExt: void 0,
      log: void 0,
      execute: function(f, g) {
        var h, i = (new Date).getTime(),
          j = f.getMediaInfo(),
          k = j.type,
          l = f.getCurrentValue(),
          m = f.getTrackInfo(),
          n = l.data.request,
          o = f.getStreamProcessor().getABRController(),
          p = new MediaPlayer.rules.SwitchRequest(MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE, MediaPlayer.rules.SwitchRequest.prototype.WEAK);
        if (!isNaN(n.index)) {
          if (e(k, n.index), h = c[k][n.index], null === h || null === n.firstByteDate || d.hasOwnProperty(h.id)) return void g(p);
          if (void 0 === h.firstByteTime && (h.firstByteTime = n.firstByteDate.getTime(), h.segmentDuration = n.duration, h.bytesTotal = n.bytesTotal, h.id = n.index), h.bytesLoaded = n.bytesLoaded, h.elapsedTime = i - h.firstByteTime, h.bytesLoaded < h.bytesTotal && h.elapsedTime >= a) {
            if (h.measuredBandwidthInKbps = Math.round(8 * h.bytesLoaded / h.elapsedTime), h.estimatedTimeOfDownload = (8 * h.bytesTotal * .001 / h.measuredBandwidthInKbps).toFixed(2), h.estimatedTimeOfDownload < h.segmentDuration * b || 0 === m.quality) return void g(p);
            if (!d.hasOwnProperty(h.id)) {
              var q = o.getQualityForBitrate(j, h.measuredBandwidthInKbps * MediaPlayer.dependencies.AbrController.BANDWIDTH_SAFETY);
              p = new MediaPlayer.rules.SwitchRequest(q, MediaPlayer.rules.SwitchRequest.prototype.STRONG), d[h.id] = h, this.log("AbandonRequestsRule ( ", k, "frag id", h.id, ") is asking to abandon and switch to quality to ", q, " measured bandwidth was", h.measuredBandwidthInKbps), delete c[k][h.id]
            }
          } else h.bytesLoaded === h.bytesTotal && delete c[k][h.id]
        }
        g(p)
      },
      reset: function() {
        c = {}, d = {}
      }
    }
  }, MediaPlayer.rules.AbandonRequestsRule.prototype = {
    constructor: MediaPlayer.rules.AbandonRequestsRule
  }, MediaPlayer.rules.BufferOccupancyRule = function() {
    "use strict";
    var a = 0;
    return {
      log: void 0,
      metricsModel: void 0,
      execute: function(b, c) {
        var d = this,
          e = (new Date).getTime() / 1e3,
          f = b.getMediaInfo(),
          g = b.getTrackInfo(),
          h = f.type,
          i = isNaN(g.fragmentDuration) ? 2 : g.fragmentDuration / 2,
          j = b.getCurrentValue(),
          k = b.getStreamProcessor(),
          l = k.getABRController(),
          m = this.metricsModel.getReadOnlyMetricsFor(h),
          n = m.BufferLevel.length > 0 ? m.BufferLevel[m.BufferLevel.length - 1] : null,
          o = m.BufferState.length > 0 ? m.BufferState[m.BufferState.length - 1] : null,
          p = !1,
          q = f.representationCount - 1,
          r = new MediaPlayer.rules.SwitchRequest(MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE, MediaPlayer.rules.SwitchRequest.prototype.WEAK);
        return i > e - a || l.getAbandonmentStateFor(h) === MediaPlayer.dependencies.AbrController.ABANDON_LOAD ? void c(r) : (null !== n && null !== o && n.level > o.target && (p = n.level - o.target > MediaPlayer.dependencies.BufferController.RICH_BUFFER_THRESHOLD, p && f.representationCount > 1 && (r = new MediaPlayer.rules.SwitchRequest(q, MediaPlayer.rules.SwitchRequest.prototype.STRONG))), r.value !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE && r.value !== j && d.log("BufferOccupancyRule requesting switch to index: ", r.value, "type: ", h, " Priority: ", r.priority === MediaPlayer.rules.SwitchRequest.prototype.DEFAULT ? "Default" : r.priority === MediaPlayer.rules.SwitchRequest.prototype.STRONG ? "Strong" : "Weak"), void c(r))
      },
      reset: function() {
        a = 0
      }
    }
  }, MediaPlayer.rules.BufferOccupancyRule.prototype = {
    constructor: MediaPlayer.rules.BufferOccupancyRule
  }, MediaPlayer.rules.InsufficientBufferRule = function() {
    "use strict";
    var a = {},
      b = 0,
      c = 1e3,
      d = function(b, c) {
        a[b] = a[b] || {}, a[b].state = c, c !== MediaPlayer.dependencies.BufferController.BUFFER_LOADED || a[b].firstBufferLoadedEvent || (a[b].firstBufferLoadedEvent = !0)
      },
      e = function() {
        a = {}
      };
    return {
      log: void 0,
      metricsModel: void 0,
      playbackController: void 0,
      setup: function() {
        this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING] = e
      },
      execute: function(e, f) {
        var g = this,
          h = (new Date).getTime(),
          i = e.getMediaInfo().type,
          j = e.getCurrentValue(),
          k = g.metricsModel.getReadOnlyMetricsFor(i),
          l = k.BufferState.length > 0 ? k.BufferState[k.BufferState.length - 1] : null,
          m = new MediaPlayer.rules.SwitchRequest(MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE, MediaPlayer.rules.SwitchRequest.prototype.WEAK);
        return c > h - b || null === l ? void f(m) : (d(i, l.state), l.state === MediaPlayer.dependencies.BufferController.BUFFER_EMPTY && void 0 !== a[i].firstBufferLoadedEvent && (m = new MediaPlayer.rules.SwitchRequest(0, MediaPlayer.rules.SwitchRequest.prototype.STRONG)), m.value !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE && m.value !== j && g.log("InsufficientBufferRule requesting switch to index: ", m.value, "type: ", i, " Priority: ", m.priority === MediaPlayer.rules.SwitchRequest.prototype.DEFAULT ? "Default" : m.priority === MediaPlayer.rules.SwitchRequest.prototype.STRONG ? "Strong" : "Weak"), b = h, void f(m))
      },
      reset: function() {
        a = {}, b = 0
      }
    }
  }, MediaPlayer.rules.InsufficientBufferRule.prototype = {
    constructor: MediaPlayer.rules.InsufficientBufferRule
  }, MediaPlayer.rules.ThroughputRule = function() {
    "use strict";
    var a = [],
      b = 0,
      c = 2,
      d = 3,
      e = function(b, c) {
        a[b] = a[b] || [], c !== 1 / 0 && c !== a[b][a[b].length - 1] && a[b].push(c)
      },
      f = function(b, e) {
        var f = 0,
          g = e ? c : d,
          h = a[b],
          i = h.length;
        if (g = g > i ? i : g, i > 0) {
          for (var j = i - g, k = 0, l = j; i > l; l++) k += h[l];
          f = k / g
        }
        return h.length > g && h.shift(), f * MediaPlayer.dependencies.AbrController.BANDWIDTH_SAFETY / 1e3
      };
    return {
      log: void 0,
      metricsExt: void 0,
      metricsModel: void 0,
      manifestExt: void 0,
      manifestModel: void 0,
      execute: function(a, c) {
        var d, g, h, i = this,
          j = (new Date).getTime() / 1e3,
          k = a.getMediaInfo(),
          l = k.type,
          m = a.getCurrentValue(),
          n = a.getTrackInfo(),
          o = i.metricsModel.getReadOnlyMetricsFor(l),
          p = a.getStreamProcessor(),
          q = p.getABRController(),
          r = p.isDynamic(),
          s = i.metricsExt.getCurrentHttpRequest(o),
          t = isNaN(n.fragmentDuration) ? 2 : n.fragmentDuration / 2,
          u = o.BufferState.length > 0 ? o.BufferState[o.BufferState.length - 1] : null,
          v = o.BufferLevel.length > 0 ? o.BufferLevel[o.BufferLevel.length - 1] : null,
          w = new MediaPlayer.rules.SwitchRequest(MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE, MediaPlayer.rules.SwitchRequest.prototype.WEAK);
        if (t > j - b || !o || null === s || s.type !== MediaPlayer.vo.metrics.HTTPRequest.MEDIA_SEGMENT_TYPE || null === u || null === v) return void c(w);
        if (d = (s.tfinish.getTime() - s.tresponse.getTime()) / 1e3, s.trace.length && (h = Math.round(8 * s.trace[s.trace.length - 1].b / d), e(l, h)), g = Math.round(f(l, r)), q.setAverageThroughput(l, g), q.getAbandonmentStateFor(l) !== MediaPlayer.dependencies.AbrController.ABANDON_LOAD) {
          if (u.state === MediaPlayer.dependencies.BufferController.BUFFER_LOADED && (v.level >= 2 * MediaPlayer.dependencies.BufferController.LOW_BUFFER_THRESHOLD || r)) {
            var x = q.getQualityForBitrate(k, g);
            w = new MediaPlayer.rules.SwitchRequest(x, MediaPlayer.rules.SwitchRequest.prototype.DEFAULT)
          }
          w.value !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE && w.value !== m && i.log("ThroughputRule requesting switch to index: ", w.value, "type: ", l, " Priority: ", w.priority === MediaPlayer.rules.SwitchRequest.prototype.DEFAULT ? "Default" : w.priority === MediaPlayer.rules.SwitchRequest.prototype.STRONG ? "Strong" : "Weak", "Average throughput", Math.round(g), "kbps")
        }
        c(w)
      },
      reset: function() {
        a = [], b = 0
      }
    }
  }, MediaPlayer.rules.ThroughputRule.prototype = {
    constructor: MediaPlayer.rules.ThroughputRule
  }, MediaPlayer.rules.RulesContext = function(a, b) {
    "use strict";
    var c = a.getCurrentRepresentationInfo(),
      d = a;
    return {
      getStreamInfo: function() {
        return c.mediaInfo.streamInfo
      },
      getMediaInfo: function() {
        return c.mediaInfo
      },
      getTrackInfo: function() {
        return c
      },
      getCurrentValue: function() {
        return b
      },
      getManifestInfo: function() {
        return c.mediaInfo.streamInfo.manifestInfo
      },
      getStreamProcessor: function() {
        return d
      }
    }
  }, MediaPlayer.rules.RulesContext.prototype = {
    constructor: MediaPlayer.rules.RulesContext
  }, MediaPlayer.rules.RulesController = function() {
    "use strict";
    var a = {},
      b = ["execute"],
      c = function(a) {
        return a === this.SCHEDULING_RULE || a === this.ABR_RULE
      },
      d = function(a) {
        var c = b.length,
          d = 0;
        for (d; c > d; d += 1)
          if (!a.hasOwnProperty(b[d])) return !1;
        return !0
      },
      e = function(a, b) {
        return new MediaPlayer.rules.RulesContext(a, b)
      },
      f = function(a) {
        var b = a.execute.bind(a);
        return a.execute = function(c, d) {
          var e = function(b) {
            d.call(a, new MediaPlayer.rules.SwitchRequest(b.value, b.priority))
          };
          b(c, e)
        }, "function" != typeof a.reset && (a.reset = function() {}), a
      },
      g = function(a, b, c) {
        var e, g, h, i, j, k;
        for (g in b)
          if (i = b[g], j = i.length)
            for (k = 0; j > k; k += 1) e = i[k], d.call(this, e) && (e = f.call(this, e), h = a.getRules(g), c && (c = !1, h.length = 0), this.system.injectInto(e), h.push(e))
      };
    return {
      system: void 0,
      log: void 0,
      SCHEDULING_RULE: 0,
      ABR_RULE: 1,
      SYNC_RULE: 2,
      initialize: function() {
        a[this.ABR_RULE] = this.system.getObject("abrRulesCollection"), a[this.SCHEDULING_RULE] = this.system.getObject("scheduleRulesCollection"), a[this.SYNC_RULE] = this.system.getObject("synchronizationRulesCollection")
      },
      setRules: function(b, d) {
        c.call(this, b) && d && g.call(this, a[b], d, !0)
      },
      addRules: function(b, d) {
        c.call(this, b) && d && g.call(this, a[b], d, !1)
      },
      applyRules: function(a, b, c, f, g) {
        var h, i, j = a.length,
          k = j,
          l = {},
          m = e.call(this, b, f),
          n = function(a) {
            var b, d;
            a.value !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE && (l[a.priority] = g(l[a.priority], a.value)), --j || (l[MediaPlayer.rules.SwitchRequest.prototype.WEAK] !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE && (d = MediaPlayer.rules.SwitchRequest.prototype.WEAK, b = l[MediaPlayer.rules.SwitchRequest.prototype.WEAK]), l[MediaPlayer.rules.SwitchRequest.prototype.DEFAULT] !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE && (d = MediaPlayer.rules.SwitchRequest.prototype.DEFAULT, b = l[MediaPlayer.rules.SwitchRequest.prototype.DEFAULT]), l[MediaPlayer.rules.SwitchRequest.prototype.STRONG] !== MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE && (d = MediaPlayer.rules.SwitchRequest.prototype.STRONG, b = l[MediaPlayer.rules.SwitchRequest.prototype.STRONG]), d != MediaPlayer.rules.SwitchRequest.prototype.STRONG && d != MediaPlayer.rules.SwitchRequest.prototype.WEAK && (d = MediaPlayer.rules.SwitchRequest.prototype.DEFAULT), c({
              value: void 0 !== b ? b : f,
              confidence: d
            }))
          };
        for (l[MediaPlayer.rules.SwitchRequest.prototype.STRONG] = MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE, l[MediaPlayer.rules.SwitchRequest.prototype.WEAK] = MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE, l[MediaPlayer.rules.SwitchRequest.prototype.DEFAULT] = MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE, i = 0; k > i; i += 1) h = a[i], d.call(this, h) ? h.execute(m, n) : j--
      },
      reset: function() {
        var b, c, d = a[this.ABR_RULE],
          e = a[this.SCHEDULING_RULE],
          f = a[this.SYNC_RULE],
          g = (d.getRules(MediaPlayer.rules.ABRRulesCollection.prototype.QUALITY_SWITCH_RULES) || []).concat(e.getRules(MediaPlayer.rules.ScheduleRulesCollection.prototype.NEXT_FRAGMENT_RULES) || []).concat(e.getRules(MediaPlayer.rules.ScheduleRulesCollection.prototype.FRAGMENTS_TO_SCHEDULE_RULES) || []).concat(e.getRules(MediaPlayer.rules.ScheduleRulesCollection.prototype.FRAGMENTS_TO_EXECUTE_RULES) || []).concat(f.getRules(MediaPlayer.rules.SynchronizationRulesCollection.prototype.TIME_SYNCHRONIZED_RULES) || []).concat(f.getRules(MediaPlayer.rules.SynchronizationRulesCollection.prototype.BEST_GUESS_RULES) || []),
          h = g.length;
        for (c = 0; h > c; c += 1) b = g[c], "function" == typeof b.reset && b.reset();
        a = {}
      }
    }
  }, MediaPlayer.rules.RulesController.prototype = {
    constructor: MediaPlayer.rules.RulesController
  }, MediaPlayer.rules.BufferLevelRule = function() {
    "use strict";
    var a = {},
      b = {},
      c = {},
      d = function(a) {
        var b = this.metricsExt.getCurrentHttpRequest(a);
        return null !== b ? (b.tresponse.getTime() - b.trequest.getTime()) / 1e3 : 0
      },
      e = function(a, b, c) {
        var d;
        return d = c ? this.playbackController.getLiveDelay() : isNaN(b) || MediaPlayer.dependencies.BufferController.DEFAULT_MIN_BUFFER_TIME < b && b > a ? Math.max(MediaPlayer.dependencies.BufferController.DEFAULT_MIN_BUFFER_TIME, a) : a >= b ? Math.min(b, MediaPlayer.dependencies.BufferController.DEFAULT_MIN_BUFFER_TIME) : Math.min(b, a)
      },
      f = function(a, b, c) {
        var f = this,
          g = c.bufferController.getCriticalBufferLevel(),
          h = f.metricsModel.getReadOnlyMetricsFor("video"),
          i = f.metricsModel.getReadOnlyMetricsFor("audio"),
          j = e.call(this, c.bufferController.getMinBufferTime(), b, a),
          k = j,
          l = c.bufferController.bufferMax,
          m = 0;
        return l === MediaPlayer.dependencies.BufferController.BUFFER_SIZE_MIN ? m = j : l === MediaPlayer.dependencies.BufferController.BUFFER_SIZE_INFINITY ? m = b : l === MediaPlayer.dependencies.BufferController.BUFFER_SIZE_REQUIRED && (!a && f.abrController.isPlayingAtTopQuality(c.streamProcessor.getStreamInfo()) && (k = MediaPlayer.dependencies.BufferController.BUFFER_TIME_AT_TOP_QUALITY), m = k + Math.max(d.call(f, h), d.call(f, i))), m = Math.min(m, g)
      },
      g = function(a, c) {
        return b[a] && b[a][c]
      },
      h = function(b, c) {
        return a[b] && a[b][c]
      },
      i = function(a) {
        var c = a.data.fragmentModel.getContext().streamProcessor.getStreamInfo().id;
        b[c] = b[c] || {}, b[c][a.data.request.mediaType] = !0
      },
      j = function(b) {
        var c = b.sender.streamProcessor.getStreamInfo().id;
        a[c] = a[c] || {}, a[c][b.sender.streamProcessor.getType()] = !0
      },
      k = function(b) {
        var c = b.sender.streamProcessor.getStreamInfo().id;
        a[c] = a[c] || {}, a[c][b.sender.streamProcessor.getType()] = !1
      };
    return {
      metricsExt: void 0,
      metricsModel: void 0,
      abrController: void 0,
      playbackController: void 0,
      mediaController: void 0,
      virtualBuffer: void 0,
      setup: function() {
        this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_OUTRUN] = j, this[MediaPlayer.dependencies.BufferController.eventList.ENAME_BUFFER_LEVEL_BALANCED] = k, this[MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED] = i
      },
      setScheduleController: function(a) {
        var b = a.streamProcessor.getStreamInfo().id;
        c[b] = c[b] || {}, c[b][a.streamProcessor.getType()] = a
      },
      execute: function(a, b) {
        var d = a.getStreamInfo(),
          e = d.id,
          i = a.getMediaInfo(),
          j = i.type;
        if (h(e, j)) return void b(new MediaPlayer.rules.SwitchRequest(0, MediaPlayer.rules.SwitchRequest.prototype.STRONG));
        var k, l = this.metricsModel.getReadOnlyMetricsFor(j),
          m = this.mediaController.getSwitchMode(),
          n = this.metricsExt.getCurrentBufferLevel(l) ? this.metricsExt.getCurrentBufferLevel(l).level : 0,
          o = this.playbackController.getTime(),
          p = this.virtualBuffer.getChunks({
            streamId: e,
            mediaType: j,
            appended: !0,
            mediaInfo: i,
            forRange: {
              start: o,
              end: o + n
            }
          }),
          q = p && p.length > 0 ? p[p.length - 1].bufferedRange.end - o : null,
          r = m === MediaPlayer.dependencies.MediaController.trackSwitchModes.NEVER_REPLACE ? n : q || 0,
          s = c[e][j],
          t = s.streamProcessor.getCurrentRepresentationInfo(),
          u = s.streamProcessor.isDynamic(),
          v = this.metricsExt.getCurrentPlaybackRate(l),
          w = d.manifestInfo.duration,
          x = r / Math.max(v, 1),
          y = t.fragmentDuration,
          z = u ? Number.POSITIVE_INFINITY : w - o,
          A = Math.min(f.call(this, u, w, s), z),
          B = Math.max(A - x, 0);
        k = Math.ceil(B / y), x >= z && !g(e, j) && (k = k || 1), b(new MediaPlayer.rules.SwitchRequest(k, MediaPlayer.rules.SwitchRequest.prototype.DEFAULT))
      },
      reset: function() {
        a = {}, b = {}, c = {}
      }
    }
  }, MediaPlayer.rules.BufferLevelRule.prototype = {
    constructor: MediaPlayer.rules.BufferLevelRule
  }, MediaPlayer.rules.PendingRequestsRule = function() {
    "use strict";
    var a = 3,
      b = {};
    return {
      metricsExt: void 0,
      setScheduleController: function(a) {
        var c = a.streamProcessor.getStreamInfo().id;
        b[c] = b[c] || {}, b[c][a.streamProcessor.getType()] = a
      },
      execute: function(c, d) {
        var e = c.getMediaInfo().type,
          f = c.getStreamInfo().id,
          g = c.getCurrentValue(),
          h = b[f][e],
          i = h.getFragmentModel(),
          j = i.getRequests({
            state: [MediaPlayer.dependencies.FragmentModel.states.PENDING, MediaPlayer.dependencies.FragmentModel.states.LOADING]
          }),
          k = i.getRequests({
            state: MediaPlayer.dependencies.FragmentModel.states.REJECTED
          }),
          l = k.length,
          m = j.length,
          n = Math.max(g - m, 0);
        return l > 0 ? void d(new MediaPlayer.rules.SwitchRequest(l, MediaPlayer.rules.SwitchRequest.prototype.DEFAULT)) : m > a ? void d(new MediaPlayer.rules.SwitchRequest(0, MediaPlayer.rules.SwitchRequest.prototype.DEFAULT)) : 0 === g ? void d(new MediaPlayer.rules.SwitchRequest(n, MediaPlayer.rules.SwitchRequest.prototype.NO_CHANGE)) : void d(new MediaPlayer.rules.SwitchRequest(n, MediaPlayer.rules.SwitchRequest.prototype.DEFAULT))
      },
      reset: function() {
        b = {}
      }
    }
  }, MediaPlayer.rules.PendingRequestsRule.prototype = {
    constructor: MediaPlayer.rules.PendingRequestsRule
  }, MediaPlayer.rules.PlaybackTimeRule = function() {
    "use strict";
    var a = {},
      b = {},
      c = function(b) {
        setTimeout(function() {
          var c = b.data.seekTime;
          a.audio = c, a.video = c, a.fragmentedText = c
        }, 0)
      };
    return {
      adapter: void 0,
      sourceBufferExt: void 0,
      virtualBuffer: void 0,
      playbackController: void 0,
      textSourceBuffer: void 0,
      setup: function() {
        this[MediaPlayer.dependencies.PlaybackController.eventList.ENAME_PLAYBACK_SEEKING] = c
      },
      setScheduleController: function(a) {
        var c = a.streamProcessor.getStreamInfo().id;
        b[c] = b[c] || {}, b[c][a.streamProcessor.getType()] = a
      },
      execute: function(c, d) {
        var e, f, g, h = c.getMediaInfo(),
          i = h.type,
          j = c.getStreamInfo().id,
          k = b[j][i],
          l = .1,
          m = b[j][i].streamProcessor,
          n = m.getCurrentRepresentationInfo(),
          o = a ? a[i] : null,
          p = void 0 !== o && null !== o,
          q = p ? MediaPlayer.rules.SwitchRequest.prototype.STRONG : MediaPlayer.rules.SwitchRequest.prototype.DEFAULT,
          r = k.getFragmentModel().getRequests({
            state: MediaPlayer.dependencies.FragmentModel.states.REJECTED
          })[0],
          s = !!r && !p,
          t = m.getIndexHandlerTime(),
          u = this.playbackController.getTime(),
          v = r ? r.startTime + r.duration : null,
          w = !p && r && (v > u && r.startTime <= t || isNaN(t)),
          x = m.bufferController.getBuffer(),
          y = null;
        if (f = p ? o : w ? r.startTime : t, !p && !r && f > u + MediaPlayer.dependencies.BufferController.BUFFER_TIME_AT_TOP_QUALITY) return void d(new MediaPlayer.rules.SwitchRequest(null, q));
        if (r && k.getFragmentModel().removeRejectedRequest(r), isNaN(f) || "fragmentedText" === i && this.textSourceBuffer.getAllTracksAreDisabled()) return void d(new MediaPlayer.rules.SwitchRequest(null, q));
        for (p && (a[i] = null), x && (y = this.sourceBufferExt.getBufferRange(m.bufferController.getBuffer(), f), null !== y && (e = this.virtualBuffer.getChunks({
            streamId: j,
            mediaType: i,
            appended: !0,
            mediaInfo: h,
            forRange: y
          }), e && e.length > 0 && (f = e[e.length - 1].bufferedRange.end))), g = this.adapter.getFragmentRequestForTime(m, n, f, {
            keepIdx: s
          }), w && g && g.index !== r.index && (g = this.adapter.getFragmentRequestForTime(m, n, r.startTime + r.duration / 2 + l, {
            keepIdx: s,
            timeThreshold: 0
          })); g && m.getFragmentModel().isFragmentLoadedOrPending(g);) {
          if ("complete" === g.action) {
            g = null, m.setIndexHandlerTime(NaN);
            break
          }
          g = this.adapter.getNextFragmentRequest(m, n)
        }
        g && !w && m.setIndexHandlerTime(g.startTime + g.duration), d(new MediaPlayer.rules.SwitchRequest(g, q))
      },
      reset: function() {
        a = {}, b = {}
      }
    }
  }, MediaPlayer.rules.PlaybackTimeRule.prototype = {
    constructor: MediaPlayer.rules.PlaybackTimeRule
  }, MediaPlayer.rules.SameTimeRequestRule = function() {
    "use strict";
    var a = {},
      b = function(a, b) {
        var c, e, f, g, h, i = 0,
          j = a.length;
        for (i; j > i; i += 1)
          for (f = a[i].getRequests({
              state: MediaPlayer.dependencies.FragmentModel.states.PENDING
            }), d.call(this, f, "index"), g = 0, h = f.length; h > g; g++) {
            if (c = f[g], isNaN(c.startTime) && "complete" !== c.action) {
              e = c;
              break
            }
            c.startTime > b && (!e || c.startTime < e.startTime) && (e = c)
          }
        return e || c
      },
      c = function(a, b) {
        var c, d, e = a.length,
          f = null;
        for (d = 0; e > d; d += 1) c = a[d].getRequests({
          state: MediaPlayer.dependencies.FragmentModel.states.PENDING,
          time: b
        })[0], c && (!f || c.startTime > f.startTime) && (f = c);
        return f
      },
      d = function(a, b) {
        var c = function(a, c) {
          return a[b] < c[b] || isNaN(a[b]) && "complete" !== a.action ? -1 : a[b] > c[b] ? 1 : 0
        };
        a.sort(c)
      },
      e = function(b, c) {
        return a[b] && a[b][c] ? a[b][c] : NaN
      },
      f = function(b) {
        var c = b.data.fragmentModel,
          d = b.data.request,
          e = c.getContext().streamProcessor.getStreamInfo().id,
          f = d.mediaType;
        a[e] = a[e] || {}, a[e][f] = d.index - 1
      };
    return {
      playbackController: void 0,
      setup: function() {
        this[MediaPlayer.dependencies.FragmentController.eventList.ENAME_STREAM_COMPLETED] = f
      },
      setFragmentModels: function(a, b) {
        this.fragmentModels = this.fragmentModels || {}, this.fragmentModels[b] = a
      },
      execute: function(a, d) {
        var f, g, h, i, j, k, l, m, n, o = a.getStreamInfo(),
          p = o.id,
          q = a.getCurrentValue(),
          r = MediaPlayer.rules.SwitchRequest.prototype.DEFAULT,
          s = this.playbackController,
          t = this.fragmentModels[p],
          u = new Date,
          v = null,
          w = t ? t.length : null,
          x = !1,
          y = [];
        if (!t || !w) return void d(new MediaPlayer.rules.SwitchRequest([], r));
        if (k = s.isPlaybackStarted() ? s.getTime() : s.getStreamStartTime(o), l = c(t, k), j = l || b(t, k) || q, !j) return void d(new MediaPlayer.rules.SwitchRequest([], r));
        for (i = 0; w > i; i += 1)
          if (g = t[i], f = g.getContext().streamProcessor.getType(), "video" === f || "audio" === f || "fragmentedText" === f) {
            if (m = g.getRequests({
                state: MediaPlayer.dependencies.FragmentModel.states.PENDING
              }), n = g.getRequests({
                state: MediaPlayer.dependencies.FragmentModel.states.LOADING
              }).length, n > MediaPlayer.dependencies.ScheduleController.LOADING_REQUEST_THRESHOLD) return void d(new MediaPlayer.rules.SwitchRequest([], r));
            if (v = v || (j === l ? k : j.startTime), -1 === m.indexOf(j)) {
              if (h = g.getRequests({
                  state: MediaPlayer.dependencies.FragmentModel.states.PENDING,
                  time: v
                })[0], h || 0 !== j.index || (h = m.filter(function(a) {
                  return a.index === j.index
                })[0]), h) y.push(h);
              else if (h = g.getRequests({
                  state: MediaPlayer.dependencies.FragmentModel.states.LOADING,
                  time: v
                })[0] || g.getRequests({
                  state: MediaPlayer.dependencies.FragmentModel.states.EXECUTED,
                  time: v
                })[0], !h && j.index !== e.call(this, p, j.mediaType) && "fragmentedText" !== f) {
                x = !0;
                break
              }
            } else y.push(j)
          } return y = y.filter(function(a) {
          return "complete" === a.action || u.getTime() >= a.availabilityStartTime.getTime()
        }), x ? void d(new MediaPlayer.rules.SwitchRequest([], r)) : void d(new MediaPlayer.rules.SwitchRequest(y, r))
      },
      reset: function() {
        a = {}
      }
    }
  }, MediaPlayer.rules.SameTimeRequestRule.prototype = {
    constructor: MediaPlayer.rules.SameTimeRequestRule
  }, MediaPlayer.rules.ScheduleRulesCollection = function() {
    "use strict";
    var a = [],
      b = [],
      c = [];
    return {
      bufferLevelRule: void 0,
      pendingRequestsRule: void 0,
      playbackTimeRule: void 0,
      sameTimeRequestRule: void 0,
      getRules: function(d) {
        switch (d) {
          case MediaPlayer.rules.ScheduleRulesCollection.prototype.FRAGMENTS_TO_SCHEDULE_RULES:
            return a;
          case MediaPlayer.rules.ScheduleRulesCollection.prototype.NEXT_FRAGMENT_RULES:
            return c;
          case MediaPlayer.rules.ScheduleRulesCollection.prototype.FRAGMENTS_TO_EXECUTE_RULES:
            return b;
          default:
            return null
        }
      },
      setup: function() {
        a.push(this.bufferLevelRule), a.push(this.pendingRequestsRule), c.push(this.playbackTimeRule), b.push(this.sameTimeRequestRule)
      }
    }
  }, MediaPlayer.rules.ScheduleRulesCollection.prototype = {
    constructor: MediaPlayer.rules.ScheduleRulesCollection,
    FRAGMENTS_TO_SCHEDULE_RULES: "fragmentsToScheduleRules",
    NEXT_FRAGMENT_RULES: "nextFragmentRules",
    FRAGMENTS_TO_EXECUTE_RULES: "fragmentsToExecuteRules"
  }, MediaPlayer.rules.SwitchRequest = function(a, b) {
    "use strict";
    this.value = a, this.priority = b, void 0 === this.value && (this.value = 999), void 0 === this.priority && (this.priority = .5)
  }, MediaPlayer.rules.SwitchRequest.prototype = {
    constructor: MediaPlayer.rules.SwitchRequest,
    NO_CHANGE: 999,
    DEFAULT: .5,
    STRONG: 1,
    WEAK: 0
  }, MediaPlayer.rules.LiveEdgeBinarySearchRule = function() {
    "use strict";
    var a, b, c, d = 43200,
      e = NaN,
      f = null,
      g = NaN,
      h = null,
      i = !1,
      j = NaN,
      k = MediaPlayer.rules.SwitchRequest.prototype.DEFAULT,
      l = function(a, d, e, f) {
        var g, i = this;
        if (null === f) g = i.adapter.generateFragmentRequestForTime(c, h, a), l.call(i, a, d, e, g);
        else {
          var j = function(c) {
            b.unsubscribe(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_CHECK_FOR_EXISTENCE_COMPLETED, i, j), c.data.exists ? d.call(i, c.data.request, a) : e.call(i, c.data.request, a)
          };
          b.subscribe(MediaPlayer.dependencies.FragmentLoader.eventList.ENAME_CHECK_FOR_EXISTENCE_COMPLETED, i, j), b.checkForExistence(f)
        }
      },
      m = function(b, d) {
        var j, p, q;
        return i ? void o.call(this, !1, d) : (q = d - e, j = q > 0 ? e - q : e + Math.abs(q) + g, void(j < f.start && j > f.end ? a(new MediaPlayer.rules.SwitchRequest(null, k)) : (p = this.adapter.getFragmentRequestForTime(c, h, j, {
          ignoreIsFinished: !0
        }), l.call(this, j, n, m, p))))
      },
      n = function(b, d) {
        var m, n, p = b.startTime,
          q = this;
        if (!i) {
          if (!h.fragmentDuration) return void a(new MediaPlayer.rules.SwitchRequest(p, k));
          if (i = !0, f.end = p + 2 * g, d === e) return n = d + j, m = q.adapter.getFragmentRequestForTime(c, h, n, {
            ignoreIsFinished: !0
          }), void l.call(q, n, function() {
            o.call(q, !0, n)
          }, function() {
            a(new MediaPlayer.rules.SwitchRequest(n, k))
          }, m)
        }
        o.call(this, !0, d)
      },
      o = function(b, d) {
        var e, g, i;
        b ? f.start = d : f.end = d, e = Math.floor(f.end - f.start) <= j, e ? a(new MediaPlayer.rules.SwitchRequest(b ? d : d - j, k)) : (i = (f.start + f.end) / 2, g = this.adapter.getFragmentRequestForTime(c, h, i, {
          ignoreIsFinished: !0
        }), l.call(this, i, n, m, g))
      };
    return {
      metricsExt: void 0,
      adapter: void 0,
      timelineConverter: void 0,
      execute: function(i, o) {
        var p, q, r = this;
        if (a = o, c = i.getStreamProcessor(), b = c.getFragmentLoader(), h = i.getTrackInfo(), j = h.fragmentDuration, q = h.DVRWindow, e = q.end, h.useCalculatedLiveEdgeTime) {
          var s = r.timelineConverter.getExpectedLiveEdge();
          return r.timelineConverter.setExpectedLiveEdge(e), void a(new MediaPlayer.rules.SwitchRequest(s, k))
        }
        f = {
          start: Math.max(0, e - d),
          end: e + d
        }, g = Math.floor((q.end - q.start) / 2), p = r.adapter.getFragmentRequestForTime(c, h, e, {
          ignoreIsFinished: !0
        }), l.call(r, e, n, m, p)
      },
      reset: function() {
        e = NaN, f = null, g = NaN, h = null, i = !1, j = NaN, c = null, b = null
      }
    }
  }, MediaPlayer.rules.LiveEdgeBinarySearchRule.prototype = {
    constructor: MediaPlayer.rules.LiveEdgeBinarySearchRule
  }, MediaPlayer.rules.LiveEdgeWithTimeSynchronizationRule = function() {
    "use strict";
    return {
      timelineConverter: void 0,
      execute: function(a, b) {
        var c = a.getTrackInfo(),
          d = c.DVRWindow.end,
          e = MediaPlayer.rules.SwitchRequest.prototype.DEFAULT;
        if (c.useCalculatedLiveEdgeTime) {
          var f = this.timelineConverter.getExpectedLiveEdge();
          this.timelineConverter.setExpectedLiveEdge(d), b(new MediaPlayer.rules.SwitchRequest(f, e))
        } else b(new MediaPlayer.rules.SwitchRequest(d, e))
      }
    }
  }, MediaPlayer.rules.LiveEdgeWithTimeSynchronizationRule.prototype = {
    constructor: MediaPlayer.rules.LiveEdgeWithTimeSynchronizationRule
  }, MediaPlayer.rules.SynchronizationRulesCollection = function() {
    "use strict";
    var a = [],
      b = [];
    return {
      liveEdgeBinarySearchRule: void 0,
      liveEdgeWithTimeSynchronizationRule: void 0,
      getRules: function(c) {
        switch (c) {
          case MediaPlayer.rules.SynchronizationRulesCollection.prototype.TIME_SYNCHRONIZED_RULES:
            return a;
          case MediaPlayer.rules.SynchronizationRulesCollection.prototype.BEST_GUESS_RULES:
            return b;
          default:
            return null
        }
      },
      setup: function() {
        a.push(this.liveEdgeWithTimeSynchronizationRule), b.push(this.liveEdgeBinarySearchRule)
      }
    }
  }, MediaPlayer.rules.SynchronizationRulesCollection.prototype = {
    constructor: MediaPlayer.rules.SynchronizationRulesCollection,
    TIME_SYNCHRONIZED_RULES: "withAccurateTimeSourceRules",
    BEST_GUESS_RULES: "bestGuestRules"
  }, MediaPlayer.utils.BoxParser = function() {
    "use strict";
    var a = function(a) {
      if (!a) return null;
      void 0 === a.fileStart && (a.fileStart = 0);
      var b = ISOBoxer.parseBuffer(a),
        c = this.system.getObject("isoFile");
      return c.setData(b), c
    };
    return {
      system: void 0,
      log: void 0,
      parse: a
    }
  }, MediaPlayer.utils.BoxParser.prototype = {
    constructor: MediaPlayer.utils.BoxParser
  }, MediaPlayer.utils.Capabilities = function() {
    "use strict"
  }, MediaPlayer.utils.Capabilities.prototype = {
    constructor: MediaPlayer.utils.Capabilities,
    system: void 0,
    log: void 0,
    supportsMediaSource: function() {
      "use strict";
      var a = "WebKitMediaSource" in window,
        b = "MediaSource" in window;
      return a || b
    },
    supportsEncryptedMedia: function() {
      return this.system.hasMapping("protectionModel")
    },
    supportsCodec: function(a, b) {
      "use strict";
      if (!(a instanceof HTMLMediaElement)) throw "element must be of type HTMLMediaElement.";
      var c = a.canPlayType(b);
      return "probably" === c || "maybe" === c
    }
  }, MediaPlayer.utils.CustomTimeRanges = function() {
    return {
      customTimeRangeArray: [],
      length: 0,
      add: function(a, b) {
        var c = 0;
        for (c = 0; c < this.customTimeRangeArray.length && a > this.customTimeRangeArray[c].start; c++);
        for (this.customTimeRangeArray.splice(c, 0, {
            start: a,
            end: b
          }), c = 0; c < this.customTimeRangeArray.length - 1; c++) this.mergeRanges(c, c + 1) && c--;
        this.length = this.customTimeRangeArray.length
      },
      clear: function() {
        this.customTimeRangeArray = [], this.length = 0
      },
      remove: function(a, b) {
        for (var c = 0; c < this.customTimeRangeArray.length; c++)
          if (a <= this.customTimeRangeArray[c].start && b >= this.customTimeRangeArray[c].end) this.customTimeRangeArray.splice(c, 1), c--;
          else {
            if (a > this.customTimeRangeArray[c].start && b < this.customTimeRangeArray[c].end) {
              this.customTimeRangeArray.splice(c + 1, 0, {
                start: b,
                end: this.customTimeRangeArray[c].end
              }), this.customTimeRangeArray[c].end = a;
              break
            }
            a > this.customTimeRangeArray[c].start && a < this.customTimeRangeArray[c].end ? this.customTimeRangeArray[c].end = a : b > this.customTimeRangeArray[c].start && b < this.customTimeRangeArray[c].end && (this.customTimeRangeArray[c].start = b)
          } this.length = this.customTimeRangeArray.length
      },
      mergeRanges: function(a, b) {
        var c = this.customTimeRangeArray[a],
          d = this.customTimeRangeArray[b];
        return c.start <= d.start && d.start <= c.end && c.end <= d.end ? (c.end = d.end, this.customTimeRangeArray.splice(b, 1), !0) : d.start <= c.start && c.start <= d.end && d.end <= c.end ? (c.start = d.start, this.customTimeRangeArray.splice(b, 1), !0) : d.start <= c.start && c.start <= d.end && c.end <= d.end ? (this.customTimeRangeArray.splice(a, 1), !0) : c.start <= d.start && d.start <= c.end && d.end <= c.end ? (this.customTimeRangeArray.splice(b, 1), !0) : !1
      },
      start: function(a) {
        return this.customTimeRangeArray[a].start
      },
      end: function(a) {
        return this.customTimeRangeArray[a].end
      }
    }
  }, MediaPlayer.utils.CustomTimeRanges.prototype = {
    constructor: MediaPlayer.utils.CustomTimeRanges
  }, MediaPlayer.utils.DOMStorage = function() {
    var a, b = !0,
      c = !0,
      d = function(a, b) {
        void 0 === b || isNaN(b) || "number" != typeof b || (MediaPlayer.utils.DOMStorage[a] = b)
      },
      e = function(a) {
        if (!this.isSupported(MediaPlayer.utils.DOMStorage.STORAGE_TYPE_LOCAL) || !c) return null;
        var b = MediaPlayer.utils.DOMStorage["LOCAL_STORAGE_" + a.toUpperCase() + "_SETTINGS_KEY"],
          d = JSON.parse(localStorage.getItem(b)) || {},
          e = (new Date).getTime() - parseInt(d.timestamp) >= MediaPlayer.utils.DOMStorage.LOCAL_STORAGE_MEDIA_SETTINGS_EXPIRATION || !1,
          f = d.settings;
        return e && (localStorage.removeItem(b), f = null), f
      },
      f = function() {
        ["video", "audio"].forEach(function(a) {
          if (void 0 === this.abrController.getInitialBitrateFor(a)) {
            if (this.isSupported(MediaPlayer.utils.DOMStorage.STORAGE_TYPE_LOCAL) && b) {
              var c = MediaPlayer.utils.DOMStorage["LOCAL_STORAGE_" + a.toUpperCase() + "_BITRATE_KEY"],
                d = JSON.parse(localStorage.getItem(c)) || {},
                e = (new Date).getTime() - parseInt(d.timestamp) >= MediaPlayer.utils.DOMStorage.LOCAL_STORAGE_BITRATE_EXPIRATION || !1,
                f = parseInt(d.bitrate);
              isNaN(f) || e ? e && localStorage.removeItem(c) : (this.abrController.setInitialBitrateFor(a, f), this.log("Last bitrate played for " + a + " was " + f))
            }
            void 0 === this.abrController.getInitialBitrateFor(a) && this.abrController.setInitialBitrateFor(a, MediaPlayer.dependencies.AbrController["DEFAULT_" + a.toUpperCase() + "_BITRATE"])
          }
        }, this)
      };
    return {
      system: void 0,
      log: void 0,
      abrController: void 0,
      checkInitialBitrate: f,
      getSavedMediaSettings: e,
      enableLastBitrateCaching: function(a, c) {
        b = a, d.call(this, "LOCAL_STORAGE_BITRATE_EXPIRATION", c)
      },
      enableLastMediaSettingsCaching: function(a, b) {
        c = a, d.call(this, "LOCAL_STORAGE_MEDIA_SETTINGS_EXPIRATION", b)
      },
      isSupported: function(b) {
        if (void 0 !== a) return a;
        a = !1;
        var c, d = "1",
          e = "1";
        try {
          c = window[b]
        } catch (f) {
          return this.log("Warning: DOMStorage access denied: " + f.message), a
        }
        if (!c || b !== MediaPlayer.utils.DOMStorage.STORAGE_TYPE_LOCAL && b !== MediaPlayer.utils.DOMStorage.STORAGE_TYPE_SESSION) return a;
        try {
          c.setItem(d, e), c.removeItem(d), a = !0
        } catch (f) {
          this.log("Warning: DOMStorage is supported, but cannot be used: " + f.message)
        }
        return a
      }
    }
  }, MediaPlayer.utils.DOMStorage.LOCAL_STORAGE_VIDEO_BITRATE_KEY = "dashjs_vbitrate", MediaPlayer.utils.DOMStorage.LOCAL_STORAGE_AUDIO_BITRATE_KEY = "dashjs_abitrate", MediaPlayer.utils.DOMStorage.LOCAL_STORAGE_AUDIO_SETTINGS_KEY = "dashjs_asettings", MediaPlayer.utils.DOMStorage.LOCAL_STORAGE_VIDEO_SETTINGS_KEY = "dashjs_vsettings", MediaPlayer.utils.DOMStorage.LOCAL_STORAGE_BITRATE_EXPIRATION = 36e4, MediaPlayer.utils.DOMStorage.LOCAL_STORAGE_MEDIA_SETTINGS_EXPIRATION = 36e4, MediaPlayer.utils.DOMStorage.STORAGE_TYPE_LOCAL = "localStorage", MediaPlayer.utils.DOMStorage.STORAGE_TYPE_SESSION = "sessionStorage", MediaPlayer.utils.DOMStorage.prototype = {
    constructor: MediaPlayer.utils.DOMStorage
  }, MediaPlayer.utils.Debug = function() {
    "use strict";
    var a, b = !0,
      c = !1,
      d = !1,
      e = (new Date).getTime();
    return {
      system: void 0,
      eventBus: void 0,
      setup: function() {
        this.system.mapValue("log", this.log), this.system.mapOutlet("log"), a = this.eventBus
      },
      setLogTimestampVisible: function(a) {
        c = a
      },
      showCalleeName: function(a) {
        d = a
      },
      setLogToBrowserConsole: function(a) {
        b = a
      },
      getLogToBrowserConsole: function() {
        return b
      },
      log: function() {
        var f = "",
          g = null;
        c && (g = (new Date).getTime(), f += "[" + (g - e) + "]"), d && this.getName && (f += "[" + this.getName() + "]"), this.getMediaType && this.getMediaType() && (f += "[" + this.getMediaType() + "]"), f.length > 0 && (f += " "), Array.apply(null, arguments).forEach(function(a) {
          f += a + " "
        }), b && console.log(f), a.dispatchEvent({
          type: "log",
          message: f
        })
      }
    }
  }, MediaPlayer.utils.EventBus = function() {
    "use strict";
    var a, b = function(b, c) {
        var d = (c ? "1" : "0") + b;
        return d in a || (a[d] = []), a[d]
      },
      c = function() {
        a = {}
      };
    return c(), {
      addEventListener: function(a, c, d) {
        var e = b(a, d),
          f = e.indexOf(c); - 1 === f && e.push(c)
      },
      removeEventListener: function(a, c, d) {
        var e = b(a, d),
          f = e.indexOf(c); - 1 !== f && e.splice(f, 1)
      },
      dispatchEvent: function(a) {
        for (var c = b(a.type, !1).slice(), d = 0; d < c.length; d++) c[d].call(this, a);
        return !a.defaultPrevented
      }
    }
  }, MediaPlayer.utils.IsoFile = function() {
    "use strict";
    var a, b = {
        offset: "_offset",
        size: "size",
        type: "type"
      },
      c = {
        references: "references",
        timescale: "timescale",
        earliest_presentation_time: "earliest_presentation_time",
        first_offset: "first_offset"
      },
      d = {
        reference_type: "reference_type",
        referenced_size: "referenced_size",
        subsegment_duration: "subsegment_duration"
      },
      e = {
        id: "id",
        value: "value",
        timescale: "timescale",
        scheme_id_uri: "scheme_id_uri",
        presentation_time_delta: "presentation_time_delta",
        event_duration: "event_duration",
        message_data: "message_data"
      },
      f = {
        timescale: "timescale"
      },
      g = {
        base_data_offset: "base_data_offset",
        sample_description_index: "sample_description_index",
        default_sample_duration: "default_sample_duration",
        default_sample_size: "default_sample_size",
        default_sample_flags: "default_sample_flags",
        flags: "flags"
      },
      h = {
        version: "version",
        baseMediaDecodeTime: "baseMediaDecodeTime",
        flags: "flags"
      },
      i = {
        sample_count: "sample_count",
        first_sample_flags: "first_sample_flags",
        data_offset: "data_offset",
        flags: "flags",
        samples: "samples"
      },
      j = {
        sample_size: "sample_size",
        sample_duration: "sample_duration",
        sample_composition_time_offset: "sample_composition_time_offset"
      },
      k = function(a, b, c) {
        for (var d in c) b[d] = a[c[d]]
      },
      l = function(a) {
        if (!a) return null;
        var l, m, n = new MediaPlayer.vo.IsoBox;
        switch (k(a, n, b), a.hasOwnProperty("_incomplete") && (n.isComplete = !a._incomplete), n.type) {
          case "sidx":
            if (k(a, n, c), n.references)
              for (l = 0, m = n.references.length; m > l; l += 1) k(a.references[l], n.references[l], d);
            break;
          case "emsg":
            k(a, n, e);
            break;
          case "mdhd":
            k(a, n, f);
            break;
          case "tfhd":
            k(a, n, g);
            break;
          case "tfdt":
            k(a, n, h);
            break;
          case "trun":
            if (k(a, n, i), n.samples)
              for (l = 0, m = n.samples.length; m > l; l += 1) k(a.samples[l], n.samples[l], j)
        }
        return n
      },
      m = function(b) {
        return b && a && a.boxes && 0 !== a.boxes.length ? l.call(this, a.fetch(b)) : null
      },
      n = function(b) {
        for (var c, d = a.fetchAll(b), e = [], f = 0, g = d.length; g > f; f += 1) c = l.call(this, d[f]), c && e.push(c);
        return e
      };
    return {
      getBox: m,
      getBoxes: n,
      setData: function(b) {
        a = b
      },
      getLastBox: function() {
        if (!a || !a.boxes || !a.boxes.length) return null;
        var b = a.boxes[a.boxes.length - 1].type,
          c = n.call(this, b);
        return c[c.length - 1]
      },
      getOffset: function() {
        return a._cursor.offset
      }
    }
  }, MediaPlayer.utils.IsoFile.prototype = {
    constructor: MediaPlayer.utils.IsoFile
  }, MediaPlayer.utils.VirtualBuffer = function() {
    var a = {},
      b = function(a, b) {
        var c = function(a, c) {
          return a[b] < c[b] ? -1 : a[b] > c[b] ? 1 : 0
        };
        a.sort(c)
      },
      c = function(b) {
        var c = b.streamId,
          d = b.mediaType;
        return a[c] ? a[c][d] : null
      },
      d = function(a, b, c) {
        var d, e, f, g, h = [],
          i = b.start,
          j = b.end;
        return a.forEach(function(a) {
          d = a.bufferedRange.start, e = a.bufferedRange.end, f = d >= i && j > d, g = e > i && j >= e, (f || g) && (h.push(a), c && (a.bufferedRange.start = f ? d : i, a.bufferedRange.end = g ? e : j))
        }), h
      },
      e = function() {
        var a = {};
        return a.audio = {
          calculatedBufferedRanges: new MediaPlayer.utils.CustomTimeRanges,
          actualBufferedRanges: new MediaPlayer.utils.CustomTimeRanges,
          appended: []
        }, a.audio[MediaPlayer.vo.metrics.HTTPRequest.MEDIA_SEGMENT_TYPE] = [], a.audio[MediaPlayer.vo.metrics.HTTPRequest.INIT_SEGMENT_TYPE] = [], a.video = {
          calculatedBufferedRanges: new MediaPlayer.utils.CustomTimeRanges,
          actualBufferedRanges: new MediaPlayer.utils.CustomTimeRanges,
          appended: []
        }, a.video[MediaPlayer.vo.metrics.HTTPRequest.MEDIA_SEGMENT_TYPE] = [], a.video[MediaPlayer.vo.metrics.HTTPRequest.INIT_SEGMENT_TYPE] = [], a.fragmentedText = {
          calculatedBufferedRanges: new MediaPlayer.utils.CustomTimeRanges,
          actualBufferedRanges: new MediaPlayer.utils.CustomTimeRanges,
          appended: []
        }, a.fragmentedText[MediaPlayer.vo.metrics.HTTPRequest.MEDIA_SEGMENT_TYPE] = [], a.fragmentedText[MediaPlayer.vo.metrics.HTTPRequest.INIT_SEGMENT_TYPE] = [], a
      };
    return {
      system: void 0,
      sourceBufferExt: void 0,
      notify: void 0,
      subscribe: void 0,
      unsubscribe: void 0,
      append: function(c) {
        var d = c.streamId,
          f = c.mediaInfo.type,
          g = c.segmentType,
          h = c.start,
          i = c.end;
        a[d] = a[d] || e(), a[d][f][g].push(c), b(a[d][f][g], "index"), isNaN(h) || isNaN(i) || (a[d][f].calculatedBufferedRanges.add(h, i), this.notify(MediaPlayer.utils.VirtualBuffer.eventList.CHUNK_APPENDED, {
          chunk: c
        }))
      },
      storeAppendedChunk: function(c, d) {
        if (c && d) {
          var e, f, g = c.streamId,
            h = c.mediaInfo.type,
            i = a[g][h].actualBufferedRanges,
            j = this.getChunks({
              streamId: g,
              mediaType: h,
              appended: !0,
              start: c.start
            })[0];
          if (j ? (f = a[g][h].appended.indexOf(j), a[g][h].appended[f] = c) : a[g][h].appended.push(c), b(a[g][h].appended, "start"), e = this.sourceBufferExt.getRangeDifference(i, d), !e) return void(j && (c.bufferedRange = j.bufferedRange));
          c.bufferedRange = e, i.add(e.start, e.end), j && (c.bufferedRange.start = Math.min(j.bufferedRange.start, e.start), c.bufferedRange.end = Math.max(j.bufferedRange.end, e.end))
        }
      },
      updateBufferedRanges: function(b, c) {
        if (b) {
          var e, f, g = b.streamId,
            h = b.mediaType,
            i = this.getChunks({
              streamId: g,
              mediaType: h,
              appended: !0
            }),
            j = [];
          if (a[g][h].actualBufferedRanges = new MediaPlayer.utils.CustomTimeRanges, !c || 0 === c.length) return void(a[g][h].appended = []);
          for (var k = 0, l = c.length; l > k; k += 1) e = c.start(k), f = c.end(k), a[g][h].actualBufferedRanges.add(e, f), j = j.concat(d.call(this, i, {
            start: e,
            end: f
          }, !0));
          a[g][h].appended = j
        }
      },
      getChunks: function(a) {
        var b, e = c.call(this, a),
          f = a.segmentType,
          g = a.appended,
          h = a.removeOrigin,
          i = a.limit || Number.POSITIVE_INFINITY,
          j = this.system.getObject("mediaController"),
          k = 0,
          l = [];
        return e ? (delete a.streamId, delete a.mediaType, delete a.segmentType, delete a.removeOrigin, delete a.limit, delete a.appended, b = g ? e.appended : f ? e[f] : [], l = b.filter(function(b, c, d) {
          if (k >= i) return !1;
          for (var f in a) {
            if ("mediaInfo" === f) return j.isTracksEqual(b[f], a[f]);
            if (a.hasOwnProperty(f) && b[f] != a[f]) return !1
          }
          return h && (e.calculatedBufferedRanges.remove(b.start, b.end), d.splice(c, 1)), k += 1, !0
        }), a.forRange && (l = d.call(this, l, a.forRange, !1)), l) : l
      },
      extract: function(a) {
        return a.removeOrigin = !0, this.getChunks(a)
      },
      getTotalBufferLevel: function(b) {
        var c = b.type,
          d = 0;
        for (var e in a) a.hasOwnProperty(e) && (d += this.sourceBufferExt.getTotalBufferedTime({
          buffered: a[e][c].calculatedBufferedRanges
        }));
        return d
      },
      reset: function() {
        a = {}
      }
    }
  }, MediaPlayer.utils.VirtualBuffer.prototype = {
    constructor: MediaPlayer.utils.VirtualBuffer
  }, MediaPlayer.utils.VirtualBuffer.eventList = {
    CHUNK_APPENDED: "chunkAppended"
  }, MediaPlayer.vo.BitrateInfo = function() {
    "use strict";
    this.mediaType = null, this.bitrate = null, this.qualityIndex = NaN
  }, MediaPlayer.vo.BitrateInfo.prototype = {
    constructor: MediaPlayer.vo.BitrateInfo
  }, MediaPlayer.vo.DataChunk = function() {
    "use strict";
    this.streamId = null, this.mediaInfo = null, this.segmentType = null, this.quality = NaN, this.index = NaN, this.bytes = null, this.start = NaN, this.end = NaN, this.duration = NaN
  }, MediaPlayer.vo.DataChunk.prototype = {
    constructor: MediaPlayer.vo.DataChunk
  }, MediaPlayer.vo.Error = function(a, b, c) {
    "use strict";
    this.code = a || null, this.message = b || null, this.data = c || null
  }, MediaPlayer.vo.Error.prototype = {
    constructor: MediaPlayer.vo.Error
  }, MediaPlayer.vo.Event = function() {
    "use strict";
    this.type = null, this.sender = null, this.data = null, this.error = null, this.timestamp = NaN
  }, MediaPlayer.vo.Event.prototype = {
    constructor: MediaPlayer.vo.Event
  }, MediaPlayer.vo.FragmentRequest = function() {
    "use strict";
    this.action = "download", this.startTime = NaN, this.mediaType = null, this.mediaInfo = null, this.type = null, this.duration = NaN, this.timescale = NaN, this.range = null, this.url = null, this.requestStartDate = null, this.firstByteDate = null, this.requestEndDate = null, this.quality = NaN, this.index = NaN, this.availabilityStartTime = null, this.availabilityEndTime = null, this.wallStartTime = null, this.bytesLoaded = NaN, this.bytesTotal = NaN
  }, MediaPlayer.vo.FragmentRequest.prototype = {
    constructor: MediaPlayer.vo.FragmentRequest,
    ACTION_DOWNLOAD: "download",
    ACTION_COMPLETE: "complete"
  }, MediaPlayer.vo.IsoBox = function() {
    "use strict";
    this.offset = NaN, this.type = null, this.size = NaN, this.isComplete = !0
  }, MediaPlayer.vo.IsoBox.prototype = {
    constructor: MediaPlayer.vo.IsoBox
  }, MediaPlayer.vo.ManifestInfo = function() {
    "use strict";
    this.DVRWindowSize = NaN, this.loadedTime = null, this.availableFrom = null, this.minBufferTime = NaN, this.duration = NaN, this.isDynamic = !1, this.maxFragmentDuration = null
  }, MediaPlayer.vo.ManifestInfo.prototype = {
    constructor: MediaPlayer.vo.ManifestInfo
  }, MediaPlayer.vo.MediaInfo = function() {
    "use strict";
    this.id = null, this.index = null, this.type = null, this.streamInfo = null, this.representationCount = 0, this.lang = null, this.viewpoint = null, this.accessibility = null, this.audioChannelConfiguration = null, this.roles = null, this.codec = null, this.mimeType = null, this.contentProtection = null, this.isText = !1, this.KID = null, this.bitrateList = null
  }, MediaPlayer.vo.MediaInfo.prototype = {
    constructor: MediaPlayer.vo.MediaInfo
  }, MediaPlayer.models.MetricsList = function() {
    "use strict";
    return {
      TcpList: [],
      HttpList: [],
      RepSwitchList: [],
      BufferLevel: [],
      BufferState: [],
      PlayList: [],
      DroppedFrames: [],
      SchedulingInfo: [],
      DVRInfo: [],
      ManifestUpdate: [],
      RequestsQueue: null
    }
  }, MediaPlayer.models.MetricsList.prototype = {
    constructor: MediaPlayer.models.MetricsList
  }, MediaPlayer.vo.StreamInfo = function() {
    "use strict";
    this.id = null, this.index = null, this.start = NaN, this.duration = NaN, this.manifestInfo = null, this.isLast = !0
  }, MediaPlayer.vo.StreamInfo.prototype = {
    constructor: MediaPlayer.vo.StreamInfo
  }, MediaPlayer.vo.TextTrackInfo = function() {
    "use strict";
    this.video = null, this.captionData = null, this.label = null, this.lang = null, this.defaultTrack = !1, this.kind = null, this.isFragmented = !1
  }, MediaPlayer.vo.TextTrackInfo.prototype = {
    constructor: MediaPlayer.vo.TextTrackInfo
  }, MediaPlayer.vo.TrackInfo = function() {
    "use strict";
    this.id = null, this.quality = null, this.DVRWindow = null, this.fragmentDuration = null, this.mediaInfo = null, this.MSETimeOffset = null
  }, MediaPlayer.vo.TrackInfo.prototype = {
    constructor: MediaPlayer.vo.TrackInfo
  }, MediaPlayer.vo.URIFragmentData = function() {
    "use strict";
    this.t = null, this.xywh = null, this.track = null, this.id = null, this.s = null
  }, MediaPlayer.vo.URIFragmentData.prototype = {
    constructor: MediaPlayer.vo.URIFragmentData
  }, MediaPlayer.vo.metrics.BufferLevel = function() {
    "use strict";
    this.t = null, this.level = null
  }, MediaPlayer.vo.metrics.BufferLevel.prototype = {
    constructor: MediaPlayer.vo.metrics.BufferLevel
  }, MediaPlayer.vo.metrics.BufferState = function() {
    "use strict";
    this.target = null, this.state = MediaPlayer.dependencies.BufferController.BUFFER_EMPTY
  }, MediaPlayer.vo.metrics.BufferState.prototype = {
    constructor: MediaPlayer.vo.metrics.BufferState
  }, MediaPlayer.vo.metrics.DVRInfo = function() {
    "use strict";
    this.time = null, this.range = null, this.manifestInfo = null
  }, MediaPlayer.vo.metrics.DVRInfo.prototype = {
    constructor: MediaPlayer.vo.metrics.DVRInfo
  }, MediaPlayer.vo.metrics.DroppedFrames = function() {
    "use strict";
    this.time = null, this.droppedFrames = null
  }, MediaPlayer.vo.metrics.DroppedFrames.prototype = {
    constructor: MediaPlayer.vo.metrics.DroppedFrames
  }, MediaPlayer.vo.metrics.HTTPRequest = function() {
    "use strict";
    this.stream = null, this.tcpid = null, this.type = null, this.url = null, this.actualurl = null, this.range = null, this.trequest = null, this.tresponse = null, this.tfinish = null, this.responsecode = null, this.interval = null, this.mediaduration = null, this.responseHeaders = null, this.trace = []
  }, MediaPlayer.vo.metrics.HTTPRequest.prototype = {
    constructor: MediaPlayer.vo.metrics.HTTPRequest
  }, MediaPlayer.vo.metrics.HTTPRequest.Trace = function() {
    "use strict";
    this.s = null, this.d = null, this.b = []
  }, MediaPlayer.vo.metrics.HTTPRequest.Trace.prototype = {
    constructor: MediaPlayer.vo.metrics.HTTPRequest.Trace
  }, MediaPlayer.vo.metrics.HTTPRequest.MPD_TYPE = "MPD", MediaPlayer.vo.metrics.HTTPRequest.XLINK_EXPANSION_TYPE = "XLink Expansion", MediaPlayer.vo.metrics.HTTPRequest.INIT_SEGMENT_TYPE = "Initialization Segment", MediaPlayer.vo.metrics.HTTPRequest.INDEX_SEGMENT_TYPE = "Index Segment", MediaPlayer.vo.metrics.HTTPRequest.MEDIA_SEGMENT_TYPE = "Media Segment", MediaPlayer.vo.metrics.HTTPRequest.BITSTREAM_SWITCHING_SEGMENT_TYPE = "Bitstream Switching Segment", MediaPlayer.vo.metrics.HTTPRequest.OTHER_TYPE = "other", MediaPlayer.vo.metrics.ManifestUpdate = function() {
    "use strict";
    this.mediaType = null, this.type = null, this.requestTime = null, this.fetchTime = null, this.availabilityStartTime = null, this.presentationStartTime = 0, this.clientTimeOffset = 0, this.currentTime = null, this.buffered = null, this.latency = 0, this.streamInfo = [], this.trackInfo = []
  }, MediaPlayer.vo.metrics.ManifestUpdate.StreamInfo = function() {
    "use strict";
    this.id = null, this.index = null, this.start = null, this.duration = null
  }, MediaPlayer.vo.metrics.ManifestUpdate.TrackInfo = function() {
    "use strict";
    this.id = null, this.index = null, this.mediaType = null, this.streamIndex = null, this.presentationTimeOffset = null, this.startNumber = null, this.fragmentInfoType = null
  }, MediaPlayer.vo.metrics.ManifestUpdate.prototype = {
    constructor: MediaPlayer.vo.metrics.ManifestUpdate
  }, MediaPlayer.vo.metrics.ManifestUpdate.StreamInfo.prototype = {
    constructor: MediaPlayer.vo.metrics.ManifestUpdate.StreamInfo
  }, MediaPlayer.vo.metrics.ManifestUpdate.TrackInfo.prototype = {
    constructor: MediaPlayer.vo.metrics.ManifestUpdate.TrackInfo
  }, MediaPlayer.vo.metrics.PlayList = function() {
    "use strict";
    this.stream = null, this.start = null, this.mstart = null, this.starttype = null, this.trace = []
  }, MediaPlayer.vo.metrics.PlayList.Trace = function() {
    "use strict";
    this.representationid = null, this.subreplevel = null, this.start = null, this.mstart = null, this.duration = null, this.playbackspeed = null, this.stopreason = null
  }, MediaPlayer.vo.metrics.PlayList.prototype = {
    constructor: MediaPlayer.vo.metrics.PlayList
  }, MediaPlayer.vo.metrics.PlayList.INITIAL_PLAY_START_REASON = "initial_start", MediaPlayer.vo.metrics.PlayList.SEEK_START_REASON = "seek", MediaPlayer.vo.metrics.PlayList.Trace.prototype = {
    constructor: MediaPlayer.vo.metrics.PlayList.Trace()
  }, MediaPlayer.vo.metrics.PlayList.Trace.USER_REQUEST_STOP_REASON = "user_request", MediaPlayer.vo.metrics.PlayList.Trace.REPRESENTATION_SWITCH_STOP_REASON = "representation_switch", MediaPlayer.vo.metrics.PlayList.Trace.END_OF_CONTENT_STOP_REASON = "end_of_content", MediaPlayer.vo.metrics.PlayList.Trace.REBUFFERING_REASON = "rebuffering", MediaPlayer.vo.metrics.RepresentationSwitch = function() {
    "use strict";
    this.t = null, this.mt = null, this.to = null, this.lto = null
  }, MediaPlayer.vo.metrics.RepresentationSwitch.prototype = {
    constructor: MediaPlayer.vo.metrics.RepresentationSwitch
  }, MediaPlayer.vo.metrics.RequestsQueue = function() {
    "use strict";
    this.pendingRequests = [], this.loadingRequests = [], this.executedRequests = [], this.rejectedRequests = []
  }, MediaPlayer.vo.metrics.RequestsQueue.prototype = {
    constructor: MediaPlayer.vo.metrics.RequestsQueue
  }, MediaPlayer.vo.metrics.SchedulingInfo = function() {
    "use strict";
    this.mediaType = null, this.t = null, this.type = null, this.startTime = null, this.availabilityStartTime = null, this.duration = null, this.quality = null, this.range = null, this.state = null
  }, MediaPlayer.vo.metrics.SchedulingInfo.prototype = {
    constructor: MediaPlayer.vo.metrics.SchedulingInfo
  }, MediaPlayer.vo.metrics.TCPConnection = function() {
    "use strict";
    this.tcpid = null, this.dest = null, this.topen = null, this.tclose = null, this.tconnect = null
  }, MediaPlayer.vo.metrics.TCPConnection.prototype = {
    constructor: MediaPlayer.vo.metrics.TCPConnection
  }, MediaPlayer.vo.protection.ClearKeyKeySet = function(a, b) {
    if (b && "persistent" !== b && "temporary" !== b) throw new Error("Invalid ClearKey key set type!  Must be one of 'persistent' or 'temporary'");
    this.keyPairs = a, this.type = b, this.toJWK = function() {
      var a, b = this.keyPairs.length,
        c = {};
      for (c.keys = [], a = 0; b > a; a++) {
        var d = {
          kty: "oct",
          alg: "A128KW",
          kid: this.keyPairs[a].keyID,
          k: this.keyPairs[a].key
        };
        c.keys.push(d)
      }
      this.type && (c.type = this.type);
      var e = JSON.stringify(c),
        f = e.length,
        g = new ArrayBuffer(f),
        h = new Uint8Array(g);
      for (a = 0; f > a; a++) h[a] = e.charCodeAt(a);
      return g
    }
  }, MediaPlayer.vo.protection.ClearKeyKeySet.prototype = {
    constructor: MediaPlayer.vo.protection.ClearKeyKeySet
  }, MediaPlayer.vo.protection.KeyError = function(a, b) {
    "use strict";
    this.sessionToken = a, this.error = b
  }, MediaPlayer.vo.protection.KeyError.prototype = {
    constructor: MediaPlayer.vo.protection.KeyError
  }, MediaPlayer.vo.protection.KeyMessage = function(a, b, c, d) {
    "use strict";
    this.sessionToken = a, this.message = b, this.defaultURL = c, this.messageType = d ? d : "license-request"
  }, MediaPlayer.vo.protection.KeyMessage.prototype = {
    constructor: MediaPlayer.vo.protection.KeyMessage
  }, MediaPlayer.vo.protection.KeyPair = function(a, b) {
    "use strict";
    this.keyID = a, this.key = b
  }, MediaPlayer.vo.protection.KeyPair.prototype = {
    constructor: MediaPlayer.vo.protection.KeyPair
  }, MediaPlayer.vo.protection.KeySystemAccess = function(a, b) {
    this.keySystem = a, this.ksConfiguration = b
  }, MediaPlayer.vo.protection.KeySystemAccess.prototype = {
    constructor: MediaPlayer.vo.protection.KeySystemAccess
  }, MediaPlayer.vo.protection.KeySystemConfiguration = function(a, b, c, d, e) {
    this.initDataTypes = ["cenc"], this.audioCapabilities = a, this.videoCapabilities = b, this.distinctiveIdentifier = c, this.persistentState = d, this.sessionTypes = e
  }, MediaPlayer.vo.protection.KeySystemConfiguration.prototype = {
    constructor: MediaPlayer.vo.protection.KeySystemConfiguration
  }, MediaPlayer.vo.protection.LicenseRequestComplete = function(a, b, c) {
    "use strict";
    this.message = a, this.sessionToken = b, this.messageType = c ? c : "license-request"
  }, MediaPlayer.vo.protection.LicenseRequestComplete.prototype = {
    constructor: MediaPlayer.vo.protection.LicenseRequestComplete
  }, MediaPlayer.vo.protection.MediaCapability = function(a, b) {
    this.contentType = a, this.robustness = b
  }, MediaPlayer.vo.protection.MediaCapability.prototype = {
    constructor: MediaPlayer.vo.protection.MediaCapability
  }, MediaPlayer.vo.protection.NeedKey = function(a, b) {
    this.initData = a, this.initDataType = b
  }, MediaPlayer.vo.protection.NeedKey.prototype = {
    constructor: MediaPlayer.vo.protection.NeedKey
  }, MediaPlayer.vo.protection.ProtectionData = function(a, b, c) {
    this.serverURL = a, this.httpRequestHeaders = b, this.clearkeys = c
  }, MediaPlayer.vo.protection.ProtectionData.prototype = {
    constructor: MediaPlayer.vo.protection.ProtectionData
  }, MediaPlayer.vo.protection.SessionToken = function() {};
