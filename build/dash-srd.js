/*! dash-srd 2019-04-15 */
var SRDPlayer, videoContainer, bannerbox, frameRate, fallBackLayer, zoomLayer1, zoomLayer2, video1, video2, video3, video4, video5, video6, video7, video8, zoomLayer1VideoElements, zoomLayer2VideoElements, timingObject, syncFallBackLayer, syncVideo1, syncVideo2, syncVideo3, syncVideo4, syncVideo5, syncVideo6, syncVideo7, syncVideo8, zoomLayer1VideoSyncObjects, zoomLayer2VideoSyncObjects, visibleElement, zoomLayer1PlayerObjects, zoomLayer2PlayerObjects, videoController, getClickPositionEnabled, mpdURL, inMPD, currentZoomLevel, maxZoomLevel, fullScreenFlag, browserType, browserWindowZoomedTo, fullScreenZoomedTo, duration, initialWidth, initialHeight, initialAspectRatio, fallBackLayerContentWidth, fallBackLayerContentHeight, fallBackLayerContentAspectRatio, zoomLayer1ContentWidth, zoomLayer1ContentHeight, zoomLayer1ContentAspectRatio, zoomLayer2ContentWidth, zoomLayer2ContentHeight, zoomLayer2ContentAspectRatio, screenAspectRatio, contentHasAudio, contentAspectRatio, lastVolumeValue, masterQuality, videoControllerClone, viewState, zoomLayer1VideoHeight, zoomLayer1VideoWidth, zoomLayer2VideoHeight, zoomLayer2VideoWidth, tileUnitType, spatialOrderingZoomLevel1, spatialOrderingZoomLevel2, spatialOrderingDimensionsZoomLevel1, spatialOrderingDimensionsZoomLevel2, zoomLevel1TilesHorizontal, zoomLevel2TilesHorizontal, zoomLevel1TilesVertical, zoomLevel2TilesVertical, zoomLayer1Hammer, zoomLayer2Hammer;

$(document).ready(function() {
  SRDPlayer = document.getElementById("SRDPlayer");
  videoContainer = document.getElementById("videoContainer");
  bannerbox = document.getElementById("bannerbox");
  fallBackLayer = document.getElementById("fallBackLayer");
  zoomLayer1 = document.getElementById("zoomLayer1");
  zoomLayer2 = document.getElementById("zoomLayer2");
  video1 = document.getElementById("video1");
  video2 = document.getElementById("video2");
  video3 = document.getElementById("video3");
  video4 = document.getElementById("video4");
  video5 = document.getElementById("video5");
  video6 = document.getElementById("video6");
  video7 = document.getElementById("video7");
  video8 = document.getElementById("video8");
  videoController = document.getElementById("videoController");
  zoomLayer1VideoElements = [video1, video2, video3, video4];
  zoomLayer2VideoElements = [video5, video6, video7, video8];
  zoomLayer1VideoSyncObjects = [syncVideo1, syncVideo2, syncVideo3, syncVideo4];
  zoomLayer2VideoSyncObjects = [syncVideo5, syncVideo6, syncVideo7, syncVideo8];
  zoomLayer1PlayerObjects = [];
  zoomLayer2PlayerObjects = [];
  spatialOrderingZoomLevel1 = [];
  spatialOrderingZoomLevel2 = [];
  fallBackLayer.style.visibility = "visible";
  zoomLayer1.style.visibility = "hidden";
  zoomLayer2.style.visibility = "hidden";
  video1.muted = true;
  video2.muted = true;
  video3.muted = true;
  video4.muted = true;
  video5.muted = true;
  video6.muted = true;
  video7.muted = true;
  video8.muted = true;
  getClickPositionEnabled = false;
  fullScreenFlag = false;
  browserType = detectBrowser();
  zoomLayer1Hammer = new Hammer(zoomLayer1, {
    recognizers: [
      [Hammer.Pan, {
        direction: Hammer.DIRECTION_ALL
      }]
    ]
  });
  zoomLayer2Hammer = new Hammer(zoomLayer2, {
    recognizers: [
      [Hammer.Pan, {
        direction: Hammer.DIRECTION_ALL
      }]
    ]
  });
});

function orderByProperty(prop) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function(x, y) {
    var equality = x[prop] - y[prop];
    if (equality === 0 && arguments.length > 1) {
      return orderByProperty.apply(null, args)(x, y);
    }
    return equality;
  };
}

function countUniques(arr) {
  var a = [],
    b = [],
    prev;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]["x"] !== prev) {
      a.push(arr[i]["x"]);
      b.push(1);
    } else {
      b[b.length - 1]++;
    }
    prev = arr[i]["x"];
  }
  return [a, b];
}

"use strict";

var lastUid = -1;

var ServiceBus = {
  topics: {},
  subscribe: function(topic, listener, subscriber) {
    if (!this.topics[topic]) this.topics[topic] = [];
    var token = (++lastUid).toString();
    this.topics[topic].push({
      listener: listener,
      token: token,
      subscriber: subscriber
    });
    var subscriber = subscriber;
    console.log("Subscribing " + subscriber + " to topic " + topic);
    return token;
  },
  unsubscribe: function(topic, token) {
    for (var i = 0; i < this.topics[topic].length; i++) {
      if (this.topics[topic][i]["token"] === token) {
        console.log("Unsubscribing " + this.topics[topic][i]["subscriber"] + " from topic" + topic);
        this.topics[topic].splice(i, 1);
      }
    }
  },
  publish: function(topic, data) {
    var numberOfListeners = this.topics[topic].length;
    if (!this.topics[topic] || numberOfListeners < 1) return;
    for (var i = 0; i < numberOfListeners; i++) {
      var listener = this.topics[topic][i]["listener"];
      console.log("Publishing topic " + topic + " to subscriber " + this.topics[topic][i]["subscriber"]);
      listener(data || {});
    }
  }
};

function crossOriginRequest(url, callback) {
  var isIE8 = window.XDomainRequest ? true : false;
  var invocation = createCrossOriginRequest();

  function createCrossOriginRequest(url, crossOriginRequestHandler) {
    var request;
    if (isIE8) {
      request = new window.XDomainRequest();
    } else {
      request = new XMLHttpRequest();
    }
    return request;
  }

  function callOtherDomain() {
    if (invocation) {
      if (isIE8) {
        invocation.onload = crossOriginRequestHandler;
        invocation.open("GET", url, true);
        invocation.send();
      } else {
        invocation.open("GET", url, true);
        invocation.onreadystatechange = crossOriginRequestHandler;
        invocation.send();
      }
    } else {
      console.log("callOtherDomain: " + "No Invocation TookPlace At All");
    }
  }

  function crossOriginRequestHandler(evtXHR) {
    if (invocation.readyState == 4) {
      if (invocation.status == 200) {
        var response = invocation.responseText;
        callback(null, response);
      } else {
        callback(invocation.statusText, null);
        console.log("crossOriginRequestHandler: " + "Invocation Errors Occured");
      }
    }
  }
  callOtherDomain();
}

