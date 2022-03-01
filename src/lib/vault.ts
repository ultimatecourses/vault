/**
 * Vault instance options
 * `type`: Either localStorage or sessionStorage
 * `prefix`: Set all keys of the instance with a prefix
 */
export interface VaultOptions {
  type?: 'local' | 'session';
  prefix?: string;
}

/**
 * Vault class to manage storage
 */
export class Vault {
  /**
   * Internal store, either localStorage or sessionStorage
   */
  private store: Storage;

  /**
   * Default options for each instance
   */
  private options: Required<VaultOptions> = {
    type: 'local',
    prefix: '',
  };

  /**
   * Specify a `type` or `prefix` when instantiating
   */
  constructor(options: VaultOptions) {
    this.options = { ...this.options, ...options };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    this.store = (window as any)[`${this.options.type}Storage`];
  }

  /**
   * isSupported getter that returns a boolean
   * @returns boolean
   */
  get isSupported(): boolean {
    return typeof Storage === 'function';
  }

  /**
   * An object of all storage items
   * @returns { [name: string]: any }
   */
  get value(): { [name: string]: any } {
    return { ...this.store };
  }

  /**
   * How many items are in the storage
   * @returns number
   */
  get length(): number {
    return this.store.length;
  }

  /**
   * Returns the prefixed key if required
   * @returns string
   */
  private getKey(key: string): string {
    if (this.options.prefix) {
      return `${this.options.prefix}-${key}`;
    }
    return key;
  }

  /**
   * Set a data structure to storage
   * @param key The key name to set, excluding the prefix
   * @param value Any non-function value (strings, numbers, booleans, arrays, objects)
   * @returns void
   */
  set<T>(key: string, value: T): void {
    try {
      this.store.setItem(this.getKey(key), JSON.stringify(value));
    } catch (e) {
      if (e instanceof DOMException) {
        throw new Error(`[Vault] Storage limit exceeded: ${e}`);
      } else {
        throw new Error(`[Vault] Unknown error: ${e}`);
      }
    }
  }

  /**
   * Get an item from storage
   * @param key The key name to get, excluding the prefix
   * @returns The typed item or undefined if not found
   */
  get<T>(key: string): T | undefined {
    try {
      const value = this.store.getItem(this.getKey(key));
      if (value) {
        return JSON.parse(value) as T;
      }
    } catch (e) {
      throw new Error(`[Vault] Error parsing key "${this.getKey(key)}": ${e}`);
    }
  }

  /**
   * Remove an item from storaage
   * @param key The key name to get, excluding the prefix
   * @returns void
   */
  remove(key: string): void {
    this.store.removeItem(this.getKey(key));
  }

  /**
   * Remove all items from storage
   * @returns void
   */
  removeAll(): void {
    this.store.clear();
  }

  /**
   *
   * @param key The key name to listen for, excluding the prefix
   * @param fn Callback function on key's value change
   * @returns function to remove the event listener
   */
  onChange(key: string, fn: (e: StorageEvent) => void): () => void {
    const prop = this.getKey(key);
    const onChange = (e: StorageEvent) => prop === (e as any)[prop] && fn(e);
    window.addEventListener('storage', onChange);
    return () => window.removeEventListener('storage', onChange);
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
(window as any).Vault = Vault;
