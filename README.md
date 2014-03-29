# Vault.js [![Build Status](https://travis-ci.org/toddmotto/vault.png)](https://travis-ci.org/toddmotto/vault)

Vault is a 0.4KB standalone localStorage API with automatic JSON support. By default, localStorage only accepts a String as value of an Object property, Vault makes it possible to store entire JavaScript Objects using JSON parsing. Vault uses a faster Object lookup than the suggested API methods.

IE8 supports localStorage, therefore Vault can be used with IE8+, but note browser storage limitations in IE8 compared to modern browsers.

### Storing Objects
Vault allows you to automatically store JavaScript Objects and not just strings (default localStorage behaviour), allowing you to do the following:

```javascript
var blink182 = {
  founded: '1992',
  formed: 'California',
  members: ['Tom Delonge', 'Mark Hoppus', 'Travis Barker']
};
Vault.set('someBand', blink182);
```

### set API
To set data into localStorage, you must use the `set()` API. With this API, there are three ordered arguments, `type`, which denotes the type of localStorage, `key` for the Object's key, and `value` for the key value:

```javascript
Vault.set(type, key, value);
```

Example:

```javascript
// localStorage, object key = name, value = 'Tom Delonge'
Vault.set('name', 'Tom Delonge');
```

### get API
Obtaining set data is easy with the `get()` API, simply reference a previously set key with `type` and the `key`:

```javascript
Vault.get(type, key);
```

Example:

```javascript
// getting 'name' from localStorage
// returns 'Tom Delonge'
Vault.get('name');
```

### remove API
Removing set data is easy with the `remove()` API, again reference a previously set key with `type` and the `key`:

```javascript
Vault.remove(type, key);
```

Example:

```javascript
// removes 'name' from localStorage
Vault.remove('name');
```

### empty API
It's a good idea to empty the user's localStorage when possible to avoid overloading it, there are limits which differ per browser. Specifically modern browsers allow around `5MB` but IE versions are limited. IE8 also supports localStorage and Vault.

```javascript
Vault.empty(type);
```

Example to empty `localStorage`:

```javascript
Vault.empty('localStorage');
```

## Installing with Bower
To install Vault into your project using Bower, use the GitHub repository hook:

```
bower install https://github.com/toddmotto/vault.git
```

## Manual installation
Drop your files into your required folders, make sure you're using the files from the `dist` folder, which is the compiled production-ready code. Ensure you place the script before the closing `</body>` tag so the DOM tree is populated when the script runs.
	
```html
<body>
	<!-- html content above -->
	<script src="dist/vault.js"></script>
  <script>
  Vault.set('name', 'Tom Delonge');
  </script>
</body>
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using Grunt.

## Release history

- 1.1.0
  - Remove sessionStorage support, localStorage can be cleared upon leaving if necessary
  - Ditch Web Storage API (set/get/remove) syntax and use native Object lookups for better performance
  - Add AMD support
- 1.0.0
  - Initial release