function X2JS(matchers, attrPrefix, ignoreRoot) { //mark2
  if (attrPrefix === null || attrPrefix === undefined) {
    attrPrefix = "_";
  }
  if (ignoreRoot === null || ignoreRoot === undefined) {
    ignoreRoot = false;
  }
  var VERSION = "1.0.11";
  var escapeMode = false;
  var DOMNodeTypes = {
    ELEMENT_NODE: 1,
    TEXT_NODE: 3,
    CDATA_SECTION_NODE: 4,
    COMMENT_NODE: 8,
    DOCUMENT_NODE: 9
  };

  function getNodeLocalName(node) {
    var nodeLocalName = node.localName;
    if (nodeLocalName == null) nodeLocalName = node.baseName;
    if (nodeLocalName == null || nodeLocalName == "") nodeLocalName = node.nodeName;
    return nodeLocalName;
  }

  function getNodePrefix(node) {
    return node.prefix;
  }

  function escapeXmlChars(str) {
    if (typeof str == "string") return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
    else return str;
  }

  function unescapeXmlChars(str) {
    return str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#x2F;/g, "/");
  }

  function parseDOMChildren(node) {
    if (node.nodeType == DOMNodeTypes.DOCUMENT_NODE) {
      var result, child = node.firstChild,
        i, len;
      for (i = 0, len = node.childNodes.length; i < len; i += 1) {
        if (node.childNodes[i].nodeType !== DOMNodeTypes.COMMENT_NODE) {
          child = node.childNodes[i];
          break;
        }
      }
      if (ignoreRoot) {
        result = parseDOMChildren(child);
      } else {
        result = {};
        var childName = getNodeLocalName(child);
        result[childName] = parseDOMChildren(child);
      }
      return result;
    } else if (node.nodeType == DOMNodeTypes.ELEMENT_NODE) {
      var result = new Object();
      result.__cnt = 0;
      var children = [];
      var nodeChildren = node.childNodes;
      for (var cidx = 0; cidx < nodeChildren.length; cidx++) {
        var child = nodeChildren.item(cidx);
        var childName = getNodeLocalName(child);
        result.__cnt++;
        if (result[childName] == null) {
          var c = parseDOMChildren(child);
          if (childName != "#text" || /[^\s]/.test(c)) {
            var o = {};
            o[childName] = c;
            children.push(o);
          }
          result[childName] = c;
          result[childName + "_asArray"] = new Array(1);
          result[childName + "_asArray"][0] = result[childName];
        } else {
          if (result[childName] != null) {
            if (!(result[childName] instanceof Array)) {
              var tmpObj = result[childName];
              result[childName] = new Array();
              result[childName][0] = tmpObj;
              result[childName + "_asArray"] = result[childName];
            }
          }
          var aridx = 0;
          while (result[childName][aridx] != null) aridx++;
          var c = parseDOMChildren(child);
          if (childName != "#text" || /[^\s]/.test(c)) {
            var o = {};
            o[childName] = c;
            children.push(o);
          }
          result[childName][aridx] = c;
        }
      }
      result.__children = children;
      for (var aidx = 0; aidx < node.attributes.length; aidx++) {
        var attr = node.attributes.item(aidx);
        result.__cnt++;
        var value2 = attr.value;
        for (var m = 0, ml = matchers.length; m < ml; m++) {
          var matchobj = matchers[m];
          if (matchobj.test.call(this, attr)) value2 = matchobj.converter.call(this, attr.value);
        }
        result[attrPrefix + attr.name] = value2;
      }
      var nodePrefix = getNodePrefix(node);
      if (nodePrefix != null && nodePrefix != "") {
        result.__cnt++;
        result.__prefix = nodePrefix;
      }
      if (result.__cnt == 1 && result["#text"] != null) {
        result = result["#text"];
      }
      if (result["#text"] != null) {
        result.__text = result["#text"];
        if (escapeMode) result.__text = unescapeXmlChars(result.__text);
        delete result["#text"];
        delete result["#text_asArray"];
      }
      if (result["#cdata-section"] != null) {
        result.__cdata = result["#cdata-section"];
        delete result["#cdata-section"];
        delete result["#cdata-section_asArray"];
      }
      if (result.__text != null || result.__cdata != null) {
        result.toString = function() {
          return (this.__text != null ? this.__text : "") + (this.__cdata != null ? this.__cdata : "");
        };
      }
      return result;
    } else if (node.nodeType == DOMNodeTypes.TEXT_NODE || node.nodeType == DOMNodeTypes.CDATA_SECTION_NODE) {
      return node.nodeValue;
    } else if (node.nodeType == DOMNodeTypes.COMMENT_NODE) {
      return null;
    }
  }

  function startTag(jsonObj, element, attrList, closed) {
    var resultStr = "<" + (jsonObj != null && jsonObj.__prefix != null ? jsonObj.__prefix + ":" : "") + element;
    if (attrList != null) {
      for (var aidx = 0; aidx < attrList.length; aidx++) {
        var attrName = attrList[aidx];
        var attrVal = jsonObj[attrName];
        resultStr += " " + attrName.substr(1) + "='" + attrVal + "'";
      }
    }
    if (!closed) resultStr += ">";
    else resultStr += "/>";
    return resultStr;
  }

  function endTag(jsonObj, elementName) {
    return "</" + (jsonObj.__prefix != null ? jsonObj.__prefix + ":" : "") + elementName + ">";
  }

  function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  }

  function jsonXmlSpecialElem(jsonObj, jsonObjField) {
    if (endsWith(jsonObjField.toString(), "_asArray") || jsonObjField.toString().indexOf("_") == 0 || jsonObj[jsonObjField] instanceof Function) return true;
    else return false;
  }

  function jsonXmlElemCount(jsonObj) {
    var elementsCnt = 0;
    if (jsonObj instanceof Object) {
      for (var it in jsonObj) {
        if (jsonXmlSpecialElem(jsonObj, it)) continue;
        elementsCnt++;
      }
    }
    return elementsCnt;
  }

  function parseJSONAttributes(jsonObj) {
    var attrList = [];
    if (jsonObj instanceof Object) {
      for (var ait in jsonObj) {
        if (ait.toString().indexOf("__") == -1 && ait.toString().indexOf("_") == 0) {
          attrList.push(ait);
        }
      }
    }
    return attrList;
  }

  function parseJSONTextAttrs(jsonTxtObj) {
    var result = "";
    if (jsonTxtObj.__cdata != null) {
      result += "<![CDATA[" + jsonTxtObj.__cdata + "]]>";
    }
    if (jsonTxtObj.__text != null) {
      if (escapeMode) result += escapeXmlChars(jsonTxtObj.__text);
      else result += jsonTxtObj.__text;
    }
    return result;
  }

  function parseJSONTextObject(jsonTxtObj) {
    var result = "";
    if (jsonTxtObj instanceof Object) {
      result += parseJSONTextAttrs(jsonTxtObj);
    } else if (jsonTxtObj != null) {
      if (escapeMode) result += escapeXmlChars(jsonTxtObj);
      else result += jsonTxtObj;
    }
    return result;
  }

  function parseJSONArray(jsonArrRoot, jsonArrObj, attrList) {
    var result = "";
    if (jsonArrRoot.length == 0) {
      result += startTag(jsonArrRoot, jsonArrObj, attrList, true);
    } else {
      for (var arIdx = 0; arIdx < jsonArrRoot.length; arIdx++) {
        result += startTag(jsonArrRoot[arIdx], jsonArrObj, parseJSONAttributes(jsonArrRoot[arIdx]), false);
        result += parseJSONObject(jsonArrRoot[arIdx]);
        result += endTag(jsonArrRoot[arIdx], jsonArrObj);
      }
    }
    return result;
  }

  function parseJSONObject(jsonObj) {
    var result = "";
    var elementsCnt = jsonXmlElemCount(jsonObj);
    if (elementsCnt > 0) {
      for (var it in jsonObj) {
        if (jsonXmlSpecialElem(jsonObj, it)) continue;
        var subObj = jsonObj[it];
        var attrList = parseJSONAttributes(subObj);
        console.debug({
          attrList
        });
        if (subObj == null || subObj == undefined) {
          result += startTag(subObj, it, attrList, true);
        } else if (subObj instanceof Object) {
          if (subObj instanceof Array) {
            result += parseJSONArray(subObj, it, attrList);
          } else {
            var subObjElementsCnt = jsonXmlElemCount(subObj);
            console.debug({
              subObjElementsCnt
            });
            if (subObjElementsCnt > 0 || subObj.__text != null || subObj.__cdata != null) {
              result += startTag(subObj, it, attrList, false);
              result += parseJSONObject(subObj);
              result += endTag(subObj, it);
            } else {
              result += startTag(subObj, it, attrList, true);
            }
          }
        } else {
          result += startTag(subObj, it, attrList, false);
          result += parseJSONTextObject(subObj);
          result += endTag(subObj, it);
        }
      }
    }
    result += parseJSONTextObject(jsonObj);
    return result;
  }
  this.parseXmlString = function(xmlDocStr) { //mark1
    var xmlDoc, parser, ns;
    if (window.DOMParser) {
      parser = new window.DOMParser();
      try {
        ns = parser.parseFromString("<", "text/xml").getElementsByTagName("parsererror")[0].namespaceURI;
      } catch (e) {}
      try {
        xmlDoc = parser.parseFromString(xmlDocStr, "text/xml");
        if (ns) {
          if (xmlDoc.getElementsByTagNameNS(ns, "parsererror").length) {
            xmlDoc = undefined;
          }
        }
        console.debug(parser);
      } catch (e) {}
    } else {
      if (xmlDocStr.indexOf("<?") == 0) {
        xmlDocStr = xmlDocStr.substr(xmlDocStr.indexOf("?>") + 2);
      }
      xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = "false";
      xmlDoc.loadXML(xmlDocStr);
      console.debug("Microsoft.XMLDOM");
    }
    return xmlDoc;
  };
  this.xml2json = function(xmlDoc) {
    return parseDOMChildren(xmlDoc);
  };
  this.xml_str2json = function(xmlDocStr) {
    var xmlDoc = this.parseXmlString(xmlDocStr);
    return xmlDoc ? this.xml2json(xmlDoc) : undefined;
  };
  this.json2xml_str = function(jsonObj) {
    return parseJSONObject(jsonObj);
  };
  this.json2xml = function(jsonObj) {
    var xmlDocStr = this.json2xml_str(jsonObj);
    return this.parseXmlString(xmlDocStr);
  };
  this.getVersion = function() {
    return VERSION;
  };
  this.escapeMode = function(enabled) {
    escapeMode = enabled;
  };
}

