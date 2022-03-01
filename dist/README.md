<h1 align="center">
🔒 @ultimate/vault
</h1>
<h4 align="center">
  <img width="25" valign="middle" src="https://ultimatecourses.com/static/icons/typescript.svg">
  1KB typed <code>localStorage</code> and <code>sessionStorage</code> utility with data structure and prefix support.
</h4>

<a href="https://ultimatecourses.com/courses/javascript" target="_blank">
  <img src="https://ultimatecourses.com/static/banners/ultimate-javascript-leader.svg">
</a>

## Installation

Install via `npm i @ultimate/vault`.

## Documentation

_ESModule_: Import `Vault` into your TypeScript or JavaScript project and create a new instance:

```ts
import { Vault } from '@ultimate/vault';

const localStorage = new Vault();
```

_Global_: Access `window.Vault` if you are not using a module system:

```html
<script src="vault.min.js"></script>
<script>
  // implicitly uses localStorage until specified
const localStorage = new Vault();
</script>
```

### Local or Session Storage

By default `new Vault()` will use `localStorage`. You may specify the type of storage:

```ts
const localStorage = new Vault({ type: 'local' });
const sessionStorage = new Vault({ type: 'session' });
```

As `Vault` is a `class` each instance works independently.

### Key Prefixes

Create a prefix for each `Vault` instance:

```ts
const localStorage = new Vault({ prefix: 'x9ea45' });
```

All keys set into storage via this instance will be stored as `x9ea45-<key>`.

### isSupported property

Browser support is IE8+ so this shouldn't be wildly needed, but it's there anyway:

```ts
const localStorage = new Vault();

if (localStorage.isSupported) {
  // initialize...
}
```

### `set<T>(key: string, value: T): void`

Set a key and value into storage using the typed `set` method:

```ts
// TypeScript
const localStorage = new Vault();

interface User {
  name: string
}

localStorage.set<User>('user', { name: 'Todd Motto' });
```

All methods are available to use without TypeScript:

```js
const localStorage = new Vault();

localStorage.set('user', { name: 'Todd Motto' });
```

### `get<T>(key: string): T | undefined`

Get a value from storage using the typed `get` method:

```ts
const localStorage = new Vault();

interface User {
  name: string
}

localStorage.get<User>('user');
```

### `remove(key: string): void`

Remove an item from storage using the `remove` method:

```ts
const localStorage = new Vault();

localStorage.remove('user');
```

### `removeAll(): void`

Remove _all_ items from storage:

```ts
const localStorage = new Vault();

localStorage.removeAll();
```

### `onChange(key: string, fn: (e: StorageEvent) => void): () => void`

Listen to the `storage` change event from another tab, which is emitted when any storage value is changed. Here we can specify to only listen to specific property changes:

```ts
const localStorage = new Vault();

const unsubscribe = localStorage.onChange('user', (e: StorageEvent) => {
  // `user` was changed in another tab
  // we could use this new data to sync our UI
  console.log(e);
});

// remove the event listener when you're ready
unsubscribe();
```

### Get all values

Obtain all storage values by accessing the `value` getter:

```ts
const localStorage = new Vault();

console.log(localStorage.value); // { "user": "Todd Motto", ... }
```

Returns an object with all keys and values. Values will remain a `string` type and will need parsing with `JSON.parse()` if you need to access the value.

### Length of Storage

Access how many items are currently in storage with `length`:

```ts
const localStorage = new Vault();

console.log(localStorage.length); // 3
```