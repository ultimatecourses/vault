"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vault = void 0;
/**
 * Vault class to manage storage
 */
var Vault = /** @class */ (function () {
    /**
     * Specify a `type` or `prefix` when instantiating
     */
    function Vault(options) {
        /**
         * Default options for each instance
         */
        this.options = {
            type: 'local',
            prefix: '',
        };
        this.options = __assign(__assign({}, this.options), options);
        /* eslint-disable @typescript-eslint/no-explicit-any */
        this.store = window["".concat(this.options.type, "Storage")];
    }
    Object.defineProperty(Vault.prototype, "isSupported", {
        /**
         * isSupported getter that returns a boolean
         * @returns boolean
         */
        get: function () {
            return typeof Storage === 'function';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vault.prototype, "value", {
        /**
         * An object of all storage items
         * @returns { [name: string]: any }
         */
        get: function () {
            return __assign({}, this.store);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Vault.prototype, "length", {
        /**
         * How many items are in the storage
         * @returns number
         */
        get: function () {
            return this.store.length;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the prefixed key if required
     * @returns string
     */
    Vault.prototype.getKey = function (key) {
        if (this.options.prefix) {
            return "".concat(this.options.prefix, "-").concat(key);
        }
        return key;
    };
    /**
     * Set a data structure to storage
     * @param key The key name to set, excluding the prefix
     * @param value Any non-function value (strings, numbers, booleans, arrays, objects)
     * @returns void
     */
    Vault.prototype.set = function (key, value) {
        try {
            this.store.setItem(this.getKey(key), JSON.stringify(value));
        }
        catch (e) {
            if (e instanceof DOMException) {
                throw new Error("[Vault] Storage limit exceeded: ".concat(e));
            }
            else {
                throw new Error("[Vault] Unknown error: ".concat(e));
            }
        }
    };
    /**
     * Get an item from storage
     * @param key The key name to get, excluding the prefix
     * @returns The typed item or undefined if not found
     */
    Vault.prototype.get = function (key) {
        try {
            var value = this.store.getItem(this.getKey(key));
            if (value) {
                return JSON.parse(value);
            }
        }
        catch (e) {
            throw new Error("[Vault] Error parsing key \"".concat(this.getKey(key), "\": ").concat(e));
        }
    };
    /**
     * Remove an item from storaage
     * @param key The key name to get, excluding the prefix
     * @returns void
     */
    Vault.prototype.remove = function (key) {
        this.store.removeItem(this.getKey(key));
    };
    /**
     * Remove all items from storage
     * @returns void
     */
    Vault.prototype.removeAll = function () {
        this.store.clear();
    };
    /**
     *
     * @param key The key name to listen for, excluding the prefix
     * @param fn Callback function on key's value change
     * @returns void
     */
    Vault.prototype.onChange = function (key, fn) {
        var k = this.getKey(key);
        window.addEventListener('storage', function (e) { return k === e[k] && fn(e); });
    };
    return Vault;
}());
exports.Vault = Vault;
/* eslint-disable @typescript-eslint/no-explicit-any */
window.Vault = Vault;
//# sourceMappingURL=vault.js.map