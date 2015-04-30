/*! vault.js v1.3.0 | (c) 2015 @toddmotto | https://github.com/toddmotto/vault */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.vault = factory();
  }
})(this, function () {

  'use strict';

  var ls = window.localStorage;

  return {
    set: function (key, value) {
      if (key && value !== undefined) {
        ls[key] = JSON.stringify(value);
      }
    },
    get: function (key) {
      var value = ls[key];
      if (value !== undefined) {
        return JSON.parse(value);
      }
    },
    remove: function (key) {
      if (ls.hasOwnProperty(key)) {
        delete ls[key];
      }
    },
    empty: function () {
      ls.clear();
    }
  };

});