var SECONDS_IN_YEAR = 365 * 24 * 60 * 60,
  SECONDS_IN_MONTH = 30 * 24 * 60 * 60,
  SECONDS_IN_DAY = 24 * 60 * 60,
  SECONDS_IN_HOUR = 60 * 60,
  SECONDS_IN_MIN = 60,
  MINUTES_IN_HOUR = 60,
  MILLISECONDS_IN_SECONDS = 1e3,
  durationRegex = /^([-])?P(([\d.]*)Y)?(([\d.]*)M)?(([\d.]*)D)?T?(([\d.]*)H)?(([\d.]*)M)?(([\d.]*)S)?/,
  datetimeRegex = /^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2})(?::([0-9]*)(\.[0-9]*)?)?(?:([+-])([0-9]{2})([0-9]{2}))?/,
  numericRegex = /^[-+]?[0-9]+[.]?[0-9]*([eE][-+]?[0-9]+)?$/,
  httpOrHttpsRegex = /^https?:\/\//i,
  matchers = [{
    type: "duration",
    test: function(attr) {
      var attributeList = ["minBufferTime", "mediaPresentationDuration", "minimumUpdatePeriod", "timeShiftBufferDepth", "maxSegmentDuration", "maxSubsegmentDuration", "suggestedPresentationDelay", "start", "starttime", "duration"],
        len = attributeList.length;
      for (var i = 0; i < len; i++) {
        if (attr.nodeName === attributeList[i]) {
          return durationRegex.test(attr.value);
        }
      }
      return false;
    },
    converter: function(str) {
      var match = durationRegex.exec(str);
      var result = parseFloat(match[2] || 0) * SECONDS_IN_YEAR + parseFloat(match[4] || 0) * SECONDS_IN_MONTH + parseFloat(match[6] || 0) * SECONDS_IN_DAY + parseFloat(match[8] || 0) * SECONDS_IN_HOUR + parseFloat(match[10] || 0) * SECONDS_IN_MIN + parseFloat(match[12] || 0);
      if (match[1] !== undefined) {
        result = -result;
      }
      return result;
    }
  }, {
    type: "datetime",
    test: function(attr) {
      return datetimeRegex.test(attr.value);
    },
    converter: function(str) {
      var match = datetimeRegex.exec(str),
        utcDate;
      utcDate = Date.UTC(parseInt(match[1], 10), parseInt(match[2], 10) - 1, parseInt(match[3], 10), parseInt(match[4], 10), parseInt(match[5], 10), match[6] && parseInt(match[6], 10) || 0, match[7] && parseFloat(match[7]) * MILLISECONDS_IN_SECONDS || 0);
      if (match[9] && match[10]) {
        var timezoneOffset = parseInt(match[9], 10) * MINUTES_IN_HOUR + parseInt(match[10], 10);
        utcDate += (match[8] === "+" ? -1 : +1) * timezoneOffset * SECONDS_IN_MIN * MILLISECONDS_IN_SECONDS;
      }
      return new Date(utcDate);
    }
  }, {
    type: "numeric",
    test: function(attr) {
      return numericRegex.test(attr.value);
    },
    converter: function(str) {
      return parseFloat(str);
    }
  }];

function milliSecondsToTimeString(inputMilliSeconds) {
  var durationDate = new Date(inputMilliSeconds);
  var hh = durationDate.getUTCHours();
  var mm = durationDate.getUTCMinutes();
  var ss = durationDate.getSeconds();
  if (hh < 10) {
    hh = "0" + hh;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (ss < 10) {
    ss = "0" + ss;
  }
  var timeString = hh + ":" + mm + ":" + ss;
  return timeString;
}

function secondsToTimeString(inputSeconds) {
  var inputMilliSeconds = inputSeconds * 1e3;
  var timeString = milliSecondsToTimeString(inputMilliSeconds);
  return timeString;
}

function detectBrowser() {
  var detectedBrowser;
  var isOpera = false;
  var isIE = false;
  if (!!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0) {
    detectedBrowser = "Chrome";
    isOpera = true;
  }
  if (typeof InstallTrigger !== "undefined") {
    detectedBrowser = "FireFox";
  }
  if (Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0) {
    detectedBrowser = "Safari";
  }
  if (!!window.chrome && !isOpera === true) {
    detectedBrowser = "Chrome";
  }
  if (false || !!document.documentMode) {
    detectedBrowser = "IE";
    isIE = true;
  }
  if (!isIE && !!window.StyleMedia) {
    detectedBrowser = "Edge";
  }
  if (detectedBrowser === undefined) {
    detectedBrowser = "Other";
  }
  return detectedBrowser;
}

function launchDashPlayer(videoElement) {
  /*var context = new Dash.di.DashContext();
  var player = new MediaPlayer(context);
  player.setAutoPlay(false);
  player.startup();
  player.attachView(document.querySelector("#" + videoElement));*/
  var player = dashjs.MediaPlayer().create();
  player.initialize(document.querySelector("#" + videoElement));
  //player.initialize(document.querySelector("#" + videoElement), url, false);
  return player;
}

"use strict";

var MPDRetriever = function(params) {
  this.params = params;
};

MPDRetriever.prototype = {
  retrieveAndConvert: function(mpdURL, callback) {
    crossOriginRequest(mpdURL, function(err, data) {
      if (err) {
        return err;
      }
      callback(null, data);
    });
  },
  getMPD: function() {
    var mpdURL = this.params.mpdURL;
    this.retrieveAndConvert(mpdURL, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        ServiceBus.publish("MPD-incoming", [mpdURL, data]);
      }
    });
  }
};

"use strict";

var MPDParser = function() {
  ServiceBus.subscribe("MPD-incoming", this.parseMPD, "MPDParser");
};

MPDParser.prototype = {
  parseMPD: function(data) {
    mpdURL = data[0];
    var x2js = new X2JS(matchers, "", true);
    var mpdJSON = x2js.xml_str2json(data[1]);
    console.debug(mpdJSON);
    if ($.isArray(mpdJSON.Period.AdaptationSet)) {
      if ("SupplementalProperty" in mpdJSON.Period.AdaptationSet[0]) {
        ServiceBus.publish("SRD-MPD", [mpdURL, mpdJSON]);
      } else {
        ServiceBus.publish("Non-SRD-MPD", [mpdURL, mpdJSON]);
      }
    } else {
      if ("SupplementalProperty" in mpdJSON.Period.AdaptationSet) {
        ServiceBus.publish("SRD-MPD", [mpdURL, mpdJSON]);
      } else {
        ServiceBus.publish("Non-SRD-MPD", [mpdURL, mpdJSON]);
      }
    }
  }
};

var normalVideoAttacher = function() {
  ServiceBus.subscribe("Non-SRD-MPD", this.attacher, "normalVideoAttacher");
};

normalVideoAttacher.prototype = {
  attacher: function(data) {
    if (getClickPositionEnabled === true) {
      videoContainer.removeEventListener("dblclick", getClickPosition);
    }
    var player = launchDashPlayer("fallBackLayer");
    player.attachSource(data);
    $.when(fallBackLayer.readyState === 4).then(function() {
      playPause();
    });
  }
};

var tiledVideoAttacher = function() {
  ServiceBus.subscribe("SRD-MPD", this.fallBackLayerAttacher, "fallBackLayerAttacher");
  ServiceBus.subscribe("Zoom-level1", this.zoomLayer1Attacher, "zoomLayer1Attacher");
  ServiceBus.subscribe("Zoom-level2", this.zoomLayer2Attacher, "zoomLayer2Attacher");
};

