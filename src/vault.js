(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.Vault = factory(root.localStorage);
  }
})(this, function (localStorage) {

  'use strict';

  var exports = {};

  exports.set = function (key, value) {
    if (!key || !value) return;
    localStorage[key] = JSON.stringify(value);
  };

  exports.get = function (key) {
    var value = localStorage[key];
    if (!value) return;
    return JSON.parse(value);
  };

  exports.remove = function (key) {
    if (!localStorage[key]) return;
    delete localStorage[key];
  };

  exports.empty = function () {
    for (var key in localStorage) {
      exports.remove(key);
    }
  };

  return exports;

});
