/*!
 *  Vault v1.0.0
 *  HTML5 (local/session) Web Storage API with automatic JSON support
 *  Project: https://github.com/toddmotto/vault
 *  by Todd Motto: http://toddmotto.com
 *  Copyright. MIT licensed.
 */
window.Vault = (function (window, document, undefined) {

  'use strict';

  return {
    set: function (type, key, value) {
      var store = type === 'local' ? localStorage : sessionStorage;
      if (!key || !value) return;
      store.setItem(key, JSON.stringify(value));
    },
    get: function (type, key) {
      var store = type === 'local' ? localStorage : sessionStorage;
      var value = store.getItem(key);
      if (!value) return;
      return JSON.parse(value);
    },
    remove: function (type, key) {
      var store = type === 'local' ? localStorage : sessionStorage;
      if (!store.getItem(key)) return;
      store.removeItem(key);
    },
    empty: function (type) {
      var store = type === 'local' ? localStorage : sessionStorage;
      store.clear();
    }
  };

})(window, document);