tiledVideoAttacher.prototype = {
  fallBackLayerAttacher: function(data) { //argument / data wird mittels des publishers übergeben, MPDParser.prototype oben
    var fallBackLayerAdaptationSet;
    inMPD = data[1];
    var adaptationSets = inMPD.Period.AdaptationSet;
    console.debug(adaptationSets);
    var videoAdaptationSet = adaptationSets.slice(0, 1);
    var secondAdaptationSet = adaptationSets.slice(1, 2);
    if (secondAdaptationSet[0].mimeType == "audio/mp4") {
      fallBackLayerAdaptationSet = [videoAdaptationSet[0], secondAdaptationSet[0]];
      contentHasAudio = true;
    } else {
      fallBackLayerAdaptationSet = videoAdaptationSet;
      contentHasAudio = false;
    }
    frameRate = videoAdaptationSet[0].Representation.frameRate;
    console.debug({
      frameRate
    });
    fallBackLayerContentWidth = videoAdaptationSet[0].Representation.width;
    fallBackLayerContentHeight = videoAdaptationSet[0].Representation.height;
    fallBackLayerContentAspectRatio = fallBackLayerContentWidth / fallBackLayerContentHeight;
    if (fallBackLayerContentAspectRatio != initialAspectRatio) {
      updateAspectRatio(fallBackLayer, fallBackLayerContentAspectRatio);
    }
    var fallBackLayerMPD = {
      __cnt: inMPD.__cnt,
      "#comment": inMPD["#comment"],
      "#comment_asArray": inMPD["#comment_asArray"],
      BaseURL: inMPD.BaseURL,
      BaseURL_asArray: inMPD.BaseURL_asArray,
      Period: {
        __cnt: inMPD.Period.__cnt,
        AdaptationSet: fallBackLayerAdaptationSet,
        AdaptationSet_asArray: fallBackLayerAdaptationSet,
        __children: fallBackLayerAdaptationSet
      },
      Period_asArray: [{
        AdaptationSet: fallBackLayerAdaptationSet,
        AdaptationSet_asArray: fallBackLayerAdaptationSet,
        __children: fallBackLayerAdaptationSet
      }],
      xmlns: inMPD.xmlns,
      mediaPresentationDuration: inMPD.mediaPresentationDuration,
      minBufferTime: inMPD.minBufferTime,
      profiles: inMPD.profiles,
      type: inMPD.type,
      __text: inMPD.__text
    };
    console.debug(fallBackLayerMPD);
    var player = launchDashPlayer("fallBackLayer");
    var source = [mpdURL, fallBackLayerMPD];
    player.attachSource(source);
    $("#fallBackLayer").one("canplay", function() {
      if (fallBackLayer.paused) {
        fallBackLayer.play();
        if ($("#iconPlayPause").hasClass("icon-play")) {
          $("#iconPlayPause").removeClass("icon-play");
        }
        if (!$("#iconPlayPause").hasClass("icon-pause")) {
          $("#iconPlayPause").toggleClass("icon-pause");
        }
      }
      duration = fallBackLayer.duration;
      document.getElementById("videoDuration").innerHTML = secondsToTimeString(duration);
      var timerInterval = duration / 2;
      var seekbar = document.getElementById("seekbar");
      seekbar.setAttribute("max", duration);
      seekbar.setAttribute("onmousedown", '$("#seekbar").toggleClass("user-seek");');
      seekbar.setAttribute("onmouseup", '$("#seekbar").removeClass("user-seek");');
      var videoTimer = setInterval(function() {
        document.getElementById("videoTime").innerHTML = secondsToTimeString(fallBackLayer.currentTime);
        if (!$("#seekbar").hasClass("user-seek")) {
          $("#seekbar").val(fallBackLayer.currentTime);
        } else {
          fallBackLayer.currentTime = $("#seekbar").val();
          if (timingObject) {
            timingObject.update({
              position: $("#seekbar").val(),
              velocity: 0
            });
            timingObject.update({
              velocity: 1
            });
          }
        }
        if (fallBackLayer.currentTime == duration) {
          clearInterval(videoTimer);
        }
      }, timerInterval);
      $("#volumebar").bind("change", function() {
        var val = this.value;
        fallBackLayer.volume = val;
      });
    });
    var supplementalPropertyValue = adaptationSets[0].SupplementalProperty.value;
    console.debug("adaptionSets.length = ", adaptationSets.length);
    console.debug({
      supplementalPropertyValue
    });
    currentZoomLevel = supplementalPropertyValue.substr(supplementalPropertyValue.length - 1);
    if (getClickPositionEnabled === false) {
      videoContainer.addEventListener("dblclick", onClickEvent, false);
      getClickPositionEnabled = true;
    }
    var lastVideoIndex = adaptationSets.length;
    var lastVideo = adaptationSets.slice(lastVideoIndex - 1, lastVideoIndex);
    var essentialPropertyValueLength = lastVideo[0].EssentialProperty.value.length;
    maxZoomLevel = lastVideo[0].EssentialProperty.value.slice(essentialPropertyValueLength - 1, essentialPropertyValueLength);
    var orderedAdaptationSets = fallBackLayerAdaptationSet;
    if (contentHasAudio == false) {
      var o = 0;
      var orderedAdaptationSets = [fallBackLayerAdaptationSet[0]];
    } else {
      var o = 1;
      var orderedAdaptationSets = fallBackLayerAdaptationSet;
    }
    for (var i = 1 + o; i < adaptationSets.length; i++) {
      var essentialPropertyValue = adaptationSets[i].EssentialProperty.value;
      var essentialPropertyValueAsArray = essentialPropertyValue.split(",");
      var essentialPropertyValueLength = essentialPropertyValueAsArray.length;
      var zoomLevel = essentialPropertyValueAsArray.slice(essentialPropertyValueLength - 1, essentialPropertyValueLength);
      if (zoomLevel == 1) {
        if (i == 1 + o) {
          if ($.isArray(adaptationSets[i].Representation)) {
            zoomLayer1ContentWidth = adaptationSets[i].Representation[0].width;
            zoomLayer1ContentHeight = adaptationSets[i].Representation[0].height;
          } else {
            zoomLayer1ContentWidth = adaptationSets[i].Representation.width;
            zoomLayer1ContentHeight = adaptationSets[i].Representation.height;
          }
          zoomLayer1ContentAspectRatio = zoomLayer1ContentWidth / zoomLayer1ContentHeight;
          if (essentialPropertyValueAsArray[3] == 1 && essentialPropertyValueAsArray[4] == 1) {
            tileUnitType = "arbitrary units";
          } else {
            tileUnitType = "pixel units";
          }
        }
        spatialOrderingZoomLevel1.push({
          index: i,
          x: essentialPropertyValueAsArray[1],
          y: essentialPropertyValueAsArray[2]
        });
      } else if (zoomLevel == 2) {
        var firstIterationFlag = true;
        if (firstIterationFlag) {
          if ($.isArray(adaptationSets[i].Representation)) {
            zoomLayer2ContentWidth = adaptationSets[i].Representation[0].width;
            zoomLayer2ContentHeight = adaptationSets[i].Representation[0].height;
          } else {
            zoomLayer2ContentWidth = adaptationSets[i].Representation.width;
            zoomLayer2ContentHeight = adaptationSets[i].Representation.height;
          }
          zoomLayer2ContentAspectRatio = zoomLayer2ContentWidth / zoomLayer2ContentHeight;
          firstIterationFlag = false;
        }
        spatialOrderingZoomLevel2.push({
          index: i,
          x: essentialPropertyValueAsArray[1],
          y: essentialPropertyValueAsArray[2]
        });
      }
    }
    if (spatialOrderingZoomLevel1.length > 0) {
      spatialOrderingZoomLevel1 = spatialOrderingZoomLevel1.sort(orderByProperty("x", "y"));
      for (var i = 0; i < spatialOrderingZoomLevel1.length; i++) {
        var index = spatialOrderingZoomLevel1[i]["index"];
        orderedAdaptationSets.push(adaptationSets[index]);
      }
      spatialOrderingDimensionsZoomLevel1 = countUniques(spatialOrderingZoomLevel1);
      zoomLevel1TilesHorizontal = spatialOrderingDimensionsZoomLevel1[1].slice(0, 1);
      zoomLevel1TilesVertical = spatialOrderingDimensionsZoomLevel1[0].length;
    }
    if (spatialOrderingZoomLevel2.length > 0) {
      spatialOrderingZoomLevel2 = spatialOrderingZoomLevel2.sort(orderByProperty("x", "y"));
      for (var i = 0; i < spatialOrderingZoomLevel2.length; i++) {
        var index = spatialOrderingZoomLevel2[i]["index"];
        orderedAdaptationSets.push(adaptationSets[index]);
      }
      spatialOrderingDimensionsZoomLevel2 = countUniques(spatialOrderingZoomLevel2);
      zoomLevel2TilesHorizontal = spatialOrderingDimensionsZoomLevel2[1].slice(0, 1);
      zoomLevel2TilesVertical = spatialOrderingDimensionsZoomLevel2[0].length;
    }
    console.debug("orderedAdaptationSets.length = " + orderedAdaptationSets.length);
    inMPD.Period.AdaptationSet = orderedAdaptationSets;
  },
  zoomLayer1Attacher: function(data) {
    var adaptationSets = inMPD.Period.AdaptationSet;
    var tileMPDs = [];
    var xPosition = data[0];
    var yPosition = data[1];
    var viewLayer = data[2];
    if (contentHasAudio == false) {
      var o = 0;
    } else {
      var o = 1;
    }
    for (var i = 1 + o; i < adaptationSets.length; i++) {
      var essentialPropertyValueLength = adaptationSets[i].EssentialProperty.value.length;
      var zoomLevel = adaptationSets[i].EssentialProperty.value.slice(essentialPropertyValueLength - 1, essentialPropertyValueLength);
      if (zoomLevel == currentZoomLevel) {
        var arrayIndex = i - (1 + o);
        tileMPDs[arrayIndex] = {
          __cnt: inMPD.__cnt,
          "#comment": inMPD["#comment"],
          "#comment_asArray": inMPD["#comment_asArray"],
          BaseURL: inMPD.BaseURL,
          BaseURL_asArray: inMPD.BaseURL_asArray,
          Period: {
            __cnt: inMPD.Period.__cnt,
            AdaptationSet: adaptationSets[i],
            AdaptationSet_asArray: [adaptationSets[i]],
            __children: adaptationSets[i]
          },
          Period_asArray: [{
            AdaptationSet: adaptationSets[i],
            AdaptationSet_asArray: [adaptationSets[i]],
            __children: adaptationSets[i]
          }],
          xmlns: inMPD.xmlns,
          mediaPresentationDuration: inMPD.mediaPresentationDuration,
          minBufferTime: inMPD.minBufferTime,
          profiles: inMPD.profiles,
          type: inMPD.type,
          __text: inMPD.__text
        };
        if (i == 1 + o) {
          if ($.isArray(adaptationSets[i].Representation)) {
            zoomLayer1ContentWidth = adaptationSets[i].Representation[0].width;
            zoomLayer1ContentHeight = adaptationSets[i].Representation[0].height;
          } else {
            zoomLayer1ContentWidth = adaptationSets[i].Representation.width;
            zoomLayer1ContentHeight = adaptationSets[i].Representation.height;
          }
          zoomLayer1ContentAspectRatio = zoomLayer1ContentWidth / zoomLayer1ContentHeight;
        }
      } else if (zoomLevel > currentZoomLevel) {
        break;
      }
    }
    zoomLayer1PlayerObjects = [];
    timingObject = new TIMINGSRC.TimingObject({
      position: fallBackLayer.currentTime
    });
    for (var i = 0; i < zoomLayer1VideoElements.length; i++) {
      var videoElement = "video" + (i + 1);
      var player = launchDashPlayer(videoElement);
      //player.setAutoSwitchQualityFor("video", false); // doesn't exist in dash.js 3.x.x anymore
      player.updateSettings({
        'autoSwitchBitrate': {
          'video': false
        }
      });

      zoomLayer1PlayerObjects.push(player);
    }
    for (var i = 0; i < zoomLayer1PlayerObjects.length; i++) {
      var player = zoomLayer1PlayerObjects[i];
      var source = [mpdURL, tileMPDs[i]];
      player.attachSource(source);
    }
    initiatePlayBack(fallBackLayer, zoomLayer1VideoElements, viewLayer);
    updateViewLayerOnReadyState(zoomLayer1VideoElements, xPosition, yPosition, viewLayer);
    if (getClickPositionEnabled === false) {
      videoContainer.addEventListener("dblclick", onClickEvent, false);
      getClickPositionEnabled = true;
    }
  },
  zoomLayer2Attacher: function(data) {
    var tile1, tile2, tile3, tile4;
    var adaptationSets = inMPD.Period.AdaptationSet;
    var tileMPDs = [];
    var xPosition = data[0];
    var yPosition = data[1];
    var viewLayer = data[2];
    var videoContainerWidth = parseInt(videoContainer.offsetWidth, 10);
    var videoContainerHeight = parseInt(videoContainer.offsetHeight, 10);
    var selectedTiles = [];
    var numberOfTilesZoomLayer1 = zoomLevel1TilesHorizontal * zoomLevel1TilesVertical;
    var selectedTileX = Math.ceil(Math.abs(xPosition) / (videoContainerWidth / zoomLevel2TilesHorizontal));
    var selectedTileY = Math.ceil(Math.abs(yPosition) / (videoContainerHeight / zoomLevel2TilesVertical));
    var selectedTile1D = (selectedTileY - 1) * zoomLevel2TilesHorizontal + selectedTileX;
    if (selectedTileX < zoomLevel2TilesHorizontal && selectedTileY < zoomLevel2TilesVertical) {
      tile1 = selectedTile1D;
      tile2 = selectedTile1D + 1;
      tile3 = selectedTile1D + parseInt(zoomLevel2TilesHorizontal);
      tile4 = selectedTile1D + parseInt(zoomLevel2TilesHorizontal) + 1;
    } else if (selectedTileX == zoomLevel2TilesHorizontal && selectedTileY < zoomLevel2TilesVertical) {
      tile1 = selectedTile1D - 1;
      tile2 = selectedTile1D;
      tile3 = selectedTile1D + parseInt(zoomLevel2TilesHorizontal) - 1;
      tile4 = selectedTile1D + parseInt(zoomLevel2TilesHorizontal);
    } else if (selectedTileX < zoomLevel2TilesHorizontal && selectedTileY == zoomLevel2TilesVertical) {
      tile1 = selectedTile1D - parseInt(zoomLevel2TilesHorizontal);
      tile2 = selectedTile1D - parseInt(zoomLevel2TilesHorizontal) + 1;
      tile3 = selectedTile1D;
      tile4 = selectedTile1D + 1;
    } else if (selectedTileX == zoomLevel2TilesHorizontal && selectedTileY == zoomLevel2TilesVertical) {
      tile1 = selectedTile1D - parseInt(zoomLevel2TilesHorizontal) - 1;
      tile2 = selectedTile1D - parseInt(zoomLevel2TilesHorizontal);
      tile3 = selectedTile1D - 1;
      tile4 = selectedTile1D;
    }
    selectedTiles = [tile1, tile2, tile3, tile4];
    if (contentHasAudio == false) {
      var o = 0;
    } else {
      var o = 1;
    }
    for (var i = 1 + o; i < adaptationSets.length; i++) {
      var essentialPropertyValueLength = adaptationSets[i].EssentialProperty.value.length;
      var zoomLevel = adaptationSets[i].EssentialProperty.value.slice(essentialPropertyValueLength - 1, essentialPropertyValueLength);
      if (i == 1 + o) {
        var n = 0;
        var tileNumber = selectedTiles[n];
        if ($.isArray(adaptationSets[i].Representation)) {
          zoomLayer2ContentWidth = adaptationSets[i].Representation[0].width;
          zoomLayer2ContentHeight = adaptationSets[i].Representation[0].height;
        } else {
          zoomLayer2ContentWidth = adaptationSets[i].Representation.width;
          zoomLayer2ContentHeight = adaptationSets[i].Representation.height;
        }
        zoomLayer2ContentAspectRatio = zoomLayer2ContentWidth / zoomLayer2ContentHeight;
      }
      if (i == tileNumber + o + numberOfTilesZoomLayer1) {
        var arrayIndex = n;
        tileMPDs[arrayIndex] = {
          __cnt: inMPD.__cnt,
          "#comment": inMPD["#comment"],
          "#comment_asArray": inMPD["#comment_asArray"],
          BaseURL: inMPD.BaseURL,
          BaseURL_asArray: inMPD.BaseURL_asArray,
          Period: {
            __cnt: inMPD.Period.__cnt,
            AdaptationSet: adaptationSets[i],
            AdaptationSet_asArray: [adaptationSets[i]],
            __children: adaptationSets[i]
          },
          Period_asArray: [{
            AdaptationSet: adaptationSets[i],
            AdaptationSet_asArray: [adaptationSets[i]],
            __children: adaptationSets[i]
          }],
          xmlns: inMPD.xmlns,
          mediaPresentationDuration: inMPD.mediaPresentationDuration,
          minBufferTime: inMPD.minBufferTime,
          profiles: inMPD.profiles,
          type: inMPD.type,
          __text: inMPD.__text
        };
        n += 1;
        tileNumber = selectedTiles[n];
      }
    }
    zoomLayer2PlayerObjects = [];
    timingObject = new TIMINGSRC.TimingObject({
      position: fallBackLayer.currentTime
    });
    for (var i = 0; i < zoomLayer2VideoElements.length; i++) {
      var videoElement = "video" + (i + 5);
      var player = launchDashPlayer(videoElement);
      //player.setAutoSwitchQualityFor("video", false);
      player.updateSettings({
        'autoSwitchBitrate': {
          'video': false
        }
      });
      zoomLayer2PlayerObjects.push(player);
    }
    for (var i = 0; i < zoomLayer2PlayerObjects.length; i++) {
      var player = zoomLayer2PlayerObjects[i];
      var source = [mpdURL, tileMPDs[i]];
      zoomLayer1VideoSyncObjects[i] = null;
      zoomLayer2VideoSyncObjects[i] = MCorp.mediaSync(zoomLayer2VideoElements[i], timingObject);
      player.attachSource(source);
    }
    initiatePlayBack(fallBackLayer, zoomLayer2VideoElements, viewLayer);
    updateViewLayerOnReadyState(zoomLayer2VideoElements, xPosition, yPosition, viewLayer);
  }
};

