# Vault.js [![Build Status](https://travis-ci.org/toddmotto/vault.svg)](https://travis-ci.org/toddmotto/vault)

Vault is a 0.4KB standalone `localStorage` API with automatic JSON support. The HTML5 spec permits localStorage to only accept a String as value of an Object property, Vault makes it possible to store entire JavaScript Objects. Vault uses a faster Object lookup than the suggested API methods.

IE8 supports localStorage, therefore Vault can be used with IE8+, but note browser storage limitations in IE8 compared to modern browsers.

### Storing Objects
Vault allows you to automatically store JavaScript Objects and not just strings (default localStorage behaviour), allowing you to do the following:

```javascript
var blink182 = {
  founded: '1992',
  formed: 'California',
  members: ['Tom Delonge', 'Mark Hoppus', 'Travis Barker']
};
vault.set('someBand', blink182);
```

### set API
To set data into localStorage, you must use the `set()` API. There are two arguments, `key` for the Object's key, and `value` for the key value:

```javascript
vault.set(key, value);
```

Example:

```javascript
// localStorage, object key = name, value = 'Tom Delonge'
vault.set('name', 'Tom Delonge');
```

### get API
Obtaining set data is easy with the `get()` API, simply reference a previously set key with `key`:

```javascript
vault.get(key);
```

Example:

```javascript
// getting 'name' from localStorage
// returns 'Tom Delonge'
vault.get('name');
```

### remove API
Removing set data is easy with the `remove()` API, again reference a previously set key with `key`:

```javascript
vault.remove(key);
```

Example:

```javascript
// removes 'name' from localStorage
vault.remove('name');
```

### empty API
It's a good idea to empty the user's localStorage when possible to avoid overloading it, there are limits which differ per browser. Specifically modern browsers allow around `5MB` but IE versions are limited. IE8 also supports localStorage and Vault.

```javascript
vault.empty();
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
  vault.set('name', 'Tom Delonge');
  </script>
</body>
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using Gulp.

## Release history

- 1.3.0
  - Fix bug with setting/getting falsy values
  - Slight restructure to internal API
- 1.2.0
  - Lowercase module definition
  - Move to Gulp
- 1.1.0
  - Remove sessionStorage support, localStorage can be cleared upon leaving if necessary
  - Ditch Web Storage API (set/get/remove) syntax and use native Object lookups for better performance
  - Add AMD support
- 1.0.0
  - Initial release
