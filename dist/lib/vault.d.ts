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
export declare class Vault {
    /**
     * Internal store, either localStorage or sessionStorage
     */
    private store;
    /**
     * Default options for each instance
     */
    private options;
    /**
     * Specify a `type` or `prefix` when instantiating
     */
    constructor(options: VaultOptions);
    /**
     * isSupported getter that returns a boolean
     * @returns boolean
     */
    get isSupported(): boolean;
    /**
     * An object of all storage items
     * @returns { [name: string]: any }
     */
    get value(): {
        [name: string]: any;
    };
    /**
     * How many items are in the storage
     * @returns number
     */
    get length(): number;
    /**
     * Returns the prefixed key if required
     * @returns string
     */
    private getKey;
    /**
     * Set a data structure to storage
     * @param key The key name to set, excluding the prefix
     * @param value Any non-function value (strings, numbers, booleans, arrays, objects)
     * @returns void
     */
    set<T>(key: string, value: T): void;
    /**
     * Get an item from storage
     * @param key The key name to get, excluding the prefix
     * @returns The typed item or undefined if not found
     */
    get<T>(key: string): T | undefined;
    /**
     * Remove an item from storaage
     * @param key The key name to get, excluding the prefix
     * @returns void
     */
    remove(key: string): void;
    /**
     * Remove all items from storage
     * @returns void
     */
    removeAll(): void;
    /**
     *
     * @param key The key name to listen for, excluding the prefix
     * @param fn Callback function on key's value change
     * @returns void
     */
    onChange(key: string, fn: (e: StorageEvent) => void): void;
}
