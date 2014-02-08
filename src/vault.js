window.Vault = (function (window, document, undefined) {

  'use strict';

  var getStore = function (type) {
    return type === 'local' ? localStorage : sessionStorage;
  };

  return {
    set: function (type, key, value) {
      if (!key || !value) return;
      getStore(type).setItem(key, JSON.stringify(value));
    },
    get: function (type, key) {
      var value = getStore(type).getItem(key);
      if (!value) return;
      return JSON.parse(value);
    },
    remove: function (type, key) {
      if (!getStore(type).getItem(key)) return;
      getStore(type).removeItem(key);
    },
    empty: function (type) {
      getStore(type).clear();
    }
  };

})(this, document);
