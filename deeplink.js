/**
 * @name deeplink.js
 * @author Kei Funagayama <kei.topaz@gmail.com>
 * @overview Redirect mobile website users to your native iOS and Android (browser only)
 * @license MIT
 */

(function (global) {
  'use strict';

  /**
   * @name deeplink
   * @namespace deeplink
   */
  var deeplink = {VERSION: '0.4.1'};

  /**
   * Global Settings
   */
  deeplink.settings = {
    wait: 500, // Latency of the URL Scheme.
  };

  /**
   * Simple function to open fallback url
   */
  var openFallback = function(ts, delay, storeLink) {
    return function() {
      var wait = delay + 500;
      if (typeof storeLink === "string" && (Date.now() - ts) < wait) {
        window.location.href = storeLink;
      }
    }
  };

  /**
   * launch iOS
   *
   * @memberof deeplink
   * @method
   *
   * @example
   * options : {
   *   storeLink: "https://itunes.apple.com/jp/app/twitter/id333903271?mt=8",
   *   urlScheme: "twitter://timeline",
   *   iframe: false
   * }
   */
  deeplink.launchiOS = function (options) {
    if (!!options.iframe) {
      return this._launchiFrame(options)
    }

    var wait = options.wait || deeplink.settings.wait;
    setTimeout(openFallback(Date.now(), wait, options.storeLink), wait);
    window.location = options.urlScheme;
  };

  /**
   * launch Android
   *
   * @memberof deeplink
   * @method
   *
   * @example
   * options : {
   *   storeLink: "https://play.google.com/store/apps/details?id=com.twitter.android",
   *   urlScheme: "twitter://timeline"
   * }
   */
  deeplink.launchAndroid = function (options) {
    var wait = options.wait || deeplink.settings.wait;
    if (navigator.userAgent.match(/Chrome/)) {
      setTimeout(openFallback(Date.now(), wait, options.chromeUrlScheme), wait);
      window.location = options.urlScheme;
    } else if(navigator.userAgent.match(/Firefox/)) {
      setTimeout(openFallback(Date.now(), wait, options.storeLink), wait);
      window.location = options.urlScheme;
    } else {
      setTimeout(openFallback(Date.now(), wait, options.storeLink), wait);
      window.location = options.shortLink;
    }
  };

  /**
   * launch use iframe
   */
  deeplink._launchiFrame = function (options) {

  };

  // main

  if (!global.deeplink) {
    // browser
    global.deeplink = {};
    global.deeplink = deeplink;
  }

})(this);