var MPDManager = function(mpdURL) {
  new normalVideoAttacher();
  new tiledVideoAttacher();
  new MPDParser();
  var mpdRetriever = new MPDRetriever();
  mpdRetriever.params = {
    mpdURL: mpdURL
  };
  mpdRetriever.getMPD();
};

function openVideo() {
  screenAspectRatio = screen.width / screen.height;
  fallBackLayer.style.width = "";
  fallBackLayer.style.height = "";
  initialWidth = parseInt(fallBackLayer.offsetWidth, 10);
  initialHeight = parseInt(fallBackLayer.offsetHeight, 10);
  initialAspectRatio = initialWidth / initialHeight;
  masterQuality = undefined;
  var mpdURL = document.getElementById("mpdURL").value;

  function validURL(str) {
    var pattern = new RegExp(/(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/);
    if (!pattern.test(str)) {
      window.alert("Please enter a valid URL.");
      return false;
    } else {
      return true;
    }
  }
  if (validURL(mpdURL) == true) {
    bannerbox.style.backgroundImage = "none";
    bannerbox.style.background = "black";
    MPDManager(mpdURL);
  }
}

function playPause() {
  if (fallBackLayer.paused) {
    fallBackLayer.play();
    if (timingObject) {
      timingObject.update({
        position: fallBackLayer.currentTime,
        velocity: 1
      });
    }
    $("#iconPlayPause").removeClass("icon-play");
    $("#iconPlayPause").toggleClass("icon-pause");
  } else {
    fallBackLayer.pause();
    if (timingObject) {
      timingObject.update({
        position: fallBackLayer.currentTime,
        velocity: 0
      });
    }
    $("#iconPlayPause").removeClass("icon-pause");
    $("#iconPlayPause").toggleClass("icon-play");
  }
}

function muteSound() {
  if (fallBackLayer.muted === false) {
    lastVolumeValue = fallBackLayer.volume;
    fallBackLayer.muted = true;
    $("#iconMute").removeClass("icon-mute-off");
    $("#iconMute").toggleClass("icon-mute-on");
    $("#volumebar").val(0);
  } else if (fallBackLayer.muted === true) {
    fallBackLayer.muted = false;
    fallBackLayer.volume = lastVolumeValue;
    $("#iconMute").removeClass("icon-mute-on");
    $("#iconMute").toggleClass("icon-mute-off");
    $("#volumebar").val(lastVolumeValue);
  }
}

function switchScreenMode() {
  var screenChangeEvents;
  if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
    fullScreenFlag = true;
    browserWindowZoomedTo = currentZoomLevel;
    fullScreenZoomedTo = currentZoomLevel;
    zoomLayer1VideoHeight = computeVideoDimensions(zoomLayer1ContentAspectRatio, "fullscreen")[0];
    zoomLayer1VideoWidth = computeVideoDimensions(zoomLayer1ContentAspectRatio, "fullscreen")[1];
    zoomLayer2VideoHeight = computeVideoDimensions(zoomLayer2ContentAspectRatio, "fullscreen")[0];
    zoomLayer2VideoWidth = computeVideoDimensions(zoomLayer2ContentAspectRatio, "fullscreen")[1];
    if (videoContainer.requestFullscreen) {
      videoContainer.requestFullscreen();
    } else if (videoContainer.msRequestFullscreen) {
      videoContainer.msRequestFullscreen();
    } else if (videoContainer.mozRequestFullScreen) {
      videoContainer.mozRequestFullScreen();
    } else if (videoContainer.webkitRequestFullscreen) {
      videoContainer.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
    $("#icon-fullscreen").removeClass("icon-fullscreen-enter");
    $("#icon-fullscreen").toggleClass("icon-fullscreen-exit");
    $("#zoomLayer1").toggleClass("fullscreen");
    $("#zoomLayer2").toggleClass("fullscreen");
    SRDPlayer.style.height = "";
    videoContainer.style.height = "";
    bannerbox.style.height = "";
    fallBackLayer.style.width = "";
    fallBackLayer.style.height = "";
    zoomLayer1.width = zoomLayer1VideoWidth * 2;
    zoomLayer1.height = zoomLayer1VideoHeight * 2;
    zoomLayer2.width = zoomLayer2VideoWidth * 2;
    zoomLayer2.height = zoomLayer2VideoHeight * 2;
    $("#fallBackLayer").toggleClass("fullscreen");
    $("#videoContainer").toggleClass("fullscreen");
    $("#bannerbox").toggleClass("bannerbox-fullscreen");
    $("#videoController").toggleClass("video-controller-fullscreen");
    adjustVideoSizes(zoomLayer1VideoHeight, zoomLayer1VideoWidth, zoomLayer2VideoHeight, zoomLayer2VideoWidth);
    if (currentZoomLevel == 1) {
      var offsetFromLeft = parseInt(zoomLayer1.offsetLeft, 10) / initialWidth * zoomLayer1VideoWidth;
      var offsetFromTop = parseInt(zoomLayer1.offsetTop, 10) / (initialHeight / zoomLayer1ContentAspectRatio) * zoomLayer1VideoHeight;
      var eHe = zoomLayer1.height;
      var vHe = screen.height;
      if (offsetFromTop < vHe - eHe) {
        offsetFromTop = vHe - eHe;
      }
      zoomLayer1.style.left = offsetFromLeft + "px";
      zoomLayer1.style.top = offsetFromTop + "px";
      fallBackLayer.style.left = offsetFromLeft + "px";
      fallBackLayer.style.top = offsetFromTop + "px";
      zoomLayer1Hammer.off("panstart", function(evt) {
        dragtool.startMoving(zoomLayer1, videoContainer, evt);
      });
      zoomLayer1Hammer.off("panend", function(evt) {
        dragtool.stopMoving(videoContainer);
      });
      zoomLayer1Hammer.on("panstart", function(evt) {
        dragtool.startMoving(zoomLayer1, videoContainer, evt);
      });
      zoomLayer1Hammer.on("panend", function(evt) {
        dragtool.stopMoving(videoContainer);
      });
    } else if (currentZoomLevel == 2) {
      var offsetFromLeft = parseInt(zoomLayer2.offsetLeft, 10) / initialWidth * zoomLayer2VideoWidth;
      var offsetFromTop = parseInt(zoomLayer2.offsetTop, 10) / (initialHeight / zoomLayer2ContentAspectRatio) * zoomLayer2VideoHeight;
      var eHe = zoomLayer2.height;
      var vHe = screen.height;
      if (offsetFromTop < vHe - eHe) {
        offsetFromTop = vHe - eHe;
      }
      zoomLayer2.style.left = offsetFromLeft + "px";
      zoomLayer2.style.top = offsetFromTop + "px";
      fallBackLayer.style.left = offsetFromLeft + "px";
      fallBackLayer.style.top = offsetFromTop + "px";
      zoomLayer2Hammer.off("panstart", function(evt) {
        dragtool.startMoving(zoomLayer2, videoContainer, evt);
      });
      zoomLayer2Hammer.off("panend", function(evt) {
        dragtool.stopMoving(videoContainer);
      });
      zoomLayer2Hammer.on("panstart", function(evt) {
        dragtool.startMoving(zoomLayer2, videoContainer, evt);
      });
      zoomLayer2Hammer.on("panend", function(evt) {
        dragtool.stopMoving(videoContainer);
      });
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
  screenChangeEvents = "webkitfullscreenchange fullscreenchange MSFullscreenChange";
  if (browserType === "FireFox") {
    setTimeout(function() {
      if (document.mozFullScreen) {
        $(document).one("mozfullscreenchange", function() {
          exitHandler();
        });
      }
    }, 400);
  } else {
    setTimeout(function() {
      if (document.webkitIsFullScreen || document.fullscreen || document.msFullscreenElement) {
        $(videoContainer).one(screenChangeEvents, function() {
          exitHandler();
        });
      }
    }, 200);
  }

  function exitHandler() {
    var xPosition, yPosition;
    if (document.fullscreenElement || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement !== null) {
      fallBackLayer.style.width = "";
      fallBackLayer.style.height = "";
      if (fallBackLayerContentAspectRatio != initialAspectRatio) {
        updateAspectRatio(fallBackLayer, fallBackLayerContentAspectRatio);
      }
      zoomLayer1.removeAttribute("width");
      zoomLayer1.removeAttribute("height");
      zoomLayer2.removeAttribute("width");
      zoomLayer2.removeAttribute("height");
      $("#fallBackLayer").removeClass("fullscreen");
      $("#zoomLayer1").removeClass("fullscreen");
      $("#zoomLayer2").removeClass("fullscreen");
      $("video").removeClass("fullscreen");
      $("#videoContainer").removeClass("fullscreen");
      $("#videoController").removeClass("video-controller-fullscreen");
      $("#icon-fullscreen").removeClass("icon-fullscreen-exit");
      $("#icon-fullscreen").toggleClass("icon-fullscreen-enter");
      zoomLayer1VideoHeight = computeVideoDimensions(zoomLayer1ContentAspectRatio, "normal");
      zoomLayer1VideoWidth = initialWidth;
      zoomLayer2VideoHeight = computeVideoDimensions(zoomLayer2ContentAspectRatio, "normal");
      zoomLayer2VideoWidth = initialWidth;
      adjustVideoSizes(zoomLayer1VideoHeight, zoomLayer1VideoWidth, zoomLayer2VideoHeight, zoomLayer2VideoWidth);
      $("#zoomLayer1").width(zoomLayer1VideoWidth * 2 + "px");
      $("#zoomLayer1").height(zoomLayer1VideoHeight * 2 + "px");
      $("#zoomLayer2").width(zoomLayer2VideoWidth * 2 + "px");
      $("#zoomLayer2").height(zoomLayer2VideoHeight * 2 + "px");
      fallBackLayer.style.top = 0 + "px";
      if (currentZoomLevel == 0) {
        fullScreenZoomedTo = 0;
      } else if (currentZoomLevel == 1) {
        var zoomLayer1VideoHeightFullScreen = computeVideoDimensions(zoomLayer1ContentAspectRatio, "fullscreen")[0];
        var zoomLayer1VideoWidthFullScreen = computeVideoDimensions(zoomLayer1ContentAspectRatio, "fullscreen")[1];
        xPosition = zoomLayer1.offsetLeft / zoomLayer1VideoWidthFullScreen * zoomLayer1VideoWidth;
        yPosition = zoomLayer1.offsetTop / zoomLayer1VideoHeightFullScreen * zoomLayer1VideoHeight;
        zoomLayer1.style.left = xPosition + "px";
        zoomLayer1.style.top = yPosition + "px";
        fullScreenZoomedTo = 1;
        zoomLayer1Hammer.off("panstart", function(evt) {
          dragtool.startMoving(zoomLayer1, videoContainer, evt);
        });
        zoomLayer1Hammer.off("panend", function(evt) {
          dragtool.stopMoving(videoContainer);
        });
        zoomLayer1Hammer.on("panstart", function(evt) {
          dragtool.startMoving(zoomLayer1, videoContainer, evt);
        });
        zoomLayer1Hammer.on("panend", function(evt) {
          dragtool.stopMoving(videoContainer);
        });
      } else if (currentZoomLevel == 2) {
        xPosition = zoomLayer2.offsetLeft + zoomLayer2VideoWidth / 2;
        yPosition = zoomLayer2.offsetTop + zoomLayer2VideoHeight / 2;
        zoomLayer2.style.left = xPosition + "px";
        zoomLayer2.style.top = yPosition + "px";
        fullScreenZoomedTo = 2;
      }
      fullScreenFlag = false;
      browserWindowZoomedTo = undefined;
    }
  }

  function adjustVideoSizes(zoomLayer1VideoHeight, zoomLayer1VideoWidth, zoomLayer2VideoHeight, zoomLayer2VideoWidth) {
    video1.height = zoomLayer1VideoHeight;
    video1.width = zoomLayer1VideoWidth;
    video2.height = zoomLayer1VideoHeight;
    video2.width = zoomLayer1VideoWidth;
    video3.height = zoomLayer1VideoHeight;
    video3.width = zoomLayer1VideoWidth;
    video4.height = zoomLayer1VideoHeight;
    video4.width = zoomLayer1VideoWidth;
    video5.height = zoomLayer2VideoHeight;
    video5.width = zoomLayer2VideoWidth;
    video6.height = zoomLayer2VideoHeight;
    video6.width = zoomLayer2VideoWidth;
    video7.height = zoomLayer2VideoHeight;
    video7.width = zoomLayer2VideoWidth;
    video8.height = zoomLayer2VideoHeight;
    video8.width = zoomLayer2VideoWidth;
  }
}

function onClickEvent(e) {
  var parentPosition, xPosition, yPosition, viewLayer;
  if (fullScreenFlag == false) {
    parentPosition = getPosition(e.currentTarget);
    xPosition = -(e.clientX - parentPosition.x);
    yPosition = -(e.clientY - parentPosition.y);
  } else {
    xPosition = -e.clientX;
    yPosition = -e.clientY;
  }
  if (currentZoomLevel == 0) {
    viewLayer = zoomLayer1;
    currentZoomLevel = 1;
    if (fullScreenFlag) {
      updateVideoContainer(xPosition, yPosition, fallBackLayer, null, "fullscreen zoomed");
    } else {
      updateVideoContainer(xPosition, yPosition, fallBackLayer, null, 2);
    }
    ServiceBus.publish("Zoom-level1", [xPosition, yPosition, viewLayer]);
    zoomLayer1Hammer.on("panstart", function(evt) {
      dragtool.startMoving(zoomLayer1, videoContainer, evt);
    });
    zoomLayer1Hammer.on("panend", function(evt) {
      dragtool.stopMoving(videoContainer);
    });
  } else if (currentZoomLevel == 1) {
    if (spatialOrderingZoomLevel2.length > 0) {
      viewLayer = zoomLayer2;
      zoomLayer1Hammer.off("panstart", function(evt) {
        dragtool.startMoving(zoomLayer1, videoContainer, evt);
      });
      zoomLayer1Hammer.off("panend", function(evt) {
        dragtool.stopMoving(videoContainer);
      });
      if (fullScreenFlag) {
        updateVideoContainer(xPosition, yPosition, fallBackLayer, null, "fullscreen zoomed double");
      } else {
        updateVideoContainer(xPosition, yPosition, fallBackLayer, null, "double");
      }
      zoomLayer1PlayerObjects = [];
      currentZoomLevel = 2;
      ServiceBus.publish("Zoom-level2", [xPosition, yPosition, viewLayer]);
      zoomLayer2Hammer.on("panstart", function(evt) {
        dragtool.startMoving(zoomLayer2, videoContainer, evt);
      });
      zoomLayer2Hammer.on("panend", function(evt) {
        dragtool.stopMoving(videoContainer);
      });
    } else {
      viewLayer = fallBackLayer;
      zoomLayer1Hammer.off("panstart", function(evt) {
        dragtool.startMoving(zoomLayer1, videoContainer, evt);
      });
      zoomLayer1Hammer.off("panend", function(evt) {
        dragtool.stopMoving(videoContainer);
      });
      if (fullScreenFlag) {
        if (browserWindowZoomedTo == 0) {
          updateVideoContainer(xPosition, yPosition, viewLayer, null, .5);
        } else {
          updateVideoContainer(xPosition, yPosition, viewLayer, null, "fullscreen");
          browserWindowZoomedTo = 0;
        }
      } else {
        if (fullScreenZoomedTo == 0) {
          updateVideoContainer(xPosition, yPosition, viewLayer, null, .5);
        } else if (fullScreenZoomedTo == 1 || fullScreenZoomedTo == 2) {
          updateVideoContainer(xPosition, yPosition, viewLayer, null, 1);
        } else {
          updateVideoContainer(xPosition, yPosition, viewLayer, null, .5);
        }
      }
      zoomLayer1PlayerObjects = [];
      currentZoomLevel = 0;
    }
  } else if (currentZoomLevel == 2) {
    viewLayer = fallBackLayer;
    zoomLayer1Hammer.off("panstart", function(evt) {
      dragtool.startMoving(zoomLayer1, videoContainer, evt);
    });
    zoomLayer1Hammer.off("panend", function(evt) {
      dragtool.stopMoving(videoContainer);
    });
    if (fullScreenFlag) {
      if (browserWindowZoomedTo === 2) {
        updateVideoContainer(xPosition, yPosition, viewLayer, null, "fullscreen");
      } else {
        updateVideoContainer(xPosition, yPosition, viewLayer, null, .333);
      }
    } else {
      if (!fullScreenZoomedTo || fullScreenZoomedTo == 0) {
        if (currentZoomLevel === 1) {
          updateVideoContainer(xPosition, yPosition, viewLayer, null, .5);
        } else if (currentZoomLevel === 2) {
          updateVideoContainer(xPosition, yPosition, viewLayer, null, .25);
        }
      } else if (fullScreenZoomedTo == 1) {
        updateVideoContainer(xPosition, yPosition, viewLayer, null, .5);
        fullScreenZoomedTo = 0;
      } else if (fullScreenZoomedTo == 2) {
        updateVideoContainer(xPosition, yPosition, viewLayer, null, 1);
        fullScreenZoomedTo = 0;
      } else {
        updateVideoContainer(xPosition, yPosition, viewLayer, null, 1);
      }
      browserWindowZoomedTo = 0;
    }
    zoomLayer2PlayerObjects = [];
    currentZoomLevel = 0;
  }
}

function getPosition(element) {
  var xPosition = 0;
  var yPosition = 0;
  if (fullScreenFlag == false) {
    while (element) {
      xPosition += element.offsetLeft - element.scrollLeft + element.clientLeft;
      yPosition += element.offsetTop - element.scrollTop + element.clientTop;
      element = element.offsetParent;
    }
  } else {
    while (element) {
      xPosition += element.offsetLeft - element.scrollLeft;
      yPosition += element.offsetTop - element.scrollTop;
      element = element.offsetParent;
    }
  }
  return {
    x: xPosition,
    y: yPosition
  };
}

function updateVideoContainer(xPosition, yPosition, viewLayer, delay, resizeFactor) {
  if (viewLayer == fallBackLayer) {
    if (fullScreenFlag == true) {
      if (resizeFactor == "fullscreen zoomed") {
        fallBackLayer.style.height = screen.width / fallBackLayerContentAspectRatio * 2 + "px";
        fallBackLayer.style.width = screen.width * 2 + "px";
      } else if (resizeFactor == "fullscreen zoomed double") {
        fallBackLayer.style.height = screen.width / fallBackLayerContentAspectRatio * 3 + "px";
        fallBackLayer.style.width = screen.width * 3 + "px";
      } else if (resizeFactor == "fullscreen") {
        fallBackLayer.style.height = screen.width / fallBackLayerContentAspectRatio + "px";
        fallBackLayer.style.width = screen.width + "px";
      } else {
        var resizedHeight = parseInt(fallBackLayer.offsetHeight, 10) * resizeFactor;
        var resizedWidth = parseInt(fallBackLayer.offsetWidth, 10) * resizeFactor;
        fallBackLayer.style.height = resizedHeight + "px";
        fallBackLayer.style.width = resizedWidth + "px";
      }
    } else if (fullScreenFlag == false) {
      var resizedHeight = parseInt(fallBackLayer.offsetHeight, 10) * resizeFactor;
      var resizedWidth = parseInt(fallBackLayer.offsetWidth, 10) * resizeFactor;
      fallBackLayer.style.height = resizedHeight + "px";
      fallBackLayer.style.width = resizedWidth + "px";
    }
    if (resizeFactor === .25) {
      fallBackLayer.style.left = 0 + "px";
      fallBackLayer.style.top = 0 + "px";
      setVisibleElement("fallbacklayer");
    } else if (resizeFactor === .333 || resizeFactor === .5) {
      var offsetFromTop = (parseInt(videoContainer.offsetHeight, 10) - parseInt(fallBackLayer.offsetHeight, 10)) / 2;
      fallBackLayer.style.left = 0 + "px";
      fallBackLayer.style.top = offsetFromTop + "px";
      setVisibleElement("fallbacklayer");
    } else if (resizeFactor === 1) {
      fallBackLayer.style.left = 0 + "px";
      fallBackLayer.style.top = 0 + "px";
      setVisibleElement("fallbacklayer");
    } else if (resizeFactor === 2) {
      fallBackLayer.style.left = xPosition + "px";
      fallBackLayer.style.top = yPosition + "px";
    } else if (resizeFactor === "double") {
      var resizedHeight = parseInt(fallBackLayer.offsetHeight, 10) * 2;
      var resizedWidth = parseInt(fallBackLayer.offsetWidth, 10) * 2;
      fallBackLayer.style.height = resizedHeight + "px";
      fallBackLayer.style.width = resizedWidth + "px";
      fallBackLayer.style.left = xPosition * 3 + "px";
      fallBackLayer.style.top = yPosition * 3 + "px";
      setVisibleElement("fallbacklayer");
    } else if (resizeFactor === "fullscreen zoomed") {
      fallBackLayer.style.left = xPosition + "px";
      fallBackLayer.style.top = yPosition + "px";
      setVisibleElement("fallbacklayer");
    } else if (resizeFactor === "fullscreen zoomed double") {
      fallBackLayer.style.left = xPosition - parseInt(fallBackLayer.offsetWidth, 10) / 4 + "px";
      fallBackLayer.style.top = yPosition - parseInt(fallBackLayer.offsetHeight, 10) / 4 + "px";
      setVisibleElement("fallbacklayer");
    } else if (resizeFactor === "fullscreen") {
      fallBackLayer.style.left = 0 + "px";
      fallBackLayer.style.top = 0 + "px";
      setVisibleElement("fallbacklayer");
    }
  } else if (viewLayer == zoomLayer1) {
    var offsetFromTop = (parseInt(videoContainer.offsetHeight, 10) - parseInt(zoomLayer1.offsetHeight, 10) / 2) / 2;
    if (fullScreenFlag == false) {
      offsetFromTop = 0;
    }
    zoomLayer1.style.left = xPosition + "px";
    zoomLayer1.style.top = yPosition + offsetFromTop + "px";
    setTimeout(function() {
      setVisibleElement("zoomlayer1");
    }, delay);
  } else if (viewLayer == zoomLayer2) {
    var offsetFromTop = (parseInt(videoContainer.offsetHeight, 10) - parseInt(zoomLayer2.offsetHeight, 10) / 2) / 2;
    if (fullScreenFlag == false) {
      offsetFromTop = 0;
    }
    zoomLayer2.style.left = xPosition + "px";
    zoomLayer2.style.top = yPosition + offsetFromTop + "px";
    setTimeout(function() {
      setVisibleElement("zoomlayer2");
    }, delay);
  }
}

function updateAspectRatio(viewLayer, contentAspectRatio) {
  if (viewLayer == fallBackLayer) {
    SRDPlayer.style.height = initialWidth / contentAspectRatio + 188 + "px";
    videoContainer.style.height = initialWidth / contentAspectRatio + "px";
    fallBackLayer.style.height = initialWidth / contentAspectRatio + "px";
    bannerbox.style.height = initialWidth / contentAspectRatio + "px";
  }
}

function setVisibleElement(visibleElement) {
  if (visibleElement === "fallbacklayer") {
    fallBackLayer.style.visibility = "visible";
    zoomLayer1.style.visibility = "hidden";
    zoomLayer2.style.visibility = "hidden";
    bannerbox.style.visibility = "hidden";
  } else if (visibleElement === "zoomlayer1") {
    zoomLayer1.style.visibility = "visible";
    fallBackLayer.style.visibility = "hidden";
    zoomLayer2.style.visibility = "hidden";
    bannerbox.style.visibility = "hidden";
  } else if (visibleElement === "zoomlayer2") {
    zoomLayer2.style.visibility = "visible";
    fallBackLayer.style.visibility = "hidden";
    zoomLayer1.style.visibility = "hidden";
    bannerbox.style.visibility = "hidden";
  } else if (visibleElement === "bannerbox") {
    bannerbox.style.visibility = "visible";
    fallBackLayer.style.visibility = "hidden";
    zoomLayer1.style.visibility = "hidden";
    zoomLayer2.style.visibility = "hidden";
  }
}

var dragtool = function() {
  return {
    move: function(divid, xpos, ypos) {
      divid.style.left = xpos + "px";
      divid.style.top = ypos + "px";
      fallBackLayer.style.left = xpos + "px";
      fallBackLayer.style.top = ypos + "px";
    },
    startMoving: function(divid, videoContainer, evt) {
      var eWi = parseInt(divid.offsetWidth, 10),
        eHe = parseInt(divid.offsetHeight, 10),
        vWi = parseInt(videoContainer.offsetWidth, 10),
        vHe = parseInt(videoContainer.offsetHeight, 10),
        evt = evt || window.event;
      videoContainer.style.cursor = "move";
      videoContainer.onmousemove = function(evt) {
        evt = evt || window.event;
        var parentPosition, xPosition, yPosition;
        if (fullScreenFlag == false) {
          parentPosition = getPosition(evt.currentTarget);
          xPosition = evt.clientX - parentPosition.x - (eWi / 2 + vWi) / 2;
          yPosition = evt.clientY - parentPosition.y - (eHe / 2 + vHe) / 2;
        } else {
          xPosition = evt.clientX - (eWi / 2 + vWi) / 2;
          yPosition = evt.clientY - (eHe / 2 + vHe) / 2;
        }
        if (xPosition < -(eWi - vWi)) {
          xPosition = -(eWi - vWi);
        }
        if (yPosition < -(eHe - vHe)) {
          yPosition = -(eHe - vHe);
        }
        if (xPosition > 0) {
          xPosition = 0;
        }
        if (yPosition > 0) {
          yPosition = 0;
        }
        dragtool.move(divid, xPosition, yPosition);
      };
    },
    stopMoving: function(videoContainer) {
      videoContainer.style.cursor = "default";
      videoContainer.onmousemove = function() {};
    }
  };
}();

function computeVideoDimensions(contentAspectRatio, viewState) {
  if (contentAspectRatio === undefined) {
    contentAspectRatio = fallBackLayerContentAspectRatio;
  }
  if (viewState == "fullscreen") {
    var fullScreenVideoHeight, fullScreenVideoWidth;
    if (screenAspectRatio == contentAspectRatio) {
      fullScreenVideoHeight = screen.height;
      fullScreenVideoWidth = screen.width;
    } else if (screenAspectRatio < contentAspectRatio) {
      fullScreenVideoHeight = screen.width / contentAspectRatio;
      fullScreenVideoWidth = screen.width;
    } else if (screenAspectRatio > contentAspectRatio) {
      fullScreenVideoHeight = screen.width / contentAspectRatio;
      fullScreenVideoWidth = screen.width;
    }
    return [fullScreenVideoHeight, fullScreenVideoWidth];
  } else if (viewState == "normal") {
    var normalVideoHeight;
    normalVideoHeight = initialWidth / contentAspectRatio;
    return normalVideoHeight;
  }
}

function initiatePlayBack(fallBackLayer, videoList, viewLayer) {
  if (!fallBackLayer.paused) {
    $("#fallBackLayer").one("timeupdate", function() {
      timingObject.update({
        position: fallBackLayer.currentTime,
        velocity: 0
      });
      for (var i = 0; i < videoList.length; i++) {
        var videoTile = videoList[i];
        if (viewLayer == zoomLayer1) {
          zoomLayer2VideoSyncObjects[i] = null;
          zoomLayer1VideoSyncObjects[i] = MCorp.mediaSync(zoomLayer1VideoElements[i], timingObject);
        } else {
          zoomLayer1VideoSyncObjects[i] = null;
          zoomLayer2VideoSyncObjects[i] = MCorp.mediaSync(zoomLayer2VideoElements[i], timingObject);
        }
      }
    });
    setTimeout(function() {
      $("#fallBackLayer").one("timeupdate", function() {
        if (!fallBackLayer.paused) {
          timingObject.update({
            position: fallBackLayer.currentTime + .001,
            velocity: 1
          });
        }
      });
    }, 2500);
  } else {
    timingObject.update({
      position: fallBackLayer.currentTime,
      velocity: 0
    });
    for (var i = 0; i < videoList.length; i++) {
      var videoTile = videoList[i];
      if (viewLayer == zoomLayer1) {
        zoomLayer2VideoSyncObjects[i] = null;
        zoomLayer1VideoSyncObjects[i] = MCorp.mediaSync(zoomLayer1VideoElements[i], timingObject);
      } else {
        zoomLayer1VideoSyncObjects[i] = null;
        zoomLayer2VideoSyncObjects[i] = MCorp.mediaSync(zoomLayer2VideoElements[i], timingObject);
      }
    }
  }
  var masterVideo;
  if (currentZoomLevel == 1) {
    masterVideo = "#video1";
  } else if (currentZoomLevel == 2) {
    masterVideo = "#video5";
  }
  $(masterVideo).one("loadeddata", function() {
    var playerContainer = [];
    if (currentZoomLevel == 1) {
      playerContainer = zoomLayer1PlayerObjects;
    } else if (currentZoomLevel == 2) {
      playerContainer = zoomLayer2PlayerObjects;
    }
    for (var i = 0; i < playerContainer.length; i++) {
      var player = playerContainer[i];
      console.log("player " + i + " source:" + player.getSource());
      if (i === 0) {
        if (player.getBitrateInfoListFor("video").length > 1) {
          masterQuality = player.getQualityFor("video");
        }
      }
      if (i > 0 && masterQuality) {
        player.setQualityFor("video", masterQuality);
      }
    }
    if (masterQuality) {
      emitBitrateChanges(playerContainer, masterQuality);
    }
  });
}

function emitBitrateChanges(playerList, masterQuality) {
  playerList[0].on("metricChanged", function() {
    //playerList[0].eventBus.addEventListener(MediaPlayer.events.METRIC_CHANGED, function() {
    var currentQuality = playerList[0].getQualityFor("video");
    if (masterQuality != currentQuality) {
      masterQuality = currentQuality;
      for (var i = 1; i < playerList.length; i++) {
        var player = playerList[i];
        if (i > 0) {
          player.setQualityFor("video", masterQuality);
        }
      }
    }
  }, this);
}

function updateViewLayerOnReadyState(videoElementsList, xPosition, yPosition, viewLayer) {
  for (var i = 0; i < videoElementsList.length; i++) {
    if (!videoElementsList[i].ReadyState === 4) {
      i -= 1;
    }
    if (i === 3) {
      updateVideoContainer(xPosition, yPosition, viewLayer, 4500, null);
    }
  }
}
