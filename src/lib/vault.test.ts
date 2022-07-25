/**
 * @jest-environment jsdom
 */
import { Vault } from './vault';

// https://stackoverflow.com/questions/57643808/what-is-the-difference-between-jest-fn-and-jest-spyon-methods-in-jest

describe('Initialization', () => {
  let vault: Vault;

  beforeEach(() => {
    vault = new Vault();
  });

  test('Vault creates a new instance', () => {
    // .toBe versus .toEqual
    expect(vault instanceof Vault).toEqual(true);
  });

  test('Vault reports browser support', () => {
    expect(vault.isSupported).toEqual(true);
  });
});

describe('Storage Types and Prefixes', () => {
  test('Defaults to window.localStorage', () => {
    const spy = jest.spyOn(Object.getPrototypeOf(localStorage), 'setItem'); // Storage.prototype

    const vault = new Vault({ type: 'local' });
    vault.set('x', 'y');

    expect(JSON.parse(localStorage.getItem('x') as string)).toEqual('y');
    expect(spy).toHaveBeenCalledWith('x', JSON.stringify('y'));
  });

  test('Defaults to window.sessionStorage', () => {
    const spy = jest.spyOn(Object.getPrototypeOf(sessionStorage), 'setItem'); // Storage.prototype

    const vault = new Vault({ type: 'session' });
    vault.set('x', 'y');

    expect(JSON.parse(sessionStorage.getItem('x') as string)).toEqual('y');
    expect(spy).toHaveBeenCalledWith('x', JSON.stringify('y'));
  });

  test('Prefixes all Storage set and get', () => {
    const spy = jest.spyOn(Object.getPrototypeOf(localStorage), 'setItem'); // Storage.prototype

    const vault = new Vault({ prefix: 'x8k0zae' });
    vault.set('prefix', 1234);

    // raw localStorage
    expect(JSON.parse(localStorage.getItem('prefix') as string)).toBeNull();
    expect(
      JSON.parse(localStorage.getItem('x8k0zae-prefix') as string)
    ).toEqual(1234);
    expect(spy).toHaveBeenCalledWith('x8k0zae-prefix', JSON.stringify(1234));

    // vault abstraction
    expect(vault.get('prefix')).toEqual(1234);
    expect(vault.get('x8k0zae-prefix')).not.toBeDefined();
  });
});

describe('Public Methods and Properties', () => {
  let vault: Vault;

  beforeEach(() => {
    vault = new Vault();
    vault.removeAll();
  });

  describe('Value Property', () => {
    test('Returns all unserialized values as an object', () => {
      vault.set('a', 1);
      vault.set('b', 2);
      vault.set('c', 3);
      // toEqual vs toStrictEqual:
      // https://dev.to/thejaredwilcurt/why-you-should-never-use-tobe-in-jest-48ca
      expect(vault.value).toEqual({ a: '1', b: '2', c: '3' });
    });
  });

  describe('Set and Get API', () => {
    test('Handles basic data types', () => {
      vault.set('string', 'y');
      vault.set('number', 88);
      vault.set('boolean', true);
      vault.set('array', [1, 2, 3, 4, 5]);
      vault.set('object', { a: 123, b: [] });

      expect(vault.get('string')).toEqual('y');
      expect(vault.get('number')).toEqual(88);
      expect(vault.get('boolean')).toEqual(true);
      expect(vault.get('array')).toEqual([1, 2, 3, 4, 5]);
      expect(vault.get('object')).toEqual({ a: 123, b: [] });
    });

    test('Should reject and throw Function values', () => {
      // expect(() => vault.set('function', () => 1234)).toThrow();
      expect(() => vault.set('function', () => 1234)).toThrowError(
        'Cannot set functions to Storage - "() => 1234"'
      );
    });
  });

  describe('Remove API', () => {
    test('Removes a single property', () => {
      vault.set('x', 1);
      vault.set('y', 2);
      vault.set('z', 3);

      vault.remove('y');

      expect(vault.get('x')).toEqual(1);
      expect(vault.get('y')).toBeUndefined();
      expect(vault.get('z')).toEqual(3);
    });

    test('Removes all properties', () => {
      vault.set('x', 1);
      vault.set('y', 2);
      vault.set('z', 3);

      vault.removeAll();

      expect(vault.get('x')).toBeUndefined();
      expect(vault.get('y')).toBeUndefined();
      expect(vault.get('z')).toBeUndefined();
    });
  });

  describe('Remove API', () => {
    beforeEach(() => {
      vault.removeAll();
    });

    test('Tracks the length of items stored', () => {
      vault.set('x', 1);
      expect(vault.length).toEqual(1);
      vault.set('y', 2);
      expect(vault.length).toEqual(2);
      vault.set('z', 3);
      expect(vault.length).toEqual(3);
    });
  });
});
